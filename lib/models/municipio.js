/**
 * Created by eduardo on 18/04/14.
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Cria Schema para o município
 *
 * @type {Schema}
 */

var MunicipioSchema = new Schema({
    nome: String,
    cod: String,
	uf: String,
	idh: Number,
	investimento: { saude: {"2010": Number, "2011": Number, "2012": Number, "2013": Number}, educacao: {"2010": Number, "2011": Number, "2012": Number, "2013": Number} }
});

mongoose.model('Municipio', MunicipioSchema);