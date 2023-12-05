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
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//On crée la scène & la caméra.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


//C'est le rendu que l'on voit sur l'écran
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );
renderer.setClearColor( 0x81ada7, 1 ); // the default

const params = {
	threshold: 0,
	strength: 0.2,
	radius: 0,
	exposure: 1
};
//On défini la taille du rendu => Dans ce cas, il prend 100vw sur 100vh
renderer.setSize( window.innerWidth, window.innerHeight );

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;

const outputPass = new OutputPass();

const composer = new EffectComposer( renderer );
composer.setSize( window.innerWidth, window.innerHeight );
composer.addPass( renderScene );
composer.addPass( bloomPass );
composer.addPass( outputPass );

//On ajoute le rendu au document .html
document.querySelector('.app').appendChild( renderer.domElement );

const loader = new GLTFLoader();
loader.load(
	'models/animated_fire/scene.gltf',
	function ( gltf ) {
		scene.add( gltf.scene );
		gltf.animations;
		gltf.scene;
		gltf.scenes;
		gltf.cameras;
		gltf.asset;
		gltf.scene.position.x = 5;
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);


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

const cube2_geometry = new THREE.BoxGeometry( 5, 5, 5 );
const cube2_material = new THREE.MeshBasicMaterial( { 
	color: 0xffffff,
	reflectivity:10,
	roughness: 0.5,
	metalness: 0.5,
} );
//On crée le cube
const cube2 = new THREE.Mesh( cube2_geometry, cube2_material );
cube2.position.z = 0;
cube2.position.x = 0;
cube2.position.z = -5;
//On ajoute à la scène le cube
scene.add( cube2 );

camera.position.z = 5;
controls.update();

var cubeGeometry = new THREE.BoxGeometry(5, 2, 0.1);
var cubeMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1, receiveShadow: false, side: THREE.FrontSide });
const cube_text = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube_text);


var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var scaleFactor = 8; 
canvas.width = 400 * scaleFactor;
canvas.height = 100 * scaleFactor;
context.font = 'Bold ' + (40 * scaleFactor) + 'px Arial';
context.fillStyle = 'rgba(0, 0, 0, 1)';
context.fillText('Olympic Quest', 10 * scaleFactor, 40 * scaleFactor);

var texture = new THREE.Texture(canvas);
texture.needsUpdate = true;

cube_text.material.map = texture;

cube_text.position.set(0.5, 0, 1);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 100 );
directionalLight.position.y = 0;
directionalLight.position.z = -3;

directionalLight.target = cube;
scene.add( directionalLight );
console.log(directionalLight);

var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

const mouse = new THREE.Vector2();
document.addEventListener('mousemove', (event) => {
  // Convert mouse coordinates to normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const cameraEasingFactor = 0.5;
const velocity = 1.1;

  function animate() {
	directionalLightHelper.update();

	requestAnimationFrame( animate );
	ThreeMeshUI.update();
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	cube.rotation.y += (mouse.x * 0.25 - cube.rotation.y) * cameraEasingFactor * 0.15;
	cube.rotation.x += (-mouse.y * 0.25 - cube.rotation.x) * cameraEasingFactor * 0.15;
	camera.rotation.x += (mouse.y * 0.25 - camera.rotation.x) * cameraEasingFactor * 0.15;
	camera.rotation.y += (-mouse.x * 0.25 - camera.rotation.y) * cameraEasingFactor * 0.15;
	cube2.position.x += (mouse.x * 0.25 - camera.rotation.y) * cameraEasingFactor * 0.2;
	cube2.position.y += (mouse.y * 0.25 - camera.rotation.x) * cameraEasingFactor * 0.2;

	// cube_text.rotation.y += 0.01;
	composer.render( scene, camera );
}

animate();