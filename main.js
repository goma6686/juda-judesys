import './style.css'
import * as THREE from 'three'; //to start: 1) scene(container) 2) camera 3) renderer
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // 1) FOV 2) Aspect Ratio - based off browser window 3) view frustum
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio); //pixel ratio to device pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight);//make it full screen canvas

//since now camera is in the middle -> move along Z axis
camera.position.setZ(30);

renderer.render(scene, camera);

//add object to scene


const geometry3 = new THREE.TorusKnotGeometry( 4, 1, 100, 16 );
//const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
const material3 = new THREE.MeshStandardMaterial( { color: 0x00FFFF } ); //needs light
const torusKnot = new THREE.Mesh( geometry3, material3 );
scene.add( torusKnot );

const geometry = new THREE.TorusGeometry( 20, 1, 5, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0x2483D1 } );
const ring = new THREE.Mesh( geometry, material );
scene.add( ring );

const geometry2 = new THREE.SphereGeometry( 15, 32, 16 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
const torus = new THREE.Mesh( geometry2, material2 );
scene.add( torus );

//light from one point
const light = new THREE.PointLight(0xffffff);
light.position.set(20,20,20);

//ambient light
const ambLight = new THREE.AmbientLight(0xD18324);
scene.add(light, ambLight);

//light and grid helpers
const lightHelper = new THREE.PointLightHelper(light);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

//orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame(animate);
  //add some animation
  ring.rotation.x += 0.01; //rotate for every frame
  ring.rotation.y += 0.005;
  ring.rotation.z += 0.01;

  torus.rotation.x += 0.01; //rotate for every frame
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();