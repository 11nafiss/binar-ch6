const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

async function encryptPassword(str) {
  try {
    const hash = await bcrypt.hash(str, 10);
    return hash;
  } catch (err) {
    console.log(err);
  }
}

async function comparePassword(password, encryptedPassword) {
  try {
    const isValid = await bcrypt.compare(password, encryptedPassword);
    return isValid;
  } catch (err) {
    console.log(err);
  }
}

const SECRET_KEY = "Secret";

function createWebToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  async register(email, password, role) {
    try {
      const encryptedPassword = await encryptPassword(password);
      const body = {
        email,
        encryptedPassword: encryptedPassword,
        role: role
      };
      const user = await userRepository.create(body);
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async login(email, password) {
    try {
      const user = await userRepository.findUser({ email });
      console.log(user);

      if (!user) {
        return false;
      }

      //const { password: encryptedPassword } = user;
      const isAuthenticated = await comparePassword(password, user.encryptedPassword);

      if (!isAuthenticated) {
        return false;
      }

      //generate token
      const token = createWebToken({
        id: user.id,
        email: user.email,
      });

      const data = {
        ...user.dataValues,
        token,
      };

      return data;
    } catch (err) {
      throw err;
    }
  },

  async authorize(token) {
    try {
      const payload = verifyToken(token);

      const id = payload?.id;

      const user = await userRepository.findUserByPk(id);

      return user;
    } catch (err) {
      throw err;
    }
  },
};
