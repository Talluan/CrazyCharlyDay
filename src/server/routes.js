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
        .then(produit => res.json(produit))
        .catch(err => res.status(500).json(err));
    });
    app.get('/api/commande/:idcommande/', (req, res) => {
        Commande.trouverCommande(req.params.idcommande)
        .then(commande => res.json(commande))
        .catch(err => res.status(500).json(err));   
    });
    app.post('/api/commande', (res, req) => {
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
        Produit.create.creerProduit(
            req.body.titre,
            req.body.description,
            req.body.categorie,
            req.body.poids
        );
    });
    app.post('/api/categorie',(req, res) => {

    });
    app.put('/api/produit/:id', (res, req) => {
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
    app.put('/api/commande/:id', (res, req) => {
        // Commande.trouverCommande(req.params.id).then(commande => {
        //     if (commande) {
        //         commande.update({
        //             couleur: req.body.couleur,
        //             message: req.body.message,
        //             idBox: req.body.idBox,
        //             idDestinataire: req.body.idDestinataire,
        //             content: req.body.content
        //         });
        //     } else {
        //         Commande.create({
        //             couleur: req.body.couleur,
        //             message: req.body.message,
        //             idBox: req.body.idBox,
        //             idDestinataire: req.body.idDestinataire,
        //             content: req.body.content
        //         });
        //     }
        // }).catch(err => res.status(500).json(err));
    });
    app.put('/api/categorie/:id', (res, req) => {
        
    });
    app.delete('/api/produit/:id', (res, req) => {
        Produit.supprimerProduit(res.params.id);
    });
    app.delete('/api/commande/:id', (res, req) => {
        Commande.supprimerCommande(res.params.id);
    });
    app.delete('/api/categorie/:id', (res, req) => {
    });
};