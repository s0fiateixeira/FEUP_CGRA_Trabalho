import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyWater } from "./MyWater.js";
import { MyPillar } from "./MyPillar.js";
import { MyRockSet } from "./MyRockSet.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this);
        this.cubeMap = new MyCubeMap(this);
        this.cylinder = new MyCylinder(this, 6);
        this.fish = new MyFish(this);
        this.sand = new MySeaFloor(this, 20);
        this.water = new MyWater(this, 20);
        this.pillar = new MyPillar(this);
        this.rock = new MyRockSet(this);

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);

        //Objects connected to MyInterface
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.displayAxis = true;
        this.selectedTexture = 0;
        this.showSphere = false;
        this.showAmbient = true;
        this.showMyMovingObject = false;
        this.showCylinder = false;
        this.showFish = true;
        this.showSand = true;
        this.showWater = true;
        this.showPillars = true;
        this.showRocks = true;

        this.textureList = {
            'Water Texture': 0,
			'Demo Texture': 1,
			'Test Texture': 2
        }

        this.selectedTextureChanged(this.selectedTexture);
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    selectedTextureChanged(selectedTexture){
        this.cubeMap.selectedTextureChanged(selectedTexture);
    }

    checkKeys()  {
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
                text+=" W ";
                this.movingObject.accelerate(0.2*this.speedFactor);
                keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
                text+=" S ";
                this.movingObject.accelerate(-0.2*this.speedFactor);
                keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text+=" A ";
            this.movingObject.turn(0.5);
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text+=" D ";
            this.movingObject.turn(-0.5);
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            text+=" R ";
            this.movingObject.reset();
            keysPressed=true;
        }
        if (keysPressed) {
            console.log(text);
            console.log(this.rock.numberRocks);
            console.log(this.rock.randomX);
            console.log(this.rock.randomY);
            console.log(this.rock.randomZ);
            console.log(this.rock.randomPositionX);
            console.log(this.rock.randomPositionZ);
            this.movingObject.update();
        }
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingObject.update();
        this.fish.update(t);
        this.water.waterShader.setUniformsValues({ timeFactor: t / 100 % 100 });
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();
    
        // ---- BEGIN Primitive drawing section

        // Draw Ambient
        this.pushMatrix();
        this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
        this.scale(500, 500, 500);
        if (this.showAmbient)
            this.cubeMap.display();
        this.popMatrix();

        // Draw Moving Object
        if (this.showMyMovingObject){
            this.movingObject.display();
        }

        // Draw Cylinder
        if (this.showCylinder){
            this.pushMatrix();
            this.cylinder.cylinderTexture.apply();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.cylinder.display();
            this.popMatrix();
        }

        // Draw Sphere
        this.sphereAppearance.apply();
        if (this.showSphere){
            this.pushMatrix();
            this.sphere.sphereTexture.apply();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.sphere.display();
            this.popMatrix();
        }

        // Draw Sand
        if (this.showSand){
            this.sand.display();
        }

        //Draw Water
        if (this.showWater){
            this.water.display();
        }
        
        // Draw Fish
        if (this.showFish){
            this.pushMatrix();
            this.translate(0, 2, 0);
            this.fish.display();
            this.popMatrix();
        }

        // Draw Pillars
        if (this.showPillars){
            this.pushMatrix();
            this.pillar.display();
            this.popMatrix();
        }

        // Draw Rocks
        if (this.showRocks){
            this.rock.display();
        }
            
        // ---- END Primitive drawing section
    }
}
