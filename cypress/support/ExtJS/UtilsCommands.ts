import { Component } from '../../src/common/extJSComponents/BaseComponent';
let LOGGING_CYPRESS_COMMANDS = false;

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			waitInitExtJSComponent(options?: object): Chainable<any>
			getExtJS(options?: object): Chainable<any>
		}
	}
}

Cypress.Commands.add('waitInitExtJSComponent', { prevSubject: true }, (component: Component<any>, options = { timeout: 5000 }) => {
	return cy.wrap(component, options)
		.should('have.property','componentId')
		.then(() => {
			return cy.wrap(component)
		})
})

Cypress.Commands.add('getExtJS', (options: object = { timeout: 4000 }) => {
	return cy.window(options).its('Ext')
})

export {}
