import { Input } from '../../src/common/extjsComponents/Input';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Get the an ExtJS input by its test id
			 * @param buttonToolbarTestId {string}
			 * @param option
			 */
			getInputByTestId(inputTestId: string, option?: WaitUntilOptions): Chainable<Input>

			/**
			 * @description get input in editor grid row
			 * @param gridTestId test id of the grid
			 * @param elementIndex index of the input in row
			 * @example cy.getInlineInputInRowGrid('grid',0)
			 */
			getInlineInputInRowGrid(gridTestId: string, elementIndex: number): Cypress.Chainable<Input>
			/**
			 * @description get input in editor grid row
			 * @param gridTestId test id of the grid
			 * @example cy cy.getGridBytestId('grid').getCellHtmlElByColumnKey('key').click().getInlineInputInCellGrid('grid')
			 */
			getInlineInputInCellGrid(gridTestId: string): Cypress.Chainable<Input>
			writeTextInput(text: string): Chainable<Input>
			clearTextInput(): Chainable<Input>
			assertInputValue(text: string): Chainable<Input>
			fireEvent(eventName: string, value: string): Chainable<Input>
		}
	}
}

Cypress.Commands.add('getInputByTestId',(inputTestId: string, option?: WaitUntilOptions): Cypress.Chainable<Input> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new Input(inputTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})


Cypress.Commands.add('getInlineInputInRowGrid',(gridTestId: string, elementIndex: number): Cypress.Chainable<Input> => {
	return cy.findAllByTestId(gridTestId).filter(':visible').find('[id^="roweditor"][id$="targetEl"]> div:visible').eq(elementIndex)
	.then((element)=>{
		return cy.getExtJS().then((Ext) => {
			const input = new Input(element[0].id, Ext)
			return cy.wrap(input).waitInitExtJSComponent()
		})
	})
})

 Cypress.Commands.add('getInlineInputInCellGrid',(gridTestId: string): Cypress.Chainable<Input> => {
	return cy.findAllByTestId(gridTestId).filter(':visible').find('[id^="celleditor"]> div:visible')
	.then((element)=>{
		return cy.getExtJS().then((Ext) => {
			const input = new Input(element[0].id, Ext)
			return cy.wrap(input).waitInitExtJSComponent()
		})
	})
})

Cypress.Commands.add('writeTextInput',{ prevSubject: true },(input: Input, text: string): Cypress.Chainable<Input> => {
	return cy.wrap(input)
		.invoke('getExtJSCmp')
		.its('el')
		.its('dom')
		.then($input => {
			cy.wrap($input)
				.find('input')
				.clear()
				.type(text)
		}).wrap(input)
})

Cypress.Commands.add('clearTextInput', { prevSubject: true }, (input: Input): Cypress.Chainable<Input> => {
	cy.wrap(input)
	.invoke('resetField')
	return cy.wrap(input)
})

Cypress.Commands.add('assertInputValue', { prevSubject: true }, (input: Input, text: string): Cypress.Chainable<Input> => {
	return cy.findAllByTestId(input.testId).filter(':visible')
		.find('input')
		.should('have.value', text)
		.then(() => cy.wrap(input))
})

Cypress.Commands.add('fireEvent', { prevSubject: true }, (input: Input, eventName: string, value: string) => {
	return cy.wrap(input)
		.invoke('fireEvent',eventName, value)
		.then(() => cy.wrap(input))
})

export {}
