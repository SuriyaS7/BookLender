class adminLogin{

    verifyLogin(){
        cy.get('#loginForm > h2')
            .then(process=>{
                var pro=process.text();
                if(pro==='Register'){
                    cy.get('#loginBtn').click();
                }
            });
    }
    
    enterCred(username, password){
        cy.get('#loginUsername').click().type(username);
        cy.get('#loginPassword').click().type(password);
    }

    submitLog(){
        cy.get('button[type="submit"]').contains('Login').click();
    }
}

export default new adminLogin();