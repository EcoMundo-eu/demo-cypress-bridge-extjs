import {WYSIWYG} from "../../src/common/extjsComponents/WYSIWYG";

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description This command allows us to select a WYSIWYG component by its "eco-test-id",
			 * you have to call it before using other commands.
			 * @param htmlEditorId {string}
			 * @param option
			 * @example
			 * cy.getWYSIWYGByTestId('ecotestidofwysiwig')
			 */
			getWYSIWYGByTestId(htmlEditorId: string, option ?: WaitUntilOptions): Chainable<WYSIWYG>

			/**
			 * @description Write a basic text inside WYSIWYG selected
			 * @param text {string}
			 */
			writeTextWYSIWYG(text: string): Chainable<WYSIWYG>

			/**
			 * @description Write a bold text inside WYSIWYG selected
			 * @param text {string}
			 */
			writeBoldText(text: string): Chainable<WYSIWYG>

			/**
			 * @description Write a italic text inside WYSIWYG selected
			 * @param text {string}
			 */
			writeItalicText(text: string): Chainable<WYSIWYG>

			/**
			 * @description Write a underline text inside WYSIWYG selected.
			 * @param text {string}
			 */
			writeUnderlineText(text: string): Chainable<WYSIWYG>

			/**
			 * @description Write a bold and italic text inside WYSIWYG selected.
			 * @param text {string}
			 */
			writeBoldAndItalicText(text: string): Chainable<WYSIWYG>

			/**
			 * @description Write a bold, italic and underline text inside WYSIWYG selected.
			 * @param text {string}
			 */
			writeBoldItalicAndUnderLineText(text: string): Chainable<WYSIWYG>

			/**
			 * @description Write a text with color inside WYSIWYG selected
			 * @param text {string}
			 * @param color {string}
			 * - default value is red
			 * - you can use other literal color like "green", "blue", etc.
			 * - Or use directly a hexadecimal color as #782520
			 */
			writeTextWithColor(text: string, color: string): Chainable<WYSIWYG>

			/**
			 * @description Insert hyperlink inside WYSIWYG selected.
			 * @param link
			 */
			writeHyperLink(link: string): Chainable<WYSIWYG>

			/**
			 * @description Write a bullet list
			 * @example
			 * ...
			 * .writeBulletList('First item', 'Second item', 'Third item')
			 * ...
			 * @param list
			 */
			writeBulletList(...list: string[]): Chainable<WYSIWYG>

			/**
			 * @description Write a ordered list
			 * @example
			 * ...
			 * .writeOrderedList('First item', 'Second item', 'Third item')
			 * ...
			 * @param list
			 */
			writeOrderedList(...list: string[]): Chainable<WYSIWYG>

			/**
			 * @description Align everything into the left
			 */
			alignLeft(): Chainable<WYSIWYG>

			/**
			 * @description Center everything
			 */
			alignCenter(): Chainable<WYSIWYG>

			/**
			 * @description Align everything into right
			 */
			alignRight(): Chainable<WYSIWYG>

			/**
			 * @description clear all text
			 */
			clearText(): Chainable<WYSIWYG>

			/**
			 * @description insertBreakLine
			 */
			insertBreakLine(): Chainable<WYSIWYG>

			/**
			 * @description insertTabulation
			 */
			insertTabulation(): Chainable<WYSIWYG>

			/**
			 * @description This method verifies if the WYSIWYG selected have exactly value passed in parameter
			 */
			assertText(htmlElement: string): Chainable<WYSIWYG>
		}
	}
}

Cypress.Commands.add('getWYSIWYGByTestId',(htmlEditorId: string, option?: WaitUntilOptions): Cypress.Chainable<WYSIWYG> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new WYSIWYG(htmlEditorId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('writeTextWYSIWYG',{ prevSubject: true },(htmlEditor: WYSIWYG, text: string): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertText', text)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('writeBoldText',{ prevSubject: true },(htmlEditor: WYSIWYG, text: string): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertBoldText', text)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('writeItalicText',{ prevSubject: true },(htmlEditor: WYSIWYG, text: string): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertItalicText', text)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('writeUnderlineText',{ prevSubject: true },(htmlEditor: WYSIWYG, text: string): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertUnderlineText', text)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('writeBoldAndItalicText',{ prevSubject: true },(htmlEditor: WYSIWYG, text: string): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertBoldAndItalicText', text)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('writeBoldItalicAndUnderLineText',{ prevSubject: true },(htmlEditor: WYSIWYG, text: string): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertBoldItalicAndUnderLineText', text)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('writeTextWithColor',{ prevSubject: true },(htmlEditor: WYSIWYG, text: string, color="red"): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertTextWithColor', text, color)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('writeHyperLink',{ prevSubject: true },(htmlEditor: WYSIWYG, link: string): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertHyperLink', link)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('writeBulletList',{ prevSubject: true },(htmlEditor: WYSIWYG, ...list: string[]): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertBulletList', ...list)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('writeOrderedList',{ prevSubject: true },(htmlEditor: WYSIWYG, ...list: string[]): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertOrderedList', ...list)
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('alignLeft',{ prevSubject: true },(htmlEditor: WYSIWYG): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('alignLeft')
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('alignRight',{ prevSubject: true },(htmlEditor: WYSIWYG): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('alignRight')
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('alignCenter',{ prevSubject: true },(htmlEditor: WYSIWYG): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('alignCenter')
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('clearText', { prevSubject: true }, (htmlEditor: WYSIWYG): Cypress.Chainable<WYSIWYG> => {
	htmlEditor.resetField();
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('insertBreakLine',{ prevSubject: true },(htmlEditor: WYSIWYG): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertBreakLine')
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('insertTabulation',{ prevSubject: true },(htmlEditor: WYSIWYG): Cypress.Chainable<WYSIWYG> => {
	cy.wrap(htmlEditor).wait(100).invoke('insertTabulation')
	return cy.wrap(htmlEditor)
})

Cypress.Commands.add('assertText', { prevSubject: true }, (htmlEditor: WYSIWYG, htmlElement: string): Cypress.Chainable<WYSIWYG> => {
	 return cy.wrap(htmlEditor)
		 .invoke('getText')
		 .should('eq', htmlElement)
		 .wrap(htmlEditor)
})


export {}
