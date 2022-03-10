const { Avis } = require("../models/Avis");

function creerAvis(idProduit, message, nom, prenom, nbEtoiles, certifie) {
    return new Promise((resolve, reject) => {
        Avis.create({
            idProduit: idProduit,
            message: message,
            nom: nom,
            prenom: prenom,
            nbEtoiles: nbEtoiles,
            certifie: certifie
        }).then(resolve).catch(reject);
    });
}

module.exports = {
    creerAvis
};