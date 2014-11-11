'use strict';

// init libs
var underscore = require('underscore'),
     $ = require('jquery'),
     Backbone = require('backbone'),
    THREE = require('n3d-threejs');
Backbone.$ = $;

var mainView = require('./js/views/scene'),
    cubeCollection = require('./js/collections/cubes');

// start on DOM ready
$(function(){

    // collection instance
    var mainColl = new cubeCollection();

    // populate with cube models
    mainColl.fill();

    // init view
    var view = new mainView( {collection: mainColl} );


//
//    var mouse = new THREE.Vector2(),
//        offset = new THREE.Vector3(),
//        INTERSECTED, SELECTED;
//
//
//    //return square geometry
//    function makeSquare(group, rows, cols){
//        var ci,
//            ri;
//
//        var interval = 0.02,
//            point = {
//                x1: 0,
//                x2: 1,
//                y1: 0,
//                y2: 1
//            };
//
//        for(ri = 0; ri < rows; ri++){
//            for(ci = 0; ci < cols; ci++){
//                var square	= new THREE.Geometry();
//                square.vertices.push(new THREE.Vector3(point.x1 + ci + (interval * ci), point.y1 + ri + (interval * ri), 0));
//                square.vertices.push(new THREE.Vector3(point.x2 + ci + (interval * ci), point.y1 + ri + (interval * ri), 0));
//                square.vertices.push(new THREE.Vector3(point.x2 + ci + (interval * ci), point.y2 + ri + (interval * ri), 0));
//                square.vertices.push(new THREE.Vector3(point.x1 + ci + (interval * ci), point.y2 + ri + (interval * ri), 0));
//                //face
//                square.faces.push(new THREE.Face3(0, 1, 2));
//                square.faces.push(new THREE.Face3(2, 3, 0));
//
//                var material	= new THREE.MeshBasicMaterial({
//                    color: '#628DB6',
//                    side: THREE.DoubleSide
//                });
//                var mesh	= new THREE.Mesh( square, material );
//                group.add( mesh );
//                objects.push( mesh );
//            }
//        }
//        return (cols + (interval * cols)) / 2 - interval / 2;
//    }

//        //group = new THREE.Object3D();
//        //scene.add( group );
//        //
//        //var offset = makeSquare(group, 4, 4);
//        //group.position.x = -offset;
});