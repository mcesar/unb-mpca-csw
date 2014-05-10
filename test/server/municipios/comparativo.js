/**
 * New node file
 */


var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');
	

describe('GET /api/municipios/comparativo', function() {
	
	it('Se o parâmetro id for nulo, deve retornar 400', function(done) {
			request(app)
            .get('/api/municipios/comparativo')
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
    
    it('Se um id é especificado, retorna informação sobre esse id', function(done){
		request(app)
		.get('/api/municipios/comparativo?id=5353fd8c4d2bc7ed64289f45')
		.expect(200)
		.expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            if(res.body[0].nome == 'BREJO SANTO' &&
            		res.body[0].idh == 0.284000 &&
            		res.body[0].investimento["saude"][2011] == 564594.230000 &&
            		res.body[0].investimento["educacao"][2013] == 999912.200000)
            		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
            		//res.body[0].__v == 0)
            	console.log('Conteúdo testado com sucesso');
            done();
        });
	})
	
	it('Se dois ids são especificados, retorna informações sobre cada id', function(done){
		request(app)
		.get('/api/municipios/comparativo?id=5353fd8c4d2bc7ed64289f45&id=5353fd8c4d2bc7ed64289f50')
		.expect(200)
		.expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            if(res.body[0].nome == 'CATARINA' &&
            		res.body[1].idh == 0.284000 &&
            		res.body[0].investimento["saude"][2011] == 411594.230000 &&
            		res.body[1].investimento["educacao"][2013] == 999912.200000)
            		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
            		//res.body[0].__v == 0)
            	console.log('Conteúdo testado com sucesso');
            done();
        });
	})
	
	it('Se quatro ids são especificados, retorna informações sobre cada id', function(done){
		request(app)
		.get('/api/municipios/comparativo?id=5353fd8c4d2bc7ed64289f45&id=5353fd8c4d2bc7ed64289f50&id=5353fd8b4d2bc7ed64289ee1&id=5353fd8b4d2bc7ed64289efe')
		.expect(200)
		.expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            if(res.body[0].nome == 'ALCANTARAS' &&
            		res.body[1].idh == 0.874000 &&
            		res.body[2].investimento["saude"][2011] == 564594.230000 &&
            		res.body[3].investimento["educacao"][2013] == 9912.200000)
            		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
            		//res.body[0].__v == 0)
            	console.log('Conteúdo testado com sucesso');
            done();
        });
	})
	
	it('Se o parâmetro id for diferente do padrão, deve retornar 400', function(done) {
            request(app)
                .get('/api/municipios/ranking/idh?ordem=asc1&id=<script>')
                .expect(400)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
     
        })
});