import { CabListItem, FocusPageLayout, FormField, HeroTitle, PageContents, Select, TextInput } from '@design-system'


export const CabServicePage = () => {
  return (
    <FocusPageLayout>
      <HeroTitle title='/ Cabe Service'/>
      <PageContents>
        <FormField label="Departure">
          <TextInput disabled value='Event hotel'/>
        </FormField>
        <FormField label="Destination">
          <Select items={[{label: 'Main Venue', value: 'main-venue'},
          {label: 'Players Entrance', value: 'players-entrance'},
            {label: 'Backstage', value: 'backstage'},
            {label: 'Cargo Entry', value: 'cargo-entry'}]}/>
        </FormField>
        <CabListItem model={'Tesla'} eta={10} segment={'Luxury'}/>
        <CabListItem model={'Tesla'} eta={10} segment={'Luxury'}/>
        <CabListItem model={'Tesla'} eta={10} segment={'Luxury'}/>
      </PageContents>        
    </FocusPageLayout>
  )
}
