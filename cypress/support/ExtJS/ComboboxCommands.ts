import { ComboBox } from '../../src/common/extJSComponents/ComboBox';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			/**
			 * @description Get a combobox by its test id
			 * @param comboboxTestId {string}
			 * @param option
			 */
			getComboboxByTestId(comboboxTestId: string, option?: WaitUntilOptions): Chainable<ComboBox>

			/**
			 * @description Get a combobox in editable grid row
			 * @param gridTestId {string}
			 * @param elementIndex {number} index of the combobox in row
			 * @example cy.getInlineComboboxInRowGrid('grid',0)
			 */
			getInlineComboboxInRowGrid(gridTestId: string, elementIndex: number): Cypress.Chainable<ComboBox>
			/**
			 * @description Get a combobox in editable grid cell
			 * @param gridTestId {string}
			 * @example cy.getGridBytestId('grid').getCellHtmlElByColumnKey('key').click().getInlineComboboxInRowGrid('grid',0)
			 */
			getInlineComboboxInCellGrid(gridTestId: string): Cypress.Chainable<ComboBox>
			waitComboboxLoader(combobox: ComboBox, option?: object): Chainable<ComboBox>
			expandAndWaitComboboxLoader(option?: object): Chainable<ComboBox>
			selectComboboxItemByIndex(rowIndex: number): Chainable<ComboBox>

			/**
			 * @description select multi items inside combobox
			 * @param rowIndexes {number[]}, it takes a number between 0..N
			 * @example
			 * .multiSelectComboboxItemByIndexes(0, 1, 3, 5)
			 */
			multiSelectComboboxItemByIndexes(... rowIndexes: number[]): Chainable<ComboBox>
			selectComboboxItemByKeyValue(key: string, value: string): Chainable<ComboBox>
			selectComboboxItemByDisplayField(name: string): Chainable<ComboBox>
			selectManyComboboxItemByDisplayField(names: string[]): Chainable<ComboBox>

			/**
			 * @description clear combobox selection
			 */
			resetCombobox(): Chainable<ComboBox>
		}
	}
}

Cypress.Commands.add('getComboboxByTestId', (comboboxTestId: string, option?: WaitUntilOptions): Cypress.Chainable<ComboBox> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new ComboBox(comboboxTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	});
})


Cypress.Commands.add('getInlineComboboxInRowGrid',(gridTestId: string, elementIndex: number): Cypress.Chainable<ComboBox> => {
	return cy.findAllByTestId(gridTestId).filter(':visible').find('[id^="roweditor"][id$="targetEl"]> div:visible').eq(elementIndex)
	.then((element)=>{
		console.log('elemnt', element[0].id)
		return cy.getExtJS().then((Ext) => {
			const input = new ComboBox(element[0].id, Ext)
			return cy.wrap(input).waitInitExtJSComponent()
		})
	})
})

 Cypress.Commands.add('getInlineComboboxInCellGrid',(gridTestId: string): Cypress.Chainable<ComboBox> => {
	return cy.findAllByTestId(gridTestId).filter(':visible').find('[id^="celleditor"]> div:visible')
	.then((element)=>{
		return cy.getExtJS().then((Ext) => {
			const input = new ComboBox(element[0].id, Ext)
			return cy.wrap(input).waitInitExtJSComponent()
		})
	})
})

Cypress.Commands.add('waitComboboxLoader', (combobox: ComboBox, option?: object): Cypress.Chainable<any> => {
	const boundlist = combobox.getExtJSCmp().getPicker()
	return cy.wrap(boundlist.loadMask, option)
		.invoke('isVisible')
		.should('eq',false)
})

