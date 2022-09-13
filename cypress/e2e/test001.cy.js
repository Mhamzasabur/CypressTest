/// <reference types="cypress" />
import testObjects from "../pageObjects/testObjects";
const testObject = new testObjects();
describe("Example tutorial for Automation", () => {
  before(() => {
    cy.addRun();
  });
  var sectionName;
  var testCaseName;
  var testCaseID;

  afterEach(function () {
    cy.addTestCase(sectionName, testCaseName, testCaseID);
    cy.updateRun();
    cy.task("getCache", "testID").then((testID) => {
      cy.log(testID);
      testCaseID = testID;
      if (this.currentTest?.state === "passed") {
        cy.passTest(testCaseID);
      } else if (this.currentTest?.state === "failed") {
        cy.failTest(testCaseID);
      }
    });
  });
  it("SignUp", () => {
    sectionName = "SignUp Test";
    testCaseName = "SignUpAndValidations";
    cy.SignUpFieldValidations();
    cy.SignUpSuccessful();
  });
  it("SignIn Successful and unsuccessful", () => {
    sectionName = "SignIn Test";
    testCaseName = "SignInSuccessfulAndUnsuccessful";
    cy.SignInSuccessful();
    cy.SignInUnSuccessful();
  });
  it("Add Edit and delete items to cart", () => {
    sectionName = "Cart Test";
    testCaseName = "AddEditDelete";
    cy.AddEditDeleteCart();
  });
});
