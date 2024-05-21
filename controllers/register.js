const User = require("../db/userModel");

const register = async (req, res) => {
  const { firstname, lastname, username, password, confirmPassword } = req.body;
  if (req.body) {
    try {
      const existingUser = await User.findOne({
        login_name: username,
      });
      if (existingUser) {
        return res.send({
          message: "This username existed, please choose a different name!!",
          status: false,
        });
      } else {
        const createdAccount = await User.create({
          first_name: firstname,
          last_name: lastname,
          login_name: username,
          password: password,
          is_login: false,
          confirmPassword: confirmPassword,
        });
        console.log("new account:", createdAccount);
        res.send({ message: "Created account successfully!!", status: true });
      }
    } catch (err) {
      console.log("error::", err);
      res.send({ message: "You've got an error!!" });
    }
  }
};

module.exports = register;
