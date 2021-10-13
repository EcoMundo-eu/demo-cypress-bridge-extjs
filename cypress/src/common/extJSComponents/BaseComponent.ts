import {ExtJS} from "../../definition/ExtJS";

export class Component<T extends ExtJS.Component> {
    testId: string
    componentId: string = ''
    extJs: ExtJS.Ext
    xType: string | null = null
    component!: T;

    constructor(testId: string, extJs: ExtJS.Ext) {
        this.testId = testId
        this.extJs = extJs
    }

    getDomId(): string {
        return '#' + this.componentId
    }

    waitUntilIsReady({timeout = 20000, errorMsg = "Component not found", description = 'Search the ExtJS component'}: WaitUntilOptions) {
        let testId = this.testId;
        let that = this;
        return cy.waitUntil(() => that.extJs.ComponentQuery !== undefined,
            {timeout: timeout, errorMsg: 'Undefined component query', description: "Wait componentQuery"})
            .waitUntil(function () {
                    return that.extJs.ComponentQuery.query<T>(`[testId=${testId}]`).length > 0
                        || that.extJs.ComponentQuery.query<T>(`[itemId=${testId}]`).length > 0
                        || that.extJs.ComponentQuery.query<T>(`[id=a${testId}]`).length > 0
                }
                , {timeout: timeout, errorMsg, description}).then(function () {
                let result = that.extJs.ComponentQuery.query<T>(`[testId=${testId}]`)
                result = result.length > 0 ? result : that.extJs.ComponentQuery.query<T>(`[itemId=${testId}]`)
                result = result.length > 0 ? result : that.extJs.ComponentQuery.query<T>(`[id=${testId}]`)
                if (result.length === 0) {
                    throw Error(`Test id "${testId}" not found`)
                } else if (result.length === 1) {
                    that.component = result[0]
                    that.componentId = that.component.el.id
                    that.xType = that.component.xtype
                } else {
                    /**
                     * Select only the one element which is visible
                     */
                    cy.log("base component: Select only the one element which is visible");
                    let elementVisibleSelected = that.extJs.ComponentQuery.query<T>(`[testId=${testId}]:visible(true)`)
                    elementVisibleSelected = elementVisibleSelected.length > 0 ? elementVisibleSelected : that.extJs.ComponentQuery.query<T>(`[itemId=${testId}]:visible(true)`)

                    if (elementVisibleSelected.length === 0) {
                        throw Error(`We found many many test ids "${testId}" but they aren't visible`)
                    } else if (elementVisibleSelected.length === 1) {
                        cy.log("base component: elementVisibleSelected.length === 1");
                        that.component = elementVisibleSelected[0]
                        that.componentId = that.component.getEl().id
                        that.xType = that.component.xtype
                    } else {
                        throw Error(`We found ${elementVisibleSelected.length} testIds of "${testId}", so we doubt which of them we will select!`)
                    }
                }
            }).wrap(this);
    }

    getXType(): string {
        return <string>this.getExtJSCmp().xtype;
    }

    getExtJSCmp(): T {
        return this.component
    }

    getEl(): object {
        return this.getExtJSCmp().el;
    }

    getDom(): object {
        return this.getExtJSCmp().el.dom;
    }

    checkXType(xtype: string): boolean {
        if (this.getXType() === xtype) {
            return true;
        }
        throw Error('test ID is not compatible of this component');
        return false;
    }

    fireEvent<T>(eventName: string, option?: any): void {
        this.getExtJSCmp().fireEvent(eventName, this.getExtJSCmp(), option)
    }
}
