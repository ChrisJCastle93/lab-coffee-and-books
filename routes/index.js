const express = require("express");
const router = express.Router();
const Place = require("../models/place.model");

router.get("/", (req, res, next) => {
  Place.find()
    .then((places) => res.render("index", { places }))
    .catch((err) => console.log(err));
});

router.get("/places/new", (req, res, next) => {
  res.render("newplace");
});

router.post("/places/new", (req, res, next) => {
  console.log(req.body);
  const { name, placeType } = req.body;
  Place.create({
    name,
    type: placeType,
  })
    .then((placeFromDB) => {
      console.log(placeFromDB);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// UPDATE ROUTE

router.get("/places/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Place.findById(id)
    .then((place) => {
      res.render("edit", { place });
    })
    .catch((err) => console.log(err));
});

router.post("/places/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, placeType } = req.body;
  Place.findOneAndUpdate(id, { name: name, type: placeType }, { new: true })
    .then((updatedUser) => {
      console.log("user updated:", updatedUser);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// DELETE ROUTE

router.get("/places/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Place.findOneAndDelete(id)
    .then((deletedPlace) => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
