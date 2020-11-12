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

        const functionCriteria = findCriteria(criteria);
        const query = db.findProducts(category, functionCriteria);
        query.then((products)=>{
            res.json(products).status(statut.StatusCodes.OK);
        }
        
    );
        
        console.dir(query);

    }
    catch(err){
        console.dir(err);
        res.status(statut.StatusCodes.BAD_REQUEST).send(err.what);
    }
});

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


router.get("/:id", async(req,res)=>
{
    try{
        res.json(db.findProduct(req.params.id)).status(statut.StatusCodes.OK)
    }
    catch(err){
        console.dir(err);
        res.status(statut.StatusCodes.NOT_FOUND).send(err.what);
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



