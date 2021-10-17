const Utils = require('../utils/utils')

/**
 * Handle get barcode by number
 * @param {*} req 
 * @param {*} res 
 */
exports.view = function (req, res) {
    const isbarcodeValid = Utils.barcodeValidation(req.params.barcode);
    if (isbarcodeValid) {
        const barcodeInfo = Utils.getBarcodeInfo(req.params.barcode);
        res.json({
            message: "Barcode is valid!",
            ...barcodeInfo
        });
    } else {
        res.status(400).send({
            message: "Barcode is not valid!",
            barcode: req.params.barcode
        });
    }
};