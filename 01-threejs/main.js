import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.PCFShadowMap;
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
scene.add(boxMesh);

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

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableDamping = true;
// orbitControls.dampingFactor = 0.03;
// orbitControls.enableZoom = true;
// orbitControls.enablePan = true;
// orbitControls.enableRotate = true;
// orbitControls.autoRotate = false;
// orbitControls.autoRotateSpeed = 2;
// orbitControls.maxPolarAngle = Math.PI / 2;
// orbitControls.minPolarAngle = Math.PI / 4;
// orbitControls.maxAzimuthAngle = Math.PI / 2;
// orbitControls.minAzimuthAngle = -Math.PI / 2;

// const flyControls = new FlyControls(camera, renderer.domElement);
// flyControls.movementSpeed = 1;
// flyControls.rollSpeed = Math.PI / 10;
// flyControls.autoForward = false;

camera.position.set(0, 1, 5);
// const firstPersonControls = new FirstPersonControls(camera, renderer.domElement);
// firstPersonControls.lookSpeed = 0.1;
// firstPersonControls.movementSpeed = 1;
// firstPersonControls.lookVertical = true;

// const pointerLockControls = new PointerLockControls(camera, renderer.domElement);
// window.addEventListener('click', () => {
//   pointerLockControls.lock();
// });

const trackballControls = new TrackballControls(camera, renderer.domElement);
trackballControls.rotateSpeed = 2;
trackballControls.zoomSpeed = 1.5;
trackballControls.panSpeed = 0.5;
trackballControls.noRotate = false;
trackballControls.noZoom = false;
trackballControls.noPan = false;
trackballControls.staticMoving = false;
trackballControls.dynamicDampingFactor = 0.05;

const target = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({ color: 0x0000ff }),
);
target.position.set(4, 0.5, 0);
scene.add(target);
trackballControls.target = target.position;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // orbitControls.update();
  // flyControls.update(clock.getDelta());
  // firstPersonControls.update(clock.getDelta());
  trackballControls.update();
};

render();
