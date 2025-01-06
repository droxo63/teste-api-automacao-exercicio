Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }
    })
 })

 import Chance from 'chance';
 const chance = new Chance();
 
 // Comando para gerar um usuário dinâmico
 Cypress.Commands.add('criarUsuario', (nome, email, senha, admin) => {
    return cy.request({
      method: "POST",
      url: "usuarios",
      body: {
        nome,
        email: email || chance.email(),
        password: senha || chance.string({ length: 8 }),
        administrador: admin || "true"
      }, failOnStatusCode: false
    });
  });
 
