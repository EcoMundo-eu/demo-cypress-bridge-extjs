import { Component } from './BaseComponent';
import { ExtJS } from "../../definition/ExtJS";

export class Checkbox extends Component<ExtJS.Checkbox> {
	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
	}

	check(): void {
		this.getExtJSCmp().setValue(true)
	}

	uncheck(): void {
		this.getExtJSCmp().setValue(false)
	}
}