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
    catch(error){
        res.status(error.statut).send(error.what);
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
        case "alpha-asc":
            return {}
        case "alpha-dsc":
            return {}
        case "prix-asc":
            return {}
        case "prix-dsc":
            return;

        default: console.log("Erreur dans la catégorie");
    }
}

router.get("/api/products:id", async(req,res)=>{});

router.post("/api/products", async(req, res)=>{});

router.delete("/api/products/:id", async (req, res)=>{});

router.delete("/api/products/", async (req, res)=>{});

/*Panier */
router.get("/api/shopping-cart", async (req,res)=>{});

router.get("/api/shopping-cart/:productId", async(req,res)=>{});

router.post("/api/shopping-cart", async (req,res)=>{});

router.put("/api/shopping-cart:productId", async(req,res)=>{});

router.delete("/api/shopping-cart/:productId", async (req,res)=>{});

router.delete("/api/shopping-cart", async (req, res)=>{});

/*Commande*/

router.get("/api/orders", async(req,res)=>{});

router.get("/api/orders/:id", async (req,res) =>{});

router.post("/api/orders"), async(req,res)=>{};

router.delete("/api/orders/;id", async (req,res) =>{});

router.delete("/api/orders/", async(req,res)=>{});


