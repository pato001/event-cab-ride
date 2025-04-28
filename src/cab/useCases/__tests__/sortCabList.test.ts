import { describe, expect, it } from 'vitest';
import { sortCabsList } from '../service/CabListModelService';
import { CabStatus } from '../domain/cab';

const cab = {
    id: '0',
    model: 'Tesla',
    segment: 'Luxury',
    trunk: 'L',
    capacity: 5,
    rating: 5,
    ratings: 243,
    minutesAway: 20,
    eta: 20,
    impediment: undefined,
    status: 'ARRIVED' as CabStatus,
    isInTrafficJam: false,
};

describe('Pre-check', () => {
    it('sort by eta', () => {
        const cabs = [
            { ...cab, minutesAway: 10 },
            { ...cab, minutesAway: 2 },
            { ...cab, minutesAway: 1 },
            { ...cab, minutesAway: 5 },
            { ...cab, minutesAway: 4 },
        ];
        const result = sortCabsList(cabs).map((cab) => cab.minutesAway);
        expect(result).toEqual([1, 2, 4, 5, 10]);
    });

    it('When ETAs are equal, sort by whether the cab is in a traffic jam', () => {
        const cabs = [
            { ...cab, minutesAway: 10, isInTrafficJam: true, id: '0' },
            { ...cab, minutesAway: 1, isInTrafficJam: true, id: '1' },
            { ...cab, minutesAway: 4, isInTrafficJam: true, id: '2' },
            { ...cab, minutesAway: 1, isInTrafficJam: false, id: '3' },
            { ...cab, minutesAway: 10, isInTrafficJam: false, id: '4' },
            { ...cab, minutesAway: 4, isInTrafficJam: false, id: '5' },
        ];
        const result = sortCabsList(cabs).map((cab) => cab.id);
        expect(result).toEqual(['3', '1', '5', '2', '4', '0']);
    });

    it('When the traffic jam is equal, sort by rating', () => {
        const cabs = [
            { ...cab, rating: 10 },
            { ...cab, rating: 2 },
            { ...cab, rating: 1 },
            { ...cab, rating: 5 },
            { ...cab, rating: 4 },
        ];
        const result = sortCabsList(cabs).map((cab) => cab.rating);
        expect(result).toEqual([10, 5, 4, 2, 1]);
    });

    it('When ratings are equal, sort by cab segment', () => {
        const cabs = [
            { ...cab, segment: 'Luxury' },
            { ...cab, segment: 'Supercar' },
            { ...cab, segment: 'Compact' },
            { ...cab, segment: 'Premium' },
            { ...cab, segment: 'Economy' },
        ];
        const result = sortCabsList(cabs).map((cab) => cab.segment);
        expect(result).toEqual(['Compact', 'Economy', 'Luxury', 'Premium', 'Supercar']);
    });
});
