import {Input} from "./Input";

export class TextArea extends Input {

	constructor(testId: string, ExtJS: ExtJS.Ext) {
		super(testId, ExtJS);
		this.checkXType('textareafield')
	}

	insertBreakLine(): this {
		this.setValue(`${this.getValue()}\n`);
		return this;
	}
}