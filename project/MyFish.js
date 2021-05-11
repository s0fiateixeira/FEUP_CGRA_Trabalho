import {CGFobject} from '../lib/CGF.js';
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
		
        this.body = new MySphere(scene, 16, 8);
        this.leftFin = new MyRightTriangle(scene);
        this.rightFin = new MyRightTriangle(scene);
        this.topFin = new MyRightTriangle(scene);
	};
    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.75, 1);
        //this.body.enableNormalViz();
        this.body.display();
        this.scene.popMatrix();

/*
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 1, 1);
        this.scene.scale(0.2, 0.2, 0.2);
        this.leftFin.display();
        this.scene.popMatrix();
*/
    }
	

}