const express = require("express");
const app = express();

app.use(express.json());

let students = []; // In-memory storage

// CREATE
app.post("/students", (req, res) => {
  const { id, name, mobile } = req.body;

  if (!id || !name || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const exists = students.find(s => s.id === id);
  if (exists) {
    return res.status(400).json({ message: "Student ID already exists" });
  }

  const student = { id, name, mobile };
  students.push(student);

  res.status(201).json(student);
});

// READ ALL
app.get("/students", (req, res) => {
  res.json(students);
});

// READ BY ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// UPDATE
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name || student.name;
  student.mobile = req.body.mobile || student.mobile;

  res.json(student);
});

// DELETE
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.json({ message: "Student deleted successfully" });
});

app.listen(3002, () => {
  console.log("Server running on port 3002");
});