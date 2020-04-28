const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user");

require("dotenv/config");

const app = express();
app.use(express.json())
// const customMiddelware = (req,res,next) => {
//     console.log("welcome to my middleware");
//     next();
// }
// app.use(customMiddelware);
app.get("/",(req,res)=>{
    res.send("First Request !!!");
});
app.get("/users", (req,res)=>{
    let users = ["Pawan", "Superguy", "Flutter Guy", "Max"];
    
    res.send({
        users: users,
    });
});

app.post("/create_user", async (req, res) => {
    try{
        const myuser = new User(req.body); 
        await myuser.save();
        res.send(myuser);
    }catch(err){
        res.send({ message: err })
    };
    
});

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
{ useUnifiedTopology: true, useNewUrlParser: true },
(req,res) => {
    console.log("Connected to the database");
    }
);

app.listen(3000, ()=>{
    console.log("listening to 3000");
});