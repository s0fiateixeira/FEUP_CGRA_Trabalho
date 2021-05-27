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
		this.sandMaterial.setAmbient(0.74, 0.60, 0.48, 1);
		this.sandMaterial.setDiffuse(0.74, 0.60, 0.48, 1);
		this.sandMaterial.setSpecular(0.0, 0.0, 0.0, 1);
		this.sandMaterial.setShininess(120);
	}
    initTexture() {        
        this.sandTextures = [
			this.sandTexture = new CGFtexture(this.scene, 'images/sand1.png'),
			this.sandTexMapColor = new CGFtexture(this.scene, 'images/sandMapColor.png'),
			this.sandTexMap = new CGFtexture(this.scene, 'images/sandMap1.png')
		];
	}
    initShader(){
		this.sandShader = new CGFshader(this.scene.gl, "shaders/sand.vert", "shaders/sand.frag");
		this.sandShader.setUniformsValues({ uSampler1: 0});
		this.sandShader.setUniformsValues({ uSampler2: 1});
		this.sandShader.setUniformsValues({ uSampler3: 2});
	}
    display(){

        this.sandMaterial.apply();

        this.scene.pushMatrix();
        this.scene.setActiveShader(this.sandShader);
		this.sandTexture.bind(0);
		this.sandTexMapColor.bind(1);
		this.sandTexMap.bind(2);
		this.scene.translate(0, -10, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(50, 50, 50);
		this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
	}
}
