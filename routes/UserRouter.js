const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// router.post("/list", async (request, response) => {});

const checkAuthen = (req, res, next) => {
  if (req.session.sessionId) {
    next();
  } else {
    res.send(401, "Something went wrong, please check your login!");
  }
};

router.post("/list", checkAuthen, async (request, response) => {
  const usersList = await User.find({});
  const usersShortList = usersList.map((user) => {
    const id = user.id;
    const last_name = user.last_name;
    const newUser = {
      id,
      last_name,
    };
    return newUser;
  });
  response.send(usersShortList);
});

router.post("/:id", async (request, response) => {});

router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const userDetail = await User.find({
      _id: id,
    });
    response.send(userDetail);
  } catch {
    response.send(400, `The user with id ${id} doesn't exist!`);
  }
});

module.exports = router;
