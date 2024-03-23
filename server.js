const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //install mongoose my command "npm i mongoose"
const { MongoClient } = require("mongodb");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.listen(3005);

//
app.use(
  cors({
    origin: `http://localhost:5500/`,
    credentials: true,
  })
);

//
app.use(
  express.static("./build", () => {
    console.log("/req");
  })
);
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  console.log("/req");
});

const db_link =process.env.mongolink;

mongoose.connect(db_link).then(async function () {
  const client = new MongoClient(db_link);
  await client.connect();
  const db = client.db("alhansat");
  const users = db.collection("users");
  const tasks = db.collection("tasks");
  console.log("db connected");

  console.log("listening");

  // createposts
  app.post("/createtask", verifyToken, async (req, res) => {
    try {
      console.log("ctrequest");
      req.body.email=req.email
      //
      tasks.insertOne(req.body);
      res.json({
        message: "Task created successfully",
      });
      console.log(req.body);
    } catch (error) {
      console.log(error);
    }
  });

  //tasks
  app.get("/task", verifyToken, async (req, res) => {
    try {
      console.log("task get req");
      const result = await tasks.find({ email: req.email }).toArray();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  });
  //edit task
  app.post("/Edittask", verifyToken, async (req, res) => {
    try {
      console.log("edit req");
      let query = {taskid: Number(req.body.taskid)};
      let update
      if(req.body.tasktype){
        update = {
          $set: {
            tasktype: req.body.tasktype,
          }
        };
      }else{
        update = {
          $set: {
            tasktitle: req.body.tasktitle,
            taskdetails: req.body.taskdetails,
          }
        };
      }
      console.log(query);
      console.log(update);
      const options = { returnOriginal: false };
      await tasks.findOneAndUpdate(query, update, options);
      res.json({
        message: "Task editted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  });

  // delete
  app.post("/Deletetask", verifyToken, async (req, res) => {
    try {
      console.log("deletetask req");
      await tasks.deleteOne({ taskid: Number(req.body.taskid) });
      //
      res.json({
        message: "Task deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  });

  //user verification

  app.post("/signup", (req, res) => {
    try {
      let email = req.body.email;
      let userdata = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
      };

      const query = { email: `${email}` };
      users.findOne(query).then((user) => {
        if (user) {
          res.json({
            message: "user exist",
          });
        } else {
          users.insertOne(userdata);
          console.log(userdata);
          res.json({
            message: "signup successfully",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  //login
  app.post("/login", (req, res) => {
    try {
      console.log("login req");
      let email = req.body.email;
      let password = req.body.password;
      console.log(req.body);

      users.findOne({ email: `${email}` }).then((user) => {
        if (user) {
          if (user.password == password) {
            const token = jwt.sign({ userId: email }, "this-world-is-toxic", {
              expiresIn: "24h",
            });
            res.cookie(`token`, token, {
              httpOnly: true,
              sameSite: "lax",
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ message: "Login successful", token });
          } else {
            res.json({
              message: "Wrong password",
            });
          }
        } else {
          res.json({
            message: "User not found",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  // token verification

  function verifyToken(req, res, next) {
    //
    if (req.headers.cookie) {
      const cookiedata = req.headers.cookie;
      const cookiesArray = cookiedata.split(";");
      const cookiesobject = {};
      cookiesArray.forEach((cookie) => {
        const [key, value] = cookie.trim().split("=");
        cookiesobject[key] = value.replace(/%40/g, "@");
      });
      const token = cookiesobject.token;

      //
      if (token) {
        jwt.verify(token, "this-world-is-toxic", (err, decoded) => {
          if (err) {
            return res.json({ message: "Invalid token" });
          }
          req.email = decoded.userId;
          next();
        });
      } else {
        res.json({ message: "Token not provided" });
      }
    } else {
      console.log("unlogined request");
      return res.json({ message: "Please login first" });
    }
  }
});
