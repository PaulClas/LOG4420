import getProducts from "../Service/ProductsService.js";
window.onload = function (){/* global $, document */

let products = {category: "all", sort: "lowestHighest", productList: []};
let fullProductList = [];

getProducts().then((data) => {
    fullProductList = data;
    products = {category: "all", sort: "lowestHighest", productList: fullProductList.sort((a, b) => { return a.price - b.price; })};
    recreateProductList();
});


function addOnClicEvent() {
    Array.from(document.getElementById("product-categories").children).forEach(element => {
        element.addEventListener("click", filter);
    });
    Array.from(document.getElementById("product-criteria").children).forEach(element => {
        element.addEventListener("click", sort);
    });
}

addOnClicEvent();

function filter() {
    products.category = this.id;
    sortAndFilterProducts();
    Array.from($("#product-categories").children()).forEach((child) => {
        child.removeAttribute("class");
    });
    this.classList.add("selected");
}


function sortAndFilterProducts() {
    if (products.category != "all") {
        products.productList = fullProductList.filter((product) => product.category == products.category);
    } else {
        products.productList = fullProductList;
    }

    if (products.sort == "lowestHighest") {
        products.productList = products.productList.sort((a, b) => { return a.price - b.price; });
    } else if (products.sort == "highestLowest") {
        products.productList = products.productList.sort((a, b) => { return b.price - a.price; });
    } else if (products.sort == "aToZ") {
        products.productList = products.productList.sort(function(a, b) {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) { return -1; }
            else if (nameA > nameB) { return 1; }
            else return 0;
        });
    } else {
        products.productList = products.productList.sort(function(a, b) {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA > nameB) { return -1; }
            else if (nameA < nameB) { return 1; }
            else return 0;
        });
    }
    $("#products-count").html(products.productList.length.toString().concat(" produits"));
    recreateProductList();
}
function sort() {
    products.sort = this.id;
    sortAndFilterProducts();
    Array.from($("#product-criteria").children()).forEach((child) => {
        child.removeAttribute("class");
    });
    this.classList.add("selected");
}

function recreateProductList() {
    const productListDiv = $("#products-list");
    if (productListDiv != undefined) {
        productListDiv.html("");
        products.productList.forEach(product => {
            const newProduct = document.createElement("div");
            newProduct.setAttribute("class", "product");
            const productLink = document.createElement("a");
            productLink.setAttribute("href", "./product.html?id=".concat(product.id));
            productLink.setAttribute("title", "En savoir plus...");
            const productHeader = document.createElement("h2");
            productHeader.innerHTML = product.name;
            const productImg = document.createElement("img");
            productImg.setAttribute("alt", product.name);
            productImg.setAttribute("src", "./assets/img/".concat(product.image));
            const productPrice = document.createElement("p");
            productPrice.setAttribute("class", "price");
            productPrice.innerHTML = "<small>Prix</small> ".concat(product.price).concat("&thinsp;$").replace(/\./, ",");

            productLink.appendChild(productHeader);
            productLink.appendChild(productImg);
            productLink.appendChild(productPrice);
            newProduct.appendChild(productLink);
            productListDiv.append(newProduct);
        });
    }
}
}