import { TabPanel } from '../../src/common/extJSComponents/TabPanel';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			getTabPanelByTestId(toolbarTestId: string, option?: WaitUntilOptions): Chainable<TabPanel>
			clickTabPanelElementByTestId(itemId: string): Chainable<TabPanel>
			clickTabPanelElementbyIndex(itemId: number): Chainable<TabPanel>
		}
	}
}

Cypress.Commands.add('getTabPanelByTestId', (tabPanelTestId: string, option?: WaitUntilOptions): Cypress.Chainable<TabPanel> => {
	return cy.getExtJS().then((Ext) => {
		return cy.wrap(new TabPanel(tabPanelTestId, Ext))
			.then($component => $component.waitUntilIsReady({ ...option }))
	})
})

Cypress.Commands.add('clickTabPanelElementByTestId', { prevSubject: true },(tabPanel: TabPanel,itemId: string) => {
	return cy.wrap(tabPanel)
		.invoke('selectTabById', itemId)
		.then(() => cy.wrap(tabPanel))
})

Cypress.Commands.add('clickTabPanelElementbyIndex', { prevSubject: true },(tabPanel: TabPanel,index: number) => {
	return cy.wrap(tabPanel)
		.invoke('selectTabByIndex',index)
		.then(() => cy.wrap(tabPanel))
})

export {};
