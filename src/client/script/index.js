import catalogue from "./modules/catalogue.js"
import * as product from "./modules/products.js";
import cart from "./modules/cart.js"

document.setModalContent = product.setModalContent;

function init() {
    catalogue.displayNav()
    cart.ajouterProduit(9)

    let commander = document.getElementById("commander")

    commander.addEventListener("click", cart.commander())
}

window.onload = init;