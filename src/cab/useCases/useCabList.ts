import { ChangeEvent, useState } from 'react';
import { createCabListModelService } from './service/CabListModelService';
import { useGetCabList } from './repository/useGetCabList';

export const useCabList = () => {
    const [destination, setDestination] = useState('');

    const { cabs } = useGetCabList({ destination });
    const { cabs: formattedCabs, destinationOptions } = createCabListModelService(cabs);

    const updateDestination = (e: ChangeEvent<HTMLSelectElement>) => {
        setDestination(e.target.value);
    };

    return {
        destination,
        destinationOptions,
        cabs: formattedCabs,
        updateDestination,
    };
};
