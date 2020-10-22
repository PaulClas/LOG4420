const $ = window.$;
$(() =>{

    let hasValidId = false;
    $.getJSON("../../data/products.json", (json) => {
        const id = getQueryVariable();
        json.forEach(element => {
            console.dir(id);
            console.dir(element.id);
            if(id.toString() === element.id.toString()) {
                hasValidId = true;
                console.dir("i got in");
                $("#product-name").text(element.name);
                $("#product-image").attr("src", `./assets/img/${element.image}`);
                $("#product-desc").html(element.description);
                console.dir(element.features);
                element.features.forEach(feature => {
                    $("#product-features").append(`<li>${feature}</li>`);
                });
                $("#product-price").text(`${element.price}&thinsp;$`);
            }

        });
        if(!hasValidId) {
            $("main").empty();
            $("main").append("<h1> Page non trouvée ! </h1>");

            console.dir($("main"));
        }

    });
});

function getQueryVariable()
{
    const results = new RegExp("[\?&]" + "id" + "=([^&#]*)").exec(window.location.href);
    if (results === null) {
        return null;
    }
    else{
        return results[1] || 0;
    }
}

