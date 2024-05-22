const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AuthenRouter = require("./routes/AuthenRouter");

dbConnect();

const corsOptions = {
  origin: true,
  credentials: true,
};

const sessionOptions = {
  key: "sessionIdSession",
  secret: "phuoc ngo",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
  },
};

// parse application/json
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);
app.use("/api/authorization", AuthenRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8081, () => {
  console.log("Server listening on port 8081");
});
