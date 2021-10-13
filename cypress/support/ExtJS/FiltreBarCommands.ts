import {Input} from "../../src/common/extJSComponents/Input";
import Chainable = Cypress.Chainable;
import {ComboBox} from "../../src/common/extJSComponents/ComboBox";
import {DateInput} from "../../src/common/extJSComponents/DateInput";

/**
 * @description These commands are dedicated to manipulate each field inside filter bar in the grid
 * @notice Before using these commands below. You have to call the command called .getFilterBarFieldByKey(in Grid command)
 * to get the field.
 * @example
 * cy.getGridByTestId('allSubstanceGrid')
 * .getFilterBarFieldByKey('ingredientname')
 * .writeTextInputFilterBar('gold')
 * .wait(1000)
 * .clearTextInputFilterBar()
 */
declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Write a text inside the input field filter which have gotten
			 * @param text
			 */
			writeTextInputFilterBar(text: string): Chainable<Input>

			/**
			 * @description Select by index the combobox field filter which have gotten
			 * @param rowIndex {number}
			 * - Start at 0..N
			 */
			selectComboboxFilterBarItemByIndex(rowIndex: number): Chainable<ComboBox>

			/**
			 * @description Assign date value for the date filter field which have gotten
			 * @param year {number}
			 * - format: YYYY
			 * - ex: 2020
			 * @param month {number}
			 * - It's a number between 0 and 11
			 * - You can get also a month index by its alias `DateInput.MONTHS.MONTH_ALIAS`
			 * MONTH_ALIAS can be JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER
			 * ex: `DateInput.MONTHS.JANUARY`, here you change only JANUARY by month which you require for each above.
			 * @param day {number}
			 * - It's a number between 1 and 31
			 * @example
			 * - ...setDateFilterBar(2019, 10,20) => Output become 20th november, 2021
			 * - Be careful of month Index
			 * @example
			 * - ...setDateFilterBar(2019, DateInput.MONTHS.NOVEMBER, 20)
			 * - We recommended, you're using this second approach
			 */

			setDateFilterBar(year: number, month: number, day: number): Chainable<DateInput>

			/**
			 * @description Clear the input field value of filtering which have gotten
			 * @param rowIndex {number}
			 * - Start at 0..N
			 */
			clearInputFilterBar(): Chainable<Input>
		}
	}
}

Cypress.Commands.add('writeTextInputFilterBar',{ prevSubject: true },(input: Input, text: string): Chainable<Input> => {
	cy.wrap(input)
	.invoke('setValue',text)
	return cy.wrap(input)
})

Cypress.Commands.add('clearInputFilterBar', { prevSubject: true }, (input: Input): Chainable<Input> => {
	cy.wrap(input)
	.invoke('reset')
	return cy.wrap(input)
})

Cypress.Commands.add('selectComboboxFilterBarItemByIndex', { prevSubject: true }, (combobox: ComboBox, rowIndex: number) => {
	return cy.wrap(combobox)
		.invoke('expand')
		.wait(500)
		.then(() => {
			return cy.wrap(combobox)
				.invoke('select', combobox.getStore().getAt(rowIndex))
		})
})

Cypress.Commands.add('setDateFilterBar',{ prevSubject: true },(inputDate: DateInput, year: number, month: number, day: number): Cypress.Chainable<DateInput> => {
	return cy.wrap(inputDate)
		.wait(100)
		.invoke('expand')
		.wrap(inputDate)
		.invoke('getPicker', 'auto')
		.invoke('setValue', new Date(year, month, day))
		.wrap(inputDate)
		.invoke('setValue', new Date(year, month, day))
		.wrap(inputDate)
		.wait(500)
		.invoke('collapse')
		.wrap(inputDate);
})
export {}
