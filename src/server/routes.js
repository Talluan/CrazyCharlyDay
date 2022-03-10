const express = require('express');
var validator = require('validator');
const Categorie = require("./controllers/Categorie");
const Produit = require("./controllers/Produit");
const Commande = require("./controllers/Commande");
const User = require("./controllers/User");

/**
 * @param {express.Express} app 
 */
module.exports = app => {
    app.get("/api/categories", (req, res) => {
        Categorie.listerCategories()
        .then(categories => res.json(categories))
        .catch(err => res.status(500).json(err));
    });
    app.get('/api/categorie/:id/produits', (req, res) => {
        Categorie.getCategorieProduits(req.params.id)
        .then(produits => res.json(produits))
        .catch(err => res.status(500).json(err));
    });
    app.get('/api/produit/:id', (req, res) => {
        Produit.trouverProduit(req.params.id)
        .then(produit => {
            console.log(produit);
            res.json(
                {
                    id: produit.id,
                    titre: produit.titre,
                    description: produit.description,
                    categorie: produit.categorie,
                    poids: produit.poids
                }
            )
        })
        .catch(err => res.status(500).json(err));
    });
    app.get('/api/commande/:idcommande/', (req, res) => {
        Commande.trouverCommande(req.params.idcommande)
        .then(commande => res.json(commande))
        .catch(err => res.status(500).json(err));   
    });
    app.post('/api/commande', (req, res) => {
        Commande.creerCommande(
            req.body.idUser,
            req.body.couleur,
            req.body.message,
            req.body.idBox,
            req.body.idDestinataire,
            req.body.content
        );
    });
    app.post('/api/produit',(req, res) => {
        Produit.creerProduit(
            req.body.titre,
            req.body.description,
            req.body.categorie,
            req.body.poids
        ).then(res.end);
    });
    app.post('/api/categorie',(req, res) => {
        Categorie.creerCategorie(req.body.nom).then(() => res.end());
    });
    app.put('/api/produit/:id', (req, res) => {
        Produit.trouverProduit(req.params.id).then(produit => {
            if (produit) {
                produit.update({
                    titre: req.body.titre,
                    description: req.body.description,
                    categorie: req.body.categorie,
                    poids: req.body.poids
                });
            } else {
                Produit.create({
                    titre: req.body.titre,
                    description: req.body.description,
                    categorie: req.body.categorie,
                    poids: req.body.poids
                });
            }
        }).catch(err => res.status(500).json(err));
    });
    app.put('/api/commande/:id', (req, res) => {
        Commande.modifierCommande(req.params.id, req.body.idUser,
            req.body.couleur,
            req.body.message,
            req.body.idBox,
            req.body.idDestinataire,
            req.body.content);
    });
    app.put('/api/categorie/:id', (req, res) => {
        Categorie.modifierCategorie(req.params.id, req.body.nom);
    });
    app.delete('/api/produit/:id', (req, res) => {
        Produit.supprimerProduit(req.params.id);
    });
    app.delete('/api/commande/:id', (req, res) => {
        Commande.supprimerCommande(req.params.id);
    });
    app.delete('/api/categorie/:id', (req, res) => {
        Categorie.supprimerCategorie(req.params.id);
    });
    app.post('/register', (req, res) => {
        const b = req.body;
        
        let identifiant = validator.escape(b.login);
        // console.log(identifiant);
        User.creerUser(validator.escape(b.login),validator.escape(b.password),validator.escape(b.Nom),validator.escape(b.userPrenom),validator.escape(b.mail),validator.escape(b.numPhone)).then(user => {
            User.trouverID(validator.escape(b.login)).then(user => {
                console.log("id "+user.id);
                req.session.userid = user.id;
                console.log("session "+req.session.userid);
            });
            res.writeHead(301,{Location: `https://${req.headers.host}/`});
            res.end();
        }).catch(err => {
            res.send('err');
        });
    });
    app.post('/login', (req, res) => {
        User.testerUser(validator.escape(req.body.id),validator.escape(req.body.mdp)).then(user => {
            if(user) {
                req.session.userid = user.id;
                res.writeHead(301,{Location: `https://${req.headers.host}/`});
                res.end();
            } else {
                res.send('Login Incorrect');
            }
        });
    });
};