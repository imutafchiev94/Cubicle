const {Router} = require('express');

const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');

const router = Router();

router.get('/create', (req, res) => {
    res.render('create', {title: "Create Cube Page"});
})

router.post('/create', (req, res) => {
    productService.create(req.body)
    .then(res.redirect('/'))
    .catch(res.status(500));

})

router.get('/details/:cubeId', async (req, res) => {
    let cube = await productService.getOneWithAccessories(req.params.cubeId)

    console.log(cube);

    res.render('details', {title: `Details of ${cube.name}`, cube})
});

router.get('/:cubeId/attach', async (req, res) => {
    let product = await productService.getOne(req.params.cubeId);
    let accessories = await accessoryService.getAllWithout(product.accessories);
    
    res.render('attachAccessory', {title: 'Attach Accessory Page', product, accessories});
})

router.post('/:cubeId/attach', (req, res) => {
    productService.attachAccessory(req.params.cubeId, req.body.accessory)
    .then(res.redirect(`/products/details/${req.params.cubeId}`))
    .catch(res.status(500).end());

})

module.exports = router;