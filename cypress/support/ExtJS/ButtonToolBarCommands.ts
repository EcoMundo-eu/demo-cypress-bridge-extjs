import {ButtonToolbar} from "../../src/common/extjsComponents/ButtonToolbar";

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Get a button toolbar container by its test id
			 * @param buttonToolbarTestId {string}
			 * @param option
			 */
			getButtonToolBarByTestId(buttonToolbarTestId: string, option?: WaitUntilOptions): Chainable<ButtonToolbar>

			/**
			 * @description click one button in the container by its index
			 * @param index {number} - This index start from 0..N which N is integer
			 */
			clickButtonToolbarByIndex(index: number | string): Chainable<ButtonToolbar>
		}
	}
}

Cypress.Commands.add('getButtonToolBarByTestId', (buttonToolbarTestId: string, option?: WaitUntilOptions): Cypress.Chainable<ButtonToolbar> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new ButtonToolbar(buttonToolbarTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('clickButtonToolbarByIndex', { prevSubject: true },(buttonToolbar: ButtonToolbar,index: string | number) => {
	return cy.wrap(buttonToolbar)
		.invoke('selectTabByIndex', index)
		.then(() => cy.wrap(buttonToolbar))
})


export {};
