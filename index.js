const express = require('express');
const app = express();
const mongoose= require('mongoose');

const url= "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
mongoose.connect(url,{useNewUrlParser: true});
const con= mongoose.connection;

app.listen(5000, function() {
  console.log('listening on 5000')
}),

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const student = new Student({
  name: req.body.name,
registration: req.body.description,
  published: req.body.published ? req.body.published : false
});
  // Save Student in the database
  student
    .save(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    });
};
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Student with id=${id}.`
        });
      } else res.send({ message: "Student was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Student with id=" + id
      });
    });
};
  // Delete Student in the database
exports.delete = (req, res) => {
const id = req.params.id;

Student.findByIdAndRemove(id)
.then(data => {
  if (!data) {
    res.status(404).send({
      message: `Cannot delete Student with id=${id}.`
    });
  } else {
    res.send({
      message: "Student was deleted successfully!"
    });
  }
})
.catch(err => {
  res.status(500).send({
    message: "Could not delete Student with id=" + id
  });
});
};

module.exports = app => {
  const tutorials = require("../controllers/student.controller.js");

  var router = require("express").Router();
  // Create a new student
  router.post("/", students.create);
   // Update a student with id
    router.put("/", students.update);
    // Delete a student with id
    router.delete("/", students.delete);

    app.use('/api/tutorials', router);
  };
