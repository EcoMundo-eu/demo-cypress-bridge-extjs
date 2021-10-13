import {ExtJS} from '../../definition/ExtJS';
import {Component} from './BaseComponent';
import Column = ExtJS.Column;
import Field = ExtJS.Field;


/**
 * @example
 * const grid = new Grid('viewproductitemscompositionrawmaterialgrid', Ext);
 * grid.selectRecordByIndex(2)
 * .clickSelectedRow()
 */
export class Grid<T extends ExtJS.Grid> extends Component<T> {

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

	getStore(): ExtJS.Store {
		return this.getExtJSCmp().getStore()
	}

	getData(): ExtJS.Data {
		return this.getStore().getData();
	}

	getItems(): any[] {
		return this.getData().items
	}

	getRecordByIndex(recordIndex: number): ExtJS.Model {
		return this.getStore().getAt(recordIndex)
	}


	getSelectionModel(): ExtJS.DataViewModel {
		return this.getExtJSCmp().getSelectionModel()
	}

	/**
	 * After selecting a row in the grid, we can get the HTML element for specific cell
	 * @param columnKey
	 */
	getCellDOMByColumnKey(columnKey: string): HTMLElement {
		const selectedRecord = this.getSelection()[0];

		if(selectedRecord === undefined) {
			throw Error('You have to select one row before using this command');
		} else {
			const columnVisibleIndex = this.getColumns()
				.filter(e => !e.hidden && !e.hiddenAncestor)
				.findIndex(e => e.dataIndex === columnKey)
			return this.getView().getCell(
				selectedRecord,
				columnVisibleIndex
			);
		}
	}

	selectTheLastRow(): this{
		this.selectRecordByIndex(this.getTotalRow());
		return this;
	}

	getRecordByKeyValue(keyName: string, valueName: string): ExtJS.Model {
		return this.getExtJSCmp().getStore().findRecord(keyName, valueName/*, 0, false, false, true*/)
	}

	getTotalRow(): number {
		return this.getStore().getCount()
	}

	selectRecordByIndex(rowIndex: number | any): this {
		debugger;

		try {
			const scrollToFn = this.getExtJSCmp().getView().bufferedRenderer;
			if (scrollToFn === undefined) {
				this.getSelectionModel()
				.select(rowIndex);
			} else {
		 		this.getExtJSCmp().getView().bufferedRenderer.scrollTo(rowIndex, true);
			}
		} catch (e) {
			this.getExtJSCmp().select(rowIndex)
		}
		return this;
	}

	/**
	 * @description select multi row in the grid
	 * @param rowsIndexes
	 */
	multiSelectRecordByIndex(rowsIndexes: number[]): this {
		if (this.getSelectionModel().selectionMode === 'MULTI') {
			const sortRows = rowsIndexes.sort((a, b) => a-b)
			const sortRowsLength = (sortRows.length - 1);
			const minIndex = sortRows[0];
			const maxIndex = sortRows[sortRowsLength];
			this.getSelectionModel().selectRange(minIndex, maxIndex)
			for(let i = 0; i < maxIndex; i++) {
				if (sortRows.indexOf(i) === -1)
					this.getSelectionModel().deselect(i);
			}
		} else {
			throw Error(`This grid don't support multi-selection`)
		}
		return this;
	}

	/**
	 * @description select multi row in the grid by key value
	 * @param keysValues
	 */
	multiSelectRecordByKeyValue(keysValues: { key: string, value: string }[]): this {
		let rowsIndexes = [];

		for(const keyValue of keysValues) {
			const row = this.getRecordByKeyValue(keyValue.key, keyValue.value);
			if (row) {
				const rowIndex = this.getExtJSCmp().getStore().indexOf(row);
				rowsIndexes.push(rowIndex);
			}
		}

		this.multiSelectRecordByIndex(rowsIndexes);

		return this;
	}

	/**
	 * @description: Enhance click on selected row in the grid
	 */
	clickSelectedRow(): this {
		const selectedNode = this.getView().getSelectedNodes();
		if (this.isRowSelected()) {
			selectedNode[0].click();
			return this;
		}
		throw Error('You should call select row method before call this function!');
	}

	isRowSelected(): boolean {
		return this.getView().getSelectedNodes().length > 0;
	}

	/**
	 * @description get all columns in the grid
	 * @return Column[]
	 */
	getColumns(): Column[] {
		return this.getExtJSCmp().getColumns();
	}

	/**
	 * @description get filter field by data index columns
	 * @param keyName
	 */
	getFilterFieldByDataIndex(keyName: string): Field {
		return this.getColumns()
			.filter(e => e.dataIndex === keyName)[0]
			.getFilterType().field;
	}

