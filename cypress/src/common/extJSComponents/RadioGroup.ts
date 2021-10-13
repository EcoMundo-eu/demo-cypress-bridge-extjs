import { Component } from './BaseComponent';
import {ExtJS} from "../../definition/ExtJS";

export class RadioGroup extends Component<ExtJS.RadioGroup> {

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

	/**
	 * Choose one item in Radio button by its value
	 * @param inputValue
	 */
	checkElementByValue(inputValue: string | number | boolean) {
		this.getExtJSCmp().items.items.filter((e:any) => e.inputValue == inputValue)[0].setValue(true);
	}

	/**
	 * Check if inputValue was selected
	 * @param inputValue
	 */
	isCheckedElementByValue(inputValue: string | number | boolean): boolean{
		return this.getExtJSCmp().items.items.filter((e:any) => e.inputValue == inputValue)[0].value === true;
	}

	/**
	 * Choose one item in Radio button by its index
	 * @param index
	 */
	checkElementByIndex(index: number) {
		this.getExtJSCmp().items.items[index].setValue(true)
	}

	/**
	 * Check if index was selected
	 * @param index
	 */
	isCheckElementByIndex(index: number): boolean {
		return this.getExtJSCmp().items.items[index].value === true;
	}
}