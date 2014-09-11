//*********************************
// SETUP SCENE ********************
//*********************************
var cards = new Cards();

var gameLogic = new Game();

// TEST : Shuffle .. two players get cards and Flop i out..

// Shuffle card game/ new round
/*cards.shuffle();

// Two players get there two cards.. pop from deck
cards.getPocket();
cards.getPocket();

// The flop gets out three cards from deck
cards.getFlop();

// Reveal one card and then one again ("the river")
var x1 = cards.getOneCard();
var x2 = cards.getOneCard();
cards.whichCard(x1);
cards.whichCard(x2);
//cards.whichCard(card);



console.log("NEEW GAAAMMMEE!!!!!!!");
// TEST 2 restart game and same test..
cards.shuffle();
cards.getPocket();
cards.getPocket();
cards.getFlop();
cards.getOneCard();
cards.getOneCard();*/

var height = 500;
var width = 880;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
camera.position.z = 4.5;
camera.position.x = -4.95;
camera.position.y = 4.59;

var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.addEventListener('change', render);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor( 0x99ccff, 1);
document.getElementById("canvasContainer").appendChild(renderer.domElement);

//Add lights
var light = new THREE.PointLight(0xffffff, 1, 0);
light.position.set(0, 200, 0);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 1, 0);
light2.position.set(0, -200, 0);
scene.add(light2);

var plane = new THREE.Mesh(new THREE.PlaneGeometry(700,700, 50, 50), new THREE.MeshLambertMaterial({color: 0xffffff}));
plane.rotation.x -= 90*(Math.PI/180);
plane.position.y = -5;
scene.add(plane);


var card_materials = [
   new THREE.MeshLambertMaterial({color: 0xffffff}),
   new THREE.MeshLambertMaterial({color: 0xffffff}),
   new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/h_07.png')}), // Top
   new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Bottom
   new THREE.MeshLambertMaterial({color: 0xffffff}),
   new THREE.MeshLambertMaterial({color: 0xffffff})
];

var card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
scene.add(card);

animate();

//**********************
//FUNCTIONS*************
//**********************
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}

render();
