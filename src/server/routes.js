/**
 * 
 * @param {Express.Application} app 
 */
module.exports = app => {
    app.get("/api/categories", (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        res.json({
            message: 'test'
        });
        console.log("test");

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