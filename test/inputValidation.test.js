import {isValidRainfallValue} from '../src/inputValidation';

describe('isValidRainfallValue valid values', () => {
    test('with 2dp float less than 1', () => {
        expect(isValidRainfallValue('0.14')).toBeTrue;
    });

    test('with 2dp float less than 1 and no leading zero', () => {
        expect(isValidRainfallValue('.14')).toBeTrue;
    });

    test('with 2dp float greater than 1', () => {
        expect(isValidRainfallValue('3.14')).toBeTrue;
    });

    test('with 2dp float greater than 10', () => {
        expect(isValidRainfallValue('31.41')).toBeTrue;
    });

    test('with empty string', () => {
        expect(isValidRainfallValue('')).toBeTrue;
    });

    test('with 2dp float with whitespace padding', () => {
        expect(isValidRainfallValue(' 3.14  ')).toBeTrue;
    });
});

describe('isValidRainfallValue invalid values', () => {
    test('with integer', () => {
        expect(isValidRainfallValue('1')).toBeFalse;
    });

    test('with 1dp float', () => {
        expect(isValidRainfallValue('1.4')).toBeFalse;
    });

    test('with 3dp float', () => {
        expect(isValidRainfallValue('1.434')).toBeFalse;
    });

    test('with negative 2dp float', () => {
        expect(isValidRainfallValue('-1.44')).toBeFalse;
    });

    test('with character string', () => {
        expect(isValidRainfallValue('hello')).toBeFalse;
    });

    test('with 2dp float followed by characters', () => {
        expect(isValidRainfallValue('0.34ab')).toBeFalse;
    });
});
