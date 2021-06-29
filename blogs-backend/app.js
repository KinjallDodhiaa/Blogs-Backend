/** EXTERNAL DEPENDENCIES */
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
//import config file
const config = require("./config/configs");
const dotenv = require("dotenv");
dotenv.config();


console.log(process.env);

/**
 * DEPENDENCIES FROM LOWDB
 */
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

/** ROUTERS */
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//import records router
const postsRouter = require("./routes/posts");

// CORS Security for the client website to disable same-orign-policy for only his website
const { setCors } = require("./middleware/security");

/** INIT */
var app = express();

/** LOGGING */
app.use(logger("dev"));

/**
 * SET UP THE LOWDB DATABASE
 */
//initialize the adapter to the mock db file
// const adapter = new FileSync("data/db.json");
//initialize the lowdb to the mock db file
// const db = low(adapter);
//add default entries to the database
// db.defaults({posts:[]}).write();

//SETTING UP MONGODB CONNECTION
//mongodb+srv://Kinjal:test1234@cluster0.kgubn.mongodb.net/blogs?retryWrites=true&w=majority
//config.db contains the connection string to our database
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

//actually establishing the connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("Successfully connected to the database");
});

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**Set CORS TO OMIT SECURITY ERRORS */
app.use(setCors);

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, "public")));

/** ROUTES */
app.use("/", indexRouter);
app.use("/users", usersRouter);
//router path: '/posts'
app.use("/posts", postsRouter);

/** ERROR HANDLING */
app.use((err, req, res, next) => {
  console.log(err)
  //respond to the requestor with the error message
  res.status(500).send({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;

// app.listen(3001, () => console.log("Running on http://localhost:3001"));
