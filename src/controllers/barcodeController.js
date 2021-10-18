const Utils = require('../utils/utils')

/**
 * Handle get barcode by number
 * @param {*} req 
 * @param {*} res 
 */
exports.view = function (req, res) {
    const isbarcodeValid = Utils.isBarcodeValid(req.params.barcode);
    if (isbarcodeValid.isValid) {
        const barcodeInfo = Utils.getBarcodeInfo(req.params.barcode, isbarcodeValid.message);
        res.json({
            message: isbarcodeValid.message,
            ...barcodeInfo
        });
    } else {
        res.status(400).send({
            message: isbarcodeValid.message,
            barcode: req.params.barcode
        });
    }
};