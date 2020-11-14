
const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const statut = require("http-status-codes");

/*Panier */
router.get("/", async (req,res)=>{
        if(req.session.cart){
            
        res.json(req.session.cart).status(statut.StatusCodes.OK);
        } else{
            
        res.json([]).status(statut.StatusCodes.OK);
        }

});

router.get("/:productId", async(req,res)=>{
    try{
        

        let hasFound = false;
        for(let i = 0; i < req.session.cart.length; i++)
        {
            if(String(req.session.cart[i].productId) === String(req.params.productId)){
                hasFound = true;
                res.json(req.session.cart[i]).status(statut.StatusCodes.OK);
            }
        }
        if(!hasFound){
        res.json().status(statut.StatusCodes.NOT_FOUND);
        }
    }
    catch(err){
        res.json().status(statut.StatusCodes.NOT_FOUND);   
    }
});

router.post("/", async (req,res)=>{
    try{
        if(isNaN(req.body.quantity) || req.body.quantity < 1){
            
            res.status(statut.StatusCodes.BAD_REQUEST).json("quantity not ok");
        }
        let p = await db.findProduct(req.body.productId);
        if(p === null){
            
            res.status(statut.StatusCodes.BAD_REQUEST).json("identifiant dans liste produit nexiste pas");
        }

        if(!req.session.cart){
            req.session.cart = new Array();
        }
        req.session.cart.push({productId: req.body.productId, quantity: req.body.quantity});
        res.json().status(statut.StatusCodes.CREATED);
        
    }
    catch(err){
        
        res.status(statut.StatusCodes.BAD_REQUEST).json("erreur");
    }
});

router.put("/:productId", async(req,res)=>{
    try{
        if(isNaN(req.body.quantity) || req.body.quantity < 1){
            
            res.status(statut.StatusCodes.BAD_REQUEST).json("quantity not ok");
        }
        let hasFound = false;

        if(req.session.cart){
            for(let i = 0; i < req.session.cart.length; i++){
                if(String(req.session.cart[i].productId) === String(req.params.productId)){
                    req.session.cart[i].quantity = req.body.quantity;
                    hasFound = true;
                    res.json().status(statut.StatusCodes.NO_CONTENT);
                }
            }


        }
        if(!hasFound){
            res.json().status(statut.StatusCodes.NOT_FOUND);
        }
    }
    catch(err){
        res.status(statut.StatusCodes.BAD_REQUEST).json("quantity not ok");
    }
});

router.delete("/:productId", async (req,res)=>{
    try{
        let hasFound = false;
        if(req.session.cart){
            for(let i = 0; i < req.session.cart.length; i++){

                if(String(req.session.cart[i].productId) === String(req.params.productId)){
                    req.session.cart.splice(i, 1);
                    hasFound = true;
                    res.json().status(statut.StatusCodes.NO_CONTENT);
                }
            }
            if(!hasFound){
                res.json().status(statut.StatusCodes.NOT_FOUND);
            }
        }
    }
    catch(err){
        
        res.status(statut.StatusCodes.BAD_REQUEST).json("quantity not ok");
    }
});

router.delete("/", async (req, res)=>{
    req.session.cart = new Array();
    res.json().status(statut.StatusCodes.NO_CONTENT);
});

module.exports = router;
