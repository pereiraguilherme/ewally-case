function isBarcodeValid(barcode) {
    const barcodeArray = barcode.split("").map(Number);

    if (barcodeArray.length > 44 || barcodeArray.length < 44) {
        return {
            isValid: false,
            message: 'Incorrect digits amount'
        }
    } else {
        if (isConvenio(barcodeArray)) {
            return {
                isValid: true,
                message: 'Convenio'
            };
        } else if (isTitulo(barcodeArray)) {
            return {
                isValid: true,
                message: 'Titulo'
            };
        }
        return {
            isValid: false,
            message: 'This is not a valid barcode'
        };
    }
}

function isTitulo(barcodeArray) {
    let originalDV = 0;
    const barcode43 = barcodeArray.map((element, index) => {
        if (index === 4) {
            originalDV = element;
            return null
        }
        return element
    }).filter(e => e !== null);

    if (barcode43.length < 43) return false

    const adder = (sum, value) => sum + value;
    let barcodeSum = multiplyMultipliers(barcode43).reduce(adder);
    const mod = barcodeSum % 11;

    const possibleDV = 11 - mod;

    if (!possibleDV) {
        return false;
    } else {
        if ((possibleDV === 11) || (possibleDV === 10) || (possibleDV === 0)) {
            if (originalDV === 1) return true;
        } else if (originalDV === possibleDV) {
            return true;
        }
        return false;
    }
}

function isConvenio(barcodeArray) {
    let originalDV = 0;
    const barcode43 = barcodeArray.map((element, index) => {
        if (index === 3) {
            originalDV = 0;
            return null
        }
        return element
    }).filter(e => e !== null);

    if (barcode43.length < 43) return false

    const adder = (sum, value) => sum + value;
    let barcodeSum = multiplyMultipliers(barcode43).reduce(adder);
    const mod = barcodeSum % 11;

    if ((mod === 0) || (mod === 1)) {
        if (originalDV === 0) return true
    } else if (mod === 10) {
        if (originalDV === 1) return true
    }
    return false
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

function getBarcodeInfo(barcode, barcodeType) {
    const barcodeArray = barcode.split("").map(Number);
    let value = 'R$';
    let expirationDate = 'XX/XX/XX';
    if (barcodeType === 'Titulo') {
        value = value + barcodeArray.slice(9, 17).join('') + ',' + barcodeArray.slice(18, 20).join('');
        if(value !== 'R$999999999,99'){
            const calculatedDate = getExpirationDate(barcodeArray.slice(5, 9).join(''));
            
            expirationDate = calculatedDate.getFullYear() + '/' + (Number(calculatedDate.getMonth()) + 1) + '/' + calculatedDate.getDate();
        }
    } else if (barcodeType === 'Convenio') {
        value = value + barcodeArray.slice(4, 13).join('') + ',' + barcodeArray.slice(13,15).join('');

        if(barcodeArray.slice(24, 31) !== new Array(8).fill(0)){
            expirationDate = barcodeArray.slice(24,28).join('')+ '/' + barcodeArray.slice(28,29)+ '/' + barcodeArray.slice(30,31).join('');
        }
        
    }
    return {
        value,
        expirationDate,
        barcode
    };
}

function getExpirationDate(factor) {
    const baseDate = new Date(1997, 10, 7);
    let expirationDate = baseDate;
    expirationDate.setDate(baseDate.getDate() + Number(factor));
    return expirationDate;
}

module.exports = {
    isBarcodeValid,
    getBarcodeInfo,
    multiplyMultipliers,
    isTitulo,
    isConvenio,
    getExpirationDate
}