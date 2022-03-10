const express = require('express');
const Categorie = require("./controllers/Categorie");
const Produit = require("./controllers/Produit");
const Commande = require("./controllers/Commande");

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
};