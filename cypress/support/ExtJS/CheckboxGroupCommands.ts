import { CheckboxGroup } from '../../src/common/extJSComponents/CheckboxGroup';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Get a checkbox group by its test id
			 * @param checkboxGroupTestId {string}
			 * @param option
			 */
			getCheckboxGroupByTestId(checkboxGroupTestId: string, option?: WaitUntilOptions): Chainable<CheckboxGroup>

			/**
			 * @description check an item in the group by its value
			 * @param value {string | number | boolean}
			 */
			checkCheckboxGGroupByValue(value: string | number | boolean): Chainable<CheckboxGroup>

			/**
			 * @description check an item in the group by its index
			 * @param index {number}
			 */
			checkCheckboxGGroupByIndex(index: number): Chainable<CheckboxGroup>

			/**
			 * @description uncheck an item in the group by its value
			 * @param value {string | number | boolean}
			 */
            uncheckCheckboxGGroupByValue(value: string | number | boolean): Chainable<CheckboxGroup>

			/**
			 * @description uncheck an item in the group by its index
			 * @param index {number}
			 */
			uncheckCheckboxGGroupByIndex(index: number): Chainable<CheckboxGroup>

			/**
			 * @description assert group by its checkbox count
			 * @param value {number}
			 */
			assertGroupBycheckBoxCount(value: number): Chainable<CheckboxGroup>
		}
	}
}

Cypress.Commands.add('getCheckboxGroupByTestId', (checkboxGroupTestId: string, option?: WaitUntilOptions) => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new CheckboxGroup(checkboxGroupTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})


Cypress.Commands.add('checkCheckboxGGroupByValue', { prevSubject: true }, (checkboxGroup: CheckboxGroup, value: string | number | boolean) => {
	return cy.wrap(checkboxGroup)
		.invoke('checkElementByValue',value, true)
		.then(() => cy.wrap(checkboxGroup))
})


Cypress.Commands.add('checkCheckboxGGroupByIndex', { prevSubject: true }, (checkboxGroup: CheckboxGroup, index: number) => {
	return cy.wrap(checkboxGroup)
		.invoke('checkElementByIndex',index, true)
		.then(() => cy.wrap(checkboxGroup))
})


 Cypress.Commands.add('uncheckCheckboxGGroupByValue', { prevSubject: true }, (checkboxGroup: CheckboxGroup, value: string | number | boolean) => {
	return cy.wrap(checkboxGroup)
		.invoke('checkElementByValue',value, false)
		.then(() => cy.wrap(checkboxGroup))
})


Cypress.Commands.add('uncheckCheckboxGGroupByIndex', { prevSubject: true }, (checkboxGroup: CheckboxGroup, index: number) => {
	return cy.wrap(checkboxGroup)
		.invoke('checkElementByIndex',index, false)
		.then(() => cy.wrap(checkboxGroup))
})


Cypress.Commands.add('assertGroupBycheckBoxCount',{ prevSubject: true }, (checkboxGroup: CheckboxGroup,  value: number) => {
	cy.wrap(checkboxGroup)
		.invoke('getCount')
		.should('be.eq', value)
	return cy.wrap(checkboxGroup)
})

export {}
