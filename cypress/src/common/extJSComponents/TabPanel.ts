import { Component } from './BaseComponent';
import { ExtJS } from '../../definition/ExtJS';

export class TabPanel extends Component<ExtJS.TabPanel> {

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

	selectTabByIndex(tabIndex: number): void {
		this.getExtJSCmp().setActiveTab(tabIndex)
	}

	selectTabById(tabId: string): void {
		const result = this.getExtJSCmp().items.items.filter((item: ExtJS.Component) => item.testId === tabId || item.itemId === tabId)
		this.getExtJSCmp().setActiveTab(result[0].id)
	}
}