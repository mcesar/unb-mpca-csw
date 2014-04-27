/**
 * Created by eduardo on 18/04/14.
 */
'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');
	

describe('GET /api/municipios:', function() {

    it('Deve retornar uma lista com todos os municipios definidos', function(done) {
        request(app)
            .get('/api/municipios')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    })
    
});

describe('Metodos Diferentes de GET:', function() {

it('não deve responder a métodos POST', function(done){
	request(app)
		.post('/api/municipios')
		.expect(405)
		.end(function(err, res) {
		    if (err) return done(err);
		    done();
		});
})

it('não deve responder a métodos PUT', function(done){
	request(app)
		.put('/api/municipios')
		.expect(405)
		.end(function(err, res) {
		    if (err) return done(err);
		    done();
		});
})	

it('não deve responder a métodos DELETE', function(done){
	request(app)
		.del('/api/municipios')
		.expect(405)
		.end(function(err, res) {
		    if (err) return done(err);
		    done();
		});
})
		
});

describe('Validação de parâmetros:', function() {

    it('"nome" normal deve ser aceito', function(done) {
        request(app)
            .get('/api/municipios?nome=Rio%20de%20Janeiro')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    })
     it('scripts embutidos no campo "nome" devem ser rejeitados', function(done) {
        request(app)
            .get('/api/municipios?nome=<script>Rio%20de%20Janeiro</script>')
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
    it('sinais de "<" ou de ">" no campo "nome" devem ser rejeitados', function(done) {
        request(app)
            .get('/api/municipios?nome=<<<<<<<')
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
    
     it('números inteiros no campo id devem ser permitidos', function(done) {
        request(app)
            .get('/api/municipios?id=5353fd784d2bc7ed64289af7')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                //console.log(JSON.parse(res.body));
                if(res.body[0].nome == 'RIO BRANCO' &&
                		res.body[0].cod == '0139' &&
                		res.body[0].uf == 'AC' &&
                		//res.body[0]._id == '5353fd784d2bc7ed64289af7' &&
                		//res.body[0].__v == 0)
                	console.log('Conteúdo testado com sucesso');
                done();
            });
        
    })
    
    /*it('letras no campo cod não serão permitidas', function(done) {
        request(app)
            .get('/api/municipios?cod=28s')
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })*/
    
    it('UFs legítimas serão permitidas', function(done) {
        request(app)
            .get('/api/municipios?uf=AM')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    })
    
    it('UFs ilegítimas não serão permitidas', function(done) {
        request(app)
            .get('/api/municipios?uf=AM<')
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
    
});

describe('Busca de Municípios pela parte do nome:', function() {

    it('lista os municipios cuja parte do nome é especificada no parâmetro "nome"', function(done) {
        request(app)
            .get('/api/municipios?nome=RIO')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
        
    })
    
});

