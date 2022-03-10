const { User } = require("../Models");
const bCrypt = require("bcrypt");

/**
 * Cree un nouveau User
 * @param {string} login login de l'utilisateur
 * @param {string} mdp mdp de l'utilisateur
 * @param {string} nom nom de l'utilisateur
 * @param {string} prenom prenom de l'utilisateur
 * @param {string} mail mail de l'utilisateur
 * @param {string} tel tel de l'utilisateur
 */
function creerUser(login, mdp, nom, prenom, mail, tel) {
    return new Promise((resolve, reject) => {
        const NB_ROUNDS  =4;
        bCrypt.genSalt(NB_ROUNDS, (err, salt) => {
            bCrypt.hash(mdp, salt, (err, hash) => {
                if (err) reject(err);
                else {
                    User.create({
                        login: login,
                        mdp: hash,
                        nom: nom,
                        prenom: prenom,
                        mail: mail,
                        tel: tel
                    }).then(resolve)
                    .catch(reject);
                }
            });
        });
    });
}

/**
 * Supprime un User
 * @param {number} id id du user
 */
function supprimerUser(id) {
    return new Promise((resolve, reject) => {
        User.destroy({
            where: {id: id}
        }).then(resolve).catch(reject);
    });
}

module.exports = {
    creerUser,
    supprimerUser
};