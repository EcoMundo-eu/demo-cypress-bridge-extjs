import { TreeGrid } from '../../src/common/extjsComponents/TreeGrid';
import { Grid } from '../../src/common/extjsComponents/BaseGrid'
import {Component} from "../../src/common/extjsComponents/BaseComponent";
import {ExtJS} from "../../src/definition/ExtJS";
import Field = ExtJS.Field;

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Get a grid by its test id
			 * @param gridTestId {string}
			 * @param option
			 */
			getGridByTestId(gridTestId: string, option?: WaitUntilOptions): Chainable<Grid<any>>

			/**
			 * assert grid if is empty
			 */
			assertGridIsNotEmpty(): Chainable<Grid<any>>

			/**
			 * Select grid row by key value
			 * @param key - the key of data in model or data index of column
			 * @param value
			 */
			selectGridRowByKeyValue(key: string, value: string): Chainable<Grid<any>>

			/**
			 * Double click for selecting row
			 * @param grid
			 */
			dblclickSelectedRow(grid: Grid<any>): Chainable<Grid<any>>

			/**
			 * Wait cosmetic grid loader
			 * @param option
			 */
			waitGridLoader(option?: object): Chainable<Grid<any>>


			selectGridRowByIndex(rowIndex: number): Chainable<TreeGrid>

			/**
			 * @description this command allows to select multi row in the grid
			 * @example
			 * .multiSelectGridRowByIndex(0,3,4)
			 * this command above selects the first line, the third and the fourth line
			 * @param rowIndexes
			 */
			multiSelectGridRowByIndex(...rowIndexes: number[]): Chainable<Grid<any>>

			/**
			 * @description this command allows to select multi row in the grid by keyValue
			 * @param keysValues {{ key: string, value: string }[]}, keysValues represents an array object in which object can represent two proprieties key and value
			 * @example
			 * .multiSelectGridRowByKeyValue({key: 'name', value: 'Test'}, {key: 'concentration', value: '2500'})
			 * this command above selects the row which have key "name" with value "Test" and key "concentration" with value "2500"
			 */
			multiSelectGridRowByKeyValue(... keysValues: { key: string, value: string }[]): Chainable<Grid<any>>
			clickSelectedRow(grid: Grid<any>): Chainable<Grid<any>>


			sglclickRowByIndex(rowIndex: number): Chainable<Grid<any>>
			sglclickRowByKeyValue(key: string, value: string): Chainable<Grid<any>>

			/**
			 * @description get the a specific filter field by column key
			 * @param key {string} - the key of column maybe its dataIndex
			 */
			getFilterBarFieldByKey(key: string): Chainable<Component<any>>
			/**
			 * @description set value for filter by data index
			 * @param key {string} - the key of column which maybe its dataIndex
			 * @param value {string | number}
			 */
			setFilterValueByKey(key: string, value: string | number): Chainable<Grid<any>>

			/**
			 * @description set value for filter by data index
			 * @param key {string} - the key of column which maybe its dataIndex
			 * @param value {string | number}
			 */
			resetFilterValueByKey(key: string, value: string | number): Chainable<Grid<any>>

			/**
			 * @description After selecting a row in the grid, we can get a HTML element for one cell in the row,
			 * and manipulate it with cypress features like click, assertion, ...etc.
			 * @param columnKey
			 * @example select and click a cell where places in third row with column key 'concRealUbound'
			 * cy.getGridByTestId('viewproductitemscompositionrawmaterialgrid')
			 * 	.selectGridRowByIndex(2)
			 *	.getCellHtmlElByColumnKey('concRealUbound')
			*	.click()
			*/
			getCellHtmlElByColumnKey(columnKey: string): Chainable<HTMLElement>
		}
	}
}

