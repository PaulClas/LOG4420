"use strict";

const mongoose = require("mongoose");
const Products = require("../tests/e2e/1-products");
const Schema = mongoose.Schema;

const statut = require("http-status-codes");

const Order = new Schema({
  id: { type: Number, 
    unique: true, 
    min:0, 
    },
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  phone: {type:String },
  products: {type: Array}, 
}, { versionKey: false });


const Product = new Schema({
  id: { type: Number, unique: true },
  name: {type: String},
  price: {type: Number},
  image: {type:String},
  category: {type:String},
  description: {type: String},
  features: {type:Array},
    }, { versionKey: false });

const commande = mongoose.model("Order", Order);
const produit = mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

// TODO: Initialiser la connexion avec le "connect string" de votre base de données.
//mongoose.connect("mongodb://...", { useMongoClient: true });

const url = "mongodb+srv://log4420:tp4@cluster0.sxbbj.mongodb.net/TP4?retryWrites=true&w=majority";

mongoose.connect(url).then(() =>{
})
.catch(err =>{
  throw err;
});

async function getOrder() {
  return await commande.find({});

}

async function getOrderById(id){
  return await commande.findOne({"id":id});
}


async function deleteProduct(id){
  return await produit.deleteOne({"id":id});
}

async function deleteOrder(id){
  return await commande.deleteOne({"id": id});
 
}

async function deleteEverythingOrder(){
  await commande.deleteMany({});
}
async function deleteEverythingProduct(){
  await produit.deleteMany({});
}

async function findProducts(category, criteria){
  validateCategory(category);
  validateCriteria(criteria);

  if(category !== undefined && category !== null){

    return await produit.find({"category": category}).collation({locale: "en" }).sort(findCriteria(criteria));
  } else {
    return await produit.find({}).collation({locale: "en" }).sort(findCriteria(criteria));
  }
  
}

function validateCategory(category) {
  const possibleCategories = ["cameras", "computers", "consoles", "screens", undefined, null];
  if (!possibleCategories.includes(category)) {
    throw new Error("category is not valid");
  }
}

function validateCriteria(criteria) {
  const possibleCriterias = ['alpha-asc','alpha-dsc','price-asc', 'price-dsc', undefined, null];
  if (!possibleCriterias.includes(criteria)) {
    throw new Error("criteria is not valid");
  }
}
function validateFeatures(v) { 
  v.forEach(element => {
    if(element.length === 0) {
      throw new Error("feature error");
    }
  });
  if (!(v && v.length > 0)){
    
    throw new Error("feature error");
  } 
}
function findCriteria(criteria){
  switch(criteria)
  {
      case null:
      case undefined:
      case "price-asc":
          return "price";
      case "alpha-asc":
          return { name : 1};
      case "alpha-dsc":
          return { name : -1};
      case "price-dsc":
          return "-price";
      default: 
        throw new Error("criteria is not valid");
  }
}
async function findProduct(id){
  return await produit.findOne({"id" : id});
}

function createProduct(body) 
{
  validateString(body.name, "name");
  validateString(body.image, "image");
  validateString(body.description, "description");
  validateCategory(body.category);
  validateCriteria(body.criteria);
  validateFeatures(body.features);

  validatePrice(body.price);
  return produit.create(body, (err)=>{
    if(err){
      
      throw new Error("validator merdique");

    }
  });

}
/**
 * @param {{ id: any; firstName: any; lastName: any; email: any; phone: any; products: any; }} body
 */
async function createOrder(body) 
{

  validateString(body.firstName, "firstname");
  validateString(body.lastName, "lastname");
  
  validatePhone(body.phone);
  validateEmail(body.email);
  await commande.create(body, function(err, qqch) {
    if(err)
    {
      throw new Error(err);
    }
  });

}
function validatePrice(price){
  if(isNaN(price) || price < 0){
  throw new Error("price not ok");
  }
}


function validatePhone(phone){
  if(! /\d{3}-\d{3}-\d{4}/.test(phone)){
    throw new Error(phone +" doesnt respect reg ex for phone");
  }
}

function validateEmail(email){
  if(!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)){
    throw new Error(email +" doesnt respect reg ex for phone");
  }

}
function validateString(str, name){
  
  if(str.length === 0) throw new Error(str + "must have at least a char for "+ name);
}

module.exports = { findProducts, findProduct, createProduct, deleteProduct,deleteEverythingProduct, deleteEverythingOrder, getOrder, getOrderById, createOrder, deleteOrder };

