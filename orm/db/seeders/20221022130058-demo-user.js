const bcrypt = require("bcryptjs");
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    async function encryptPassword(str) {
      try {
        const hash = await bcrypt.hash(str, 10);
        return hash;
      } catch (err) {
        console.log(err);
      }
    }

    const password = "123";
    const encryptedPassword = await encryptPassword(password);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@gmail.com",
          encryptedPassword: encryptedPassword,
          role: "superAdmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
