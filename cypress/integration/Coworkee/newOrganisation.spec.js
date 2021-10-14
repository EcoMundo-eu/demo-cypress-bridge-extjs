describe('New organization', function () {
    it('should create a new organization', function () {
        // Enter in the app
        cy.visit('http://localhost:3000')

        // Click login button
        cy.getButtonByTestId('logInButton')
            .clickButton()

        // Click organization menu
        cy.get('[data-menu-cy="organizationsMenu"]')
            .parent()
            .click({force: true})

        // Click create button
        cy.getButtonByTestId('createOrganizationButton')
            .clickButton()

        // New organization information
        const newOrganization = {
            name: 'jsdays',
            manager: 'Benjamin'
        }

        // Write the organization name
        cy.getInputByTestId('organisationNameInput')
            .writeTextInput(newOrganization.name)

        // Select the manager name by display field in combobox
        cy.getComboboxByTestId('managerCombobox')
            .selectComboboxItemByDisplayField(newOrganization.manager)

        // Click create button
        cy.getButtonByTestId('submitCreateForm')
            .clickButton()

        // The popup should be disappear
        cy.get('[data-cy=organizationCreateModal]')
            .should('not.exist')

        // Click refresh grid button
        cy.getButtonByTestId('refreshButton')
            .clickButton()

        // Select the row which holds the key `name` with value of new organization
        cy.getGridByTestId('organizationGrid')
            .selectGridRowByKeyValue('name', newOrganization.name)

    });
});
