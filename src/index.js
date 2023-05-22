const express = require("express");
const handlebars = require("express-handlebars");
const passport = require("passport");
const connectMongo = require("connect-mongo");
const session = require("express-session");

const mongoConnect = require("../db");
const InitPassport = require("./utils/passport.config");
const router = require("./router");

const port = 3000;
const app = express();

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//static files
app.use(express.static(__dirname + "/public"));

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//session
app.use(
  session({
    store: connectMongo.create({
      mongoUrl:
        "mongodb+srv://admin:admin@coder.n7ppfjp.mongodb.net/coder?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "clavesecreta",
    resave: true,
    saveUninitialized: true,
  })
);

//passport
InitPassport();
app.use(passport.initialize());
app.use(passport.session());

router(app);
mongoConnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
