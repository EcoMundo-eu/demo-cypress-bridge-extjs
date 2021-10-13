import {RadioGroup} from '../../src/common/extJSComponents/RadioGroup';

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            getRadioGroupByTestId(radioGroupTestId: string, option?: WaitUntilOptions): Chainable<RadioGroup>

            /**
             * @description choose one item in the radio button by its value
             * @param value {number}
             */
            checkRadioGroupByRadioValue(value: string | number | boolean): Chainable<RadioGroup>

            /**
             * @description choose one item in the radio button by its index
             * @param index {number}
             */
            checkRadioGroupByRadioIndex(index: number): Chainable<RadioGroup>

            /**
             * Check if index was selected
             * @param index
             */
            isCheckedRadioGroupByRadioIndex(index: number): Chainable<RadioGroup>

            /**
             * Check if inputValue was selected
             * @param value
             */
            isCheckedRadioGroupByRadioValue(value: string | number | boolean): Chainable<RadioGroup>
        }
    }
}

Cypress.Commands.add('getRadioGroupByTestId', (radioGroupTestId: string, option?: WaitUntilOptions) => {
    return cy.getExtJS().then((Ext) => {
        return cy.wrap(new RadioGroup(radioGroupTestId, Ext))
            .then($component => $component.waitUntilIsReady({ ...option }))
    })
})

Cypress.Commands.add('checkRadioGroupByRadioValue', {prevSubject: true}, (radioGroup: RadioGroup, value: string | number | boolean) => {
    return cy.wrap(radioGroup)
        .invoke('checkElementByValue', value)
        .then(() => cy.wrap(radioGroup))
})

Cypress.Commands.add('isCheckedRadioGroupByRadioValue', {prevSubject: true}, (radioGroup: RadioGroup, value: string | number | boolean) => {
    return cy.wrap(radioGroup)
        .invoke('isCheckedElementByValue', value)
        .should('eq', true)
        .then(() => cy.wrap(radioGroup))
})

Cypress.Commands.add('isCheckedRadioGroupByRadioIndex', {prevSubject: true}, (radioGroup: RadioGroup, index: number) => {
    return cy.wrap(radioGroup)
        .invoke('isCheckElementByIndex', index)
        .should('eq', true)
        .then(() => cy.wrap(radioGroup))
})

Cypress.Commands.add('checkRadioGroupByRadioIndex', {prevSubject: true}, (radioGroup: RadioGroup, index: number) => {
    return cy.wrap(radioGroup)
        .invoke('checkElementByIndex', index)
        .then(() => cy.wrap(radioGroup))
})


export {}
