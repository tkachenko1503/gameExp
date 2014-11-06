'use strict';

// init libs
var underscore = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    THREE = require('n3d-threejs');
Backbone.$ = $;

var Material = new THREE.MeshBasicMaterial({color:0x0000FF}),
    Geometry = new THREE.BoxGeometry( 1, 1, 1 );


// cube model
var Cube = Backbone.Model.extend({
    defaults: {
        mesh: new THREE.Mesh( Geometry, Material ),
        color: 0x404040
    },

    initialize: function(x, y){
        var mesh = this.get('mesh');
        mesh.position.set(x-0.5, y-0.5, 0);

        var edg =  new THREE.EdgesHelper( mesh, 0x000000 );
        edg.material.linewidth = 1;
        this.set('edg', edg);
    }
});

module.exports = Cube;