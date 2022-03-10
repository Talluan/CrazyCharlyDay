import catalogue from "./modules/catalogue.js"
import * as product from "./modules/products.js";

document.setModalContent = product.setModalContent;

function init() {
    catalogue.displayNav()
}

window.onload = init;