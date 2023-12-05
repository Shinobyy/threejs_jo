/*
	Documentation : https://threejs.org/docs/
	HERO: https://sustainablehorizons.ai/
	Pres design appli/cooldown: https://barbora.design/
*/

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import ThreeMeshUI from 'three-mesh-ui';
import TextSprite from '@seregpie/three.text-sprite';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//On crée la scène & la caméra.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


//C'est le rendu que l'on voit sur l'écran
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );
renderer.setClearColor( 0x000000, 0 ); // the default

//On défini la taille du rendu => Dans ce cas, il prend 100vw sur 100vh
renderer.setSize( window.innerWidth, window.innerHeight );

//On ajoute le rendu au document .html
document.querySelector('.app').appendChild( renderer.domElement );


/* Pour ajouter un objet 3D	*/
//On définit la géométrie, le matériau
const cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//On crée le cube
const cube = new THREE.Mesh( cube_geometry, cube_material );
cube.position.z = 0;
cube.position.x = 0;
//On ajoute à la scène le cube
scene.add( cube );

camera.position.z = 5;
controls.update();

// Create a cube with a transparent material
var cubeGeometry = new THREE.BoxGeometry(5, 2, 0);
var cubeMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, receiveShadow: false, side: THREE.FrontSide });
const cube_text = new THREE.Mesh(cubeGeometry, cubeMaterial); // Rename cube to cube_text
scene.add(cube_text);

// Create a texture for the text
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var scaleFactor = 8; // Adjust the scale factor for higher resolution
canvas.width = 400 * scaleFactor; // Adjust the canvas size
canvas.height = 100 * scaleFactor; // Adjust the canvas size
context.font = 'Bold ' + (40 * scaleFactor) + 'px Arial'; // Adjust the font size
context.fillStyle = 'rgba(0, 0, 0, 1)';
context.fillText('Olympic Quest', 10 * scaleFactor, 40 * scaleFactor); // Adjust text position

var texture = new THREE.Texture(canvas);
texture.needsUpdate = true;

// Apply the texture to the cube
cube_text.material.map = texture; // Change cube.material.map to cube_text.material.map

// Set the position of the cube
cube_text.position.set(0, 0, 1); // Change cube.position to cube_text.position

  function animate() {
	requestAnimationFrame( animate );
	ThreeMeshUI.update();
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	// cube_text.rotation.y += 0.01;
	renderer.render( scene, camera );
}

animate();