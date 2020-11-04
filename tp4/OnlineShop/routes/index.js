const express = require("express");
const router = express.Router();

router.get(["/", "/accueil"], (req, res) => {
    res.render("../views/pages/index", {title: "Accueil", shoppingCartCount: 0 });
});

router.get("/produits", (req, res) => {
    res.render("../views/pages/products", {title: "Produits", shoppingCartCount: 0 });
});

router.get("/produits/:id", (req, res) => {
    res.render("../views/pages/product", {title: "Produit", shoppingCartCount: 0 });
});

router.get("/contact", (req, res) => {
    res.render("../views/pages/contact", {title: "Contact", shoppingCartCount: 0 });
});

router.get("/panier", (req, res) => {
    res.render("../views/pages/shopping-cart", {title: "Panier", shoppingCartCount: 0 });
});

router.get("/commande", (req, res) => {
    res.render("../views/pages/order", {title: "Commande", shoppingCartCount: 0 });
});

router.get("/confirmation", (req, res) => {
    res.render("../views/pages/confirmation", {title: "Confirmation", shoppingCartCount: 0 });
});

module.exports = router;