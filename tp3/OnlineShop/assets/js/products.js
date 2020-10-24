const $ = window.$;
$(() =>{

    const productList = $("#products-list");

    $.getJSON("../../data/products.json", (json) => {


        json.forEach(element => {
            const product = `<div class="product" data-price="${element.price}" id="${element.id}" data-name="${element.name}" data-category="${element.category}">
            <a href="./product.html?id=${element.id}" title="En savoir plus...">
            <h2>${element.name}</h2>
        <img alt="${element.name}" src="./assets/img/${element.image}">
            <p class="price"><small>Prix</small> ${element.price}&thinsp;$</p>
        </a>
        </div>`;
            productList.append(product);
        });

        orderByPriceLowerToHighest();
        showCountProduct($("#products-list > .product"));

    });
});

function orderByPriceLowerToHighest() {
    $("#products-list").html($("#products-list > .product").toArray().sort((a, b) => {
        return +a.dataset.price - +b.dataset.price; }));
    $("#product-criteria > button").removeClass("selected");
    $("#product-criteria > button:contains('Prix (bas-haut)')").addClass("selected");

}

function orderByPriceHighestToLower() {
    $("#products-list").html($("#products-list > .product").toArray().sort((a, b) => {
        return +b.dataset.price - +a.dataset.price; }));
    $("#product-criteria > button").removeClass("selected");
    $("#product-criteria > button:contains('Prix (haut-bas)')").addClass("selected");
}
function orderByAlphabetically() {

    $("#products-list").html($("#products-list > .product").toArray().sort((a, b) => {
        if (b.dataset.name.toUpperCase() > a.dataset.name.toUpperCase()) { return 1; }
        else if (b.dataset.name.toUpperCase() < a.dataset.name.toUpperCase()) { return -1; }
        else { return 0; } }));

    $("#product-criteria > button").removeClass("selected");
    $("#product-criteria > button:contains('Nom (A-Z)')").addClass("selected");
}

function orderByAlphabeticallyInverse() {
    $("#products-list").html($("#products-list > .product").toArray().sort((a, b) => {
        if (b.dataset.name.toUpperCase() < a.dataset.name.toUpperCase()) { return 1; }
        else if (b.dataset.name.toUpperCase() > a.dataset.name.toUpperCase()) { return -1; }
        else { return 0; } }));

    $("#product-criteria > button").removeClass("selected");
    $("#product-criteria > button:contains('Nom (Z-A)')").addClass("selected");
}

function showByCategories(category) {

    $("#products-list > .product").css("display", "none");
    $(`#products-list > .product[data-category='${category}']`).css("display", "block");

    $("#product-categories > button").removeClass("selected");
    $(`#product-categories > button[data-category='${category}']`).addClass("selected");

    showCountProduct($(`#products-list > .product[data-category='${category}']`));
}

function showAll() {
    $("#products-list > .product").css("display", "block");
    $("#product-categories > button").removeClass("selected");
    $("#product-categories > button:contains('Tous les produits')").addClass("selected");
    showCountProduct($("#products-list > .product"));
}

function showCountProduct(produits) {
    $("#products-count").text(`${produits.length} products`);
}
