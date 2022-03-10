import config from "./config.js"

function getCategories() {
    let pr = fetch(config.host + config.categories)
    pr.then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                console.log('response error : ' + response.status)
                return Promise.reject(new Error(response.statusText))
            }
        })
        .catch(error => {
            console.log("erreur: " + error)
        })
}

function getProducts(id) {
    let pr = fetch(config.host + config.categorie + id + "/produits")
    pr.then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                console.log('response error : ' + response.status)
                return Promise.reject(new Error(response.statusText))
            }
        })
        .catch(error => {
            console.log("erreur: " + error)
        })
}


function createCategory(nom) {
    let html = `
        <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#beaute-collapse" aria-expanded="true">
                ${nom}
            </button>
        </li>
        `
    return html
}

/**
 * retourne un élément li concernant l'element
 * @param {string} nom 
 * @param {int} id 
 */
function createProduct(nom, id) {
    let prod = document.createElement(li)
    prod.id = id
    prod.innerHTML = nom + `<a type="button" data-bs-toggle="modal" data-bs-target="${id}"><span class="badge bg-info">i</span></a>`
    return prod
}


/**
 * méthode qui met à jour le nav de l'index
 */
function displayNav() {
    let categories = getCategories()
    console.log(categories)
    let cat = document.getElementById("categories")
    cat.innerHTML = ""
    let html = "";


    categories.forEach(element => {
        html += createCategory(element.nom)
        let ul = document.createElement("ul")
        ul.classList.add("btn-toggle-nav", "list-unstyled", "fw-normal", "pb-1", "small")
        let products = getProducts(element.id)

        // Liste des produits de la catégorie
        let productsHTML = "";
        products.forEach(element => {
            productsHTML += createProduct(element.titre, element.id)
        });
    });

    cat.innerHTML = html

}


export default {
    displayNav
}