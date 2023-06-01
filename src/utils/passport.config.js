const passport = require("passport");
const local = require("passport-local");
const Users = require("../dao/models/users.model");
const { hashPassword, comparePassword } = require("./bcrypt.util");

const InitPassport = () => {
  passport.use(
    "/register",
    new local.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
          const userExist = await Users.findOne({ email: username });
          if (userExist) {
            done(null, false);
          } else {
            const hash = await hashPassword(password);
            const user = await Users.create({
              first_name,
              last_name,
              age,
              email: username,
              password: hash,
            });
            done(null, user);
          }
        } catch (err) {
          done(err, false);
        }
      }
    )
  );
  passport.use(
    "/login",
    new local.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
      },
      async (req, username, password, done) => {
        try {
          const userExist = await Users.findOne({ email: username });
          const isVadidPassword = await comparePassword(
            password,
            user.password
          );
          if (userExist && isVadidPassword) {
            done(null, userExist);
          } else {
            done(null, false);
          }
        } catch (err) {
          done(null, false);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await Users.findById(id);
    done(null, user);
  });
};

const passportCustom = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).send({
          status: "error",
          msg: info.message ? info.message : info.toString(),
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = { InitPassport, passportCustom };
