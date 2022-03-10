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
            console.clear();
            console.log(v);
        });
    });
}

module.exports = {
    listerCategories
};