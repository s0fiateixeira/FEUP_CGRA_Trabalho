import {CGFobject} from '../lib/CGF.js';
/**
 * MyAlgae
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAlgae extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,    //0 - front left vertex
			0.5, -0.5, 0.5,     //1 - front right vertex
			0, 1, 0,            //2 - point vertex
            -0.5, -0.5, -0.5,   //3 - bottom left vertex
            0.5, -0.5, -0.5     //4 - bottom right vertex
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,    //front face
            0, 2, 3,    //left face
            1, 4, 2,    //right face
            4, 3, 2,    //back face

            4, 1, 0,    //base - square face
            0, 3, 4
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
