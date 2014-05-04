/**
 * New node file
 */


var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');
	

describe('GET /api/municipios/ranking/idh', function() {

    it('Se o parâmetro ordem for nulo, deve retornar a lista decrescente de todos os municípios ordenados por idh', function(done) {
        request(app)
            .get('/api/municipios/ranking/idh?ordem=')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                if(res.body[0].nome == 'ALCANTARAS' &&
                		res.body[1].cod == '1371' &&
                		res.body[2].uf == 'CE')
                		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
                		//res.body[0].__v == 0)
                	console.log('Conteúdo testado com sucesso');
                done();
            });
    })
    
    it('Se o parâmetro ordem for igual a desc, deve retornar a lista decrescente de todos os municípios ordenados por idh', function(done) {
        request(app)
            .get('/api/municipios/ranking/idh?ordem=desc')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                if(res.body[0].nome == 'ALCANTARAS' &&
                		res.body[1].cod == '1371' &&
                		res.body[2].uf == 'CE')
                		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
                		//res.body[0].__v == 0)
                	console.log('Conteúdo testado com sucesso');
                done();
            });
    })
    
    it('Se o parâmetro ordem for igual a asc, deve retornar a lista crescente de todos os municípios ordenados por idh', function(done) {
        request(app)
            .get('/api/municipios/ranking/idh?ordem=asc')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                if(res.body[8183].nome == 'ALCANTARAS' &&
                		res.body[8182].cod == '1371' &&
                		res.body[8181].uf == 'CE')
                		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
                		//res.body[0].__v == 0)
                	console.log('Conteúdo testado com sucesso');
                done();
            });
    })
     
        it('Se o parâmetro ordem for diferente de asc ou desc, deve retornar 400', function(done) {
            request(app)
                .get('/api/municipios/ranking/idh?ordem=asc1')
                .expect(400)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
     
        })
        
        it('Se o UF for passado junto com IDH, deve retornar a lista decrescente de todos os municípios daquela UF ordenados por idh', function(done) {
        request(app)
            .get('/api/municipios/ranking/idh?ordem=&uf=CE')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                if(res.body[0].nome == 'ALCANTARAS' &&
                		res.body[1].cod == '1371' &&
                		res.body[2].idh == 0.284)
                		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
                		//res.body[0].__v == 0)
                	console.log('Conteúdo testado com sucesso');
                done();
            });
    })
    
    it('Se o UF for passado junto com IDH e ORDEM = desc, deve retornar a lista decrescente de todos os municípios daquela UF ordenados por idh', function(done) {
        request(app)
            .get('/api/municipios/ranking/idh?ordem=desc&uf=CE')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                if(res.body[0].nome == 'ALCANTARAS' &&
                		res.body[1].cod == '1371' &&
                		res.body[2].idh == 0.284)
                		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
                		//res.body[0].__v == 0)
                	console.log('Conteúdo testado com sucesso');
                done();
            });
    })
    
    it('Se o UF for passado junto com IDH e ordem = asc, deve retornar a lista crescente de todos os municípios daquela UF ordenados por idh', function(done) {
        request(app)
            .get('/api/municipios/ranking/idh?ordem=asc&uf=CE')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                if(res.body[239].nome == 'ALCANTARAS' &&
                		res.body[238].cod == '1371' &&
                		res.body[237].idh == 0.284)
                		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
                		//res.body[0].__v == 0)
                	console.log('Conteúdo testado com sucesso');
                done();
            });
    })
    
     it('Se o parâmetro uf for diferente do padrão [a-zA-Z][a-zA-Z], deve retornar 400', function(done) {
            request(app)
                .get('/api/municipios/ranking/idh?ordem=asc1&uf=<script>')
                .expect(400)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
     
        })
    
});