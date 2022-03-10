const Models = require('../Models');

/**
 * renvoie la liste des catégories sous forme d'un JSON
 */
function listerCategories() {
    const Categorie = Models.getCategorie();
    return new Promise((resolve, reject) => {
        Categorie.findAll().then(categories => {
            const list = categories.map(categorie => {
                return {
                    id: categorie.id,
                    nom: categorie.nom
                };
            });
            resolve(list);
        }).catch(v => {
            reject(v);
        });
    });
}

function getCategorieProduits(id) {
    const Produit = Models.getProduit();
    return new Promise((resolve, reject) => {
        Produit.findAll({where: {categorie: id}, attributes: ["id", "titre", "description", "poids", "categorie"]}).then(produits => {
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

module.exports = {
    listerCategories,
    getCategorieProduits
};