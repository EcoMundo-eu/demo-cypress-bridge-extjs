import { PanelGrid } from '../../src/common/extJSComponents/PanelGrid';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			getPanelGridByTestId(panelGridTestId: string, option?: WaitUntilOptions): Chainable<PanelGrid>
		}
	}
}

Cypress.Commands.add('getPanelGridByTestId', (panelGridTestId: string, option?: WaitUntilOptions) => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new PanelGrid(panelGridTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

export {};
