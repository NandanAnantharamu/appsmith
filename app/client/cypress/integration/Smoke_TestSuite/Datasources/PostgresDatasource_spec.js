const datasource = require("../../../locators/DatasourcesEditor.json");
const queryEditor = require("../../../locators/QueryEditor.json");

let datasourceName;

describe("Postgres datasource test cases", function() {
  it("Create, test, save then delete a postgres datasource", function() {
    cy.NavigateToDatasourceEditor();
    cy.get(datasource.PostgreSQL).click();
    cy.getPluginFormsAndCreateDatasource();
    cy.get(datasource.editDatasource).click();
    cy.fillPostgresDatasourceForm();
    cy.get("@createDatasource").then(httpResponse => {
      datasourceName = httpResponse.response.body.data.name;
    });
    cy.testSaveDatasource();
  });

  it("Create a new query from the datasource editor", function() {
    cy.get(datasource.createQuerty).click();
    cy.wait("@createNewApi").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      201,
    );

    cy.get(queryEditor.deleteQuery).click();
    cy.wait("@deleteAction").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );

    cy.GlobalSearchEntity(`${datasourceName}`);
    cy.get(`.t--entity-name:contains(${datasourceName})`).click();
    cy.deleteDataSource();
  });
});
