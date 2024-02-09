import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 15;
camera.position.y = 5;

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, side: THREE.FrontSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
// scene.add(boxMesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;

directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(directionalLightHelper);

const gltfLoader = new GLTFLoader();
// gltfLoader.load('/dancer.glb', (gltf) => {
//   const character = gltf.scene;
//   character.position.y = 0.8;
//   character.scale.set(0.01, 0.01, 0.01);
//   scene.add(character);
// });
const gltf = await gltfLoader.loadAsync('/dancer.glb');
const character = gltf.scene;
character.position.y = 0.8;
character.scale.set(0.01, 0.01, 0.01);
character.castShadow = true;
character.receiveShadow = true;
character.traverse((obj) => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});

scene.add(character);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  orbitControls.update();
};

render();
