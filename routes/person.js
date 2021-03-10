const person = require("../models/person");
const express = require("express");
const router = express.Router();

//Create and Save a Record of a Model:

router.post("/", (req, res) => {
  const newperson = new person({
    name: "walid",
    age: 30,
    favoriteFoods: ["pasta"],
  });
  newperson
    .save()
    .then(res.send("person has been added with success"))
    .catch((err) => res.send(err));
});

//Create Many Records with model.create()

router.post("/Manypersons", (req, res) => {
  let arrayOfPeople = [
    { name: "mputu", age: 88, favoriteFoods: ["pizza"] },
    { name: "ifa", age: 28, favoriteFoods: ["makloub", "kabeb"] },
  ];

  person
    .insertMany(arrayOfPeople)
    .then(res.send("users has been added with success"))
    .catch((err) => res.send(err));
});

//Use model.find() to Search Your Database

router.get("/name/:name", (req, res) => {
  let name = { ...req.params };
  person
    .find(name)
    .then((person) => res.send(person))
    .catch((err) => res.send(err));
});

//Use model.findOne() to Return a Single Matching Document from Your Database

router.get("/favoriteFoods/:fav", (req, res) => {
  let food = { ...req.params };

  person
    .findOne(food)
    .then((person) => res.send(person))
    .catch((err) => res.send(err));
});

//Use model.findById() to Search Your Database By _id
router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  person
    .find({ _id })
    .then((person) => res.send(person))
    .catch((err) => res.send(err));
});

//Perform Classic Updates by Running Find, Edit, then Save
router.put("/:_id", (req, res) => {
  let { _id } = req.params;
  person
    .findByIdAndUpdate({ _id }, { $set: { ...req.body } })
    .then(() => res.send("person has been updated"))
    .catch((err) => res.send(err));
});

//Perform New Updates on a Document Using model.findOneAndUpdate()

router.put("/:_id", (req, res) => {
  let { _id } = req.params;
  person
    .findOneAndUpdate({ _id }, { $set: { ...req.body } })
    .then(() => res.send("person has been updated"))
    .catch((err) => res.send(err));
});
//Delete One Document Using model.findByIdAndRemove
router.delete("/:_id", (req, res) => {
  let { _id } = req.params;
  person
    .findByIdAndRemove({ _id }, { $set: { ...req.body } })
    .then(() => res.send("person has been updated"))
    .catch((err) => res.send(err));
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/name/:name", (req, res) => {
  let { name } = req.params;
  person
    .deleteMany({ name: name })
    .then(() => res.send("person has been updated"))
    .catch((err) => res.send(err));
});

router.get("/favoriteFoods/:fav", (req, res) => {
  let foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "desc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) done(err);
      done(null, data);
    });
});

module.exports = router;