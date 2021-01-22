require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");

const users = [
  {
    firstName: "Caro",
    lastName: "Doe",
    email: "Caro@gmail.com",
    password: "1234",
    team: "red",
    role: "user"
  },
    {
    firstName: "Toto",
    lastName: "Doe",
    email: "john@gmail.com",
    password: "1234",
    team: "red",
    role: "user"
  },

    {
    firstName: "Alann",
    lastName: "Doe",
    email: "Alann@gmail.com",
    password: "1234",
    team: "yellow",
    role: "user"
  },

    {
    firstName: "Bastien",
    lastName: "Doe",
    email: "Bastien@gmail.com",
    password: "1234",
    team: "blue",
    role: "user"
  },

    {
    firstName: "Clement",
    lastName: "Doe",
    email: "Clement@gmail.com",
    password: "1234",
    team: "red",
    role: "user"
  },
];

const items = [{}];

(async () => {
  try {
    const self = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connection to ${self.connection.name} succesful.`);
    const createdUsers = await User.create(users);
    console.log(createdUsers);
    self.connection.close();
  } catch (error) {
    console.log(`An error has occured while seeding... ${error}`);
  }
})();