Cypress.Commands.add('getGridByTestId', (gridTestId: string, option?: WaitUntilOptions) => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new Grid(gridTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('assertGridIsEmpty',{	prevSubject: true }, (grid: Grid<any>) => {
	cy.log('assertGridIsEmpty').wrap(grid)
		.invoke('getStore')
		.invoke('getCount')
		.should('eq', 0);
	return cy.wrap(grid)
})


Cypress.Commands.add('assertGridIsNotEmpty',{ prevSubject: true }, (grid: Grid<any>) => {
	cy.log('assertGridIsNotEmpty').wrap(grid)
		.invoke('getStore')
		.invoke('getCount')
		.should('be.gt', 0)
	return cy.wrap(grid)
})

Cypress.Commands.add('selectGridRowByIndex', { prevSubject: true },(grid: Grid<any>, rowIndex: number, keepExisting?:boolean) => {
	return cy.wrap(grid)
		.invoke('selectRecordByIndex',rowIndex, keepExisting)
		.then(() => {
			return cy.wait(500).wrap(grid)
		})
})

Cypress.Commands.add('select', { prevSubject: true },(grid: Grid<any>, rowIndex: number) => {
	return cy.wrap(grid)
		.invoke('select',[rowIndex])
		.then(() => {
			return cy.wait(500).wrap(grid)
		})
})

Cypress.Commands.add('multiSelectGridRowByIndex', { prevSubject: true },(grid: Grid<any>, ... rowsIndexes: number[]): Cypress.Chainable<Grid<any>> => {
	return cy.wrap(grid)
		.invoke('multiSelectRecordByIndex',rowsIndexes)
		.then(() => {
			return cy.wait(500).wrap(grid)
		})
})

Cypress.Commands.add('multiSelectGridRowByKeyValue', { prevSubject: true },(grid: Grid<any>, ... keysValues: { key: string, value: string }[]): Cypress.Chainable<Grid<any>> => {
	return cy.wrap(grid)
		.invoke('multiSelectRecordByKeyValue', keysValues)
		.then(() => {
			return cy.wait(500).wrap(grid)
		})
})

Cypress.Commands.add('clickSelectedRow', { prevSubject: true },(grid: Grid<any>) => {
	cy.wrap(grid)
		.as('grid')
		.invoke('isRowSelected')
		.should('eq', true)
		.get('@grid')
		.invoke('getView')
		.invoke('getSelectedNodes')
		.then($elements => {
			let elementId = `#${$elements[0].id}`
			cy.get(elementId).click()
		})
})

Cypress.Commands.add('dblclickSelectedRow', { prevSubject: true },(grid: Grid<any>) => {
	return cy.wrap(grid)
		.invoke('getDom')
		.then($dom => {
			cy.waitUntil(() => grid.getExtJSCmp().getSelected().length > 0, { timeout: 20000})
				.waitUntil(() => grid.getExtJSCmp().getStore().indexOf(grid.getExtJSCmp().getSelected().items[0]) >= 0, { timeout: 20000})
				.then(() => {
					let rowIndex = grid.getExtJSCmp().getStore().indexOf(grid.getExtJSCmp().getSelected().items[0]);
					cy.wrap($dom)
						.find(`[data-recordindex="${rowIndex}"]`)
						.dblclick()
				})
		}).wrap(grid)
})

Cypress.Commands.add('selectGridRowByKeyValue', { prevSubject: true },(grid: Grid<any>, key: string, value: string) => {
	return cy.wrap(grid)
		.invoke('selectRecordByKeyValue', key, value)
		.then(() => {
			return cy.wrap(grid)
		})
})

Cypress.Commands.add('getFilterBarFieldByKey', { prevSubject: true },(grid: Grid<any>, key: string): Cypress.Chainable<Field> => {
	return cy.wrap(grid)
		.invoke('getFilterFieldByDataIndex', key)
})

Cypress.Commands.add('setFilterValueByKey', { prevSubject: true },(grid: Grid<any>, key: string, value: string | number): Cypress.Chainable<Grid<any>> => {
	return cy.wrap(grid)
		.invoke('setFilterValueByDataIndex', key, value)
		.wrap(grid);
})

 Cypress.Commands.add('resetFilterValueByKey', { prevSubject: true },(grid: Grid<any>, key: string, value: string | number): Cypress.Chainable<Grid<any>> => {
	return cy.wrap(grid)
		.invoke('resetFilterValueByDataIndex', key, value)
		.wrap(grid);
})

Cypress.Commands.add('sglclickRowByIndex', { prevSubject: true }, (grid: Grid<any>, rowIndex: number) => {
	return cy.wrap(grid)
		.selectGridRowByIndex(rowIndex)
		.invoke('sglClickRecordByIndex', rowIndex)
		.then(() => {
			return cy.wrap(grid)
		})
})

Cypress.Commands.add('sglclickRowByKeyValue', { prevSubject: true }, (grid: Grid<any>, key: string, value:string) => {
	return cy.wrap(grid)
		.selectGridRowByKeyValue(key, value)
		.invoke('sglClickRecordByKeyValue', key, value)
		.then(() => {
			return cy.wrap(grid)
		})
})

Cypress.Commands.add('getCellHtmlElByColumnKey', { prevSubject: true },(grid: Grid<any>, columnKey: string): Cypress.Chainable<HTMLElement> => {
	return cy.wrap(grid)
		.invoke('getCellDOMByColumnKey', columnKey)
})
export {}
