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
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, -0.5,    //0
			0.5, 0.5, -0.5,     //1
			0, 0, 1,            //2
            -0.5, -0.5, -0.5,   //3
            0.5, -0.5, -0.5     //4
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,    //face de cima
            3, 2, 0,    //face da esquerda
            2, 4, 1,    //face da direita
            2, 3, 4,    //face de baixo

            0, 1, 4,    //quadrado
            4, 3, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

