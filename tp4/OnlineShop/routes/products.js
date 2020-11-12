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
        console.dir(criteria);

        const query = db.findProducts(category, criteria);
        query.then((products)=>{
            res.json(products).status(statut.StatusCodes.OK);
        }
        
    );

    }
    catch(err){
        res.status(statut.StatusCodes.BAD_REQUEST).send(err.what);
    }
});


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



