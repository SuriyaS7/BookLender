class adminRegister{
    
    verifyLoginOrRegister(){
        cy.get('#loginForm > h2')
            .then(process=>{
                var pro=process.text();
                if(pro==='Login'){
                    cy.get('#registerBtn').click();
                }
            });
    }

    adminReg(username, email, password){
        cy.get('#registerUsername').click().type(username);
        cy.get('#registerEmail').click().type(email);
        cy.get('#registerPassword').click().type(password);
    }

    submitReg(){
        cy.get('button[type="submit"]').contains('Register').click();
    }
}

export default new adminRegister();