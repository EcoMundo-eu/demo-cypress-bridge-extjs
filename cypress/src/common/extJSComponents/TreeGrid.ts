import { Grid } from './BaseGrid';

export class TreeGrid extends Grid<ExtJS.TreePanel> {

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

	expandRowByIndex(rowIndex: number): void {
		const tableView = this.getExtJSCmp().getView()
		const record = tableView.getRecord(tableView.getRow(rowIndex))
		this.getExtJSCmp().expandPath(record.getPath())
	}

	expandRowByRecordKeyValue(keyName: string, valueName: string): void {
		const record: ExtJS.Model = this.getExtJSCmp().getStore().findRecord(keyName, valueName)
		this.getExtJSCmp().expandPath(record.getPath())
	}

	expandRowByName(name: string): void {
		this.expandRowByRecordKeyValue('name',name)
	}

	fireDeleteEventByRecordIndex(rowIndex: number) {
		const data: ExtJS.Model = this.getRecordByIndex(rowIndex)
		this.getExtJSCmp().events.deleterow.listeners[0].fireFn(self,data)
	}

	fireDeleteEventByRecordKeyValue(key: string, value: string) {
		const data: ExtJS.Model = this.getExtJSCmp().getStore().findRecord(key, value)
		this.getExtJSCmp().events.deleterow.listeners[0].fireFn(self,data)
	}

	fireDeleteEventByRecordName(recordName: string) {
		const data: ExtJS.Model = this.getExtJSCmp().getStore().findRecord('name', recordName)
		this.getExtJSCmp().events.deleterow.listeners[0].fireFn(self,data)
	}

}