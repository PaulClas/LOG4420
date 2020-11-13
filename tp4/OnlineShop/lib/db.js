"use strict";

const mongoose = require("mongoose");
const Products = require("../tests/e2e/1-products");
const Schema = mongoose.Schema;

const Order = new Schema({
  id: { type: Number, 
    unique: true, 
    min:0, 
    validate : {
    validator : Number.isInteger,
    message   : '{VALUE} is not an integer value'
  } },
  firstName: {type: String},
  lastName: String,
  email: String,
  phone: String,
  products: Array
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

}
function deleteProduct(id){
  produit.deleteOne({"id":id});
}
function deleteEverything(){
  produit.deleteMany({});
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
  const possibleCriterias = ['alpha-asc','alpha-dsc','price-asc','price-dsc',undefined,null];
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
          return "name";
      case "alpha-dsc":
          return "-name";
      case "price-dsc":
          return "-price";

      default: throw new Error("criteria is not valid");
  }
}
async function findProduct(id){
  return await produit.find({"id" : id});
}

function createProduct(body) 
{

  produit.create({
    "id": body.id,
  "name": body.name,
  "price": body.price,
  "image": body.image,
  "category": body.category,
  "description": body.description,
  "features": body.features
  });

}


module.exports = { findProducts, findProduct, createProduct, deleteProduct, deleteEverything };

