import { Chart } from '../../src/common/extjsComponents/Chart';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Get a chart by its test id
			 * @param chartTestId {string}
			 * @param option
			 */
			getChartByTestId(chartTestId: string, option?: WaitUntilOptions): Chainable<Chart>

			/**
			 * @description show/hide data in chart
			 * @param index {number}
			 * @param value {boolean} true => show, false => hide
			 */
			toggleLegendItem(index: number, value:boolean): Chainable<Chart>

			/**
			 * @description assert data is visible in chart
			 * @param index {number}
			 */
			assertDataVisible(index:number): Chainable<Chart>

			/**
			 * @description assert data is hidden in chart
			 * @param index {number}
			 */
			assertDataHidden(index:number): Chainable<Chart>
		}
	}
}

Cypress.Commands.add('getChartByTestId', (chartTestId: string, option?: WaitUntilOptions): Cypress.Chainable<Chart> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new Chart(chartTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('toggleLegendItem', { prevSubject: true }, (chart: Chart, index:number, value:boolean): Cypress.Chainable<Chart> => {
    return cy.wrap(chart)
    .invoke('toggleLegendItem',index,value)
    .then(() => {return cy.wrap(chart)})
})
Cypress.Commands.add('assertDataVisible', { prevSubject: true }, (chart: Chart, index:number): Cypress.Chainable<Chart> => {
    return cy.wrap(chart)
    .invoke('getHidden',index)
    .then((array) => {
		cy.wrap(array[index])
		.should('eq',false);
	}).wrap(chart);
})

Cypress.Commands.add('assertDataHidden', { prevSubject: true }, (chart: Chart, index:number): Cypress.Chainable<Chart> => {
    return cy.wrap(chart)
    .invoke('getHidden',index)
    .then((array) => {
		cy.wrap(array[index])
		.should('eq',true);
	}).wrap(chart);
})
export {}
