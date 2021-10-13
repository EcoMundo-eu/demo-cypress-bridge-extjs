declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Get a colorpicker by its test id
			 * @param colorPickerTestId {string}
			 */
			getColorPickerByTestId(colorPickerTestId: string): Chainable<any>
            /**
			 * @description open the colorpicker
			 */
             openColorPicker(): Chainable<any>
			/**
			 * @description select color
			 */
			selectColorByIndex(index: number): Chainable<any>
		}
	}
}


Cypress.Commands.add('getColorPickerByTestId', (colorPickerTestId: string): Cypress.Chainable<JQuery<HTMLElement>> => {
	return cy.findByTestId(colorPickerTestId).find('.sp-replacer');
})

Cypress.Commands.add('openColorPicker', { prevSubject: true }, (colorPickerElement: JQuery<HTMLElement>) => {
	cy.wrap(colorPickerElement).click({force:true})
})

Cypress.Commands.add('selectColorByIndex', (index: number) => {
	cy.get('.sp-palette-container').find('.sp-palette > div > span').getElementByIndex(index).then(($el)=>{
        cy.wrap($el).click({force:true})
    })
})
export {}