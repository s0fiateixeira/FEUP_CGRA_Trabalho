import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from "./MyCylinder.js";

/**
 * MyPillar
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPillar extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials(scene);
        this.initTexture(scene);
        
        this.cylinder = new MyCylinder(scene, 8);
	}
    initMaterials() {
        this.pillarMaterial = new CGFappearance(this.scene);
		this.pillarMaterial.setAmbient(0.41, 0.41, 0.41, 1);
		this.pillarMaterial.setDiffuse(0.41, 0.41, 0.41, 1);
		this.pillarMaterial.setSpecular(0.0, 0.0, 0.0, 1);
		this.pillarMaterial.setShininess(120);
	}
    initTexture() {    
		this.pillarTexture = new CGFappearance(this.scene);
        this.pillarTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.pillarTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pillarTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.pillarTexture.setShininess(10.0);
        this.pillarTexture.loadTexture('images/rustyMetal.jpg');
        this.pillarTexture.setTextureWrap('REPEAT', 'REPEAT');
    
		//this.pillarTexture = new CGFtexture(this.scene, 'images/pier.jpg');
	}
    display(){

        this.pillarMaterial.apply();
		this.pillarTexture.apply();
        this.scene.pushMatrix();
		this.scene.translate(23, -8, 0);
		this.scene.scale(0.5, 28, 0.5);
        this.cylinder.display();
		
		this.scene.translate(0, 0, -7);
		this.cylinder.display();
		
		this.scene.translate(-30, 0, 0);
		this.cylinder.display();
		
		this.scene.translate(0, 0, 7);
		this.cylinder.display();
		
		this.scene.popMatrix();
	}
}
