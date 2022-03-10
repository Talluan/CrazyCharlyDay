import { getProductInfo } from "./products.js";

let cart_produits = [];

function ajouterProduit(id) {
    if (!cart_produits.find(e => e.id == id))
        cart_produits.push({ id: id, quantite: 1 });
    else cart_produits[cart_produits.indexOf(id)].quantite++;
    updateBoxContainer();
}

function supprimerProduit(id) {
    const res = cart_produits.find(e => e.id == id);
    if (!res) return;
    if (res.quantite > 1)
        res.quantite--;
    else cart_produits.splice(cart_produits.indexOf(id), 1);
    updateBoxContainer();
}

function creerCarte(produit) {
    // La carte
    let div = document.createElement("div")
    div.classList.add("card")
    div.style = "width : 8rem;"

    // Le haut
    let img = document.createElement("img")
    img.classList.add("card-img-top")
    img.src = "images/produits/" + produit.id + ".jpg";
    img.alt = produit.titre;

    // Séparation
    let hr = document.createElement("hr")

    //Le Body
    let cBody = document.createElement("div")
    cBody.classList.add("card-body")
    cBody.innerHTML = `
    <h5 class="card-title text-center">${produit.titre}</h5>
    <p class="card-text text-center">${produit.poids}</p>
    `
    let cFooter = document.createElement("div")
    cFooter.classList.add("card-footer")
    cFooter.innerHTML = `
    <div class="col">
        <div class="row">
            <div class="col d-flex justify-content-center">
                <button id="inf" type="button" class="btn btn-primary">X</button>
            </div>
            <div class="col d-flex justify-content-center">
                <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><span class="badge bg-info">i</span></a>
            </div>
        </div>
    </div>
    `

    div.appendChild(img)
    div.appendChild(hr)
    div.appendChild(cBody)
    div.appendChild(cFooter)

    return div

}

function updateBoxContainer() {

    let div = document.getElementById("box")
    div.innerHTML = ""
    cart_produits.forEach(element => {
        let pr = getProductInfo(element.id)
        console.log(pr)
        pr.then(resp => {
            console.log(resp)
            div.appendChild(creerCarte(resp))

        })
    });

}


export default {
    updateBoxContainer,
    ajouterProduit
}