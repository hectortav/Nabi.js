import express from "express";
const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

router.get("/user", function (req, res) {
    res.send({ name: "hector" });
});

router.get("/", function (req, res) {
    res.send({ message: "hello world" });
});

export default router;
