const Models = require('../Models');

/**
 * renvoie la liste des commandes sous forme d'un JSON
 */
function listerCommande() {
    const Commande = Models.getCommande();
    return new Promise((resolve, reject) => {
        Commande.findAll().then(commandes => {
            const list = commandes.map(commande => {
                return {
                    id: commande.id,
                    idUser: commande.idUser,
                    couleur: commande.couleur,
                    message: commande.message,
                    idbox: commande.idbox,
                    token: commande.token,
                    idDestinatire: commande.idDestinatire
                };
            });
            resolve(list);
        }).catch(reject);
    });
}

/**
 * Cree une nouvelle commande
 * @param {string} titre titre du produit
 * @param {string} description description du produit
 * @param {string} categorie categorie du produit
 * @param {number} poids poids du produit
 */
function creerCommande(isUser, couleur, message, idbox, idDestinatire) {
    //TODO: créer le token
    const tokent = null;
    return new Promise((resolve, reject) => {
        Produit.create({
            titre: titre,
            description: description,
            categorie: categorie,
            poids: poids
        }).then(resolve).catch(reject);
    });
}

function trouverProduit(idProduit) {
    // return the promise itself
    return Produit.find({
        where: {
           id: idProduit
        }
     }).then(device => {
        if (!device) {
            return 'not find';
        }
        return device.dataValues;
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
    trouverProduit,
    supprimerProduit
};