import {FieldComboBox} from "../../src/common/extJSComponents/FieldComboBox";

/**
 * @description These commands are dedicated to manipulate the combobox which has extended 'ecojsLIB.widget.display.Field'
 * The xtype for this component may be:
 *  - ecojsLIB.form.field.StatusLovCombo
 *  - ecojsLIB.form.field.AssigneeField
 *  - ecojsLIB.form.field.MaterialField
 *  - ecojsLIB.form.field.ProjectLovCombo
 *  - ecojsLIB.form.field.StateField
 *  - ecojsLIB.form.field.TagLovCombo
 */
declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            /**
             * @inheritDoc
             */
            getFieldComboboxByTestId(comboboxTestId: string, option?: WaitUntilOptions): Chainable<FieldComboBox>
            /**
             * @description expand it and select item by its index
             * @param rowIndex
            */
            selectFieldComboboxItemByIndex(rowIndex: number): Chainable<FieldComboBox>
            /**
             * @description expand it and select item by its key and value
             * @param keyName
             * @param keyValue
             * @example
             * - For xtype: statusLovCombo, the keyName will be 'ke'
             * cy.getFieldComboboxByTestId('listtaskbriefstatus')
             *      .selectFieldComboboxItemByKeyValue('ke', 'pore')
             *
             */
            selectFieldComboboxItemByKeyValue(keyName: string, keyValue: string): Chainable<FieldComboBox>
            /**
             * @description click item manage my list
            */
            clickManageMyList(): Chainable<FieldComboBox>
        }
    }
}

Cypress.Commands.add('getFieldComboboxByTestId', (comboboxTestId: string, option: WaitUntilOptions): Cypress.Chainable<FieldComboBox> => {
    return cy.getExtJS().then((Ext) => {
        return cy.wrap(new FieldComboBox(comboboxTestId, Ext))
            .then($component => $component.waitUntilIsReady({ ...option }))
    })
})



Cypress.Commands.add('selectFieldComboboxItemByIndex', { prevSubject: true }, (fieldComboBox: FieldComboBox, rowIndex: number) => {
    return cy.wrap(fieldComboBox)
        .invoke('expand')
        .waitUntil(() => fieldComboBox.panelOptionStoreIsLoaded(), { timeout: 20000 })
        .wait(300)
        .wrap(fieldComboBox)
        .invoke('selectValueByIndex', rowIndex)
        .wait(500)
        .invoke('collapse')
})

Cypress.Commands.add('selectFieldComboboxItemByKeyValue', { prevSubject: true }, (fieldComboBox: FieldComboBox, key: string, value: string): Cypress.Chainable<FieldComboBox> => {
    return cy.wrap(fieldComboBox)
        .invoke('expand')
        .waitUntil(() => fieldComboBox.panelOptionStoreIsLoaded(), { timeout: 20000 })
        .wait(300)
        .wrap(fieldComboBox)
        .invoke('selectValueByKey', key, value)
        .invoke('collapse')
})

Cypress.Commands.add('clickManageMyList', { prevSubject: true }, (fieldComboBox: FieldComboBox): Cypress.Chainable<FieldComboBox> => {
    return cy.wrap(fieldComboBox)
        .invoke('expand')
        .waitUntil(() => fieldComboBox.panelOptionStoreIsLoaded(), { timeout: 20000 })
        .wrap(fieldComboBox)
        .invoke('getDOMPicker')
        .children('div')
        .first()
        .children('ul')
        .children()
        .last()
        .click()
        .wrap(fieldComboBox);
})

export {};
