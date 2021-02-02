const {Router} = require('express');
const accessoryService = require('../services/accessoryService')

const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory', {title: 'Create Accessory Page'})
})

//TODO: create middleware for validation or just validate incomming data
router.post('/create', (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
})

module.exports = router;