import {DateInput} from "../../src/common/extjsComponents/DateInput";

declare global {
	namespace Cypress {
		interface Chainable<Subject> {

			/**
			 * @description This command allows us to select a DateInput component by its testId,
			 * you have to call it before using other commands.
			 * @example
			 * cy.getDateInputByTestId('ecotestidofelement')
			 * @param dateInputId
			 * @param option
			 */
			getDateInputByTestId(dateInputId: string, option?: WaitUntilOptions): Chainable<DateInput>

			/**
			 * @description Set date directly into the date input without open a date picket
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
			 * - ...setDate(2019, 10,20) => Output become 20th november, 2021
			 * - Be careful of month Index
			 * @example
			 * - ...setDate(2019, DateInput.MONTHS.NOVEMBER, 20)
			 * - We recommended, you're using this second approach
			 */
			setDate(year: number, month: number, day: number): Chainable<DateInput>
			/**
			 * @inheritDoc setDate function except here we can open a date picker
			*/
			setDatePickerOpened(year: number, month: number, day: number): Chainable<DateInput>
			/**
			 * @description set date by referencing current date
			 */
			setDateToday(): Chainable<DateInput>
			/**
			 * @description set date on date picker by referencing current date
			*/
			setDateTodayPickerOpened(): Chainable<DateInput>
			/**
			 * @description close current date picker opened
			 */
			closePickerOpened(): Chainable<DateInput>

			/**
			 * @description This method verifies if the date input selected have exactly value passed in parameter
			 * @inheritDoc{setDate function} take the same constraint of the `setDate` function parameter
			 */
			assertDate(year: number, month: number, day: number): Chainable<DateInput>
		}
	}
}

Cypress.Commands.add('getDateInputByTestId',(dateInputId: string, option?: WaitUntilOptions): Cypress.Chainable<DateInput> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new DateInput(dateInputId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	});
})


Cypress.Commands.add('setDate',{ prevSubject: true },(inputDate: DateInput, year: number, month: number, day: number): Cypress.Chainable<DateInput> => {
	return cy.wrap(inputDate)
		.wait(100)
		.invoke('setDate', year, month, day)
		.wrap(inputDate)
})

Cypress.Commands.add('setDatePickerOpened',{ prevSubject: true },(inputDate: DateInput, year: number, month: number, day: number): Cypress.Chainable<DateInput> => {
	return cy.wrap(inputDate)
		.wait(300)
		.invoke('setDatePanelOpened', year, month, day)
		.wrap(inputDate)
})

Cypress.Commands.add('setDateToday',{ prevSubject: true },(inputDate: DateInput): Cypress.Chainable<DateInput> => {
	return cy.wrap(inputDate)
		.wait(300)
		.invoke('setDateToday')
		.wrap(inputDate)
})

Cypress.Commands.add('setDateTodayPickerOpened',{ prevSubject: true },(inputDate: DateInput): Cypress.Chainable<DateInput> => {
	return  cy.wrap(inputDate)
		.wait(300)
		.invoke('setTodayDatePanelOpened')
		.wrap(inputDate)
})

Cypress.Commands.add('closePickerOpened',{ prevSubject: true },(inputDate: DateInput): Cypress.Chainable<DateInput> => {
	return  cy.wrap(inputDate)
		.wait(500)
		.invoke('collapseDatePanel')
		.wrap(inputDate)
})

Cypress.Commands.add('assertDate', { prevSubject: true }, (inputDate: DateInput, year: number, month: number, day: number): Cypress.Chainable<DateInput> => {
	 return cy.wrap(inputDate)
		 .invoke('getDate')
		 .should('eq', new Date(year, month, day))
		 .wrap(inputDate)
})

export {}
