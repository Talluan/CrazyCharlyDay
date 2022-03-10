import { config } from "./config.js"
import { setModalContent } from "./products.js"

function loadResource(uri) {
    return new Promise((resolve, reject) => {
        fetch(config.host + uri).then(response => response.json()).then(data => {
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
    const divrow = document.createElement("div");
    const divcol6 = document.createElement("div");
    const divcol2 = document.createElement("div");
    divcol6.innerHTML = nom;
    const a = document.createElement("a");
    a.type = "button";
    a.dataset.bsToggle = "modal";
    a.dataset.bsTarget = "#exampleModal";
    a.innerHTML = "<span class=\"badge bg-info\">i</span>";
    a.onclick = () => { setModalContent(id); };
    divcol2.appendChild(a);
    divrow.classList.add("row");
    divcol6.classList.add("col-6");
    divcol2.classList.add("col-2");
    divrow.appendChild(divcol6);
    divrow.appendChild(divcol2);
    prod.appendChild(divrow);
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
            html.appendChild(createCategory(element.nom))
            let div = document.createElement("div")
            div.classList.add("collapse", "show")
            div.id = element.nom + "-collapse"

            let ul = document.createElement("ul")
            ul.classList.add("btn-toggle-nav", "list-unstyled", "fw-normal", "pb-1", "small")
            loadResource("/api/categorie/" + element.id + "/produits").then(produits => {
                produits.forEach(prod => {
                    let a = createProduct(prod.titre, prod.id);
                    ul.appendChild(a)
                });

            })
            div.appendChild(ul)
            html.appendChild(div)

            // console.log(html)
        });

        cat.appendChild(html)
    });


}

function displayBox(params) {
    let box = document.getElementById("box")
    console.log(box)

    box.style.backgroundColor = "grey"
    box.innerHTML = "coucou"

}

export default {
    displayNav,
    displayBox
}