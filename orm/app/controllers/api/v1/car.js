const carService = require("../../../services/carService");

module.exports = {
  list(req, res) {
    carService
      .list()
      .then((cars) => {
        res.status(200).json({
          status: "OK",
          data: {
            cars: cars.data,
            count: cars.count,
          },
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async create(req, res) {
    try {
      const createArgs = req.body;
      const imgFile = req.file;
      const car = await carService.create(
        {
          createArgs,
          imgFile,
        },
        req.user
      );

      res.status(201).json({
        status: "OK",
        data: car,
      });
    } catch (err) {
      console.log(err);
      res.status(401).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  update(req, res) {
    const id = req.params.id;
    const imgFile = req.file;
    const car = carServices.get(id);

    if (!car) {
      return res.status(404).json({
        status: "FAIL",
        message: "Car not found!",
      });
    } else {
      const updateArgs = {
        ...req.body,
        updatedBy: req.user.userName,
      };

      carServices
        .update(id, updateArgs, imgFile, req.user)
        .then((car) => {
          console.log(car);
          res.status(200).json({
            status: "OK",
            data: car,
          });
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
    }
  },

  destroy(req, res) {
    const id = req.params.id;
    const car = carServices.get(id);

    if (!car) {
      return res.status(404).json({
        status: "FAIL",
        message: "  ",
      });
    } else {
      carService
        .delete(id, req.user)
        .then(() => {
          res.status(200).json({
            status: "OK",
            message: "deleted successfully",
          });
        })
        .catch((err) => {
          res.status(401).json({
            status: "FAIL",
            message: err.message,
          });
        });
    }
  },

  restore(req, res) {
    const id = req.params.id;
    carServices
      .restore(id)
      .then(() => {
        res.status(200).json({
          status: "OK",
          message: `Car restored successfully!`,
        });
      })
      .catch((err) => {
        if (err.message === "Car not found") {
          res.status(404).json({
            status: "FAIL",
            message: err.message,
          });
        } else if (err.message === "Car already exist") {
          res.status(409).json({
            status: "FAIL",
            message: err.message,
          });
        } else {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        }
      });
  },

  setCar(req, res, next) {
    carService
      .getDetail(req.params.id)
      .then((car) => {
        if (!car) {
          res.status(404).json({
            status: "FAIL",
            message: "Car not found!",
          });

          return;
        }

        req.car = car;
        next();
      })
      .catch((err) => {
        res.status(404).json({
          status: "FAIL",
          message: "Car not found!",
        });
      });
  },
};
