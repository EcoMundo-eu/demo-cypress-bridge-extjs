import { Component } from './BaseComponent';
import {ExtJS} from "../../definition/ExtJS";

export class ButtonToolbar extends Component<ExtJS.ToolBar> {

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

	selectTabByIndex(itemIndex: number): void {
		const dom: HTMLElement = <HTMLElement>this.getExtJSCmp().getEl().dom.children[0].children[0]
		if (dom.children.length < 1) {
			throw Error(`This id "${this.testId}" haven't element to select`)
		} else if(itemIndex > (dom.children.length - 1)) {
			throw Error('Out of bounds Index, please verify your index entered')
		} else {
			const children: HTMLElement = <HTMLElement>dom.children[itemIndex];
			children.click();
		}
	}

	selectTabById(itemId: string): void {

	}
}