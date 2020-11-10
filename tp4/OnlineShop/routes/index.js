const express = require("express");
const router = express.Router();

router.get(["/", "/accueil"], (req, res) => {
    res.render("../views/pages/index", {title: "Accueil"});
});

router.get("/produits", (req, res) => {
    res.render("../views/pages/products", {title: "Produits"});
});

router.get("/produits/:id", (req, res) => {
    res.render("../views/pages/product", {title: "Produit"});
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
