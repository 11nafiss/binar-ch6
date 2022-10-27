'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     return queryInterface.bulkInsert('Cars', [{
      name: "Ford F150",
      type: "Sedan",
      price: 200000,
      size: "Small",
      image: 'https://res.cloudinary.com/dxqs0ygih/image/upload/v1665542663/cars/car01.min_hml1xf.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "BMW X5",
      type: "Convertible",
      price: 800000,
      size: "Large",
      image: 'https://res.cloudinary.com/dxqs0ygih/image/upload/v1665542664/cars/car02.min_yfijhe.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Lincoln Navigator",
      type: "Regular Cab Pickup",
      price: 300000,
      size: "Small",
      image: 'https://res.cloudinary.com/dxqs0ygih/image/upload/v1665542664/cars/car08.min_u4z2xj.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Chevy Malibu",
      type: "SUV",
      price: 900000,
      size: "Large",
      image: 'https://res.cloudinary.com/dxqs0ygih/image/upload/v1665542665/cars/car13.min_aluith.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Lincoln MKS",
      type: "Regular Cab Pickup",
      price: 1000000,
      size: "Medium",
      image: 'https://res.cloudinary.com/dxqs0ygih/image/upload/v1665542665/cars/car17.min_py7bpp.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Audi S5",
      type: "Coupe",
      price: 300000,
      size: "Large",
      image: 'https://res.cloudinary.com/dxqs0ygih/image/upload/v1665542666/cars/car22.min_ldlmph.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
