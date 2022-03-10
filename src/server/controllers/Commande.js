const Models = require('../Models');
const bCrypt = require('bcrypt');

function modifierCommande(idCommande, idUser, couleur, message, idbox, idDestinataire, content) {
    const Commande = Models.getCommande();
    const Arrangement = Models.getArrangement();
    return new Promise((resolve, reject) => {
        Commande.update(
            { idUser: idUser },
            { couleur: couleur},
            {message: message},
            {idbox : idbox},
            {idDestinataire: idDestinataire},
            { where: { id: idCommande } }
        )
        //on supprime et recrée les arrangements
        Arrangement.destroy({
            where: {id: idCommande}
        })
        content.forEach((idProduit, qte) => {
            Arrangement.create({
                idCommande: data.idCommande,
                idProduit: idProduit,
                qte: qte
            })
        })
        resolve()
    });

}

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
                    idDestinatire: commande.idDestinataire
                };
            });
            resolve(list);
        }).catch(reject);
    });
}

/**
 * renvoie la liste des produits de l'id de la commande donné sous forme d'un JSON
 */
function listerProduits(idCommande) {
    const Commande = Models.getCommande();
    const Arrangement = Models.getArrangement();
    return new Promise((resolve, reject) => {
        Arrangement.find({
            where: {
               id: idCommande
            }
         }).then(couples => {
            const list = couples.map(couple => {
                return {
                    idProduit: couple.idProduit,
                    qte: couple.qte
                };
            });
            resolve(list);
        }).catch(reject);
    });
}

/**
 * Cree une nouvelle commande
 */
function creerCommande(idUser, couleur, message, idbox, idDestinataire, content) {
    const Commande = Models.getCommande();
    const Arrangement = Models.getArrangement();
    const token = bCrypt.hashSync("" + idUser + couleur + message + idbox + idDestinataire, 1);

    const commande = Commande.build({
        idUser: idUser,
        couleur: couleur,
        message: message,
        idbox: idbox,
        token: token,
        idDestinataire: idDestinataire
    });

    return new Promise((resolve, reject) => {
        commande.save()
            .then(content => {
                content.forEach((idProduit, qte) => {
                    Arrangement.create({
                        idCommande: commande.id,
                        idProduit: idProduit,
                        qte: qte
                    })
                });
            });
        resolve()
    })

}

function trouverCommande(idCommande) {
    const Commande = Models.getCommande();
    // return the promise itself
    return Commande.find({
        where: {
           id: idCommande
        }
     }).then(device => {
        if (!device) {
            return 'not find';
        }
        return device.dataValues;
     });
}

function supprimerCommande(idCommande) {
    //on supprime les arrangements
    const Commande = Models.getCommande();
    const Arrangement = Models.getArrangement();
    return new Promise((resolve, reject) => {
        Arrangement.destroy({
            where: {id: idCommande}
        })
        Commande.destroy({
            where: {id: idCommande}
        }).then(resolve).catch(reject);
    })
}

module.exports = {
    listerCommande,
    creerCommande,
    listerProduits,
    trouverCommande,
    supprimerCommande,
    modifierCommande
};