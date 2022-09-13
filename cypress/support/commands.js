// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//const { default: testObjects } = require("../pageObjects/testObjects");

//const { default: testObjects } = require("../pageObjects/testObjects");
require("cypress-xpath");

import testObjects from "../pageObjects/testObjects";

const testObject = new testObjects();
Cypress.Commands.add("SignUpFieldValidations", () => {
  var randomNumber = Math.floor(Math.random() * 10000);

  cy.fixture("testData").then(function (data) {
    this.data = data;

    cy.visit("http://automationpractice.com/index.php");
    cy.get(testObject.signIn).click().should("be.visible");
    cy.url().should(
      "eq",
      "http://automationpractice.com/index.php?controller=authentication&back=my-account"
    );
    cy.get(testObject.signInHeading).eq(0).should("be.visible");
    cy.get(testObject.emailFieldSignUp).type(
      "automationtester" + randomNumber + "@gmail.com"
    );
    cy.get(testObject.createAcnBtn).click();
    cy.get(testObject.registerAcnBtn).should("be.visible").click();
    cy.xpath(testObject.mobilePhReqError).should("be.visible");
    cy.xpath(testObject.stateReqError).should("be.visible");
    cy.xpath(testObject.cityReqError).should("be.visible");
    cy.xpath(testObject.lastNameReqError).should("be.visible");
    cy.xpath(testObject.passwordReqError).should("be.visible");
    cy.xpath(testObject.postCodeReqError).should("be.visible");
    cy.xpath(testObject.firstNameReqError).should("be.visible");
    cy.xpath(testObject.firstNameReqError).should("be.visible");
  });
});

Cypress.Commands.add("SignUpSuccessful", () => {
  var randomNumber = Math.floor(Math.random() * 10000);

  cy.visit("http://automationpractice.com/index.php");
  cy.get(testObject.signIn).click().should("be.visible");
  cy.url().should(
    "eq",
    "http://automationpractice.com/index.php?controller=authentication&back=my-account"
  );

  cy.get(testObject.signInHeading).eq(0).should("be.visible");
  cy.get(testObject.emailFieldSignUp).type(
    "automationtester" + randomNumber + "@gmail.com"
  );
  cy.get(testObject.createAcnBtn).click();
  cy.get(testObject.firstNameAcn).should("be.visible").type("Automation");
  cy.get(testObject.lastName).type("Tester");
  cy.get(testObject.passwordSignUp).type("123123");
  cy.get(testObject.firstNameAdd).type("Automation Add");
  cy.get(testObject.lastNameAdd).type("Tester Add");
  cy.get(testObject.address).type("Adress 123");
  cy.get(testObject.city).type("Lahore");
  cy.get(testObject.state).select("4");
  cy.get(testObject.postCode).type("54000");
  cy.get(testObject.mobilePhone).type("123123123");

  cy.get(testObject.registerAcnBtn).should("be.visible").click();
  cy.get(testObject.welcomeAccountAssertion).should("be.visible");
});

Cypress.Commands.add("SignInSuccessful", () => {
  var randomNumber = Math.floor(Math.random() * 10000);

  cy.fixture("testData").then(function (data) {
    this.data = data;
    cy.visit("http://automationpractice.com/index.php");
    cy.get(testObject.signIn).click().should("be.visible");
    cy.get(testObject.emailId).type(this.data.email1);
    cy.get(testObject.passwordSignUp).type(this.data.password);
    cy.get(testObject.loginBtn).click();
    cy.get(testObject.welcomeAccountAssertion).should("be.visible");
    cy.get(testObject.signOut).click();
    cy.url().should(
      "eq",
      "http://automationpractice.com/index.php?controller=authentication&back=my-account"
    );
    cy.get(testObject.signIn).click().should("be.visible");
    cy.get(testObject.emailId).type(this.data.email2);
    cy.get(testObject.passwordSignUp).type(this.data.password);
    cy.get(testObject.loginBtn).click();
    cy.get(testObject.welcomeAccountAssertion).should("be.visible");
    cy.get(testObject.signOut).click();
  });
});

Cypress.Commands.add("SignInUnSuccessful", () => {
  cy.fixture("testData").then(function (data) {
    this.data = data;
    cy.visit("http://automationpractice.com/index.php");
    cy.get(testObject.signIn).click().should("be.visible");
    cy.get(testObject.emailId).type(this.data.email1);
    cy.get(testObject.passwordSignUp).type("123125");
    cy.get(testObject.loginBtn).click();
    cy.xpath(testObject.passwordIncorrect).should("be.visible");
    cy.get(testObject.signIn).click().should("be.visible");
    cy.get(testObject.emailId).type("ranranran");
    cy.get(testObject.emailId).type("{enter}");
    cy.xpath(testObject.emailIncorrect).should("be.visible");
  });
});

Cypress.Commands.add("AddEditDeleteCart", () => {
  cy.visit("http://automationpractice.com/index.php");
  cy.get(testObject.addToCart).eq(0).click({ force: true });
  cy.get(testObject.closeCartPopUp).should("be.visible");
  cy.get(testObject.closeCartPopUp).click();
  cy.get(testObject.cartPage).click();
  cy.xpath(testObject.itemTitle).should("be.visible");
  cy.get(testObject.plusItemQuantity).click();
  cy.get(testObject.minusItemQuantity).click();
  cy.get(testObject.deleteItem).click();
  cy.xpath(testObject.cartEmptyMsg).should("be.visible");
});
