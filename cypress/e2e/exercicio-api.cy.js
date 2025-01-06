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
    let nome = `Fulano Dinâmico ${Math.floor(Math.random() * 1000)}`

    cy.criarUsuario(nome).then(response => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
    });
  });



  it('Deve validar mensagem de erro de usuário com email já cadastrado', () => {
    //TODO: 
    const emailRepetido = "beltrano3@qa.com.br"
    cy.criarUsuario("Beltrano ", emailRepetido, "teste", "false").then(response => {
      expect(response.status).equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    //TODO: 
    let nome = `Fulano_${Date.now()}`;
    let novoNome = `Beltrano_${Date.now()}`;
    let emailDinamico = `usuario_${Date.now()}@qa.com.br`;
    let senhaDinamica = `Senha_${Math.random().toString(8)}`;

    // Cria um usuário dinâmico e gera o ID
    cy.criarUsuario(nome, emailDinamico, senhaDinamica, "true").then((response) => {
      let id = response.body._id;

      // Edita o usuário já criado
      cy.request({
        method: "PUT",
        url: `usuarios/${id}`,
        body: {
          nome: novoNome,
          email: emailDinamico,
          password: senhaDinamica,
          administrador: "true"
        }
      }).then((response) => {

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
      let id = response.body.usuarios[1]._id;

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

      }).then(response => {
        expect(response.status).equal(200)
        expect(response.body).to.have.property('_id')

      })
    })
  });


});
