const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tasks = [];

// REGISTER
app.post("/register", (req, res) => {
    users.push(req.body);
    res.json({ message: "User Registered" });
});

// LOGIN
app.post("/login", (req, res) => {
    const user = users.find(u =>
        u.email === req.body.email &&
        u.password === req.body.password
    );

    if (user) res.json({ success: true });
    else res.json({ success: false });
});

// GET TASKS
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ADD TASK
app.post("/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    tasks.push(task);
    res.json(task);
});

// TOGGLE TASK
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    res.json({ message: "updated" });
});

// DELETE TASK
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.json({ message: "deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));