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
var produit = mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

// TODO: Initialiser la connexion avec le "connect string" de votre base de données.
//mongoose.connect("mongodb://...", { useMongoClient: true });

const url = "mongodb+srv://log4420:tp4@cluster0.sxbbj.mongodb.net/TP4?retryWrites=true&w=majority";

mongoose.connect(url).then(() =>{
  console.log("Ca à marché Myriam, la db est connecté!");
})
.catch(err =>{
  throw err;
});

async function findProducts(category, criteria){
  validateCategory(category);
  validateCriteria(criteria);

  console.dir(produit);

  if(category !== undefined && category !== null){
    return await produit.find({"category": category}).sort(criteria);
  } else {
    return await produit.find({}).sort(criteria);
  }
  
}

function validateCategory(category) {
  var possibleCategories = ["cameras", "computers", "consoles", "screens", undefined, null];
  if (!possibleCategories.includes(category)) {
    throw new Error("category is not valid");
  }
}

function validateCriteria(criteria) {
  var possibleCriterias = ["alpha-asc", "alpha-dsc", "prix-asc", "prix-dsc", undefined, null];
  if (!possibleCriterias.includes(criteria)) {
    throw new Error("criteria is not valid");
  }
}

async function findProduct(id){
  return await produit.find({"id" : id});
}

module.exports = {findProducts, findProduct};

