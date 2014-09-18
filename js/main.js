//*********************************
// SETUP SCENE ********************
//*********************************
var gameState;
var humanPlayer;

var clock = new THREE.Clock();

$("button").each(function(){
  if($(this).attr("id") !== "startButton"){
    $(this).addClass("button-disabled");
    $(this).attr("disabled", true);
  }
});

var height = 500;
var width = 880;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width/height, 1, 2000);
camera.position.z = 320;
camera.position.y = 200;

var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.addEventListener('change', render);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor( 0x000000, 1);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
document.getElementById("canvasContainer").appendChild(renderer.domElement);

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

var pointLight = new THREE.PointLight( 0xffffff, 0.75, 400);
pointLight.position.set(0, 80, 0);
scene.add(pointLight);

var tableTexture = THREE.ImageUtils.loadTexture('texture/pattern16.png');
tableTexture.wrapS = tableTexture.wrapT = THREE.RepeatWrapping;
tableTexture.repeat.set(15, 15);

var plane = new THREE.Mesh(new THREE.PlaneGeometry(2000,4000, 1, 1), new THREE.MeshPhongMaterial({map: tableTexture}));
plane.rotation.x -= 90*(Math.PI/180);
plane.position.y = -5;
plane.receiveShadow = true;
plane.material.side = THREE.DoubleSide;
scene.add(plane);

// Deck
var deck_material = [
   new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
   new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
   new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Top
   new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Bottom
   new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
   new THREE.MeshPhongMaterial({color: 0xbbbbbb})
];

var deck = new THREE.Mesh(new THREE.BoxGeometry(63.5, 30, 88), new THREE.MeshFaceMaterial(deck_material));

deck.position.x = 280;
deck.position.y = 15;
deck.name = "deck";
deck.castShadow = true;
scene.add(deck);

var textureArray = {};

var cardObjects = {"all_cards"     : {castShadow: true},
                   "dealer_card1"  : {name:  "dealer_card1", position: {x:  160, y:  0, z:    0}, rotation: {x:                 0, y: 0, z:                 0}},
                   "dealer_card2"  : {name:  "dealer_card2", position: {x:   80, y:  0, z:    0}, rotation: {x:                 0, y: 0, z:                 0}},
                   "dealer_card3"  : {name:  "dealer_card3", position: {x:    0, y:  0, z:    0}, rotation: {x:                 0, y: 0, z:                 0}},
                   "dealer_card4"  : {name:  "dealer_card4", position: {x:  -80, y:  0, z:    0}, rotation: {x:                 0, y: 0, z:                 0}},
                   "dealer_card5"  : {name:  "dealer_card5", position: {x: -160, y:  0, z:    0}, rotation: {x:                 0, y: 0, z:                 0}},
                   "player1_card1" : {name: "player1_card1", position: {x:   40, y: 40, z:  200}, rotation: {x:  45*(Math.PI/180), y: 0, z:  20*(Math.PI/180)}},
                   "player1_card2" : {name: "player1_card2", position: {x:  -40, y: 40, z:  200}, rotation: {x:  45*(Math.PI/180), y: 0, z: -20*(Math.PI/180)}},
                   "player2_card1" : {name: "player2_card1", position: {x:   40, y: 40, z: -200}, rotation: {x: -45*(Math.PI/180), y: 0, z:  20*(Math.PI/180)}},
                   "player2_card2" : {name: "player2_card2", position: {x:  -40, y: 40, z: -200}, rotation: {x: -45*(Math.PI/180), y: 0, z: -20*(Math.PI/180)}}};

loadTextures();
animate();

