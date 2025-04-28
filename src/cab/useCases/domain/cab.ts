export type CabStatus = 'ARRIVING_SOON' | 'ARRIVED';
export type CabDTO = {
    id: string;
    model: string;
    segment: string;
    trunk: string;
    capacity: number;
    rating?: number;
    ratings: number;
    minutesAway: number;
    status: CabStatus;
    isInTrafficJam: boolean;
};

export type Cab = CabDTO & {
    eta: number;
    impediment: string | undefined;
};
