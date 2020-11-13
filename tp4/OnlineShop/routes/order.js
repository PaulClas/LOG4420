const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const statut = require("http-status-codes");

// const statut = require("http-status-codes");

/*Commande*/

router.get("/", async(req,res)=>
{
    db.getOrder().then((order)=>{
        res.json(order).status(statut.StatusCodes.OK);
    });
});

router.get("/:id", async (req,res) =>{
    try{

    }
    catch(err){
        
        res.status(statut.StatusCodes.NOT_FOUND).send(err.what);
    }
});

router.post("/"), async(req,res)=>{
    try{

    }
    catch(err){
        
        res.status(statut.StatusCodes.BAD_REQUEST).send(err.what);
    }
};

router.delete("/:id", async (req,res) =>{
    try{

    }
    catch(err){
        
        // res.status(statut.StatusCodes.NOT_FOUND).send(err.what);
    }
});

router.delete("/", async(req,res)=>{

});

module.exports = router;
