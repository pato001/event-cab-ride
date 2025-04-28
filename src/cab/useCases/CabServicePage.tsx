import {
    CabListItem,
    FocusPageLayout,
    FormField,
    HeroTitle,
    PageContents,
    Select,
    TextInput,
} from '@design-system';
import { useCabList } from './useCabList';

export const CabServicePage = () => {
    const { destination, destinationOptions, cabs, updateDestination } = useCabList();

    return (
        <FocusPageLayout>
            <HeroTitle title="/ Cab Service" />
            <PageContents>
                <FormField label="Departure">
                    <TextInput disabled value="Event hotel" />
                </FormField>
                <FormField label="Destination">
                    <Select
                        data-test="destination"
                        value={destination}
                        onChange={updateDestination}
                        items={destinationOptions}
                    />
                </FormField>
                <div data-test={'cabs-list'}>
                    {cabs.map((cab) => (
                        <CabListItem
                            key={cab.id}
                            model={cab.model}
                            eta={cab.eta}
                            segment={cab.segment}
                            capacity={cab.capacity}
                            rating={cab.rating}
                            impediment={cab.impediment}
                        />
                    ))}
                </div>
            </PageContents>
        </FocusPageLayout>
    );
};
