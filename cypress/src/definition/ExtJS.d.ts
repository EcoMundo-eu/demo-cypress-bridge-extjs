export declare namespace ExtJS {
    interface Ext {
        getCmp<T>(id: string | undefined): T
        create(name: string, option?: object): object
        ComponentQuery: {
            query<T>(selector: string): T[]
        }
    }

    interface Selection {}
    interface DataViewModel extends Selection {
        selected: ExtJS.Model;
        selectionMode: string;
        select(record: number | Model): void

        selectRange(number: number, number2: number): void;

        deselect(i: number): void;
    }

    interface Data {
        items: any[];
    }
    interface Model extends Data {
        getPath(): string
        data: {
            [key: string]: any
        }
        commit(): void
        internalId: number

        getData(): any;

        get(dap: string): number | string | boolean;
    }
    interface Store extends Data {
        data: Collection
        isLoaded(): boolean
        getProxy(): Proxy
        isLoading(): boolean
        getCount(): number
        getAt(index: number): Model
        findRecord(fieldName: string, value: string | RegExp/*, startIndex: Number, anyMatch: Boolean,caseSensitive: Boolean, exactMatch?: boolean*/): Model
        getConfig(): {
            fields: object[]
        }
        fireEvent(eventName: string, self: Component, ...option: any): void
        getData(): ExtJS.Data;
        add(record: object[]): Model[];
        insert(index:number,record: object[]): Model[];

        sort(param: {property: string; direction: string}): void;

        indexOf(row: ExtJS.Model): any;
    }
    interface Proxy extends Data {
        type: string
    }

    interface Util {}
    interface Collection extends Util {
        items: Model[]
    }


    interface Dom {}
    interface Element extends Dom {
        dom: HTMLElement
        id: string
        events: {
            pointerover: Event,
            pointerout: Event
        }
    }
    interface Event {
        listeners: Action[]
    }
    interface Action {
        fireFn: any
    }


    interface Component {
        xtype: string | null;
        itemId: string;
        el: Element;
        addListener(eventName: string, fn: (...arguments: any) => void): void
        fireEvent(eventName: string, self: Component, ...option: any): void
        getEl(): Element
        getXType(): string
        isVisible(): boolean
        getX():number
        getY():number
        getDraggable():Object
        items: ItemCollection
        testId: string;
        id: string;

        setValue(checked: boolean): void;
    }

    interface Legend extends Component{
        setActiveItem(activeItem: Object | String |Number): void
        getSelected():Object
        all: Object
    }
    interface Series extends Component{
        getHidden():boolean[]
    }
    interface Chart extends Component{
        getItemByIndex(index: number):Object
        getLegendStore() : Store
        getLegend(): Legend
        getActiveItem(): Object
        getItems():Object
        getSeries():Series[]
    }

    interface Checkbox extends Component {
        setValue(value: string | number | boolean): void
    }

    interface Field extends Component {
        value: string;
        reset(): void
        setValue(value: any): void
        getModelData():Object
    }

    interface Input extends Field {

    }

    interface DateInput extends Field {
        getDateFormat(): string;
        setDateFormat(): void;
        expand(): void;
        collapse(): void;

        getPicker(auto: string): any;
    }

    // @ts-ignore
    interface Combobox extends Component {
        multiSelect: boolean
        reset(): void
        getStore(): Store
        expand(): void
        setValue(value: object): void
        getPicker(): BoundList
        getDisplayField(): string
        //findRecordByDisplay(value:string):any
        //findRecordByValue(value:string):any
    }
    interface BoundList extends Component {
        loadMask: Component
    }
    interface Button extends Component {
        click(): void
        handler(): void
    }

    interface Radio extends Component{

    }

    interface TextArea extends Field {

    }

    interface Menu extends Component {
        expand(): void
    }
    interface Grid extends Component{
		getSelected(): any;
		select(rowIndex: any): any;
        getSelection(): Record<any, any>[];
        getView(): ViewTable
        getSelectionModel(): DataViewModel
        getStore(): Store
        getColumns(): Column[]
        getPlugin(name: string): Plugin;
        events: {
            deleterow: Event
            editrow: Event
        }
    }
    interface Column extends Component {
        filter: any;
        hidden: boolean;
        hiddenAncestor: boolean,
        dataIndex: string
        getEditor(record?: any):Field;
        getFilterType(): any;
    }
    interface GridPanel extends Grid {}
    interface TreePanel extends Grid {
        expandPath(path?: string, option?: object): void
    }
    interface ViewTable extends  Component {
        bufferedRenderer: any;
        all: {
            count: number;
        };
        getRecord(node: HTMLElement | Element): Model
        getRow(nodeinfo: HTMLElement | string | number | Model | Record<any, any>): HTMLElement

        getCell(record: Record<any, any>, column: ExtJS.Column | number): HTMLElement
        loadMask: Component

        getSelectedNodes(): HTMLElement[];

        select(rowIndex: number): this;

        getPlugin(name: string): Plugin;
        refresh(): void;
    }
    interface Plugin extends Component{
        dragZone: DragZone
    }

    interface  DragZone extends Component{
        dragData : Object
    }

    interface TabPanel extends Component {
        setActiveTab(value: number | string | Component): void
    }

    interface ToolBar extends Component {

    }

    interface ItemCollection {
        items: Component[]
        keys: string[]
        getByKey<T extends Component>(key: string | number): T
        getAt<T extends Component>(key: string | number): T
    }

    export interface WYSIWYG {
        value: string;

        reset(): void;
        setValue(text: string | number | boolean): void;
    }

    export interface ButtonToolBar {
    }

    export interface RadioGroup {
        items: any;
    }

    export interface CheckboxGroup {
        items: any;
    }

    export interface FieldComboBox {
        items: any;

        setValue(row: ExtJS.Model): void;
    }

    export interface Panel {
        items: any;

        destroy(): void;
    }
}
