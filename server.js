const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = "data.json";

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}






// REGISTER
app.post("/register", (req, res) => {

  const data = readData();

  data.users.push(req.body);

  saveData(data);

  res.send("User Registered");

});






// LOGIN
app.post("/login", (req, res) => {

  const data = readData();

  const user = data.users.find(
    u =>
      u.email === req.body.email &&
      u.password === req.body.password
  );

  if(user){
    res.send("Login Success");
  } else {
    res.status(401).send("Invalid Credentials");
  }

});






// POST ITEM
app.post("/postitem", (req, res) => {

  const data = readData();

  data.items.push(req.body);

  saveData(data);

  res.send("Item Posted");

});






// GET ITEMS
app.get("/items", (req, res) => {

  const data = readData();

  res.json(data.items);

});






// CLAIM ITEM
app.post("/claim", (req, res) => {

  const data = readData();

  data.claims.push(req.body);

  saveData(data);

  res.send("Claim Submitted");

});






// GET CLAIMS
app.get("/claims", (req, res) => {

  const data = readData();

  res.json(data.claims);

});


app.get("/search", (req,res)=>{

  const data = readData();

  const q =
  req.query.q.toLowerCase();

  const result = data.items.filter(item =>

    item.name.toLowerCase().includes(q)

  );

  res.json(result);

});



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});