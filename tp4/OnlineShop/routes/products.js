const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const statut = require("http-status-codes");

//const { router } = require("../app");

/*Produits */
router.get("/", async(req,res)=>{
    try{ 
        const category= req.query.category;
        const criteria= req.query.criteria;

        console.dir(category);
        console.dir(criteria);
        const functionCriteria = findCriteria(criteria);

        const query = db.findProducts(category, functionCriteria);

        res.json(query).status(statut.OK);
        console.dir(query);

    }
    catch(err){
        console.dir(err);
        res.status(statut.StatusCodes.BAD_REQUEST).send(err.what);
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


router.get("/:id", async(req,res)=>{
    try{

    }
    catch(err){

    }
});

router.post("/", async(req, res)=>{
    try{

    }
    catch(err){
        
    }
});

router.delete("/:id", async (req, res)=>{

});

router.delete("/", async (req, res)=>{});


module.exports = router;



