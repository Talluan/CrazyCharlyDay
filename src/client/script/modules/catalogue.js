import config from "./config.js"

function getCategories() {
    console.log(config.config.host + "/api/categories")
    let pr = fetch(config.host + "/api/categories")
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

function loadResource(uri) {
    return new Promise((resolve, reject) => {
        fetch(config.config.host + uri).then(response => response.json()).then(data => {
            resolve(data);
        }).catch(error => {
            reject(error);
        });
    });
}

function getProducts(id) {
    let pr = fetch(config.host + config.categorie + id + "/produits")
    pr.then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                console.log('response error : ' + resp.status)
                return Promise.reject(new Error(resp.statusText))
            }
        })
        .catch(error => {
            console.log("erreur: " + error)
        })
}


function createCategory(nom) {
    let cat = document.createElement("li")
    cat.innerHTML = `
    <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#beaute-collapse" aria-expanded="true">
            ${nom}
        </button>
    </li>
    `
    return cat
}

/**
 * retourne un élément li concernant l'element
 * @param {string} nom 
 * @param {int} id 
 */
function createProduct(nom, id) {
    let prod = document.createElement("li")
    prod.id = id
    prod.innerHTML = nom + `<a type="button" data-bs-toggle="modal" data-bs-target="${id}"><span class="badge bg-info">i</span></a>`
        // console.log(prod)
    return prod
}


/**
 * méthode qui met à jour le nav de l'index
 */
function displayNav() {
    // fetch('https://localhost/api/categories').then(e => e.json()).then(e => console.log(e));
    let categories = loadResource("/api/categories").then(categories => {
        let cat = document.getElementById("categories")
        cat.innerHTML = ""
        let html = document.createElement("div");
        categories.forEach(element => {
            // console.log(element)
            html.appendChild(createCategory(element.nom))
            let div = document.createElement("div")
            div.classList.add("collapse", "show")
            div.id = element.nom + "-collapse"


            let ul = document.createElement("ul")
            ul.classList.add("btn-toggle-nav", "list-unstyled", "fw-normal", "pb-1", "small")
                // let productsHTML = "";
                // productsHTML += `
                // <li><div draggable="true">Item</div><a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><span class="badge bg-info">i</span></a></li>`
                // html += productsHTML
                // console.log("/api/categorie/" + element.id + "/produits")
            loadResource("/api/categorie/" + element.id + "/produits").then(produits => {
                // Liste des produits de la catégorie
                // productsHTML += `
                //     <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                //         <li draggable="true">
                //             Item<a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><span class="badge bg-info">i</span></a>
                //         </li>
                //     </ul>

                // `
                produits.forEach(prod => {
                    let a = createProduct(prod.titre, prod.id);
                    // console.log(a)
                    ul.appendChild(a)
                });

            })
            div.appendChild(ul)
            console.log(div)
                // console.log(ul)
                // console.log("---------------------")
                // console.log(div)
                // console.log(div.textContent)

            html.appendChild(div)

            // console.log(html)
        });

        cat.appendChild(html)
    });


}


export default {
    displayNav
}