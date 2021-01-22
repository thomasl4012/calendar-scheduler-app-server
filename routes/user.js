const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const teamModel = require("../models/Team");
const util = require("util");

router.get("/", async (req, res, next) => {
  try {
    // Get all the users
    UserModel.find().then((userDocument) => {
      res.status(200).json(userDocument);
      console.log(userDocument);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/teams", (req, res, next) => {
  UserModel.find()
    .populate("team")
    .then((userDocument) => {
      console.log(userDocument);
      res.status(201).json(userDocument);
    })
    .catch(next);
});

router.post("/create", (req, res, next) => {
  console.log("REQBODY=====> ", req.body);
  const { email, firstName, lastName, team } = req.body.account;

  UserModel.findOne({ email }).then((userDocument) => {
    if (userDocument) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const newUser = {
      email,
      lastName,
      firstName,
      team,
    };

    UserModel.create(newUser).then((userResponse) => {
      console.log(userResponse);
      teamModel
        .findByIdAndUpdate(userResponse.team, {
          $push: { userId: userResponse._id },
        })

        .catch(next);
    });
  });
});

router.get("/:id", (req, res, next) => {
  //Get a specific user
  UserModel.findById(req.params.id)
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", (req, res, next) => {
  // Deletes a user
  Promise.all([
    UserModel.findByIdAndRemove(req.params.id),

    teamModel.updateMany(
      {},
      {
        $pull: { userId: req.params.id },
      }
    ),
  ])
    .then(([team, user]) => {
      res.status(201).json(user);
      console.log(util.format("team=%O user=%O", team, user));
    })

    .catch((error) => {
      next(error);
    });
});

router.patch("/:id", (req, res, next) => {
  // Update a specific user
  console.log(req.body);
  UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// Find users in team

module.exports = router;
