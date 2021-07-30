function template(json) {
  var containerResults = document.querySelector(".container-results");
  containerResults.innerHTML = "";

  var template = document.querySelector("#products-searched");

  for (let index = 0; json.length; index++) {
    var clone = template.content.cloneNode(true);

    var link = clone.querySelector(".link-prod");

    var imgProd = clone.querySelector(".img-prod");

    var nameProd = clone.querySelector(".name-prod");

    var condition = clone.querySelector(".condition");

    var priceProd = clone.querySelector(".price");

    var sold = clone.querySelector(".sells");

    link.href = json[index].permalink;
    nameProd.textContent = json[index].title;
    imgProd.src = json[index].thumbnail;
    if (json[index].condition == "new") {
      condition.textContent = "Nuevo";
    }
    priceProd.textContent = "$" + json[index].price;
    sold.textContent = "Vendidos: " + json[index]["sold_quantity"];

    containerResults.appendChild(clone);
  }
}

function main() {
  const buttonEl = document.querySelector(".button-search");

  buttonEl.addEventListener("click", function () {
    const search = document.querySelector(".search-bar");
    var question =
      "https://api.mercadolibre.com/sites/MLA/search?q=" + search.value;
    fetch(question)
      .then((r) => {
        return r.json();
      })
      .then((json) => {
        template(json.results);
      });
  });
}
main();
