(function(){
	"use strict";
	var scene, camera, renderer,cube;
	var clock = new THREE.Clock;
	var ROTATE_X=true;
	var ROTATE_Y=false;
	var container=$("#container");
	setUp();
	addObject();
	renderObject();

	function setUp(){
		//set scene parameters
		var WIDTH=window.innerWidth;
		var HEIGHT=window.innerHeight;
		//set camera params
		var VIEW_ANGLE=45;
		var ASPECT=WIDTH/HEIGHT;
		var NEAR=0.1;
		var FAR=10000;

		scene=new THREE.Scene;
		renderer=new THREE.CanvasRenderer(
			{
				antialias:true
			}
			);
		renderer.setSize(WIDTH,HEIGHT);
		container.append(renderer.domElement);

		camera=new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT,NEAR,FAR);
		camera.position.y=30;
		camera.position.z=400;
		scene.add(camera);
	}
	function addObject(){
		//add cube properties
		var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
		var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });

		cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.rotation.y = Math.PI * 45 / 180;
		cube.rotation.z=Math.PI*45/180;
		scene.add(cube);
		camera.lookAt(cube);
		renderer.setClearColorHex(0x333F47, 1);
 
	    // Create a light, set its position, and add it to the scene.
	    var light = new THREE.PointLight(0xffffff);
	    light.position.set(0,300,200);
	    scene.add(light)
	}
	function renderObject(){
		if(ROTATE_Y){
			cube.rotation.y -= clock.getDelta();
			ROTATE_X=true;
			ROTATE_Y=false;
		}
		else if(ROTATE_X){
			cube.rotation.x -= clock.getDelta();
			ROTATE_Y=true;
			ROTATE_X=false;
		}
		renderer.render(scene,camera);
		requestAnimationFrame(renderObject);
	}
})();