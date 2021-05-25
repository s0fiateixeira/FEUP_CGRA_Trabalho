import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";

/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaFloor extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials(scene);
        this.initTexture(scene);
		this.initShader(scene);
        
        this.plane = new MyPlane(scene, 20);
	}
    initMaterials() {
        this.sandMaterial = new CGFappearance(this.scene);
		this.sandMaterial.setAmbient(0.3, 0.3, 0.3, 1);
		this.sandMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sandMaterial.setSpecular(0.0, 0.0, 0.0, 1);
		this.sandMaterial.setShininess(120);
	}
    initTexture() {        
        this.sandTexture = new CGFtexture(this.scene, 'images/sand.png');
		this.sandTexMap = new CGFtexture(this.scene, 'images/sandMap.png');
		this.sandMaterial.setTexture(this.sandTexture);
    }
    initShader(){
		this.sandShader = new CGFshader(this.scene.gl, "shaders/sand.vert", "shaders/sand.frag");
		this.sandShader.setUniformsValues({ uSampler1: this.sandTexture});
		this.sandShader.setUniformsValues({ uSampler3: this.sandTexMap});
	}
    display(){

        this.sandMaterial.apply();

        this.scene.pushMatrix();
        this.scene.setActiveShader(this.sandShader);
		this.scene.translate(0, -10, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(50, 50, 50);
		this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
	}
}
