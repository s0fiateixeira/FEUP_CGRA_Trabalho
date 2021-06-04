import {CGFobject} from '../lib/CGF.js';
/**
 * MyObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyObject extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
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
}
