import { SearchInput } from '../../src/common/extJSComponents/SearchInput';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			getSearchInputByTestId(searchInputTestId: string, option?: WaitUntilOptions): Chainable<SearchInput>
			/**
			 * @description write text into the input field and fire keypress event
			 * @param text {string} text to write into the field
			 */
			writeAndSearchTextInSearchInput(text: string): Chainable<SearchInput>

			/**
			 * @description write text into the input field and fire specialkey event
			 * @param text {string} text to write into the field
			 */
			writeAndSpeicalSearchTextInSearchInput(text: string): Chainable<SearchInput>

			/**
			 * @description clear the text of the input field and fire keypress event
			 */
			clearSearchInput(): Chainable<SearchInput>

			/**
			 * @description clear the text of the input field and fire specialkey event
			 */
			clearSpecialSearchInput(): Chainable<SearchInput>
		}
	}
}

Cypress.Commands.add('getSearchInputByTestId',(searchInputTestId: string, option?: WaitUntilOptions): Cypress.Chainable<SearchInput> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new SearchInput(searchInputTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('writeAndSearchTextInSearchInput',{ prevSubject: true },(searchInput: SearchInput, text: string): Cypress.Chainable<SearchInput> => {
	cy.wrap(searchInput)
	.invoke('writeValue',text)
	.invoke('runSearch')
	return cy.wrap(searchInput)
})

Cypress.Commands.add('writeAndSpeicalSearchTextInSearchInput',{ prevSubject: true },(searchInput: SearchInput, text: string): Cypress.Chainable<SearchInput> => {
	cy.wrap(searchInput)
	.invoke('writeValue',text)
	.invoke('runSpecialSearch')
	return cy.wrap(searchInput)
})

Cypress.Commands.add('clearSearchInput', { prevSubject: true }, (searchInput: SearchInput): Cypress.Chainable<SearchInput> => {
	cy.wrap(searchInput)
	.invoke('resetField')
	.invoke('runSearch')
	return cy.wrap(searchInput)
})

Cypress.Commands.add('clearSpecialSearchInput', { prevSubject: true }, (searchInput: SearchInput): Cypress.Chainable<SearchInput> => {
	cy.wrap(searchInput)
	.invoke('resetField')
	.invoke('runSpecialSearch')
	return cy.wrap(searchInput)
})
export {}
