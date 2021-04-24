import {CGFobject} from '../lib/CGF.js';
/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
		//object orientation, horizontaly - YY - angle
		this.orientation = 0;
		this.velocity = 0;
		this.position = {
			x: 0,
			y: 0,
			z: 0
		};
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, -0.5,    //0 - top left vertex
			0.5, 0.5, -0.5,     //1 - top right vertex
			0, 0, 1,            //2 - point vertex
            -0.5, -0.5, -0.5,   //3 - bottom left vertex
            0.5, -0.5, -0.5     //4 - bottom right vertex
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,    //top face
            3, 2, 0,    //left face
            2, 4, 1,    //right face
            2, 3, 4,    //bottom face

            0, 1, 4,    //base - square face
            4, 3, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	//TODO
	/*Updates the position according to orientation and velocity values*/
	update(){
		this.position.x += this.velocity * Math.sin(this.orientation);
		this.position.z += this.velocity * Math.cos(this.orientation);
	}

	/*Changes orientation angle*/
	turn(val){
		this.orientation += val;
	}
	/*Changes velocity value - val can be positive or negative*/
	accelerate(val){
		this.velocity = val;
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
		super.display();
		this.scene.popMatrix();
	}
}
