const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const statut = require("http-status-codes");
const { query } = require("express");


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
                throw new Error("order existe deja");
            }
            for(let i = 0; i< req.body.products.length; i++){
                
                let toto = (db.findProduct(req.body.products[i].id));
                if( ( (await toto).length === 0))
                {
                    throw new Error("produit nexiste pas");
                }
            }

            await db.createOrder(req.body);
            
            res.json().status(statut.StatusCodes.CREATED);
            
        }
        catch(err){
            res.status(statut.StatusCodes.BAD_REQUEST).send(err.what);
        }
    
});


router.delete("/:id", async (req,res) =>{
    try{
        const allo = await db.deleteOrder(req.params.id);
            if(allo.deletedCount>0){
                res.json().status(statut.StatusCodes.NO_CONTENT);
            } else{
                
            res.json().status(statut.StatusCodes.NOT_FOUND);
            }
    } catch(err){
        res.status(statut.StatusCodes.NOT_FOUND);
    }
            


});

router.delete("/", async(req,res)=>{

    await db.deleteEverythingOrder().then((err, result) => {
        if (err) {
          console.dir(err);
        } else {
          res.send(result).status(statut.StatusCodes.NO_CONTENT);
        }
      
    });
});

module.exports = router;
