const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

//app.use(express.json);

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to API",
  });
});

app.post("/api/post", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created..! ",
        authData
      }); 
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "gauravstr2680",
    email: "gauravstr05@gmail.com",
  };
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(port, () => {
  console.log(`server running on port: ${port}📡`);
});
