const express = require('express');
const Categorie = require("./controllers/Categorie");

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
        
    });
    app.get('/api/produit/:id', (req, res) => {

    });
    app.get('/api/commande/:idcommande/', (req, res) => {
            
    });
    app.post('/api/produit',(req, res) => {
            
    });
    app.post('/api/categorie',(req, res) => {
        
    });
};