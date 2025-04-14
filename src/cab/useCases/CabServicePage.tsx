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

export const CabServicePage = () => {
    const [destination, setDestination] = useState('');

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        const callback = (event: any) => {
            const data = JSON.parse(event.data);

            console.log(data);
        };

        socket.addEventListener('message', callback);

        return () => {
            socket.removeEventListener('message', callback);
        };
    }, []);

    return (
        <FocusPageLayout>
            <HeroTitle title="/ Cabe Service" />
            <PageContents>
                <FormField label="Departure">
                    <TextInput disabled value="Event hotel" />
                </FormField>
                <FormField label="Destination">
                    <Select
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
                <CabListItem model={'Tesla'} eta={10} segment={'Luxury'} />
                <CabListItem model={'Tesla'} eta={10} segment={'Luxury'} />
                <CabListItem model={'Tesla'} eta={10} segment={'Luxury'} />
            </PageContents>
        </FocusPageLayout>
    );
};
