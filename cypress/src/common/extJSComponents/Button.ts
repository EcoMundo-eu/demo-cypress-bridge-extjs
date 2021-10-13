import { Component } from "./BaseComponent";
import {ExtJS} from "../../definition/ExtJS";

export class Button extends Component<ExtJS.Button> {

    constructor(testId:string, extJs: ExtJS.Ext) {
        super(testId, extJs);
    }

    click(): void {
        if( typeof  this.getExtJSCmp().click  === 'function')
        this.getExtJSCmp().click();
        else   if( typeof  this.getExtJSCmp().handler === 'function')
        this.getExtJSCmp().handler();
        else console.error('this component is not clickable : '+this.testId);
    }
}
