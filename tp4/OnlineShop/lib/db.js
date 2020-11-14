"use strict";

const mongoose = require("mongoose");
const Products = require("../tests/e2e/1-products");
const Schema = mongoose.Schema;

const statut = require("http-status-codes");

const Order = new Schema({
  id: { type: Number, 
    unique: true, 
    min:0, 
    validate : {
    validator : Number.isInteger,
    message   : '{VALUE} is not an integer value'
  } },
  firstName: {type: String, minlength: 1},
  lastName: {type: String, minlength: 1},
  email: {type: String, validate: {
    validator: function (email) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(email);},
      message:'The e-mail field cannot be empty.'
   }},
  phone: {type:String, validate:{validator: function(v) {
    return /\d{3}-\d{3}-\d{4}/.test(v);
  },
  message: props => `this is not a valid phone number!`
}},
  products: {type: Array, validate: {
    validator: function (v) { 
      v.forEach(element => {
        if(!Number.isInteger(element.id) || !Number.isInteger(element.quantity) || element.quantity > 0) {
          return false;
        }
      });
      return v && v.length > 0; 
    },
    message: 'The products isnt okay'
}}, 
}, { versionKey: false });


const Product = new Schema({
  id: { type: Number, unique: true, min:0, 
    validate : {
    validator : Number.isInteger,
    message   : '{VALUE} is not an integer value'
  }  },
  name: {type: String, minlength: 1},
  price: {type: Number, min: 0},
  image: {type:String,minlength:1},
  category: {type:String, enum:['cameras', 'computers', 'consoles', 'screens']},
  description: {type: String, minlength:1},
  features: {type:Array, validate: {
    validator: function (v) { 
      v.forEach(element => {
        if(element.length === 0) {
          return false;
        }
      });
      return v && v.length > 0; 
    },
    message: 'The features isnt okay'
}}
}, { versionKey: false });

const commande = mongoose.model("Order", Order);
const produit = mongoose.model("Product", Product);

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

async function getOrder() {
  return await commande.find({});

}

async function getOrderById(id){
  return await commande.findOne({"id":id});
}


async function deleteProduct(id){
  return await produit.findOneAndRemove({"id":id});
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

    return produit.find({"category": category}).sort(findCriteria(criteria)).exec();
  } else {
    return produit.find({}).sort(findCriteria(criteria)).exec();
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
function findCriteria(criteria){
  switch(criteria)
  {
      case null:
      case undefined:
      case "price-asc":
          return "price";
      case "alpha-asc":
          return { name: 'asc' };
      case "alpha-dsc":
          return { name: 'dsc' };
      case "price-dsc":
          return "-price";
      default: 
        throw new Error("criteria is not valid");
  }
}
async function findProduct(id){
  return await produit.find({"id" : id}).exec();
}

function createProduct(body) 
{

  return produit.create({
    "id": body.id,
  "name": body.name,
  "price": body.price,
  "image": body.image,
  "category": body.category,
  "description": body.description,
  "features": body.features
  }, (err)=>{
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
      console.dir("yoyo");
      console.dir(err);
      throw new Error(err);
    }
  });

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

