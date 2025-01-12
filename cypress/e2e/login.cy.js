/// <reference types="cypress" />

describe('Login', () => {
before(() => {
    cy.criarUsuario('Fulano', "fulano@qa.com","teste", "true" ).then(response => {
        expect(response.status).equal(201)
        expect(response.body.message).equal('Cadastro realizado com sucesso')
      })
});

    it('Deve fazer login com sucesso', () => {
       
        cy.request({
            method: 'POST',
            url: 'login',
            body: {
                "email": "fulano@qa.com",
                "password": "teste" 
            },failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            cy.log(response.body.authorization)
        })
    });

});