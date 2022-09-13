class testObjects {
  userName;
  constructor() {
    this.signIn = '[class="login"]';
    this.signInHeading = '[class="page-subheading"]';
    this.emailFieldSignUp = '[id="email_create"]';
    this.createAcnBtn = '[id="SubmitCreate"]';
    this.firstNameAcn = '[id="customer_firstname"]';
    this.lastName = '[id="customer_lastname"]';
    this.passwordSignUp = '[id="passwd"]';
    this.firstNameAdd = '[id="firstname"]';
    this.lastNameAdd = '[id="lastname"]';
    this.address = '[id="address1"]';
    this.city = '[id="city"]';
    this.state = '[id="id_state"]';
    this.postCode = '[id="postcode"]';
    this.mobilePhone = '[id="phone_mobile"]';
    this.alertFieldBox = '[class="alert alert-danger"]';
    this.mobilePhReqError =
      '//li[text()="You must register at least one phone number."]';
    this.lastNameReqError = '//b[text()="lastname"]';
    this.firstNameReqError = '//b[text()="firstname"]';
    this.passwordReqError = '//b[text()="passwd"]';
    this.addressReqError = '//b[text()="address1"]';
    this.cityReqError = '//b[text()="city"]';
    this.postCodeReqError = '//li[contains(text(),"The Zip/Postal code")]';
    this.stateReqError =
      '//li[text()="This country requires you to choose a State."]';
    this.registerAcnBtn = '[id="submitAccount"]';
    this.welcomeAccountAssertion = '[class="info-account"]';
    this.signOut = '[class="logout"]';
    this.emailId = '[id="email"]';
    this.emailIncorrect = '//li[text()="Invalid email address."]';
    this.passwordIncorrect = '//li[text()="Authentication failed."]';
    this.loginBtn = '[id="SubmitLogin"]';
    this.addToCart = '[data-id-product="1"]';
    this.itemClick = '[title="Faded Short Sleeve T-shirts"]';
    this.closeCartPopUp = '[title="Close window"]';
    this.cartPage = '[title="View my shopping cart"]';
    this.itemTitle = '//a[text()="Faded Short Sleeve T-shirts"]';
    this.plusItemQuantity = '[class="icon-plus"]';
    this.minusItemQuantity = '[class="icon-minus"]';
    this.deleteItem = '[class="icon-trash"]';
    this.cartEmptyMsg = "//p[text()='Your shopping cart is empty.']";
  }
}
export default testObjects;
