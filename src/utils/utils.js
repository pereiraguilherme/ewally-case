function isBarcodeValid(barcode) {
    const barcodeArray = barcode.split("");
    
    if (barcodeArray.length > 44) {
        return false;
    } else {

        const titulo = false;
        if (titulo) {
        } else {
            const originalValidationDigit = barcodeArray[4];
            console.log(barcodeArray)
            const barcode43 = barcodeArray.map((element, index) => {
                if(index === 3){
                    
                }
                return element
            });
            console.log(barcode43);
            const adder = (sum, value) => sum + value;

            let barcodeSum = multiplyMultipliers(barcode43).reduce(adder);
            const barcodeSumMod = barcodeSum % 11;
            let possibleValidationDigit = 0;

            switch (possibleValidationDigit) {
                case (11 - barcodeSumMod) === 10:
                    possibleValidationDigit = 1;
                    break;
                case (11 - barcodeSumMod) === (0 || 1):
                    possibleValidationDigit = 0;
                    break;
                default:
                    possibleValidationDigit = (11 - barcodeSumMod);
                    break;
            }

            if (originalValidationDigit === possibleValidationDigit) {
                return true;
            }
            return false;
        }
    }

}

function multiplyMultipliers(barcode43) {
    const multipliers = [2, 3, 4, 5, 6, 7, 8, 9];
    let multipliersIndex = -1;
    if (barcode43.length < 43) {
        return [];
    } else {
        barcode43 = barcode43.reverse().map(element => {
            if (multipliersIndex > 6) {
                multipliersIndex = -1;
            }
            multipliersIndex++;
            return element * multipliers[multipliersIndex];
        });
        return barcode43.reverse();
    }
}

function getbarcodeInfo(barcode) {
    return {
        amount: 0.0,
        expirationDate: Date(),
        barcode
    }
}

module.exports = {
    isBarcodeValid,
    getbarcodeInfo,
    multiplyMultipliers
}