//**********************
//FUNCTIONS*************
//**********************
function animate() {
  var time  = clock.getElapsedTime();
  var delta = clock.getDelta();

  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

function loadTextures() {
    var suits = ["Clubs", "Diamonds", "Spades", "Hearts"];
    for(var j=0; j<suits.length; ++j){
        for(var i=1; i<=13; ++i){
            textureArray[suits[j] + i] = THREE.ImageUtils.loadTexture('texture/cards/' + suits[j] + i + '.png');
        }
    }
    textureArray["backside"] = THREE.ImageUtils.loadTexture('texture/cards/backside.png');
    textureArray["Secret"]   = THREE.ImageUtils.loadTexture('texture/cards/Secret.png');
}

function removeCards() {
    for(card in cardObjects){
        scene.remove(scene.getObjectByName(card));
    }
}

function drawCard(name, card) {
    var card_materials = [
       new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
       new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
       new THREE.MeshPhongMaterial({map: textureArray[card.suit+card.number]}), // Top
       new THREE.MeshPhongMaterial({map: textureArray["backside"]}),            // Bottom
       new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
       new THREE.MeshPhongMaterial({color: 0xbbbbbb})
    ];
    var new_card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));

    addProperty(new_card, cardObjects["all_cards"]);
    addProperty(new_card, cardObjects[name]);

    scene.add(new_card);
}

function addProperty(target, object){
    for(property in object){
        if(typeof object[property] === "object"){
            addProperty(target[property], object[property]);
        }
        else{
            target[property] = object[property];
        }
    }
}

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

$("#callButton").click(function(){
  gameState.doMove(humanPlayer, "call");

  //Start the enemy move
  //gameState.enemyMakeRandomMove();
});

$("#betButton").click(function(){
  gameState.doMove(humanPlayer, "bet");

  //Start the enemy move
  gameState.enemyMakeRandomMove();
});

$("#checkButton").click(function(){
  gameState.doMove(humanPlayer, "check");

  //Start the enemy move
  if(gameState.bigBlind === 2){
    gameState.enemyMakeRandomMove();
  }
});

$("#raiseButton").click(function(){
  gameState.doMove(humanPlayer, "raise");

  //Start the enemy move
  gameState.enemyMakeRandomMove();
});

$("#foldButton").click(function(){
  gameState.doMove(humanPlayer, "fold");
});




















/*
function drawCard(name, card) {
    var card_materials = [
       new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
       new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
       new THREE.MeshPhongMaterial({map: textureArray[card.suit+card.number]}), // Top
       new THREE.MeshPhongMaterial({map: textureArray["backside"]}),            // Bottom
       new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
       new THREE.MeshPhongMaterial({color: 0xbbbbbb})
    ];
    var new_card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(card_materials));
    new_card.position.x = cardObjects[name].pos.x;
    new_card.position.y = cardObjects[name].pos.y;
    new_card.position.z = cardObjects[name].pos.z;
    new_card.rotation.x = cardObjects[name].rot.x;
    new_card.rotation.y = cardObjects[name].rot.y;
    new_card.rotation.z = cardObjects[name].rot.z;
    new_card.name       = name;
    new_card.castShadow = true;
    scene.add(new_card);

var cardObjects = {"dealer_card1" : {pos: new THREE.Vector3(160,0,0),     rot: new THREE.Vector3(0,0,0)},
                   "dealer_card2" : {pos: new THREE.Vector3(80,0,0),      rot: new THREE.Vector3(0,0,0)},
                   "dealer_card3" : {pos: new THREE.Vector3(0,0,0),       rot: new THREE.Vector3(0,0,0)},
                   "dealer_card4" : {pos: new THREE.Vector3(-80,0,0),     rot: new THREE.Vector3(0,0,0)},
                   "dealer_card5" : {pos: new THREE.Vector3(-160,0,0),    rot: new THREE.Vector3(0,0,0)},
                   "player1_card1": {pos: new THREE.Vector3(40,40,200),   rot: new THREE.Vector3(45*(Math.PI/180),0,20*(Math.PI/180))},
                   "player1_card2": {pos: new THREE.Vector3(-40,40,200),  rot: new THREE.Vector3(45*(Math.PI/180),0,-20*(Math.PI/180))},
                   "player2_card1": {pos: new THREE.Vector3(40,40,-200),  rot: new THREE.Vector3(-45*(Math.PI/180),0,20*(Math.PI/180))},
                   "player2_card2": {pos: new THREE.Vector3(-40,40,-200), rot: new THREE.Vector3(-45*(Math.PI/180),0,-20*(Math.PI/180))}};
}*/
