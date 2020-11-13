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
        
       const prod =  await db.findProducts(category, criteria);
       res.json(prod).status(statut.StatusCodes.OK);
        
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
        
        res.status(statut.StatusCodes.NOT_FOUND).send(err.what);
    }
});

router.post("/", async(req, res)=>{
    
    try{
        await db.createProduct(req.body);
        res.json().status(statut.StatusCodes.CREATED);
    }
    catch(err){
        
        res.status(statut.StatusCodes.BAD_REQUEST).send(err.what);
    }
});

router.delete("/:id", async (req, res)=>{
    try
    {
        await db.deleteProduct(req.params.id);
        res.json().status(statut.StatusCodes.NO_CONTENT);
    }
    catch(err)
    {
        res.status(statut.StatusCodes.BAD_REQUEST).send(err.what);
    }

});

router.delete("/", async (req, res)=>{
    await db.deleteEverything();
    res.json().status(statut.StatusCodes.NO_CONTENT);
});


module.exports = router;



