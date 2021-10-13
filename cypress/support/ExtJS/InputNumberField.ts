import { Input } from '../../src/common/extJSComponents/Input';

declare global {
    namespace Cypress {
        interface Chainable<Subject> {

            /**
             * @inheritDoc
             */
            getNumberFieldByTestId(inputTestId: string, option?: WaitUntilOptions): Chainable<Input>

            /**
             * @description write value inside number field input
             * @param value { number }
             */
            writeValueNumberField(value: number): Chainable<Input>
            /**
             * @description compare current value by the passing value
             * @param value {number}
             */
            assertNumberFieldValue(value: number): Chainable<Input>
        }
    }
}

Cypress.Commands.add('getNumberFieldByTestId',(inputTestId: string, option?: WaitUntilOptions): Cypress.Chainable<Input> => {
    return cy.getExtJS().then((Ext) => {
        return cy.wrap(new Input(inputTestId, Ext))
            .then($component => $component.waitUntilIsReady({ ...option }))
    })
})

Cypress.Commands.add('writeValueNumberField',{ prevSubject: true },(input: Input, value: number): Cypress.Chainable<Input> => {
    return cy.wrap(input)
        .its('component')
        .its('maxValue')
        .then($maxValue => {
            if (value > $maxValue) {
                input.setValue($maxValue);
            } else {
                input.setValue(value);
            }
        }).wrap(input)
})

Cypress.Commands.add('assertNumberFieldValue', { prevSubject: true }, (input: Input, value: number): Cypress.Chainable<Input> => {
    return cy.wrap(input)
        .invoke('getValue')
        .should('eq', value)
        .wrap(input);
})

export {}
