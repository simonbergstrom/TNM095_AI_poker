//*********************************
// SETUP SCENE ********************
//*********************************
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

//Add lights
var light2 = new THREE.PointLight(0xffffff, 1, 0);
light2.position.set(0, -200, 0);
scene.add(light2);

/*var ambientLight = new THREE.AmbientLight(0xaaaaaa); // soft white light
scene.add(ambientLight);*/

// plane
var grassTexture = THREE.ImageUtils.loadTexture("css/img/pokertablefelt.jpg");
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;

//Set repeat how many times
//grassTexture.repeat.set(4,4);

var plane = new THREE.Mesh(new THREE.PlaneGeometry(700,700, 5, 5), new THREE.MeshLambertMaterial({map : grassTexture}));

//plane.rotation.z += 45*(Math.PI/180);
plane.rotation.x -= 90*(Math.PI/180);
plane.position.y = -5;
scene.add(plane);

    var materials = [
       new THREE.MeshLambertMaterial({color: 0xffffff}),
       new THREE.MeshLambertMaterial({color: 0xffffff}),
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/h_07.png')}), // Top
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('texture/cards/backside.png')}), // Bottom
       new THREE.MeshLambertMaterial({color: 0xffffff}),
       new THREE.MeshLambertMaterial({color: 0xffffff})
    ];

    var card = new THREE.Mesh(new THREE.BoxGeometry(63.5, 1, 88), new THREE.MeshFaceMaterial(materials));
    scene.add(card);

/*
var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
};

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
    scene.add(object);
});*/

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
