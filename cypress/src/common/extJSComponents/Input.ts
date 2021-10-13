import {Component} from './BaseComponent';
import {ExtJS} from "../../definition/ExtJS";

export class Input extends Component<ExtJS.Input> {

    constructor(testId: string, ExtJS: ExtJS.Ext) {
        super(testId, ExtJS);
    }

    writeValue(text: string): this {
        if(text.length === 0)
            return this;
        this.getExtJSCmp().setValue(text);
        return this;
    }

    setValue(value: string | number | boolean): this {
        this.getExtJSCmp().setValue(value);
        return this;
    }

    appendValue(text: string | number | boolean | any): this {
    	if(this.getValue().length === 0)
			this.getExtJSCmp().setValue(`${text}`);
    	else
			this.getExtJSCmp().setValue(`${this.getValue()} ${text}`);
        return this;
    }

    getValue(): string {
        return this.getExtJSCmp().value;
    }

    resetField(): this {
        this.reset();
        return this;
    }

    reset() {
        this.getExtJSCmp().reset()
    }
}