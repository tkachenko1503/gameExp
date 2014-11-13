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
    mainColl.fill(5,4);

    // init view
    var view = new mainView( {collection: mainColl} );

});