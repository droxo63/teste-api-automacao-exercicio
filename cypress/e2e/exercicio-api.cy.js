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
    cy.request({
      method: "GET",
      url: "usuarios",
    }).then(response => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('usuarios');
      
    });
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    const nome = "Fulano Dinâmico";
    cy.criarUsuario(nome).then(response => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
    });
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
    const emailRepetido = "beltrano3@qa.com.br"
    cy.criarUsuario("Beltrano ", emailRepetido, "teste", "false").then(response=>{
      expect(response.status).equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
  }) 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    const novoNome = "Beltrano da Silva";
  
    // Obtém o ID do primeiro usuário listado
    cy.request({
      method: "GET",
      url: "usuarios"
    }).then(response => {
      const id = response.body.usuarios[0]._id; 
  
      // Edita o usuário com o ID obtido
      cy.request({
        method: "PUT",
        url: `usuarios/${id}`,
        body: {
          nome: novoNome,
          email: "beltrano4@qa.com.br", 
          password: "teste123",
          administrador: "true"
        }
      }).then(response => {
        expect(response.body.message).to.equal('Registro alterado com sucesso');
        expect(response.status).to.equal(200);
      });
    });
  });

  it('Deve deletar um usuário previamente cadastrado com sucesso', () => {
    //TODO: 
    cy.request({
      method: "GET",
      url: "usuarios"
    }).then(response => {
      const id = response.body.usuarios[1]._id; 

    cy.request({
  
      method: "DELETE",
      url: `usuarios/${id}`,
      failOnStatusCode: false
    }).then(response => {
      expect(response.body.message).equal("Registro excluído com sucesso")
      expect(response.status).equal(200)
    })
  })
})

it('Deve validar mensagem de erro ao deletar usuário', () => {
  //TODO: 
  cy.request({
    method: "GET",
    url: "usuarios"
  }).then(response => {
    const id = response.body.usuarios[0]._id; 

    cy.request({
      method: "DELETE",
      url: `usuarios/${id}`,
      failOnStatusCode: false 
    }).then(response => {
      
      expect(response.body.message).to.equal("Não é permitido excluir usuário com carrinho cadastrado");
      expect(response.status).to.equal(400); 
    });
  });
});
  it('Deve buscar usuários cadastrados por id', () => {
    //TODO: 
    cy.request({
      method: "GET",
      url: "usuarios"
    }).then(response => {
      const id = response.body.usuarios[0]._id; 

    cy.request({
      method: "GET",
      url: `usuarios/${id}`

    }).then(response =>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('_id')
     
    })
  })
});


});
