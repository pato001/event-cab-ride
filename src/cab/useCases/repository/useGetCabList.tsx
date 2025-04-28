import { useEffect, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { Cab } from '../domain/cab';

type useGetCabListProps = {
    destination: string;
};

export const useGetCabList = ({ destination }: useGetCabListProps) => {
    const [cabs, setCabs] = useState<Cab[]>([]);

    const { onMessage } = useWebSocket('ws://localhost:8080');

    useEffect(() => {
        onMessage((event) => {
            const data = JSON.parse(event.data);
            if (data.destination === destination) {
                setCabs(data.cabs);
            }
        });
    }, [destination, onMessage]);

    return {
        cabs,
    };
};
