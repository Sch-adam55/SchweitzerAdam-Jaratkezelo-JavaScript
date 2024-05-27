
import { describe, it, expect, beforeEach } from 'vitest';
import { JaratKezelo, NegativKesesException } from '../src/JaratKezelo.js';

describe ('JaratKezelo', () => {
    let jaratKezelo;

    beforeEach(() => {
        jaratKezelo = new JaratKezelo();
    });

    it('should add a new flight', () => {
        jaratKezelo.ujJarat('AB123', 'BUD', 'NYC', new Date('2024-06-01T08:00:00Z'));
        const actual = jaratKezelo.mikorIndul('AB123');
        const expected = new Date('2024-06-01T08:00:00Z');
        expect(actual).toEqual(expected);
    });

    it('should throw an error for duplicate flight number', () => {
        jaratKezelo.ujJarat('AB123', 'BUD', 'NYC', new Date('2024-06-01T08:00:00Z'));
        expect(() => jaratKezelo.ujJarat('AB123', 'BUD', 'NYC', new Date('2024-06-01T08:00:00Z'))).toThrow('A járatszám már létezik');
    });

    it('should add delay to a flight', () => {
        jaratKezelo.ujJarat('AB123', 'BUD', 'NYC', new Date('2024-06-01T08:00:00Z'));
        jaratKezelo.keses('AB123', 30);
        const actual = jaratKezelo.mikorIndul('AB123');
        const expected = new Date('2024-06-01T08:30:00Z');
        expect(actual).toEqual(expected);
    });

    it('should not allow negative total delay', () => {
        jaratKezelo.ujJarat('AB123', 'BUD', 'NYC', new Date('2024-06-01T08:00:00Z'));
        jaratKezelo.keses('AB123', 10);
        expect(() => jaratKezelo.keses('AB123', -20)).toThrow(NegativKesesException);
    });

    it('should return flights from a specific airport', () => {
        jaratKezelo.ujJarat('AB123', 'BUD', 'NYC', new Date('2024-06-01T08:00:00Z'));
        jaratKezelo.ujJarat('AB124', 'BUD', 'LAX', new Date('2024-06-01T09:00:00Z'));
        jaratKezelo.ujJarat('AB125', 'NYC', 'BUD', new Date('2024-06-01T10:00:00Z'));
        const actual = jaratKezelo.jaratokRepuloterrol('BUD');
        const expected = ['AB123', 'AB124'];
        expect(actual).toEqual(expected);
    });
});
