'use strict';

// init libs
var underscore = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    THREE = require('n3d-threejs');
Backbone.$ = $;


// cube model
var Cube = Backbone.Model.extend({
    defaults: {
        mesh: null,
        color: 0x404040,
        x: 0,
        y: 0
    },

    initialize: function(){
        var Material = new THREE.MeshPhongMaterial({color:0x0000FF}),
            Geometry = new THREE.BoxGeometry( 1, 1, 1),
            mesh = new THREE.Mesh( Geometry, Material );

        mesh.material.color.setHex(this.get('color'));
        mesh.position.set(this.get('x')+0.5, this.get('y')+0.5, -0.5);
        this.set('mesh', mesh);

        var edg =  new THREE.EdgesHelper( mesh, 0x000000 );
        edg.material.linewidth = 0.4;
        this.set('edg', edg);
    }
});

module.exports = Cube;