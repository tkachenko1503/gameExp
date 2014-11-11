'use strict';

// init libs
var underscore = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    THREE = require('n3d-threejs');
Backbone.$ = $;

var Scene = Backbone.View.extend({
    el: '#container',

    events: {
        "mousemove"         : "onDocumentMouseMove",
        "mousedown"         : "onDocumentMouseDown",
        "mouseup"           : "onDocumentMouseUp"
    },

    Game: {
        renderer: {},
        projector: new THREE.Projector(),
        raycaster: new THREE.Raycaster(),
        scene: new THREE.Scene(),
        stats: new Stats(),
        camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
        gridHelper: new THREE.GridHelper( 10, 1 ),

        runLoop: function animate(){

            requestAnimationFrame(animate.bind(this));
            /**
             * Render the scene
             */
            this.renderer.render( this.scene, this.camera );

            /**
             * Update stats
             */
            this.stats.update();
        }
    },

    initialize: function() {
        var Game = this.Game;

        /**
         * Set renderer
         */
        if( Detector.webgl ){
            Game.renderer = new THREE.WebGLRenderer({
                precision: 'highp',
                antialias		: true,	// to get smoother output
                preserveDrawingBuffer	: true	// to allow screenshot
            });
            Game.renderer.setClearColor( 0xBBBBBB, 1 );
        }else{
            Game.renderer = new THREE.CanvasRenderer();
        }
        Game.renderer.setSize( window.innerWidth, window.innerHeight);
        Game.renderer.domElement.style.display = 'block';
        this.$el.append(Game.renderer.domElement);

        /**
         * Set stats
         */
        Game.stats.domElement.style.position	= 'absolute';
        Game.stats.domElement.style.bottom	= '0px';
        document.body.appendChild( Game.stats.domElement );

        /**
         * Set camera
         */
        Game.camera.position.set(0, 2, 10);
        Game.scene.add( Game.camera );

        /**
         * Set helper grid
         */
        Game.scene.add( Game.gridHelper );


        this.collection.each(function(cube) {
            var cubeMesh = cube.get('mesh');
            Game.scene.add(cubeMesh);

            Game.scene.add(cube.get('edg'));
        });

        /**
         * Listener for resize
         */
        window.addEventListener( 'resize', function() {
            Game.camera.aspect = window.innerWidth / window.innerHeight;
            Game.camera.updateProjectionMatrix();
            Game.renderer.setSize( window.innerWidth, window.innerHeight );
        }, false );


        /**
         * Run game loop
         */
        this.render();
    },

    onDocumentMouseMove: function( event ) {
        event.preventDefault();
        //mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        //mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        //var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
        //projector.unprojectVector( vector, camera );
        //var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
        //
        //var intersects = raycaster.intersectObjects( objects );
        //if ( intersects.length > 0 ) {
        //    INTERSECTED = intersects[ 0 ].object;
        //    INTERSECTED.material.color.setHex( 0xff0000 );
        //    container.style.cursor = 'pointer';
        //} else {
        //    INTERSECTED = null;
        //    container.style.cursor = 'auto';
        //}
    },

    onDocumentMouseDown: function( event ) {
        event.preventDefault();
        //var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
        //projector.unprojectVector( vector, camera );
        //var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
        //var intersects = raycaster.intersectObjects( objects );
        //if ( intersects.length > 0 ) {
        //    controls.enabled = false;
        //    SELECTED = intersects[ 0 ].object;
        //    var intersects = raycaster.intersectObject( plane );
        //    offset.copy( intersects[ 0 ].point ).sub( plane.position );
        //    container.style.cursor = 'move';
        //}
    },

    onDocumentMouseUp: function( event ) {
        event.preventDefault();
        //controls.enabled = true;
        //if ( INTERSECTED ) {
        //    plane.position.copy( INTERSECTED.position );
        //    SELECTED = null;
        //}
        //container.style.cursor = 'auto';
    },

    render: function() {
        this.Game.runLoop();
    }
});

module.exports = Scene;