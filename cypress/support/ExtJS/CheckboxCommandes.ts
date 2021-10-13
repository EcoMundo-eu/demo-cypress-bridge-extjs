import { Checkbox } from '../../src/common/extJSComponents/Checkbox';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Get a button by its test id
			 * @param checkboxTestId {string}
			 * @param option
			 */
			getCheckboxByTestId(checkboxTestId: string, option?: WaitUntilOptions): Chainable<Checkbox>
			//clickCheckBox(): Chainable<Checkbox>
			/**
			 * @description check the checkbox
			 */
			check(): Chainable<Checkbox>

			/**
			 * @description uncheck the checkbox
			 */
			uncheck():Chainable<Checkbox>
		}
	}
}

Cypress.Commands.add('getCheckboxByTestId', (checkboxTestId: string, option?: WaitUntilOptions) => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new Checkbox(checkboxTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})


Cypress.Commands.add('check', { prevSubject: true },(checkbox: Checkbox) => {
	return cy.wrap(checkbox)
		.invoke('check')
		.then(() => cy.wrap(checkbox))
})

Cypress.Commands.add('clickCheckBox', { prevSubject: true },(checkbox: Checkbox) => {
	return cy.wrap(checkbox)
		.invoke('check')
		.then(() => cy.wrap(checkbox))
})


Cypress.Commands.add('uncheck', { prevSubject: true },(checkbox: Checkbox) => {
	return cy.wrap(checkbox)
		.invoke('uncheck')
		.then(() => cy.wrap(checkbox))
})
