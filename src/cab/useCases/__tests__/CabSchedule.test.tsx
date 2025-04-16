import { App } from '../../../App';

describe('Cab schedule', () => {
    it('see cab schedule', () => {
        cy.mount(<App />, '/');

        cy.getByTestId('cab-service').click();
        cy.getByTestId('destination').select('Main Venue');

        cy.getByTestId('cabs-list').should('be.visible');
        cy.getByTestId('cabs-list-items').should('be.visible').and('length', 1);
    });
});
