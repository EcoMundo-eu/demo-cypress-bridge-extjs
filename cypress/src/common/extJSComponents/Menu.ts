import { Component } from "./BaseComponent";
import {ExtJS} from "../../definition/ExtJS";

export class Menu extends Component<ExtJS.Component> {

    constructor(testId: string, ExtJS: ExtJS.Ext) {
        super(testId,ExtJS);
    }

    expandMenu() {
        this.getExtJSCmp().getEl().events.pointerover.listeners[0].fireFn()
    }

    reduceMenu() {
        this.getExtJSCmp().getEl().events.pointerout.listeners[0].fireFn()
    }

    clickMenuItem(testId: string): void {
        this.getExtJSCmp().getEl().events.pointerover.listeners[0].fireFn()
        cy.findByTestId(this.testId)
            //.should('have.css','width','250px')
            .then(() => {
                cy.findByTestId(testId)
                    .should('exist')
                    .should('be.visible')
                    .click()
                    .then(() => {
                        this.getExtJSCmp().getEl().events.pointerout.listeners[0].fireFn()
                    })
            })
    }
}