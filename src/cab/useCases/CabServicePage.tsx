import {
    CabListItem,
    FocusPageLayout,
    FormField,
    HeroTitle,
    PageContents,
    Select,
    TextInput,
} from '@design-system';
import { useEffect, useState } from 'react';

export type Cab = {
    id: string;
    model: string;
    segment: string;
    trunk: string;
    capacity: number;
    rating?: number;
    ratings: number;
    minutesAway: number;
    status: 'ARRIVING_SOON' | 'ARRIVED';
    isInTrafficJam: boolean;
};

export const sortCabsList=(cabs:Cab[])=>{
  const sortedData= cabs.toSorted((a, b) => {
    if(a.minutesAway!== b.minutesAway)
    return a.minutesAway - b.minutesAway
  if(a.isInTrafficJam !== b.isInTrafficJam){
    if(a.isInTrafficJam) return 1
    else return -1
  }
  return 0
});
  return sortedData;
}

export const CabServicePage = () => {
    const [destination, setDestination] = useState('');
    const [socket, setSocket] = useState<WebSocket>();
    const [cabs, setCabs] = useState<Cab[]>([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        setSocket(socket);
    }, []);

    useEffect(() => {
        if (socket) {
            const callback = (event: any) => {
                const data = JSON.parse(event.data);

                if (data.destination === destination) {
                    setCabs(data.cabs);
                }
            };

            socket.addEventListener('message', callback);

            return () => {
                socket.removeEventListener('message', callback);
            };
        }
    }, [socket, destination]);

    return (
        <FocusPageLayout>
            <HeroTitle title="/ Cabe Service" />
            <PageContents>
                <FormField label="Departure">
                    <TextInput disabled value="Event hotel" />
                </FormField>
                <FormField label="Destination">
                    <Select
                        data-test="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        items={[
                            { label: 'Main Venue', value: 'main-venue' },
                            { label: 'Players Entrance', value: 'players-entrance' },
                            { label: 'Backstage', value: 'backstage' },
                            { label: 'Cargo Entry', value: 'cargo-entry' },
                        ]}
                    />
                </FormField>
                <div data-test={'cabs-list'}>
                    {sortCabsList(cabs).map((cab) => (
                        <CabListItem
                            key={cab.id}
                            model={cab.model}
                            eta={cab.minutesAway}
                            segment={cab.segment}
                            capacity={cab.capacity}
                            rating={cab.rating}
                            impediment={cab.isInTrafficJam ? 'Traffic jam' : undefined}
                        />
                    ))}
                </div>
            </PageContents>
        </FocusPageLayout>
    );
};
