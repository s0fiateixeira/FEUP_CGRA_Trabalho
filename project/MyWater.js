import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";

/**
 * MyWater
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWater extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials(scene);
        this.initTexture(scene);
		this.initShader(scene);
        
        this.plane = new MyPlane(scene, 20);
	}
    initMaterials() {
        this.waterMaterial = new CGFappearance(this.scene);
		this.waterMaterial.setAmbient(0.14, 0.44, 0.64, 1);
		this.waterMaterial.setDiffuse(0.14, 0.44, 0.64, 1);
		this.waterMaterial.setSpecular(0.0, 0.0, 0.0, 1);
		this.waterMaterial.setShininess(120);
	}
    initTexture() {        
        this.waterTextures = [
			this.waterTexture = new CGFtexture(this.scene, 'images/pier.jpg'),
			this.waterTexMapColor = new CGFtexture(this.scene, 'images/distortionmap.png')
		];
	}
    initShader(){
		this.waterShader = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");
		this.waterShader.setUniformsValues({ uSampler1: 0});
		this.waterShader.setUniformsValues({ uSampler3: 1});
	}
    display(){

        this.waterMaterial.apply();

        this.scene.pushMatrix();
        this.scene.setActiveShader(this.waterShader);
		this.waterTexture.bind(0);
		this.waterTexMapColor.bind(1);
		this.scene.translate(0, 20, 0);
		this.scene.scale(50, 50, 50);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
	}
}
