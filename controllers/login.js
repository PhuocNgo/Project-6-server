const User = require("../db/userModel");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (req.body) {
    try {
      const existingUser = await User.findOne({
        login_name: username,
      });
      if (existingUser) {
        if (existingUser.password === password) {
          req.session.sessionId = existingUser._id;
          res.send({
            message: "Welcome to my photo sharing app!",
            last_name: existingUser.last_name,
            status: true,
            userId: existingUser._id,
          });
        } else
          res.send({ message: "Your password is incorrect!", status: false });
      } else {
        res.send({ message: "Your account doesn't exist!", status: false });
      }
    } catch (err) {
      console.log("error::", err);
      res.send({ message: "You've got an error!!", status: false });
    }
  }
};

module.exports = login;
