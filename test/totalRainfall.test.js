import {parseRainfallValue} from '../src/totalRainfall';

describe('totalRainfall', () => {
    test('with integer', () => {
        expect(parseRainfallValue('3')).toEqual(3);
    });

    test('with float', () => {
        expect(parseRainfallValue('1.45')).toEqual(1.45);
    });

    test('with float missing leading zero', () => {
        expect(parseRainfallValue('.45')).toEqual(0.45);
    });

    test('with empty string', () => {
        expect(parseRainfallValue('')).toEqual(0);
    });

    test('with float with whitespace padding', () => {
        expect(parseRainfallValue('  3.5\n')).toEqual(3.5);
    });

    test('with non-float', () => {
        expect(parseRainfallValue('hello')).toEqual(0);
    });

    test('with float padded by characters', () => {
        expect(parseRainfallValue('2.5y')).toEqual(0);
    });
});
