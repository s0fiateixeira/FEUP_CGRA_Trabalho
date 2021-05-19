import {CGFappearance, CGFobject, CGFshader} from '../lib/CGF.js';
import { MyIsoscelesTriangle } from './MyIsoscelesTriangle.js';
import { MyRightTriangle } from './MyRightTriangle.js';
import { MySphere } from "./MySphere.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initShader();
        this.initMaterials(scene);
        this.initTexture(scene);

        this.body = new MySphere(scene, 16, 8);
        this.leftFin = new MyRightTriangle(scene);
        this.rightFin = new MyRightTriangle(scene);
        this.topFin = new MyRightTriangle(scene);
        this.tail = new MyIsoscelesTriangle(scene);
        this.leftEye = new MySphere(scene, 16, 8);
        this.rightEye = new MySphere(scene, 16, 8);
	}
    initMaterials() {
        this.fishMaterial = new CGFappearance(this.scene);
        this.fishMaterial.setAmbient(0, 0, 0, 1);
        this.fishMaterial.setDiffuse(0.54, 0.33, 0.83, 1.0);
        this.fishMaterial.setSpecular(0, 0, 0, 1);
        this.fishMaterial.setShininess(100.0);
	}
    initTexture() {        
        this.scales = new CGFappearance(this.scene);
        this.scales.setAmbient(0.1, 0.1, 0.1, 1);
        this.scales.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scales.setSpecular(0.1, 0.1, 0.1, 1);
        this.scales.setShininess(10.0);
        this.scales.loadTexture('images/scales.jpg');
        this.scales.setTextureWrap('REPEAT', 'REPEAT');

        this.eyes = new CGFappearance(this.scene);
        this.eyes.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyes.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyes.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyes.setShininess(10.0);
        this.eyes.loadTexture('images/eye.jpg');
        this.eyes.setTextureWrap('REPEAT', 'REPEAT');
    }
    initShader(){
        this.bodyShader = new CGFshader(this.scene.gl, "shaders/scales.vert", "shaders/scales.frag");
        this.rightFinShader = new CGFshader(this.scene.gl, "shaders/rightFin.vert", "shaders/rightFin.frag");
        this.leftFinShader = new CGFshader(this.scene.gl, "shaders/leftFin.vert", "shaders/leftFin.frag");
        this.tailShader = new CGFshader(this.scene.gl, "shaders/tail.vert", "shaders/tail.frag");
    }
    display(){

        this.fishMaterial.apply();

        // Draw Right Fin
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.rightFinShader);
        this.scene.scale(0.125, 0.125, -0.125);
        this.scene.translate(-2.5, -1, -1);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.rightFin.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        // Draw Left Fin
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.leftFinShader);
        this.scene.scale(0.125, 0.125, -0.125);
        this.scene.translate(2.5, -1, -1);
        this.leftFin.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        // Draw Top Fin
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0.45, 0, 0);
        this.scene.scale(0.125, 0.125, -0.125);
        this.topFin.display();
        this.scene.popMatrix();

        // Draw Fish Tail
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.tailShader);
        this.scene.translate(0, 0, -0.9);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.tail.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        // Draw Left Eye
        this.scene.pushMatrix();
        this.eyes.apply();
        this.scene.translate(0.2, 0.15, 0.3);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.rotate(3*Math.PI/4, 0, 1, 0);
        this.leftEye.display();
        this.scene.popMatrix();

        // Draw Right Eye
        this.scene.pushMatrix();
        this.eyes.apply();
        this.scene.translate(-0.2, 0.15, 0.3);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.rightEye.display();
        this.scene.popMatrix();

        // Draw Body
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.bodyShader);
        this.scales.apply();
        this.scene.scale(0.25, 0.375, 0.5);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.body.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
    update(t){
        this.tailShader.setUniformsValues({ timeFactor: t / 100 % 100 });
        this.leftFinShader.setUniformsValues({timeFactor: t / 100 % 100});
        this.rightFinShader.setUniformsValues({timeFactor: t / 100 % 100});
    }
}
