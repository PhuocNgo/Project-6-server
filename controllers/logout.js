const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send(500, "Error logging out");
    } else {
      res.clearCookie("sessionId");
      res.redirect("/");
    }
  });
};

module.exports = logout;
