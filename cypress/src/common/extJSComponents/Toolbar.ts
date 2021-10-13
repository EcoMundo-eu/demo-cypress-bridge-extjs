import { Component } from './BaseComponent';

export class Toolbar extends Component<ExtJS.ToolBar> {

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

	selectTabByIndex(itemIndex: number): void {
		const button: ExtJS.Button = this.getExtJSCmp().items.getAt<ExtJS.Button>(itemIndex)
		button.click()
	}

	selectTabById(itemId: string): void {
		const button: ExtJS.Button = this.getExtJSCmp().items.getByKey<ExtJS.Button>(itemId)
		button.click()
	}
}