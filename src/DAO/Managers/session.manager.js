const sessionLogin = async (req, res) => {
  res
    .cookie("cookie user", req.user.token, { maxAge: 300000, httpOnly: true })
    .send(req.user);
};

const loginRegister = async (req, res) => {
  res.send(req.user);
};
const getCurrent = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  sessionLogin,
  loginRegister,
  getCurrent,
};
