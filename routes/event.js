const express = require("express");
const router = express.Router();

const eventModel = require("../models/Event");

router.get("/", async (req, res, next) => {
  try {
    // Get all the events
    eventModel.find().then((eventDocument) => {
      res.status(200).json(eventDocument);
      console.log(eventDocument);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/create", (req, res, next) => {
  const { title, start, end, resourceId, color } = req.body;

  const newEvent = {
    title,
    start,
    end,
    resourceId,
    color,
  };

  console.log(newEvent);

  eventModel
    .create(newEvent)
    .then((eventDocument) => {
      res.status(200).json(eventDocument);
      console.log(eventDocument);
    })
    .catch(next);
});

/// Update Events

router.patch("/:id", (req, res, next) => {
  // Update a specific user
  console.log(req.body);
  eventModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

/// Delete event
router.delete("/:id", (req, res, next) => {
  eventModel
    .findByIdAndRemove(req.params.id)
    .then((eventDocument) => {
      res.status(201).json(eventDocument);
    })

    .catch((error) => {
      next(error);
    });
});

module.exports = router;
