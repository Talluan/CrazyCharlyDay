const express = require('express');
const Categorie = require("./controllers/Categorie");
const Produit = require("./controllers/Produit");

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

    });
    app.post('/api/produit',(req, res) => {
            
    });
    app.post('/api/categorie',(req, res) => {
        
    });
    app.post('/api/commande', (res, req) => {

    });
    app.put('/api/produit/:id', (res, req) => {

    });
    app.put('/api/commande/:id', (res, req) => {

    });
    app.put('/api/categorie/:id', (res, req) => {

    });
    app.delete('/api/produit/:id', (res, req) => {
        
    });
    app.delete('/api/commande/:id', (res, req) => {
        
    });
    app.delete('/api/categorie/:id', (res, req) => {

    });
};