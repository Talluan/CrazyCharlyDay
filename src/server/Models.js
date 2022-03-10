const bdd = require("./Bdd");
const { DataTypes } = require('@sequelize/core');

const Avis = bdd.getBdd().define("avis", {
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
    },
    prenom: {
        type: DataTypes.STRING,
    },
    nbEtoiles: {
        type: DataTypes.FLOAT,
    }
});

const Boite = bdd.getBdd().define("boites", {
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
});

const Categorie = bdd.getBdd().define("catégories", {
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
});

const Produit = bdd.getBdd().define("produits", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
});

const Commande = bdd.getBdd().define("Commande", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    couleur: {
        type: DataTypes.STRING,
        primaryKey: false,
        autoIncrement: false
    },
    message: {
        type: DataTypes.STRING,
        primaryKey: false,
        autoIncrement: false
    }
});

const Destinataire = bdd.getBdd().define("destinataire", {
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
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const User = bdd.getBdd().define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING
    },
    mdp: {
        type: DataTypes.STRING
    },
    nom: {
        type: DataTypes.STRING
    },
    prenom: {
        type: DataTypes.STRING
    },
    mail: {
        type: DataTypes.STRING
    },
    tel: {
        type: DataTypes.STRING
    },
    estAdmin: {
        type: DataTypes.BOOLEAN
    }
});

Commande.belongsToMany(Produit, {
    through: "Arrangement",
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

Produit.belongsToMany(Commande, {
    through: "Arrangement",
    foreignKey: "idProduit",
    otherKey: "idCommande"
});

Produit.belongsTo(Categorie, {
    foreignKey: "categorie",
    targetKey: "id"
});

User.hasMany(Commande, {
    foreignKey: "idUser",
    targetKey: "id"
});

module.exports = {
    Boite,
    Categorie,
    Commande,
    Produit,
    Avis,
    User
};