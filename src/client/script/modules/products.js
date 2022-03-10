import { config } from "./config.js";

export function setModalContent(idProduit) {
    fetch(config.host+"/api/produit/"+idProduit).then(response => response.json()).then(produit => {
        document.getElementById("exampleModal").innerHTML = `<div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title text-center" id="exampleModalLabel">${produit.titre}</h5>
            </div>
            <div id="photoProd">
                <img class="rounded mx-auto d-block" src="./images/produits/${idProduit}.jpg">
            </div>
            <hr>
            <div class="modal-body">
                Catégorie : ${produit.categorie}<br>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <div class="col">
                    <div class="row">
                        <div class="col d-flex justify-content-center">
                            Poids : ${produit.poids}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });
}