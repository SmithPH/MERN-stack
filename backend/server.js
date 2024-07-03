require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const postsRoutes = require('./routes/postsRoutes')
const usersRoutes = require('./routes/usersRoutes')

// express app
const app = express();

// middleware
app.use(express.json());
app.use("/api/posts", postsRoutes); // for posts
app.use("/api/users", usersRoutes); // for users


//connect to database
mongoose
  .connect(process.env.MONGO_URI, {dbName: 'demo_db'})
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to database and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
