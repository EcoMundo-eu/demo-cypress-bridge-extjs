import {Component} from "../../src/common/extJSComponents/BaseComponent";

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description get every component which have a testId
			*/
			getComponentByTestId(componentTestId: string, option?: WaitUntilOptions): Chainable<Component<any>>
			/**
			 * @description invoke a click event on the selected component
			 */
			clickComponent(): Chainable<any>
		}
	}
}


Cypress.Commands.add('getComponentByTestId', (componentTestId: string, option?: WaitUntilOptions): Cypress.Chainable<Component<any>> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new Component(componentTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('clickComponent', { prevSubject: true }, (component: Component<any>) => {
	return cy.wrap(component)
		.invoke('getEl')
		.its('dom')
		.invoke('click')
		.wrap(component)
})

export {}
