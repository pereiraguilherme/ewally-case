const utils = require("../src/utils/utils");


describe('Utils', () => {
    describe('multiplyMultipliers', () => {
        it('should return correct multiplied array', () => {
            const barcode43 = Array(43).fill(1);
            const expected = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            const result = utils.multiplyMultipliers(barcode43);
            expect(result).toStrictEqual(expected);
            expect(result.length).toBe(43);
        });

        it('should return an empty array', () => {
            const barcode3 = Array(3).fill(1);
            const expected = [];
            const result = utils.multiplyMultipliers(barcode3);
            expect(result).toStrictEqual(expected);
            expect(result.length).toBe(0)
        });
    });

    describe('isBarcodeValid', () => {
        it('should return true when receive a valid convenio barcode', () => {
            const barcode = '82200000215048200974123220154098290108605940';
            expect(utils.isBarcodeValid(barcode)).toStrictEqual({
                isValid: true,
                message: 'Convenio'
            });
        });

        it('should return true when receive a valid titulo barcode', () => {
            const barcode = '00193373700000001000500940144816060680935031';
            expect(utils.isBarcodeValid(barcode)).toStrictEqual({
                isValid: true,
                message: 'Titulo'
            });
        });

        it('should return false when receive a invalid barcode', () => {
            const barcode = '0193373700000001000500940144816060680935031';
            expect(utils.isBarcodeValid(barcode)).toStrictEqual({
                isValid: false,
                message: 'Incorrect digits amount'
            });
        });
    });

    describe('isTitulo', () => {
        it('should return true when correct barcode as input', () => {
            expect(utils.isTitulo('00193373700000001000500940144816060680935031'.split('').map(Number))).toBe(true);
        });

        it('should return false when incorrect convenio barcode as input', () => {
            expect(utils.isTitulo('82200000215048200974123220154098290108605940'.split('').map(Number))).toBe(false);
        });

        it('should return false when incorrect barcode as input', () => {
            expect(utils.isTitulo('0193373700000001000500940144816060680935031'.split('').map(Number))).toBe(false);
        });
    });

    describe('isConvenio', () => {
        it('should return true when correct barcode as input', () => {
            expect(utils.isConvenio('82200000215048200974123220154098290108605940'.split('').map(Number))).toBe(true);
        });

        it('should return false when incorrect titulo barcode as input', () => {
            expect(utils.isConvenio('00193373700000001000500940144816060680935031'.split('').map(Number))).toBe(false);
        });

        it('should return false when incorrect barcode as input', () => {
            expect(utils.isConvenio('0193373700000001000500940144816060680935031'.split('').map(Number))).toBe(false);
        });
    });

    describe('getExpirationDate', () => {
        it('return the correct expiration date based on correct factor', () => {
            expect(utils.getExpirationDate(1000)).toStrictEqual(new Date(2000, 7, 3));
        });
        it('return the correct expiration date based on correct factor', () => {
            expect(utils.getExpirationDate(1001)).toStrictEqual(new Date(2000, 7, 4));
        });

        it('return the correct expiration date based on correct factor', () => {
            expect(utils.getExpirationDate(1667)).toStrictEqual(new Date(2002, 5, 1));
        });

        it('return the correct expiration date based on correct factor', () => {
            expect(utils.getExpirationDate(4789)).toStrictEqual(new Date(2010, 11, 18));
        });
        it('return the correct expiration date based on correct factor', () => {
            expect(utils.getExpirationDate(9999)).toStrictEqual(new Date(2025, 2, 24));
        });
    });

    describe('getBarcodeInfo', ()=>{
        it('return proper information when valid convenio barcode', () =>{
            const expected = {
                value: 'R$000021504,82',
                expirationDate: '2015/4/9',
                barcode: '82200000215048200974123220154098290108605940'
            }
            expect(utils.getBarcodeInfo('82200000215048200974123220154098290108605940', 'Convenio')).toStrictEqual(expected);
        });

        it('return proper information when valid titulo barcode', () =>{
            const expected = {
                value: 'R$00000001,00',
                expirationDate: '2008/1/31',
                barcode: '00193373700000001000500940144816060680935031'
            }
            expect(utils.getBarcodeInfo('00193373700000001000500940144816060680935031', 'Titulo')).toStrictEqual(expected);
        });
    })
});
