'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Municipio = mongoose.model('Municipio');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

/**
 * Retorna JSON dos municípios
 *
 * @param req
 * @param res
 * @returns {}
 */

exports.municipios = function(req, res) {
    return Municipio.find(function (err, municipios) {
        if (!err) {
            return res.json(municipios);
        } else {
            return res.send(err);
        }
    });
};