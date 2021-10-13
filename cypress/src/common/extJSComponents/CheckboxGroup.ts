import { Component } from './BaseComponent';
import {ExtJS} from "../../definition/ExtJS";

export class CheckboxGroup extends Component<ExtJS.Checkbox> {

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

	/**
	 * Choose one item in the group by its value
	 * @param value
	 * @param checked
	 */
	checkElementByValue(value: string | number | boolean, checked: boolean): this {
		this.getExtJSCmp().items.items.filter((e:any) => e.inputValue == value)[0].setValue(checked);
		return this;
	}

	/**
	 * Choose one item in the group by its index
	 * @param index
	 * @param checked
	 */
	checkElementByIndex(index: number, checked: boolean): this {
		this.getExtJSCmp().items.items[index].setValue(checked)
		return this;
	}

	getCount(): number{
		return this.getExtJSCmp().items.items.length
	}
}