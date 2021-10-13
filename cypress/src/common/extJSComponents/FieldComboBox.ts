import {Component} from "./BaseComponent";
import {ExtJS} from "../../definition/ExtJS";
import Panel = ExtJS.Panel;



/**
 * @description This component is dedicated to manipulate the combobox which has extended 'ecojsLIB.widget.display.Field'
 * The xtype for this component may be:
 *  - ecojsLIB.form.field.StatusLovCombo
 *  - ecojsLIB.form.field.AssigneeField
 *  - ecojsLIB.form.field.MaterialField
 *  - ecojsLIB.form.field.ProjectLovCombo
 *  - ecojsLIB.form.field.StateField
 *  - ecojsLIB.form.field.TagLovCombo
 */
// @ts-ignore
export class FieldComboBox extends Component<ExtJS.FieldComboBox> {
    get panelOption(): ExtJS.Panel {
        return this._panelOption;
    }

    set panelOption(value: ExtJS.Panel) {
        this._panelOption = value;
    }

    /**
     * @description this variable hold the panel which contains the list of elements can select
     * @private
     */
    private _panelOption!: Panel;

    constructor(testId: string, extJs: ExtJS.Ext) {
        super(testId, extJs);
    }

    /**
     * @description expand list panel
     */
    expand(): this {
        this.getExtJSCmp().items.items[1].el.dom.click()
        // @ts-ignore
        this._panelOption = this.extJs.ComponentQuery.query('#paneloption')[0]
        this._panelOption.items.items[0].getStore().load();
        return this;
    }

    /**
     * @description select item by its index
     * @param rowIndex
     */
    selectValueByIndex(rowIndex: number): this {
        let row = this._panelOption.items.items[0].getStore().getAt(rowIndex);
        this.getExtJSCmp().setValue(row);
        return this;
    }

    /**
     * @description select item by its key and value
     * @param keyName
     * @param keyValue
     */
    selectValueByKey(keyName: string, keyValue: string): this {
        let row = this._panelOption.items.items[0].getStore().findRecord(keyName, keyValue);
        this.getExtJSCmp().setValue(row);
        return this;
    }

    /**
     * @description close list panel
     */
    collapse(): this {
        this._panelOption.destroy()
        return this;
    }

    /**
     * @description get picker which shows the list
     */
    getPicker(): ExtJS.Component {
        return this._panelOption.items.items[0].getPicker();
    }

    /**
     * @description get dom picker
     */
    getDOMPicker(): HTMLElement {
        return this.getPicker().el.dom;
    }

    /**
     * @description check if store is loaded or not
     */
    panelOptionStoreIsLoaded(): boolean {
        return this._panelOption.items.items[0].getStore().isLoaded();
    }

}
