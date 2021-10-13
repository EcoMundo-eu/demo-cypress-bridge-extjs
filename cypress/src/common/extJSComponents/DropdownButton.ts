import { Button } from "./Button";
import { Component } from "./BaseComponent";

export class DropdownButton extends Button {

    menuTestId: string
    menu: Component<ExtJS.Component> | undefined

    constructor(btnTestId: string, menuTestId: string, extJs: ExtJS.Ext) {
        super(btnTestId, extJs);
        this.menuTestId = menuTestId
    }

    expand(): void {
        super.click()
        this.menu = new Component(this.menuTestId, this.extJs)
    }

    selectItem(position: number): void {
        if(this.menu){
            this.menu.getExtJSCmp().items.items[position].getEl().dom.click()
        } else {
            throw Error('Dropdown button must be expanded before use selectItem')
        }
    }
}