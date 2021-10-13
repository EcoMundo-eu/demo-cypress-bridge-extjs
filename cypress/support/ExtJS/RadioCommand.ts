import { Radio } from '../../src/common/extjsComponents/Radio';

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            /**
             * @description get radio component by its testId
             */
            getRadioByTestId(radioTestId: string, option?: WaitUntilOptions): Chainable<Radio>

            /**
             * @description Set true or false to select or unselect the radio input
             * @example 1 - To select
             * cy.getRadioByTestId('componenetTestId')
             * .setRadioValue(true) to select
             * .setRadioValue(false) to unselect
             * @param value
             */
            setRadioValue(value: boolean): Chainable<Radio>
            /**
             * @description clear value of radiobox. It's an alternative to unselect a radio box.
             */
            clearRadioValue(): Chainable<Radio>
        }
    }
}

Cypress.Commands.add('getRadioByTestId',(radioTestId: string, option?: WaitUntilOptions): Cypress.Chainable<Radio> => {
    return cy.getExtJS().then((Ext) => {
        return cy.wrap(new Radio(radioTestId, Ext))
            .then($component => $component.waitUntilIsReady({ ...option }))
    })
})

Cypress.Commands.add('setRadioValue',{ prevSubject: true },(radioInput: Radio, value: boolean): Cypress.Chainable<Radio> => {
    return cy.wrap(radioInput)
        .invoke('setValue', value)
        .wrap(radioInput)
})

Cypress.Commands.add('clearRadioValue', { prevSubject: true }, (input: Radio): Cypress.Chainable<Radio> => {
    return cy.wrap(input)
        .invoke('resetField')
        .wrap(input);
})

export {}
