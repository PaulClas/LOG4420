
const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const statut = require("http-status-codes");

/*Panier */
router.get("/api/shopping-cart", async (req,res)=>{
    try{

    }
    catch(err){
        
    }
});

router.get("/api/shopping-cart/:productId", async(req,res)=>{
    try{

    }
    catch(err){
        
    }
});

router.post("/api/shopping-cart", async (req,res)=>{
    try{

    }
    catch(err){
        
    }
});

router.put("/api/shopping-cart:productId", async(req,res)=>{
    try{

    }
    catch(err){
        
    }
});

router.delete("/api/shopping-cart/:productId", async (req,res)=>{});

router.delete("/api/shopping-cart", async (req, res)=>{});

module.exports = router;
