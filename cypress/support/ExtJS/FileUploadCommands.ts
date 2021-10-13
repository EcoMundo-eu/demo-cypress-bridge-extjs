import { FileInput } from '../../src/common/extJSComponents/FileInput';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			getFileInputByTestId(fileInputTestId: string, option?: WaitUntilOptions): Chainable<FileInput>
			addFileByFixturePath(path: string): Chainable<FileInput>
		}
	}
}

Cypress.Commands.add('getFileInputByTestId', (fileInputTestId: string, option?: WaitUntilOptions) => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new FileInput(fileInputTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('addFileByFixturePath', { prevSubject: true }, (fileInput: FileInput, filePath: string) => {
	return cy.findByTestId(fileInput.testId)
		.find('input')
		.attachFile(filePath, { allowEmpty: true })
		.then(() => cy.wrap(fileInput))
})

export {}
