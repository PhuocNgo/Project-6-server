const express = require("express");

const router = express.Router();
const register = require("../controllers/register");
const login = require("../controllers/login");
const logout = require("../controllers/logout");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
module.exports = router;
