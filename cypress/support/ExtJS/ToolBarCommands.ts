import { Toolbar } from '../../src/common/extJSComponents/Toolbar';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			getToolBarByTestId(toolbarTestId: string, option: WaitUntilOptions): Chainable<Toolbar>
			clickToolbarElement(itemId: string): Chainable<Toolbar>
		}
	}
}

Cypress.Commands.add('getToolBarByTestId', (toolbarTestId: string, option?: WaitUntilOptions): Cypress.Chainable<Toolbar> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new Toolbar(toolbarTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('clickToolbarElement', { prevSubject: true },(toolbar: Toolbar,itemId: string) => {
	return cy.wrap(toolbar)
		.invoke('selectTabById', itemId)
		.then(() => cy.wrap(toolbar))
})

export {};
