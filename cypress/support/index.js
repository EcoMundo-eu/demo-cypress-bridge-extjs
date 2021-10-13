// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import { configure } from '@testing-library/cypress'
import './commands'

configure({ testIdAttribute: 'data-cy' })

Cypress.on('uncaught:exception', (error) => {
    // return !(error.message.includes('crossorigin') || error.message.includes('client_id'));
    return false;
})

Cypress.Cookies.defaults({
	preserve: 'SESSION'
})
