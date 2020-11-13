const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const statut = require("http-status-codes");


/*Commande*/

router.get("/", async(req,res)=>
{
    db.getOrder().then((order)=>{
        res.json(order).status(statut.StatusCodes.OK);
    });
});

router.get("/:id", async (req,res) =>{
    try{
        db.getOrderById(req.params.id).then((order) =>{
            if(order !== null){
                res.json(order).status(statut.StatusCodes.OK);
            }else {
                res.status(statut.StatusCodes.NOT_FOUND).send("order is null");
            }
        });
    }
    catch(err){
        res.status(statut.StatusCodes.NOT_FOUND).send(err.what);
    }
});

router.post("/", async(req,res)=>{
        try{
        
            const order = await db.getOrderById(req.body.id);
            if(order){
                throw new Error("svp marche 3");
            }
            req.body.products.forEach(element => {
                if(!(db.findProduct(element.id)))
                {
                    throw new Error("svp marche 2");
                }
            });
            await db.createOrder(req.body);
            console.dir("haha");
            
            res.json().status(statut.StatusCodes.CREATED);
            
        }
        catch(err){
            console.dir("coucou");
            console.dir(err);
            res.status(statut.StatusCodes.BAD_REQUEST).send(err.what);
        }
    
});


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
