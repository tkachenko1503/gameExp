'use strict';

// init libs
var underscore = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    THREE = require('n3d-threejs');
Backbone.$ = $;

var Cube = require('../models/cube');

var collection = Backbone.Collection.extend({
    model: Cube,

    fill: function(){
        this.add({
            color: 0x6C0000,
            x: 2,
            y: 2
        });
    }
});

module.exports = collection;