"use strict";

const mongoose = require("mongoose");
const Products = require("../tests/e2e/1-products");
const Schema = mongoose.Schema;

const Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false });


const Product = new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, { versionKey: false });

mongoose.model("Order", Order);
export var produit = mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

// TODO: Initialiser la connexion avec le "connect string" de votre base de données.
//mongoose.connect("mongodb://...", { useMongoClient: true });

const url = "mongodb+srv://log4420:tp4@cluster0.sxbbj.mongodb.net/TP4?retryWrites=true&w=majority";

mongoose.connect(url).then(() =>{
  console.log("Ca à marché Myriam !");
})
.catch(err =>{
  throw err;
});

async function findProducts(category, criteria){
  return await produit.find(category ? {name: category}: {}).sort(criteria);
}