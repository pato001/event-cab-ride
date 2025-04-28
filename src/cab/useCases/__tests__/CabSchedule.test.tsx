import { App } from '../../../App';
import { ContextProvider } from '../../../common/context';
import { createVirtualCabListAdapter } from '../adapter/CabListAdapter';
import { SocketPort } from '../adapter/CabListPort';
import { provideVirtualCabs } from '../adapter/CabListProvider';
import { fakeCabs } from '../mocks/fakeCabs';

describe('Cab schedule', () => {
    it('see cab schedule', () => {
        const fake: SocketPort = {
            connect: () => {},
            disconnect: () => {},
            send: () => {},
            onMessage: (callback) => {
                callback({
                    data: JSON.stringify({
                        destination: 'main-venue',
                        cabs: fakeCabs,
                    }),
                } as MessageEvent);
            },
        };
        const fakeAdapter = createVirtualCabListAdapter(fake);

        cy.mount(
            <ContextProvider providers={[provideVirtualCabs(() => fakeAdapter)]}>
                <App />
            </ContextProvider>,
            '/',
        );

        cy.getByTestId('cab-service').click();
        cy.getByTestId('destination').select('Main Venue');

        cy.getByTestId('cabs-list').should('be.visible');
        cy.getByTestId('cabs-list').children().should('have.length', fakeCabs.length);
    });
});
