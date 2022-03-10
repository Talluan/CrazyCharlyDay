const bdd = require("./Bdd");
const { DataTypes } = require('@sequelize/core');

let Avis = null;
let Boite = null;
let Categorie = null;
let Produit = null;
let Commande = null;
let Destinataire = null;
let User = null;
let Arrangement = null;

function init() {
    Avis = bdd.getBdd().define("avis", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nbEtoiles: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        certifie: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {timestamps: false, tableName: "avis"});

    Boite = bdd.getBdd().define("boite", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        taille: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poidsMax: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {timestamps: false, tableName: "boite"});

    Categorie = bdd.getBdd().define("categorie", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false, tableName: "categorie"});

    Produit = bdd.getBdd().define("produit", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poids: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {timestamps: false, tableName: "produit"});

    Commande = bdd.getBdd().define("commande", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        couleur: {
            type: DataTypes.STRING,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false, tableName: "commande"});

    Destinataire = bdd.getBdd().define("destinataire", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false, tableName: "destinataire"});

    User = bdd.getBdd().define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mdp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING
        },
        tel: {
            type: DataTypes.STRING
        },
        estAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {timestamps: false, tableName: "user"});

    Arrangement = bdd.getBdd().define("arrangement", {
        idCommande: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        idProduit: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        qte: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            autoIncrement: false
        }
    }, {timestamps: false, tableName: "arrangement"});

    Commande.belongsToMany(Produit, {
        through: Arrangement,
        foreignKey: "idCommande",
        otherKey: "idProduit"
    });

    Commande.hasOne(User, {
        foreignKey: "idUser",
        targetKey: "id"
    });

    Commande.hasOne(Destinataire, {
        foreignKey: "idDestinataire",
        targetKey: "id"
    });

    Commande.hasOne(Boite, {
        foreignKey: "idBox",
        targetKey: "id"
    });

    Produit.belongsToMany(Commande, {
        through: Arrangement,
        foreignKey: "idProduit",
        otherKey: "idCommande",
    });

    Produit.belongsTo(Categorie, {
        foreignKey: "categorie",
        as: "idCategorie",
        targetKey: "id"
    });

    User.hasMany(Commande, {
        foreignKey: "idUser",
        targetKey: "id"
    });

    Avis.hasOne(Produit, {
        foreignKey: "idProduit",
        targetKey: "id"
    });

    Categorie.hasMany(Produit, {
        foreignKey: "categorie",
        targetKey: "id",
        as: "produits"
    });
}

module.exports = {
    getBoite: () => {return Boite;},
    getCategorie: () => {return Categorie;},
    getCommande: () => {return Commande;},
    getProduit: () => {return Produit;},
    getAvis: () => {return Avis;},
    getUser: () => {return User;},
    getDestinataire: () => {return Destinataire;},
    init
};