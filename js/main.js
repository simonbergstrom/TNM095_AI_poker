//*********************************
// SETUP SCENE ********************
//*********************************
var gameState;
var humanPlayer;


$("button").each(function(){
  if($(this).attr("id") !== "resetButton" && $(this).attr("id") !== "startButton"){
    $(this).addClass("button-disabled");
    $(this).attr("disabled", true);
  }
});


var height = 500;
var width = 880;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
camera.position.z = 350;
camera.position.y = 300;

var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.addEventListener('change', render);

var renderer = new THREE.WebGLRenderer({antialiasing: true});
renderer.setSize(width, height);
renderer.setClearColor( 0x99ccff, 1);
document.getElementById("canvasContainer").appendChild(renderer.domElement);

var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
scene.add(hemisphereLight);

var plane = new THREE.Mesh(new THREE.PlaneGeometry(700,700, 50, 50), new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('texture/pokertablefelt.jpg')}));
plane.rotation.x -= 90*(Math.PI/180);
plane.position.y = -5;
scene.add(plane);

var card_materials = [
   new THREE.MeshLambertMaterial({color: 0xbbbbbb}),
   new THREE.MeshLambertMaterial({color: 0xbbbbbb}),
   new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/h_07.png')}), // Top
   new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Bottom
   new THREE.MeshLambertMaterial({color: 0xbbbbbb}),
   new THREE.MeshLambertMaterial({color: 0xbbbbbb})
];

var card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = 160;
card.name = "dealer_card1";
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = 80;
card.name = "dealer_card2";
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = 0;
card.name = "dealer_card3";
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = -80;
card.name = "dealer_card4";
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = -160;
card.name = "dealer_card5";
scene.add(card);

// Player 1 card pos
card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.z = 200;
card.position.x = 40;
card.position.y = 40;
card.rotation.x = 45*(Math.PI/180);
card.rotation.z = 20*(Math.PI/180);
card.name = "player1_card1";
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.z = 200;
card.position.x = -40;
card.position.y = 40;
card.rotation.x = 45*(Math.PI/180);
card.rotation.z = -20*(Math.PI/180);
card.name = "player1_card2";
scene.add(card);

// Player 2 card pos
card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.z = -200;
card.position.x = 40;
card.position.y = 40;
card.rotation.x = -45*(Math.PI/180);
card.rotation.z = 20*(Math.PI/180);
card.name = "player2_card1";
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.z = -200;
card.position.x = -40;
card.position.y = 40;
card.rotation.x = -45*(Math.PI/180);
card.rotation.z = -20*(Math.PI/180);
card.name = "player2_card2";
scene.add(card);

// Deck
card_materials = [
   new THREE.MeshLambertMaterial({color: 0xbbbbbb}),
   new THREE.MeshLambertMaterial({color: 0xbbbbbb}),
   new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Top
   new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Bottom
   new THREE.MeshLambertMaterial({color: 0xbbbbbb}),
   new THREE.MeshLambertMaterial({color: 0xbbbbbb})
];

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 30, 88), new THREE.MeshFaceMaterial(card_materials));

card.position.x = 280;
card.position.y = 15;
card.name = "deck";
scene.add(card);

//scene.remove(scene.getObjectByName("deck"));

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


//***************
//ButtonListeners
//***************
//Game is built arount events

$("#startButton").click(function(){
  //Gamelogic and stuff
  console.log("Starting Game!");
  gameState = new GameState();
  humanPlayer = gameState.getHumanPlayer();
  gameState.updateButtons();
  console.log("These are your Cards: ", gameState.getHumanPlayerCards());
});

$("#resetButton").click(function(){
  //Reset the game with a new instance of the gameLogic();
  //Clear the object.
  gameLogic = {};
  gameLogic = new Game();
});

$("#callButton").click(function(){
  //Do shit
});

$("#betButton").click(function(){
  gameState.doMove(humanPlayer, "bet");
});

$("#checkButton").click(function(){

});

$("#raiseButton").click(function(){
  //Do shit
});

$("#foldButton").click(function(){
  //Do shit
});
