'use strict';

// init libs
var underscore = require('underscore'),
     $ = require('jquery'),
     Backbone = require('backbone'),
    THREE = require('n3d-threejs');
Backbone.$ = $;

var test = require('./js/models/cube');

// start on DOM ready
$(function(){

    var stats, scene, renderer, group, objects = [];
    var camera;

    var projector = new THREE.Projector(),
        raycaster = new THREE.Raycaster();

    var mouse = new THREE.Vector2(),
        offset = new THREE.Vector3(),
        INTERSECTED, SELECTED;

    if( !init() )	animate();

    //return square geometry
    function makeSquare(group, rows, cols){
        var ci,
            ri;

        var interval = 0.02,
            point = {
                x1: 0,
                x2: 1,
                y1: 0,
                y2: 1
            };

        for(ri = 0; ri < rows; ri++){
            for(ci = 0; ci < cols; ci++){
                var square	= new THREE.Geometry();
                square.vertices.push(new THREE.Vector3(point.x1 + ci + (interval * ci), point.y1 + ri + (interval * ri), 0));
                square.vertices.push(new THREE.Vector3(point.x2 + ci + (interval * ci), point.y1 + ri + (interval * ri), 0));
                square.vertices.push(new THREE.Vector3(point.x2 + ci + (interval * ci), point.y2 + ri + (interval * ri), 0));
                square.vertices.push(new THREE.Vector3(point.x1 + ci + (interval * ci), point.y2 + ri + (interval * ri), 0));
                //face
                square.faces.push(new THREE.Face3(0, 1, 2));
                square.faces.push(new THREE.Face3(2, 3, 0));

                var material	= new THREE.MeshBasicMaterial({
                    color: '#628DB6',
                    side: THREE.DoubleSide
                });
                var mesh	= new THREE.Mesh( square, material );
                group.add( mesh );
                objects.push( mesh );
            }
        }
        return (cols + (interval * cols)) / 2 - interval / 2;
    }


    // init the scene
    function init(){
        if( Detector.webgl ){
            renderer = new THREE.WebGLRenderer({
                precision: 'highp',
                antialias		: true,	// to get smoother output
                preserveDrawingBuffer	: true	// to allow screenshot
            });
            renderer.setClearColor( 0xBBBBBB, 1 );
        }else{
            renderer	= new THREE.CanvasRenderer();
        }
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.domElement.style.display = 'block';
        document.getElementById('container').appendChild(renderer.domElement);

        // add Stats.js - https://github.com/mrdoob/stats.js
        stats = new Stats();
        stats.domElement.style.position	= 'absolute';
        stats.domElement.style.bottom	= '0px';
        document.body.appendChild( stats.domElement );

        // create a scene
        scene = new THREE.Scene();

        // put a camera in the scene
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 10);
        scene.add( camera );

        group = new THREE.Object3D();
        scene.add( group );

        var offset = makeSquare(group, 4, 4);
        group.position.x = -offset;

        //helper grid
        var size = 10;
        var step = 1;
        var gridHelper = new THREE.GridHelper( size, step );
        scene.add( gridHelper );

        // Event Handlers
        renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
        renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
        renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

        window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onDocumentMouseMove( event ) {
        event.preventDefault();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
        projector.unprojectVector( vector, camera );
        var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

        var intersects = raycaster.intersectObjects( objects );
        if ( intersects.length > 0 ) {
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.material.color.setHex( 0xff0000 );
            container.style.cursor = 'pointer';
        } else {
            INTERSECTED = null;
            container.style.cursor = 'auto';
        }
    }

    function onDocumentMouseDown( event ) {
        event.preventDefault();
        console.log(event.target);
        // camera.position.z += 0.5;
        // camera.rotation.x += 0.5;
//			var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
//			projector.unprojectVector( vector, camera );
//			var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
//			var intersects = raycaster.intersectObjects( objects );
//			if ( intersects.length > 0 ) {
//				controls.enabled = false;
//				SELECTED = intersects[ 0 ].object;
//				var intersects = raycaster.intersectObject( plane );
//				offset.copy( intersects[ 0 ].point ).sub( plane.position );
//				container.style.cursor = 'move';
//			}
    }

    function onDocumentMouseUp( event ) {
        event.preventDefault();
//			controls.enabled = true;
//			if ( INTERSECTED ) {
//				plane.position.copy( INTERSECTED.position );
//				SELECTED = null;
//			}
//			container.style.cursor = 'auto';
    }

    // animation loop
    function animate() {
        requestAnimationFrame( animate );

        // do the render
        render();

        // update stats
        stats.update();
    }

    // render the scene
    function render() {
        // actually render the scene
        if(INTERSECTED) {
            // rotate around
        }
        renderer.render( scene, camera );
    }
});