Cypress.Commands.add('selectComboboxItemByIndex', { prevSubject: true }, (combobox: ComboBox, rowIndex: number) => {
	return cy.wrap(combobox)
		.expandAndWaitComboboxLoader()
		.then(() => {
			const record = combobox.getStore().getAt(rowIndex)
			if(!record)
				throw new Error('Store record with index "'+rowIndex+'" not found')

			return cy.wrap(combobox)
				.invoke('setValue',record)
				.wrap(combobox)
				.invoke('fireEvent','select',record)
				.then(() => cy.wrap(combobox))
		})
})

Cypress.Commands.add('multiSelectComboboxItemByIndexes', { prevSubject: true }, (combobox: ComboBox, ...rowIndexes: number[]) => {
	return cy.wrap(combobox)
		.expandAndWaitComboboxLoader()
		.then(() => {
			return cy.wrap(combobox)
				.invoke('multiSelectItemIndexes', rowIndexes)
				.wrap(combobox);
		})
})

Cypress.Commands.add('selectComboboxItemByKeyValue', { prevSubject: true }, (combobox: ComboBox, key: string, value: string) => {
	return cy.wrap(combobox)
		.expandAndWaitComboboxLoader()
		.then(() => {
			const record = combobox.getStore().findRecord(key, value)
			if(!record)
				throw new Error('Store record with key "'+ key +'" and value "'+ value +'" not found')

			return cy.wrap(combobox)
				.invoke('setValue',record)
				.wrap(combobox)
				.invoke('fireEvent','select',record)
				.then(() => cy.wrap(combobox))
		})
})

Cypress.Commands.add('selectComboboxItemByDisplayField', { prevSubject: true }, (combobox: ComboBox, name: string) => {

	return cy.wrap(combobox)
		.expandAndWaitComboboxLoader()
		.then(() => {
			console.log("combobox",combobox.getStore().getData());
			const record = combobox.getStore().findRecord(combobox.getDisplayField(), name)
			if(!record)
				throw new Error('Store record with name "'+ name +'" not found')
			return cy.wrap(combobox)
				.invoke('setValue',combobox.isMultiSelect() ? [record] : record)
				.wrap(combobox)
				.invoke('fireEvent','select',record)
				.then(() => cy.wrap(combobox))
		})
})

Cypress.Commands.add('selectManyComboboxItemByDisplayField', { prevSubject: true }, (combobox: ComboBox, names: string[]) => {

	return cy.wrap(combobox)
		.expandAndWaitComboboxLoader()
		.then(() => {
			const records = []
			for(const name of names){
				const data = combobox.getStore().findRecord(combobox.getDisplayField(), name)
				if(data) records.push(data)
			}
			return cy.wrap(combobox)
				.invoke('setValue',records)
				.wrap(combobox)
				.invoke('fireEvent','select',records)
				.then(() => cy.wrap(combobox))
		})
})


Cypress.Commands.add('expandAndWaitComboboxLoader', { prevSubject: true }, (combobox: ComboBox, option: object = { timeout: 3000 }): Cypress.Chainable<any> => {
	combobox.expand()
	const store = combobox.getExtJSCmp().getStore()
	return cy.wrap(store)
		.invoke('isLoading')
		.should('eq', false)
		.wait(500)
		.then(() => {
			if(store.getProxy().type === 'ajax') {
				const boundlist = combobox.getExtJSCmp().getPicker()
				if(typeof boundlist.loadMask !== 'boolean'){
					return cy.wrap(boundlist.loadMask, option)
						.invoke('isVisible')
						.should('eq', false)
						.wait(800)
						.then(() => {
							return cy.wrap(combobox)
						})
				} else {
					return cy.wrap(boundlist.loadMask, option)
						.wait(800)
						.then(() => {
							return cy.wrap(combobox)
						})
				}
			}
			return cy.wrap(combobox)
		})
})

Cypress.Commands.add('resetCombobox', { prevSubject: true }, (comboBox: ComboBox): Cypress.Chainable<ComboBox> => {
	cy.wrap(comboBox)
	.invoke('resetField')
	return cy.wrap(comboBox)
})
export {};
