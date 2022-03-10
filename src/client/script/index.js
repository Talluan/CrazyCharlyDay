import catalogue from "./modules/catalogue.js"
import * as product from "./modules/products.js";
import cart from "./modules/cart.js"

document.setModalContent = product.setModalContent;

function init() {
    catalogue.displayNav()
    cart.ajouterProduit(9)
}

window.onload = init;