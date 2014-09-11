//*********************************
// SETUP SCENE ********************
//*********************************
var cards = new Cards();

cards.shuffle();
cards.getRiver();

var height = 500;
var width = 980;

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
document.getElementById("container").appendChild(renderer.domElement);

//Add lights
var light = new THREE.PointLight(0xffffff, 1, 0);
light.position.set(0, 200, 0);
scene.add(light);

/*var ambientLight = new THREE.AmbientLight(0xaaaaaa); // soft white light
scene.add(ambientLight);*/

//Load car
var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
};

// plane
var grassTexture = THREE.ImageUtils.loadTexture("texture/grass_texture.jpg");
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;

//Set repeat how many times
grassTexture.repeat.set(4,4);

var plane = new THREE.Mesh(new THREE.PlaneGeometry(700,700, 50, 50), new THREE.MeshLambertMaterial({map : grassTexture}));
//plane.rotation.z += 45*(Math.PI/180);
plane.rotation.x -= 90*(Math.PI/180);
plane.position.y = -5;
scene.add(plane);

//Texture
var texture = new THREE.Texture();

var loader = new THREE.ImageLoader( manager );
loader.load('obj/policeCar/0000.BMP', function(image){
    texture.image = image;
    texture.needsUpdate = true;
});

//Model
var loader = new THREE.OBJLoader( manager );

loader.load('obj/policeCar/crown_victoria.obj', function(object){
    object.traverse(function(child){
        if(child instanceof THREE.Mesh){
            child.material.map = texture;
        }
    });

    object.rotation.y -= 47*(Math.PI/180);
    object.scale.set(1.6,1.6,1.6);
    object.castShadow = true;
    scene.add(object);
});


//Load Track
var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
};

//Texture
var trackTexture = new THREE.Texture();

var loader = new THREE.ImageLoader( manager );
loader.load('obj/RaceTrack/Main.png', function(image){
    trackTexture.image = image;
    trackTexture.needsUpdate = true;
});

//Model
var loader = new THREE.OBJLoader( manager );

loader.load('obj/RaceTrack/FullTrack.obj', function(object){
    object.traverse(function(child){
        if(child instanceof THREE.Mesh){
            child.material.map = trackTexture;
        }
    });

    object.position.y = -18.4;
    object.position.z = 30;
    object.scale.set(90,90,90);
    object.castShadow = true;
    scene.add(object);
});


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
