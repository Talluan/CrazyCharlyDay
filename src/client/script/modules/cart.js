import { getProductInfo, setModalContent } from "./products.js";

let cart_produits = [];

function getIndex(id) {
    let index = -1;
    let i = 0;
    cart_produits.forEach(element => {
        if (element.id == id) index = i;
        i++;
    });
    return index;
}

function ajouterProduit(id) {
    if (!cart_produits.find(e => e.id == id))
        cart_produits.push({ id: id, quantite: 1 });
    else cart_produits[getIndex(id)].quantite++;
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

function creerCarte(produit, quantite) {
    // La carte
    let div = document.createElement("div")
    div.classList.add("card")
    div.style = "max-width : 12rem;"

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
    <h5 class="card-title text-center" style="white-space: no-wrap;">${produit.titre}</h5>
    <p class="card-text text-center" style="white-space: no-wrap;">Poids: ${produit.poids}kg</p>
    <p class="card-text text-center" style="white-space: no-wrap;">Quantite: ${quantite}</p>
    `
    let cFooter = document.createElement("div")
    cFooter.classList.add("card-footer")
    const divcol = document.createElement("div")
    divcol.classList.add("col")
    const divrow = document.createElement("div")
    divrow.classList.add("row")
    const divcol2 = document.createElement("div")
    divcol2.classList.add("col")
    divcol2.classList.add("d-flex")
    divcol2.classList.add("justify-content-center")
    const button = document.createElement("button")
    button.classList.add("btn")
    button.classList.add("btn-primary")
    button.innerHTML = "X"
    button.onclick = () => supprimerProduit(produit.id);
    divcol2.appendChild(button);
    const divcol3 = document.createElement("div")
    divcol3.classList.add("col")
    divcol3.classList.add("d-flex")
    divcol3.classList.add("justify-content-center")
    const a = document.createElement("a")
    a.type = "button"
    a.dataset.bsToogle = "modal";
    a.dataset.bsTarget = "#exampleModal";
    a.innerHTML = `<span class="badge bg-info">i</span>`;
    a.onclick = () => { setModalContent(produit.id) };
    divcol3.appendChild(a)
    divrow.appendChild(divcol2)
    divrow.appendChild(divcol3)
    divcol.appendChild(divrow)
    cFooter.appendChild(divcol)

    div.appendChild(img)
    div.appendChild(hr)
    div.appendChild(cBody)
    div.appendChild(cFooter)

    return div

}

function updateBoxContainer() {
    let div = document.getElementById("box");
    div.innerHTML = ""
    cart_produits.forEach(element => {
        let pr = getProductInfo(element.id)
        pr.then(resp => {
            div.appendChild(creerCarte(resp, element.quantite))
        });
    });

}

function commanderCart() {

}

export default {
    updateBoxContainer,
    ajouterProduit
}