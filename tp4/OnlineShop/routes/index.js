const express = require("express");
const router = express.Router();
const db = require("./../lib/db")

router.get(["/", "/accueil"], (req, res) => {
    res.render("../views/pages/index", {title: "Accueil", num:req.session.cart.length});
});

router.get("/produits", (req, res) => {
    db.findProducts(undefined, undefined).then((p)=>{
        
    res.render("../views/pages/products", {title: "Produits", products: p, num:req.session.cart.length});
    });
});

router.get("/produits/:id", (req, res) => {
    const product = db.findProduct(req.params.id);
    res.render("../views/pages/product", {title: "Produit", product: product, num:req.session.cart.length});
});

router.get("/contact", (req, res) => {
    res.render("../views/pages/contact", {title: "Contact", num:req.session.cart.length});
});

router.get("/panier", (req, res) => {
    res.render("../views/pages/shopping-cart", {title: "Panier", num:req.session.cart.length});
});

router.get("/commande", (req, res) => {
    res.render("../views/pages/order", {title: "Commande", num:req.session.cart.length});
});

router.get("/confirmation", (req, res) => {
    res.render("../views/pages/confirmation", {title: "Confirmation", num:req.session.cart.length});
});


module.exports = router;
