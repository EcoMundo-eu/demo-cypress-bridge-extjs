import {ExtJS} from "../../src/definition/ExtJS";

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			waitStoreIsLoading(store: ExtJS.Store, option?: object): Chainable<any>
		}
	}
}

Cypress.Commands.add('waitStoreIsLoading', (store: ExtJS.Store, option?: object): Cypress.Chainable<any> => {
	return cy.wrap(store,option)
		.invoke('isLoading')
		.should('eq',false)
})

export {};
