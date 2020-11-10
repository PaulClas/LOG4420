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
        const functionCriteria = findCriteria(criteria);

        db.findProducts(category, functionCriteria);

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

function findCriteria(criteria){
    switch(criteria)
    {
        case null:
        case undefined:
        case "prix-asc":
            return (a, b) => {a.price - b.price };
        case "alpha-asc":
            return (a, b) => {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                  return -1;
                }
                if (a.name.toUpperCase() >  b.name.toUpperCase()) {
                  return 1;
                }
                return 0;
            }
        case "alpha-dsc":
            return (a, b) => {
            if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return -1;
              }
              if (a.name.toUpperCase() <  b.name.toUpperCase()) {
                return 1;
              }
              return 0;
            }
        case "prix-dsc":
            return (a, b) => {b.price - a.price };

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


module.exports = router;



