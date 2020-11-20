const express = require("express");
const router = express.Router();
const db = require("./../lib/db")

router.get(["/", "/accueil"], (req, res) => {
    res.render("../views/pages/index", {title: "Accueil", cart: req.session.cart});
});

router.get("/produits", (req, res) => {
    db.findProducts(undefined, undefined).then((p)=>{
        
    res.render("../views/pages/products", {title: "Produits", products: p});
    });
});

router.get("/produits/:id", (req, res) => {
    const product = db.findProduct(req.params.id);
    res.render("../views/pages/product", {title: "Produit", product: product});
});

router.get("/contact", (req, res) => {
    res.render("../views/pages/contact", {title: "Contact"});
});

router.get("/panier", (req, res) => {
    res.render("../views/pages/shopping-cart", {title: "Panier"});
});

router.get("/commande", (req, res) => {
    res.render("../views/pages/order", {title: "Commande"});
});

router.get("/confirmation", (req, res) => {
    res.render("../views/pages/confirmation", {title: "Confirmation"});
});


module.exports = router;
