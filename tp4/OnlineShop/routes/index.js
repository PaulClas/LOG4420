const express = require("express");
const router = express.Router();
const db = require("./../lib/db")

router.get(["/", "/accueil"], (req, res) => {
    const num = req.session.cart?req.session.cart.length:0;
    res.render("../views/pages/index", {title: "Accueil", num:num});
});

router.get("/produits", (req, res) => {
    db.findProducts(undefined, undefined).then((p)=>{
        const num = req.session.cart?req.session.cart.length:0;
    res.render("../views/pages/products", {title: "Produits", products: p, num:num});
    });
});

router.get("/produits/:id", (req, res) => {
    db.findProduct(req.params.id).then((p) =>  {
        const num = req.session.cart?req.session.cart.length:0;
        res.render("../views/pages/product", {title: "Produit",product:p, num:num});

    });
});

router.get("/contact", (req, res) => {
    const num = req.session.cart?req.session.cart.length:0;
    res.render("../views/pages/contact", {title: "Contact", num:num});
});

router.get("/panier", (req, res) => {
    const num = req.session.cart?req.session.cart.length:0;
    // productId and qte
    // besoin Produit	Prix unitaire	Quantité	Prix TOTAL
    const cart = req.session.cart;
    console.dir(cart);
    const products = [];
    let total = 0;
    if(cart){
        for(let i=0; i<cart.length; i++){
            db.findProduct(cart.productId).then((err, cartElement) =>  {
                if(err) throw new Error(err);
                if(cartElement){
                     const totalPrice = Number(cartElement)*Number(cartElement.quantity);
                products.push({id: cartElement.productId, quantity: cartElement.quantity, price: cartElement.price, totalPrice: totalPrice });
                total+= totalPrice;
                }else{
                    console.dir(req.params.id);
                }
               
            });
        }
    }
    res.render("../views/pages/shopping-cart", {title: "Panier", num:num, products: products, total: total });
});

router.get("/commande", (req, res) => {
    const num = req.session.cart?req.session.cart.length:0;

    res.render("../views/pages/order", {title: "Commande", num:num});
});

router.get("/confirmation", (req, res) => {
    
    const num = req.session.cart?req.session.cart.length:0;
    res.render("../views/pages/confirmation", {title: "Confirmation", num:num, id: req.session.orderId, name:req.session.name});
});


module.exports = router;
