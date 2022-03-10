const { Produit } = require("../Models");

/**
 * renvoie la liste des produits sous forme d'un JSON
 */
function listerProduits() {
    return new Promise((resolve, reject) => {
        Produit.findAll().then(produits => {
            const list = produits.map(produit => {
                return {
                    id: produit.id,
                    titre: produit.titre,
                    description: produit.description,
                    categorie: produit.categorie,
                    poids: produit.poids
                };
            });
            resolve(list);
        }).catch(reject);
    });
}

/**
 * Cree un nouveau produit
 * @param {string} titre titre du produit
 * @param {string} description description du produit
 * @param {string} categorie categorie du produit
 * @param {number} poids poids du produit
 */
function creerProduit(titre, description, categorie, poids) {
    return new Promise((resolve, reject) => {
        Produit.create({
            titre: titre,
            description: description,
            categorie: categorie,
            poids: poids
        }).then(resolve).catch(reject);
    });
}

/**
 * supprime un produit
 * @param {number} id id du produit
 */
function supprimerProduit(id) {
    return new Promise((resolve, reject) => {
        Produit.destroy({
            where: {id: id}
        }).then(resolve).catch(reject);
    });
}

module.exports = {
    listerProduits,
    creerProduit,
    supprimerProduit
};