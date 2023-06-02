const express = require('express');
const Student = require('../model/Student');
//add student
const store = async (req, res) => {
    if (!req.body.email && !req.body.name && !req.body.phone && !req.body.address && !req.body.city && !req.body.class) {
        res.status(400).send({ message: "filed all the input filed" });
    }
    const addStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        class: req.body.class
    });
    await addStudent.save().then(data => {
        res.status(200).send({ success: true, msg: "Student created successfully!!", student: data });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating Student"
        });
    });
}

//get all student
const allstudent = async (req, res) => {

    try {
        const studentData = await Student.find();
        res.status(200).json({ ststus: "success", data: studentData });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//delete student
const destroy = async (req, res) => {
    await Student.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                msg: "Student not found.."
            });
        } else {
            res.send({
                msg: "student deleted successfully.."
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

//edit student
const edit = async (req, res) => {
    try {
        const studentOne = await Student.findById(req.params.id);
        res.status(200).json(studentOne);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//update student
const update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    await Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: "Student not found..."
            });
        } else {
            res.status(201).send({ message: "Student updated successfully."})
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}
module.exports = ({
    store,
    allstudent,
    destroy,
    edit,
    update
})