import { Component } from "./BaseComponent";
import {ExtJS} from "../../definition/ExtJS";

export class ComboBox extends Component<ExtJS.Combobox> {

    constructor(testId: string, extJs: ExtJS.Ext) {
        super(testId, extJs);
    }

    isMultiSelect(): boolean {
        return this.getExtJSCmp().multiSelect
    }

    getStore(): ExtJS.Store {
        return this.getExtJSCmp().getStore()
    }

    getDisplayField(){
        return this.getExtJSCmp().getDisplayField()
    }

    expand(): void {
        this.getExtJSCmp().expand()
    }

    resetField(): void {
        this.getExtJSCmp().reset()
    }

    setValue(value: object): void {
        this.getExtJSCmp().setValue(value)
    }

    selectItemIndex(valueIndex: number): void {
        const value: object = this.getStore().getAt(valueIndex)
        this.setValue(value)
        this.fireEvent('select',value)
    }

    multiSelectItemIndexes(indexes: number[]): this {
        if (this.isMultiSelect()) {
            const itemsSelected = this.getStore().getData().items.filter((current: any, index: number)=>{
                return indexes.indexOf(index)  !== -1;
            });

            this.setValue(itemsSelected);
        } else {
            throw "We cannot select multi line with this combobox"
        }

        return this;
    }

    selectItemByRecordKeyValue(keyName: string, valueName: string): void {
        const value: object = this.getStore().findRecord(keyName, valueName)
        this.setValue(value)
        this.fireEvent('select',value)
    }

    selectItemByName(name: string): void {
        this.selectItemByRecordKeyValue('name', name)
    }
}