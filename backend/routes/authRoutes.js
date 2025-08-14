const express = require("express");
const router = express.Router();

const authControllers = require("../controller/authControllers");

router.post("/auth/register", authControllers.postRegister);

router.post("/auth/login", authControllers.postLogin);

module.exports = router;
