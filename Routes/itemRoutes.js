const express = require("express");

const router = express.Router();

router.post("/report", async(req,res)=>{

    res.json({

        message:"Item Reported Successfully"

    });

});

router.get("/all", async(req,res)=>{

    res.json([

        {
            itemName:"Wallet",
            location:"Library",
            description:"Black wallet found"
        }

    ]);

});

module.exports = router;