	/**
	 * @description set filter value by column data index
	 * @param keyName
	 * @param value
	 */
	setFilterValueByDataIndex(keyName: string, value: string | number): this {
		try {
			this.getColumns()
				.filter(e => e.dataIndex === keyName)[0]
				.filter
				.setValue(value);
		} catch (e) {
			throw Error('Verify your key passed has a filter field.')
		}

		return this;
	}

	/**
	 * @description reset filter value by column data index
	 * @param keyName
	 * @param value
	 */
	 resetFilterValueByDataIndex(keyName: string): this {
		try {
			this.getColumns()
				.filter(e => e.dataIndex === keyName)[0]
				.getFilterType().field
				.reset();
		} catch (e) {
			throw Error('Verify your key passed has a filter field.')
		}

		return this;
	}

	selectRecordByKeyValue(keyName: string, valueName: string): this {
	 	const row = this.getRecordByKeyValue(keyName, valueName)
		this.selectRecordByIndex(row);
		return this;
	}

	getView(): ExtJS.ViewTable {
		return this.getExtJSCmp().getView();
	}

	dbClickRecordByIndex(rowIndex: number): this {
		// if((this.getTotalRow() - 1) < rowIndex) {
		// 	throw Error('Index of bounds, remember we start index by 0')
		// } else {
		const tableView = this.getView();
		const record = tableView.getRecord(tableView.getRow(rowIndex))
		tableView.fireEvent('itemdblclick',tableView,record)
		// }
		return this;
	}

	sglClickRecordByIndex(rowIndex: number): this {
		// if((this.getTotalRow() - 1) < rowIndex) {
		// 	throw Error('Index of bounds, remember we start index by 0')
		// } else {
		const tableView = this.getView();
		const record = tableView.getRecord(tableView.getRow(rowIndex))
		this.fireEvent('itemclick',record)
		// }
		return this;
	}

	sglClickRecordByKeyValue(keyName: string, valueName: string): this {
		const record = this.getRecordByKeyValue(keyName, valueName)
		const tableView = this.getExtJSCmp().getView()
		const nodeRecord = tableView.getRecord(tableView.getRow(record))
		this.fireEvent('itemclick',nodeRecord)
		return this;
	}

	dbClickRecordByKeyValue(keyName: string, valueName: string): this {
		try {
			const record = this.getRecordByKeyValue(keyName, valueName)
			const tableView = this.getExtJSCmp().getView()
			const nodeRecord = tableView.getRecord(tableView.getRow(record))
			tableView.fireEvent('itemdblclick',tableView,nodeRecord)
		} catch (e) {
			this.getExtJSCmp().fireEvent('itemdblclick', this.getExtJSCmp(), this.getExtJSCmp().getSelected())
		}
		return this;
	}

	editRecordByIndexAndCellKeyValue(recordIndex: number, key: string, value: string): this {
		const record = this.getRecordByIndex(recordIndex)
		record.data[key] = value
		record.commit()
		this.fireEvent('computelabellingmodel', record);
		return this;
	}
	/**
	 * @description add new records to grid
	 * @param data array of object to add and each object represent a new record
	 * @returns this grid
	 */
	addRecord(data: object[]):this{
		console.log(data);
		var store = this.getStore();
		var plugin = this.getExtJSCmp().getPlugin('volunteergridplugin');
		if(!plugin)
		{
			plugin = this.getExtJSCmp().getPlugin('pricinggridplugin');
		}

		var newModels = store.add(data);
		console.log(newModels);
		this.getView().refresh();
		if(plugin)
		{
			newModels.forEach(element => {
				plugin.fireEvent("edit",plugin,{record:element,newValues:newModels});
			});
		}
		return this;
	}

	getSelection(): Record<any, any>[] {
		return this.getExtJSCmp().getSelection();
	}

	/**
	 * Sort grid by ascending and selecting column key
	 * @param columnKey
	 */
	sortGridASCbyKey(columnKey: string): this {
		this.getExtJSCmp().getStore().sort({
			property : columnKey,
			direction: 'ASC'
		})
		return this;
	}

	/**
	 * Sort grid by descending and selecting column key
	 * @param columnKey
	 */
	sortGridDESCbyKey(columnKey: string): this {
		this.getExtJSCmp().getStore().sort({
			property : columnKey,
			direction: 'DESC'
		})
		return this;
	}

	/**
	 * get data inside a cell by index row and column key
	 * @param indexRow
	 * @param columnKey
	 */
	getCellDataByColumnKeyAndRowIndex(indexRow: number, columnKey: string): number | string | boolean {
		return this.getExtJSCmp().getStore().getAt(indexRow).get('DAP');
	}
}
