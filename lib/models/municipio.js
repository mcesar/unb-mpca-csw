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
	uf: String 
});

mongoose.model('Municipio', MunicipioSchema);