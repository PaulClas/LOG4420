/* global sessionStorage, $ */

shoppingCartCount();

export default function shoppingCartCount() {
    if (sessionStorage.getItem("shoppingCartItems") === null) {
        sessionStorage.setItem("shoppingCartItems", JSON.stringify([]));
    }
    const shopList = JSON.parse(sessionStorage.getItem("shoppingCartItems"));
    if (shopList.length === 0) {
        $(".count").attr("style", "visibility: hidden;");
    } else {
        $(".count").attr("style", "visibility: visible;");
        $(".count").html(shopList.length);
    }
}

