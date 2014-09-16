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
camera.position.z = 320;
camera.position.y = 200;

var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.addEventListener('change', render);

var renderer = new THREE.WebGLRenderer({});
renderer.setSize(width, height);
renderer.setClearColor( 0x000000, 1);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
document.getElementById("canvasContainer").appendChild(renderer.domElement);

//var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
//scene.add(hemisphereLight);
var d = 300;
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(0, 1100, 500);
spotLight.castShadow = true;
spotLight.shadowMapWidth = 512;
spotLight.shadowMapHeight = 512;

spotLight.shadowCameraLeft = -d;
spotLight.shadowCameraRight = d;
spotLight.shadowCameraTop = d;
spotLight.shadowCameraBottom = -d;
spotLight.shadowCameraNear = 400;
spotLight.shadowCameraFar = 4000;
spotLight.shadowDarkness = 0.4;
scene.add(spotLight);

/*var spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight2.position.set(0, 900, -500);
spotLight2.castShadow = true;
spotLight2.shadowMapWidth = 1024;
spotLight2.shadowMapHeight = 1024;
spotLight2.shadowCameraLeft = -d;
spotLight2.shadowCameraRight = d;
spotLight2.shadowCameraTop = d;
spotLight2.shadowCameraBottom = -d;
spotLight2.shadowCameraNear = 400;
spotLight2.shadowCameraFar = 4000;
spotLight2.shadowDarkness = 0.4;
scene.add(spotLight2);*/

var tableTexture = THREE.ImageUtils.loadTexture('texture/pattern16.png');
tableTexture.wrapS = tableTexture.wrapT = THREE.RepeatWrapping;
tableTexture.repeat.set(4, 4);

var plane = new THREE.Mesh(new THREE.PlaneGeometry(1500,1500, 1, 1), new THREE.MeshPhongMaterial({map: tableTexture}));
plane.rotation.x -= 90*(Math.PI/180);
plane.position.y = -5;
plane.receiveShadow = true;
plane.material.side = THREE.DoubleSide;
scene.add(plane);

var card_materials = [
   new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
   new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
   new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/h_07.png')}), // Top
   new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Bottom
   new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
   new THREE.MeshPhongMaterial({color: 0xbbbbbb})
];

var card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = 160;
card.name = "dealer_card1";
card.castShadow = true;
scene.add(card);


card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = 80;
card.name = "dealer_card2";
card.castShadow = true;
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = 0;
card.name = "dealer_card3";
card.castShadow = true;
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = -80;
card.name = "dealer_card4";
card.castShadow = true;
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.x = -160;
card.name = "dealer_card5";
card.castShadow = true;
scene.add(card);

// Player 1 card pos
card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.z = 200;
card.position.x = 40;
card.position.y = 40;
card.rotation.x = 45*(Math.PI/180);
card.rotation.z = 20*(Math.PI/180);
card.castShadow = true;
card.name = "player1_card1";
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.z = 200;
card.position.x = -40;
card.position.y = 40;
card.rotation.x = 45*(Math.PI/180);
card.rotation.z = -20*(Math.PI/180);
card.castShadow = true;
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
card.castShadow = true;
scene.add(card);

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
card.position.z = -200;
card.position.x = -40;
card.position.y = 40;
card.rotation.x = -45*(Math.PI/180);
card.rotation.z = -20*(Math.PI/180);
card.name = "player2_card2";
card.castShadow = true;
scene.add(card);

// Deck
card_materials = [
   new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
   new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
   new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Top
   new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Bottom
   new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
   new THREE.MeshPhongMaterial({color: 0xbbbbbb})
];

card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 30, 88), new THREE.MeshFaceMaterial(card_materials));

card.position.x = 280;
card.position.y = 15;
card.name = "deck";
card.castShadow = true;
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
  gameState = {};
  gameState = new GameState();
  gameState.updateButtons();
});

$("#callButton").click(function(){
  gameState.doMove(humanPlayer, "call");

  //Start the enemy move
  gameState.enemyMakeRandomMove();
});

$("#betButton").click(function(){
  gameState.doMove(humanPlayer, "bet");

  //Start the enemy move
  gameState.enemyMakeRandomMove();
});

$("#checkButton").click(function(){
  gameState.doMove(humanPlayer, "check");

  //Start the enemy move
  gameState.enemyMakeRandomMove();
});

$("#raiseButton").click(function(){
  gameState.doMove(humanPlayer, "raise");

  //Start the enemy move
  gameState.enemyMakeRandomMove();
});

$("#foldButton").click(function(){
  gameState.doMove(humanPlayer, "fold");
});
