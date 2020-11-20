const express = require("express");
const router = express.Router();
const db = require("./../lib/db")

router.get(["/", "/accueil"], (req, res) => {
 
    res.render("../views/pages/index", {title: "Accueil", cart:req.session.cart});
});

router.get("/produits", (req, res) => {
    
    db.findProducts(undefined, undefined).then((p)=>{
    res.render("../views/pages/products", {title: "Produits", products: p, cart: req.session.cart});
    });
});

router.get("/produits/:id", (req, res) => {
    
    db.findProduct(req.params.id).then((p) =>  {
        res.render("../views/pages/product", {title: "Produit",product:p, cart: req.session.cart});

    });
});

router.get("/contact", (req, res) => {
    
    res.render("../views/pages/contact", {title: "Contact", cart: req.session.cart});
});

router.get("/panier", async (req, res) => {
    const cart = req.session.cart;
    const products = [];
    let total = 0;
    if(req.session.cart){
        for(let i=0; i<cart.length; i++){
            let prod = await db.findProduct(cart[i].productId);
            if(prod)
            {
                const totalPrice = Number(prod.price)*Number(cart[i].quantity);
                console.dir(totalPrice);
                products.push({name: prod.name, quantity: cart[i].quantity, price: prod.price, totalPrice: (totalPrice) });
                total+= Number(totalPrice);
            }
        }
    }
    res.render("../views/pages/shopping-cart", {title: "Panier",  products: products, total: total, cart: req.session.cart });
});

router.get("/commande", (req, res) => {

    res.render("../views/pages/order", {title: "Commande",  cart: req.session.cart});
});

router.get("/confirmation", (req, res) => {
    res.render("../views/pages/confirmation", {title: "Confirmation", id: req.session.orderId, name:req.session.name, cart: req.session.cart});
});


module.exports = router;
