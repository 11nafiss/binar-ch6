
const authService = require('../../../services/authService');

module.exports = {
    register(req, res) {
        const { email, password } = req.body;

        authService.register(email, password, "member").then((user) => {
            res.status(202).json({
                status: "OK",
                data: user,
            });
        }).catch((err) => {
            res.status(402).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },

    registerAdmin (req, res) {
        const { email, password } = req.body;
        if(req.user.role != "superAdmin") {
            res.status(402).json({
                status: "FAIL",
                message: "unauthorized"
            });
        }

        authService.register(email, password, "admin").then((user) => {
            res.status(202).json({
                status: "OK",
                data: user,
            });
        }).catch((err) => {
            res.status(402).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },

    login(req, res) {
        const { email, password } = req.body;

        authService.login(email, password).then((auth) => {
            if(!auth) {
                res.status(401).json({
                    status: "FAIL",
                    message: "email or password is incorrect",
                })
                return;
            }

            res.status(200).json({
                status: "OK",
                data: auth,
            });
        }).catch((err) => {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },

    authorize(req, res, next) {
        const bearerToken = req.headers.authorization;
        console.log(bearerToken);
        if(!bearerToken) {
            res.status(403).json({
                message: "unauthorized",
            })
            return;
        }

        const token = bearerToken.split('Bearer ')[1];

        authService.authorize(token).then((user) => {
            if(!user) {
                res.status(403).json({
                    message: "unauthorized",
                })
                return;
            }

            console.log(user);
            req.user = user;
            next();

        }).catch((err) => {
            res.status(403).json({
                message: "unauthorized",
            });
        });
    },

    whoAmI(req, res) {
        const user = req.user;

        res.status(201).json({
            status: "OK",
            data: user,
        });
    },
}