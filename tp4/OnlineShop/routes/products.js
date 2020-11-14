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
        await db.findProduct(req.params.id).then((order) =>{
            
            if(order !== null){
                res.json(order).status(statut.StatusCodes.OK);
            }else {
                res.status(statut.StatusCodes.NOT_FOUND).send("product is null");
            }
        });
        res.json().status(statut.StatusCodes.OK)
    }
    catch(err){
        
        res.status(statut.StatusCodes.NOT_FOUND).send(err.what);
    }
});

router.post("/", async(req, res)=>{
    
    try{
        const product = await db.findProduct(req.body.id);
        if(product){
            throw new Error("order existe deja");
        }
        

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
        const deletedAns = await db.deleteProduct(req.params.id);
        if(deletedAns.deletedCount>0){
            res.json().status(statut.StatusCodes.NO_CONTENT);
        } else{
            
        res.json().status(statut.StatusCodes.NOT_FOUND);
        }
} catch(err){
    res.status(statut.StatusCodes.NOT_FOUND);
}

});

router.delete("/", async (req, res)=>{
    await db.deleteEverythingProduct();
    res.json().status(statut.StatusCodes.NO_CONTENT);
});


module.exports = router;



