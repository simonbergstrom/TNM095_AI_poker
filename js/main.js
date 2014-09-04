//*********************************
// SETUP SCENE ********************
//*********************************
var height = 600;
var width = 800;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
camera.position.z = 5;

var controls = new THREE.OrbitControls( camera );
controls.damping = 0.2;
controls.addEventListener( 'change', render );

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

//Load objects
var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
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
    scene.add( object );
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
