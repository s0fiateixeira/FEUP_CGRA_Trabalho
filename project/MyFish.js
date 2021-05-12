import {CGFappearance, CGFobject} from '../lib/CGF.js';
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
        this.fishMaterial.setDiffuse(138/255, 85/255, 211/255, 1);
        this.fishMaterial.setSpecular(0, 0, 0, 1);
        this.fishMaterial.setShininess(100.0);
	}
    initTexture() {        
        this.scales = new CGFappearance(this.scene);
        this.scales.setAmbient(0.1, 0.1, 0.1, 1);
        this.scales.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scales.setSpecular(0.1, 0.1, 0.1, 1);
        this.scales.setShininess(10.0);
        this.scales.loadTexture('images/scalessss.jpg');
        this.scales.setTextureWrap('REPEAT', 'REPEAT');

        this.eyes = new CGFappearance(this.scene);
        this.eyes.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyes.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyes.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyes.setShininess(10.0);
        this.eyes.loadTexture('images/eye.png');
        this.eyes.setTextureWrap('REPEAT', 'REPEAT');
    }
    display(){

        this.fishMaterial.apply();

        // Draw Left Fin
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, -0.25);
        this.scene.translate(-2.5, -1, -1);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.leftFin.display();
        this.scene.popMatrix();

        // Draw Right Fin
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, -0.25);
        this.scene.translate(2.5, -1, -1);
        this.rightFin.display();
        this.scene.popMatrix();

        // Draw Top Fin
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(0.95, 0, 0);
        this.scene.scale(0.25, 0.25, -0.25);
        this.topFin.display();
        this.scene.popMatrix();

        // Draw Fish Tail
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.8);
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.tail.display();
        this.scene.popMatrix();

        // Draw Left Eye
        this.scene.pushMatrix();
        this.eyes.apply();
        this.scene.translate(0.4, 0.3, 0.6);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.leftEye.display();
        this.scene.popMatrix();

        // Draw Right Eye
        this.scene.pushMatrix();
        this.eyes.apply();
        this.scene.translate(-0.4, 0.3, 0.6);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.rightEye.display();
        this.scene.popMatrix();

        // Draw Body
        this.scene.pushMatrix();
        this.scales.apply();
        this.scene.scale(0.5, 0.75, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.body.display();
        this.scene.popMatrix();

    }
}