let cart_produits = [];

function ajouterProduit(id) {
    if (!cart_produits.find(e => e.id == id))
        cart_produits.push({id: id, quantite: 1});
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

function updateBoxContainer() {
    
}