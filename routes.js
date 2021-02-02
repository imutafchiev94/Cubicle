const {Router} = require('express');

const router = Router();

let homeController = require('./controllers/homeController');
let productController = require('./controllers/productsController');
let accessoryController = require('./controllers/accessoriesController');

router.use('/', homeController);
router.use('/products', productController);
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.render('404', {title: 'Page Not Found'});
})

module.exports = router;