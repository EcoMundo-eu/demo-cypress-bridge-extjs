describe('Demo with and without the testing library', function () {
    it('should select the row which contains `Benjamin` value', function () {

        // Enter in the app
        cy.visit('http://localhost:3000')

        // Interact manually the application
        cy.pause()

        // Without testing library
        /*cy.get('[data-cy="employeesGrid"]')
            .within(function () {
                cy.contains('Benjamin')
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .dblclick()
            })*/

        // With testing library
        cy.getGridByTestId('employeesGrid')
            .selectGridRowByKeyValue('firstname', 'Benjamin')
            .dblclickSelectedRow()

    });
});
