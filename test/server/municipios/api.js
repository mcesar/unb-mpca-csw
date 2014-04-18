/**
 * Created by eduardo on 18/04/14.
 */
'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /api/municipios', function() {

    it('Deve retornar uma lista com todos os municipios definidos', function(done) {
        request(app)
            .get('/api/municipios')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instaceof(Array);
                done();
            });
    })
});