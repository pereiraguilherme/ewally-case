let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: res.status,
        message: 'Liveness check',
    });
});

var barcodeController = require('../controllers/barcodeController');

router.route('/boleto/:barcode')
    .get(barcodeController.view)

module.exports = router;