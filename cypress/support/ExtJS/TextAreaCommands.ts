import {TextArea} from "../../src/common/extjsComponents/TextArea";

declare global {
	namespace Cypress {
		interface Chainable<Subject> {

			/**
			 * @description select a textArea by its testId
			 * @param textAreaTestId {string}
			 * @param option
			 */
			getTextAreaByTestId(textAreaTestId: string, option?: WaitUntilOptions): Chainable<TextArea>

			/**
			 * @description write a text inside a textArea by passing a text.
			 * @param text {string}
			 */
			writeTextArea(text: string): Chainable<TextArea>

			/**
			 * @description clear text
			 */
			clearTextArea(): Chainable<TextArea>

			/**
			 * @description insert breakline
			 */
			insertBreakLineTextArea(): Chainable<TextArea>

			/**
			 * @description assert a textArea by a string
			 * @param text {string}
			 */
			assertTextAreaValue(text: string): Chainable<TextArea>
		}
	}
}

Cypress.Commands.add('getTextAreaByTestId',(textAreaTestId: string, option?: WaitUntilOptions): Cypress.Chainable<TextArea> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new TextArea(textAreaTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('writeTextArea',{ prevSubject: true },(textArea: TextArea, text: string): Cypress.Chainable<TextArea> => {
	return cy.wait(300)
		.wrap(textArea)
		.invoke('appendValue', text)
		.wrap(textArea)
})

Cypress.Commands.add('clearTextArea', { prevSubject: true }, (textArea: TextArea): Cypress.Chainable<TextArea> => {
	return cy.wait(300)
		.wrap(textArea)
		.invoke('resetField')
		.wrap(textArea)
})

Cypress.Commands.add('insertBreakLineTextArea', { prevSubject: true }, (textArea: TextArea): Cypress.Chainable<TextArea> => {
	return cy.wait(300)
		.wrap(textArea)
		.invoke('insertBreakLine')
		.wrap(textArea)
})

Cypress.Commands.add('assertTextAreaValue', { prevSubject: true }, (textArea: TextArea, text: string): Cypress.Chainable<TextArea> => {
	return cy.wrap(textArea)
		.invoke('getValue')
		.should('eq', text)
		.wrap(textArea)
})

export {}
