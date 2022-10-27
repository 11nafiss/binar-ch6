const carRepository = require("../repositories/carRepository");

module.exports = {
  async list() {
    try {
      const cars = await carRepository.getAll();
      const carCount = await carRepository.getTotalCar();

      return {
        data: cars,
        count: carCount,
      };
    } catch (err) {
      throw err;
    }
  },

  create(createArgs, imgFile, user) {
    return carRepository.create({
      createArgs,
      imgFile,
      createdBy: user.email,
    });
  },

  update(id, updateArgs, imgFile, user) {
    return carRepository.update({
      updateArgs,
      imgFile,
      updatedBy: user.email
    }, id);
  },

  delete(id) {
    return carRepository.delete({
      deletedBy: user.email
    }, id);
  },

  restore(id) {
    return carRepository.restore(id);
  },

  getDetail(id) {
    return carRepository.getById(id);
  },
};
