class pageVisit{
    visit(){
        cy.visit('http://127.0.0.1:5501/src/index.html');
    }
}

export default new pageVisit();