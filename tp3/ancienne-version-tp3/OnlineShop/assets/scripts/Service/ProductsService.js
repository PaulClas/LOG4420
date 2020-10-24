
/* global $ */

export default function getProducts() {
    return $.get("http://localhost:8000/data/products.json", "json");
}
