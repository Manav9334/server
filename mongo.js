const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  }
});

const Student = mongoose.model("Student", studentSchema);

// CREATE
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// READ BY ID
app.get("/students/:id", async (req, res) => {
  const student = await Student.findOne({ id: req.params.id });

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  const student = await Student.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  const student = await Student.findOneAndDelete({ id: req.params.id });

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json({ message: "Student deleted successfully" });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});