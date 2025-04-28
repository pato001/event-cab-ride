import { Cab, CabDTO } from '../domain/cab';

const destinationOptions = [
    { label: 'Main Venue', value: 'main-venue' },
    { label: 'Players Entrance', value: 'players-entrance' },
    { label: 'Backstage', value: 'backstage' },
    { label: 'Cargo Entry', value: 'cargo-entry' },
];

export const sortCabsList = (cabs: Cab[]) => {
    return cabs.sort((a, b) => {
        // First sort by ETA (minutesAway property)
        if (a.minutesAway !== b.minutesAway) return a.minutesAway - b.minutesAway;

        // When ETAs are equal, sort by whether the cab is in a traffic jam
        if (a.isInTrafficJam !== b.isInTrafficJam) {
            if (a.isInTrafficJam) return 1;
            else return -1;
        }

        // When the traffic jam is equal, sort by rating
        if (a.rating !== b.rating) return (b.rating || 0) - (a.rating || 0);

        // When ratings are equal, sort by cab segment
        return a.segment?.localeCompare(b.segment);
    });
};

export const transformCabList = (cabList: CabDTO[]): Cab[] => {
    return cabList.map((cab) => ({
        ...cab,
        eta: cab.minutesAway,
        impediment: cab.isInTrafficJam ? 'Traffic jam' : undefined,
    }));
};

export const createCabListModelService = (cabs: Cab[]) => {
    return {
        cabs: sortCabsList(transformCabList(cabs)),
        destinationOptions,
    };
};
