/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's conf changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
	if(Object.keys(config.env).length === 0) {
		config.env.testingId = process.env.TESTING_ID
		config.env.typeId = process.env.TYPE_ID
		config.env[process.env.APP_NAME] = {
			url: process.env.APP_URL,
			username: process.env.APP_USERNAME,
			password: process.env.APP_PASSWORD,
		}
	}
	return config
}
