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

    describe.only('isBarcodeValid', () => {
        it('should return true when receive a valid barcode', () => {
            const barcode = '82200000215048200974123220154098290108605940';
            const expected = true
            expect(utils.isBarcodeValid(barcode)).toBe(true);
        })
    })
});
