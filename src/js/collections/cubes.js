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

    cameraOffset: {x:0, y:0},

    fill: function(rows, cols){
        var ci,
            ri;

        var interval = 0.12,
            zero = {
                x: 0,
                y: 0
            };

        for(ri = 0; ri < rows; ri++){
            for(ci = 0; ci < cols; ci++){
                this.add({
                    color: 0x1E90FF,
                    x: ci + interval + (interval * ci),
                    y: ri + interval + (interval * ri)
                });
            }
        }
        this.cameraOffset.x = (cols + (interval * cols)) / 2 - interval / 2;
        this.cameraOffset.y = (rows + (interval * rows)) / 2 ;
    }
});

module.exports = collection;