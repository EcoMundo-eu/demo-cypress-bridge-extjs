import { ExtJS } from '../../src/definition/ExtJS';
import { Component } from '../../src/common/extJSComponents/BaseComponent';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			getModalByTestId(testId: string, option?: WaitUntilOptions): Chainable<ExtJS.Component>
			closeModal(): Chainable<any>
		}
	}
}

Cypress.Commands.add('getModalByTestId', (buttonTestId: string, option?: WaitUntilOptions): Cypress.Chainable<any> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new Component(buttonTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('closeModal', { prevSubject: true },(modal: Component<any>): Cypress.Chainable<any> => {
	modal.getExtJSCmp().close()
	return cy.wrap(modal)
})

export {}
