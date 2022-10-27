const cloudinary = require('cloudinary').v2;
const { Car } = require("../models");

module.exports = {
  getAll() {
    return Car.findAll();
  },

  async create(createArgs, imgFile) {
    const fileBase64 = imgFile.buffer.toString('base64');
    const file = `data:${imgFile.mimetype};base64,${fileBase64}`;

    try {
        const result = await cloudinary.uploader.upload(file, { folder: 'challenge_06' });
        createArgs.carImage = result.secure_url;

        return Car.create(createArgs);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: 'Gagal upload file!',
        });
    }
},

  async update(id, updateArgs, imgFile) {
    const fileBase64 = imgFile.buffer.toString("base64");
    const file = `data:${imgFile.mimetype};base64,${fileBase64}`;

    // delete old image
    const car = await Car.findByPk(id);

    const imageUrl = car.dataValues.carImage;
    const folder = imageUrl.split("/")[7];
    const publicId = imageUrl.split("/")[8].split(".")[0];

    cloudinary.uploader.destroy(`${folder}/${publicId}`);

    // upload new image
    try {
      const result = await cloudinary.uploader.upload(file, { folder: "challenge_06" });
      updateArgs.carImage = result.secure_url;

      return Car.update(updateArgs, {
        where: { id: id },
        returning: true,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: "FAIL",
        message: "Gagal upload file!",
      });
    }
  },

  async delete(id) {
    try {
      await Car.update({ where: { id: id } });
      return Car.destroy({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  },

  async restore(id) {
    const exist = await Car.findByPk(id, { paranoid: false });

    if (!exist) {
      throw new Error("Car not found");
    } else if (!exist.deletedAt) {
      throw new Error("Car already exist");
    } else {
      const restoreArgs = {
        deletedBy: null,
      };

      Car.update(restoreArgs, { where: { id: id } });
      return Car.restore({ where: { id: id } });
    }
  },

  getById(id) {
    return Car.findByPk({ where: { id } });
  },

  getTotalCar() {
    return Car.count();
  },
};
