
const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const statut = require("http-status-codes");

/*Panier */
router.get("/", async (req,res)=>{
    try{
        console.dir(req.session);

    }
    catch(err){
        
    }
});

router.get("/:productId", async(req,res)=>{
    try{
        console.dir(req);
    }
    catch(err){
        
    }
});

router.post("/", async (req,res)=>{
    try{
        console.dir(req.body);
    }
    catch(err){
        
    }
});

router.put("/:productId", async(req,res)=>{
    try{

    }
    catch(err){
        
    }
});

router.delete("/:productId", async (req,res)=>{
    try{

    }
    catch(err){
        
    }
});

router.delete("/", async (req, res)=>{

});

module.exports = router;
