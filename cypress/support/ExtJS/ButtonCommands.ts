import { Button } from '../../src/common/extJSComponents/Button';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Get a button by its test id
			 * @param buttonTestId {string}
			 * @param option
			 */
			getButtonByTestId(buttonTestId: string, option?: WaitUntilOptions): Chainable<Button>
			/**
			 * @description Click the button
			 */
			clickButton(): Chainable<any>
		}
	}
}

Cypress.Commands.add('getButtonByTestId', (buttonTestId: string, option?: WaitUntilOptions): Cypress.Chainable<Button> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new Button(buttonTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('clickButton', { prevSubject: true }, (button: Button) => {
	cy//.findByTestId(button.testId)
		//.should('not.have.class', 'x-btn-disabled')
		.wrap(button)
		.then(($btn) => {
			cy.get(`#${$btn.componentId}`).click({ force: true });
			return cy.wrap(button)
		})
})

export {}
