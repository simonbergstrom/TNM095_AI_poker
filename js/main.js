//*********************************
// SETUP SCENE ********************
//*********************************
var height = 300;
var width = 700;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor( 0xffffff, 1 );
document.getElementById("container").appendChild(renderer.domElement);

var light = new THREE.PointLight(0xffffff, 1, 30);
light.position.set(0, 10, 0);
scene.add(light);

var light2 = new THREE.PointLight(0xeeeeee, 1, 20);
light2.position.set(0, 0, 5);
scene.add(light2);

var geometry = new THREE.BoxGeometry(1, 3, 2);
var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;


//**********************
//FUNCTIONS*************
//**********************

function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
render();
