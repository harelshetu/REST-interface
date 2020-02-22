const express = require("express");
const PORT = 5000;
const Users = require("./models/data");
const app = express();
const db = require("./util/database");
const {recovery} = require('./util/functions');

app.use(express.json());
app.use("/api", require("./routes/index"));

// check DB connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

db.sync().then(result => {
  app.listen(PORT, () => console.log("server started at %s", PORT));
  Users.findAll({ where: { isFinished: 0 } })
    .then(users => recovery(users))
    .catch(err => {
      console.log(err);
    });
});
