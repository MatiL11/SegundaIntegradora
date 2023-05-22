const { Router } = require("express");
const Users = require("../dao/models/users.model");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util");
const passport = require("passport");

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email == "adminCoder@coder.com" && password == "123456") {
    const userAdmin = {
      first_name: "Admin",
      last_name: "Coder",
      age: "25",
      email,
      password,
      rol: "admin",
    };
    req.session.user = userAdmin;
  }
  const user = await Users.findOne({ email });
  const isValidPassword = await comparePassword(password, user.password);
  console.log(user, isValidPassword);
  if (user && isValidPassword) {
    req.session.user = { ...user, rol: "user" };
    res.send(user);
  } else {
    res.status(401).send("Email o contraseña incorrecta,intente nuevamente");
  }
});

router.post(
  "/register",
  passport.authenticate("/register"),
  async (req, res) => {
    res.send(req.user);
  }
);

router.post("/forgot-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      const hash = await hashPassword(password);
      await Users.updateOne({ email }, { password: hash });
      res.send(user);
    } else {
      res.status(404).send("Email no encontrado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear usuario");
  }
});

module.exports = router;
