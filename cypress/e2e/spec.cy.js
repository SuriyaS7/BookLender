import PageVisit from "../support/Pages/PageVisit";
import AdminLogin from "../support/Pages/AdminLogin";
import AdminRegister from "../support/Pages/AdminRegister";

describe('Book Lender Page', () => {
  var val;

  before(()=>{
    cy.fixture('example')
      .then(data=>{
        val=data;
      });
  });

  beforeEach(()=>{
    cy.window().then((win) => {
      let users = [{ username: val.admin.username, password: val.admin.password }];
      win.localStorage.setItem('users', JSON.stringify(users));
    });
    Cypress.on('uncaught:exception', ()=> {return false;});
  });

  it('Register as Admin', () => {
    PageVisit.visit();
    AdminRegister.verifyLoginOrRegister();
    AdminRegister.adminReg(val.admin.username, val.admin.email, val.admin.password);
    AdminRegister.submitReg();
  });
  
  it('Login as Admin', () => {
    PageVisit.visit();
    cy.window().then((win) => {
      let storedUsers = JSON.parse(win.localStorage.getItem('users')) || [];
      expect(storedUsers).to.not.be.empty;
      const { username, password } = storedUsers[0];
      AdminLogin.verifyLogin();
      AdminLogin.enterCred(username, password);
      AdminLogin.submitLog();
    });
  });  
});