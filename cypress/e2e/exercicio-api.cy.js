/// <reference types="cypress" />
import usuario from "../contracts/usuarios.contract";

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    //TODO: 
    cy.request('usuarios').then(response => {
      return usuario.validateAsync(response.body)

    })
    
  });

  it('Deve listar usuários cadastrados', () => {
    //TODO: 
    cy.request({
      method: "GET",
      url: "usuarios",

    }).then(response =>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
      expect(response.duration).to.be.lessThan(10)
    })
  });

  it.skip('Deve cadastrar um usuário com sucesso', () => {
    //TODO:
    cy.request({
      method: "POST",
      url: "usuarios",
      body: {
        "nome": "Beltrano",
        "email": "beltrano3@qa.com.br",
        "password": "teste",
        "administrador": "false"
      }
    }).then(response=>{
        expect(response.status).equal(201)
        expect(response.body.message).equal('Cadastro realizado com sucesso')
    }) 
  });

 /* it.skip('Deve validar um usuário com email inválido', () => {
    //TODO: obs nao foi possivel concluir poils o corpo do texto esperado é "undefined" 
    indefinido e nao tem na pagina serverest//
    cy.request({
      method: "POST",
      url: "usuarios",
      body: {
        "nome": "Ciclano",
        "email": "cliclanoqa.com",
        "password": "teste",
        "administrador": "false"
      }, failOnStatusCode: false
    }).then(response=>{
      expect(response.status).equal(400)
      expect(response.body.message).equal('email deve ser um email válido')
  }) 
  }); */

  it('Deve validar mensagem de erro de usuário com email já cadastrado', () => {
    //TODO: 
    cy.request({
      method: "POST",
      url: "usuarios",
      body: {
        "nome": "Beltrano",
        "email": "beltrano3@qa.com.br",
        "password": "teste",
        "administrador": "false"
      }, 
      failOnStatusCode: false
    }).then(response=>{
      expect(response.status).equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
  }) 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    //TODO: 
    
    cy.request({
      //let id = response.body.usuarios[0]._id
      method: "PUT",
      url: 'usuarios/MmngCI3GBd8OnKmT',
      body:{
        
          "nome": "Beltrano da Silva",
          "email": "beltrano3@qa.com.br",
          "password": "teste123",
          "administrador": "true"
        
      }
    }).then(response => {
      expect(response.body.message).equal('Registro alterado com sucesso')
      expect(response.status).equal(200)
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
    cy.request({
  
      method: "DELETE",
      url: 'usuarios/MmngCI3GBd8OnKmT',
      body:{
        
          "nome": "Beltrano da Silva",
          "email": "beltrano3@qa.com.br",
          "password": "teste123",
          "administrador": "true"
        
      }
    }).then(response => {
      expect(response.body.message).equal("Registro excluído com sucesso")
      expect(response.status).equal(200)
    })
  });


});
