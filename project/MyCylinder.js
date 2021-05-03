import {CGFobject} from '../lib/CGF.js';
/**
* MyCylinder
* @constructor
* @param scene - Reference to MyScene object
* @param slices - number of divisions around the Y axis
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers(this.scene);
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
