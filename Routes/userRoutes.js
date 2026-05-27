const express = require("express");

const router = express.Router();

router.post("/register", async(req,res)=>{

    res.json({
        message:"User Registered Successfully"
    });

});

router.post("/login", async(req,res)=>{

    res.json({
        token:"12345",
        message:"Login Successful"
    });

});

module.exports = router;