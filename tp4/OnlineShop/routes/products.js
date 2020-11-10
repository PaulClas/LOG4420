const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const statut = require("http-status-codes");

//const { router } = require("../app");

/*Produits */
router.get("/api/products", async(req,res)=>{
    try{ 
        const category= req.body.category;
        const criteria= req.body.criteria;

        findCategory(category);
        findCriteria(criteria);

        const query= await db.produit.find(category,criteria);

        res.json(query).status(statut.OK);
    }
    catch(err){
        res.status(err.statut).send(err.what);
    }
});

function findCategory(category){
    switch(category)
    {
        case null:
        case undefined:
        case "cameras":
        case "computers":
        case "consoles":
        case "screens":
            return;

        default: console.log("Erreur dans la catégorie");
    }
}

function findCriteria(criteria,res){
    switch(criteria)
    {
        case null:
        case undefined:
        case "alpha-asc":
            return {}
        case "alpha-dsc":
            return {}
        case "prix-asc":
            return {}
        case "prix-dsc":
            return;

        default: console.log("Bad request");
    }
}


router.get("/api/products:id", async(req,res)=>{
    try{

    }
    catch(err){

    }
});

router.post("/api/products", async(req, res)=>{
    try{

    }
    catch(err){
        
    }
});

router.delete("/api/products/:id", async (req, res)=>{});

router.delete("/api/products/", async (req, res)=>{});





