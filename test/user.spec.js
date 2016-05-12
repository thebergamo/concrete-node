'use strict';

const jwt = require('jsonwebtoken');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-http'));

const URI = require('../index');

describe('Concrete User API', () => {
  describe('POST /sign_up', () => {
    describe('when an empty object is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({})
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 6 error messages', () => {
        expect(response.body).to.have.length.least(6);
      });
    });
    describe('when no name is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            email: 'mark@gmail.com',
            senha: '1234556'
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about name', () => {
        expect(response.body[0]).to.have.property('mensagem', 'nome: É obrigatório');
      });
    });

    describe('when no email is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            senha: '1234556'
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 2 error messages', () => {
        expect(response.body).to.have.length.least(2);
      });

      it('should have an error messages about email is required', () => {
        expect(response.body[0]).to.have.property('mensagem', 'email: É obrigatório');
      });

      it('should have an error messages about email is invalid', () => {
        expect(response.body[1]).to.have.property('mensagem', 'email: Necessário um email válido');
      });
    });

    describe('when invalid email is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'marcos',
            senha: '1234556'
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about email is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'email: Necessário um email válido');
      });
    });

    describe('when no senha is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com'
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 2 error messages', () => {
        expect(response.body).to.have.length.least(2);
      });

      it('should have an error messages about senha is required', () => {
        expect(response.body[0]).to.have.property('mensagem', 'senha: É obrigatória');
      });

      it('should have an error messages about senha is invalid', () => {
        expect(response.body[1]).to.have.property('mensagem', 'senha: Deve ser ter entre 6 e 20 caracteres');
      });
    });

    describe('when short senha is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '1'
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about senha is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'senha: Deve ser ter entre 6 e 20 caracteres');
      });
    });

    describe('when long senha is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '1234567889012345678900'
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about senha is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'senha: Deve ser ter entre 6 e 20 caracteres');
      });
    });

    describe('when no telefones is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '12345678'
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about telefones is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'telefones: É obrigatório especificar pelo menos 1');
      });
    });

    describe('when empty object in telefones is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '12345678',
            telefones: [{}]
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 2 error messages', () => {
        expect(response.body).to.have.length.least(2);
      });

      it('should have an error messages about telefones.$.numero is required', () => {
        expect(response.body[0]).to.have.property('mensagem', 'numero: É obrigatório');
      });

      it('should have an error messages about telefones.$.ddd is required', () => {
        expect(response.body[1]).to.have.property('mensagem', 'ddd: É obrigatório');
      });
    });

    describe('when an invalid numero at telefones is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '12345678',
            telefones: [{
              ddd: '11',
              numero: 'a'
            }]
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about telefones.$.numero is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'numero: É está em um formato inválido');
      });
    });

    describe('when a short numero at telefones is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '12345678',
            telefones: [{
              ddd: '11',
              numero: '11111'
            }]
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about telefones.$.numero is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'numero: É está em um formato inválido');
      });
    });

    describe('when a long numero at telefones is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '12345678',
            telefones: [{
              ddd: '11',
              numero: '11111111111'
            }]
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about telefones.$.numero is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'numero: É está em um formato inválido');
      });
    });

    describe('when an invalid ddd at telefones is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '12345678',
            telefones: [{
              ddd: 'a',
              numero: '11111111'
            }]
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about telefones.$.ddd is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'ddd: É está em um formato inválido');
      });
    });

    describe('when a short ddd at telefones is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '12345678',
            telefones: [{
              ddd: '1',
              numero: '11111111'
            }]
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about telefones.$.ddd is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'ddd: É está em um formato inválido');
      });
    });

    describe('when a long ddd at telefones is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: 'mark@gmail.com',
            senha: '12345678',
            telefones: [{
              ddd: '1111',
              numero: '11111111'
            }]
          })
          .catch((err) => {
            response = err.response.res;
            done();
          });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about telefones.$.ddd is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'ddd: É está em um formato inválido');
      });
    });

    describe('when a duplicate email is sended', () => {
      const now = Date.now().toString();
      let response;
      before((done) => {
        chai.request(URI)
        .post('/sign_up')
        .send({
          nome: 'Marcos',
          email: `mark${now}@gmail.com`,
          senha: '12345678',
          telefones: [{
            numero: '11111111',
            ddd: '11'
          }]
        })
        .then((res) => {
          done();
        })
        .catch((err) => {
          throw err;
        });
      });

      before((done) => {
        chai.request(URI)
        .post('/sign_up')
        .send({
          nome: 'Marcos',
          email: `mark${now}@gmail.com`,
          senha: '12345678',
          telefones: [{
            numero: '11111111',
            ddd: '11'
          }]
        })
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should have an error messages about duplicated email is invalid', () => {
        expect(response.body).to.have.property('mensagem', 'E-mail já existente');
      });
    });

    describe('when user data is ok', () => {
      const now = Date.now().toString();
      let response;
      let errors;
      before((done) => {
        chai.request(URI)
          .post('/sign_up')
          .send({
            nome: 'Marcos',
            email: `mark${now}@gmail.com`,
            senha: '12345678',
            telefones: [{
              numero: '11111111',
              ddd: '11'
            }]
          })
          .then((res) => {
            response = res;
            done();
          })
          .catch((err) => {
            errors = err;
            done();
          });
      });

      it('should not have an error', () => {
        expect(errors).to.be.undefined;
      });

      it('should statusCode be 201', () => {
        expect(response).to.have.property('statusCode', 201);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should body have nome', () => {
        expect(response.body).to.have.property('nome', 'Marcos');
      });

      it('should body have email', () => {
        expect(response.body).to.have.property('email', `mark${now}@gmail.com`);
      });

      it('should body have ultimo_login', () => {
        expect(response.body).to.have.property('ultimo_login');
      });

      it('should body have data_criacao', () => {
        expect(response.body).to.have.property('data_criacao');
      });

      it('should body have data_atualizacao', () => {
        expect(response.body).to.have.property('data_atualizacao');
      });

      it('should body have token', () => {
        expect(response.body).to.have.property('token');
      });

      it('should body have id', () => {
        expect(response.body).to.have.property('id');
      });
    });
  });

  describe('POST /sign_in', () => {
    const now = Date.now().toString();
    let user;
    before((done) => {
      chai.request(URI)
      .post('/sign_up')
      .send({
        nome: 'Marcos',
        email: `mark${now}@gmail.com`,
        senha: '12345678',
        telefones: [{
          numero: '11111111',
          ddd: '11'
        }]
      })
      .then((res) => {
        user = res.body;
        done();
      })
      .catch((err) => {
        throw err;
      });
    });

    describe('when empty object is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
        .post('/sign_in')
        .send({})
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 3 error messages', () => {
        expect(response.body).to.have.length.least(3);
      });
    });

    describe('when no email is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
        .post('/sign_in')
        .send({
          senha: '123456'
        })
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 2 error messages', () => {
        expect(response.body).to.have.length.least(2);
      });

      it('should have an error messages about email is required', () => {
        expect(response.body[0]).to.have.property('mensagem', 'email: É obrigatório');
      });

      it('should have an error messages about email is invalid', () => {
        expect(response.body[1]).to.have.property('mensagem', 'email: Necessário um email válido');
      });
    });

    describe('when invalid email is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
        .post('/sign_in')
        .send({
          email: 'mark',
          senha: '123456'
        })
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about email is invalid', () => {
        expect(response.body[0]).to.have.property('mensagem', 'email: Necessário um email válido');
      });
    });

    describe('when no senha is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
        .post('/sign_in')
        .send({
          email: 'mark@gmail.com'
        })
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 400', () => {
        expect(response).to.have.property('statusCode', 400);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an array', () => {
        expect(response.body).to.be.an('array');
      });

      it('should have least 1 error messages', () => {
        expect(response.body).to.have.length.least(1);
      });

      it('should have an error messages about senha is required', () => {
        expect(response.body[0]).to.have.property('mensagem', 'senha: É obrigatória');
      });
    });

    describe('when incorrect credentials are sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
        .post('/sign_in')
        .send({
          email: 'mark@gmail.com',
          senha: '123456'
        })
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 401', () => {
        expect(response).to.have.property('statusCode', 401);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should have an error messages about incorrect credentials', () => {
        expect(response.body).to.have.property('mensagem', 'Usuário e/ou senha inválidos');
      });
    });

    describe('when incorrect password is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
        .post('/sign_in')
        .send({
          email: user.email,
          senha: '12345'
        })
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 401', () => {
        expect(response).to.have.property('statusCode', 401);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should have an error messages about incorrect password', () => {
        expect(response.body).to.have.property('mensagem', 'Usuário e/ou senha inválidos');
      });
    });

    describe('when incorrect email is sended', () => {
      let response;
      before((done) => {
        chai.request(URI)
        .post('/sign_in')
        .send({
          email: 'o@gmail.com',
          senha: '12345'
        })
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 401', () => {
        expect(response).to.have.property('statusCode', 401);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should have an error messages about incorrect password', () => {
        expect(response.body).to.have.property('mensagem', 'Usuário e/ou senha inválidos');
      });
    });

    describe('when correct credentials are sended', () => {
      let response;
      let errors;
      before((done) => {
        chai.request(URI)
          .post('/sign_in')
          .send({
            email: user.email,
            senha: '12345678'
          })
          .then((res) => {
            response = res;
            done();
          })
          .catch((err) => {
            errors = err;
            done();
          });
      });

      it('should not have an error', () => {
        expect(errors).to.be.undefined;
      });

      it('should statusCode be 200', () => {
        expect(response).to.have.property('statusCode', 200);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should body have nome', () => {
        expect(response.body).to.have.property('nome', user.nome);
      });

      it('should body have email', () => {
        expect(response.body).to.have.property('email', user.email);
      });

      it('should body have ultimo_login', () => {
        expect(response.body).to.have.property('ultimo_login', user.ultimo_login);
      });

      it('should body have data_criacao', () => {
        expect(response.body).to.have.property('data_criacao', user.data_criacao);
      });

      it('should body have data_atualizacao', () => {
        expect(response.body).to.have.property('data_atualizacao', user.data_atualizacao);
      });

      it('should body have token', () => {
        expect(response.body).to.have.property('token');
      });

      it('should body have id', () => {
        expect(response.body).to.have.property('id', user.id);
      });
    });
  });

  describe('GET /buscar_usuario', () => {
    const now = Date.now().toString();
    let user;
    before((done) => {
      chai.request(URI)
      .post('/sign_up')
      .send({
        nome: 'Marcos',
        email: `mark${now}@gmail.com`,
        senha: '12345678',
        telefones: [{
          numero: '11111111',
          ddd: '11'
        }]
      })
      .then((res) => {
        user = res.body;
        done();
      })
      .catch((err) => {
        throw err;
      });
    });

    describe('when no token is send', () => {
      let response;
      before((done) => {
        chai.request(URI)
        .get('/buscar_usuario')
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 403', () => {
        expect(response).to.have.property('statusCode', 403);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should have an error message', () => {
        expect(response.body).to.have.property('mensagem', 'Não autorizado');
      });
    });

    describe('when empty token is send', () => {
      let response;
      before((done) => {
        chai.request(URI)
        .get('/buscar_usuario')
        .set('Authorization', ' ')
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 403', () => {
        expect(response).to.have.property('statusCode', 403);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should have an error message', () => {
        expect(response.body).to.have.property('mensagem', 'Não autorizado');
      });
    });

    describe('when expired session is send', () => {
      let response;
      let token;

      before(() => {
        const secretKey = process.env.SECRET || 'stubJWT';

        token = jwt.sign({}, secretKey, { expiresIn: '1ms' });
      });

      before((done) => {
        chai.request(URI)
        .get('/buscar_usuario')
        .set('Authorization', token)
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 401', () => {
        expect(response).to.have.property('statusCode', 401);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should have an error message', () => {
        expect(response.body).to.have.property('mensagem', 'Sessão inválida');
      });
    });

    describe('when a not found id in token is send', () => {
      let response;
      let token;

      before(() => {
        const secretKey = process.env.SECRET || 'stubJWT';

        token = jwt.sign({ id: 'aaaa' }, secretKey, { expiresIn: '1m' });
      });

      before((done) => {
        chai.request(URI)
        .get('/buscar_usuario')
        .set('Authorization', token)
        .catch((err) => {
          response = err.response.res;
          done();
        });
      });

      it('should statusCode be 404', () => {
        expect(response).to.have.property('statusCode', 404);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should have an error message', () => {
        expect(response.body).to.have.property('mensagem', 'Usuário não encontrado');
      });
    });

    describe('when valid token is send', () => {
      let response;
      let errors;

      before((done) => {
        chai.request(URI)
        .get('/buscar_usuario')
        .set('Authorization', user.token)
        .then((res) => {
          response = res;
          done();
        })
        .catch((err) => {
          errors = err;
          done();
        });
      });

      it('should not have an error', () => {
        expect(errors).to.be.undefined;
      });

      it('should statusCode be 200', () => {
        expect(response).to.have.property('statusCode', 200);
      });

      it('should content-type be a json', () => {
        expect(response).to.have.header('content-type', /application\/json/);
      });

      it('should body be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('should body have nome', () => {
        expect(response.body).to.have.property('nome', user.nome);
      });

      it('should body have email', () => {
        expect(response.body).to.have.property('email', user.email);
      });

      it('should body have ultimo_login', () => {
        expect(response.body).to.have.property('ultimo_login', user.ultimo_login);
      });

      it('should body have data_criacao', () => {
        expect(response.body).to.have.property('data_criacao', user.data_criacao);
      });

      it('should body have data_atualizacao', () => {
        expect(response.body).to.have.property('data_atualizacao', user.data_atualizacao);
      });

      it('should body have id', () => {
        expect(response.body).to.have.property('id', user.id);
      });
    });
  });
});
