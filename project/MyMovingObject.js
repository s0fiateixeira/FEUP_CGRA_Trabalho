import {CGFobject} from '../lib/CGF.js';
import { MyObject } from './MyObject.js';
/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene) {
		super(scene);
		this.scaleFactor = 1;
		this.initBuffers();
		//object orientation, horizontaly - YY - angle
		this.orientation = 0;
		this.velocity = 0;
		this.position = {
			x: 0,
			y: 0,
			z: 0
		};
		this.object = new MyObject(scene);
	}
	/*Updates scaleFactor and the position according to orientation and velocity values*/
	update(){
		this.scaleFactor = this.scene.scaleFactor;
		this.position.x += this.velocity * Math.sin(this.orientation);
		this.position.z += this.velocity * Math.cos(this.orientation);
	}
	/*Changes orientation angle*/
	turn(val){
		this.orientation += val;
	}
	/*Changes velocity value - val can be positive or negative*/
	accelerate(val){
		this.velocity += val;
	}
	/*Replaces the object on the initial position without rotation nor velocity*/
	reset(){
		this.orientation = 0;
		this.velocity = 0;
		this.position.x = 0;
		this.position.y = 0;
		this.position.z = 0;
	}
	display(){
		this.scene.pushMatrix();
		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientation, 0, 1, 0);
		this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
		this.object.display();
		this.scene.popMatrix();
	}
}
