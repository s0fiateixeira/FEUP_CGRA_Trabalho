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

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        
        // top face
        this.vertices.push(0, 1, 0);
        for(var i = 1; i <= this.slices; i++){
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            if (i == this.slices - 1)
                this.indices.push(i, this.slices, 0);
            else
                this.indices.push(i, (i + 1) % this.slices, 0);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            ang+=alphaAng;
        }

        // bottom face
        ang = 0;
        this.vertices.push(0, 0, 0);
        for(var i = this.slices+2; i <= this.slices * 2 + 1; i++){
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            if (i == this.slices * 2)
                this.indices.push(this.slices+1, this.slices * 2 + 1, i);
            else if (i == this.slices * 2 + 1)
                this.indices.push(this.slices+1, this.slices + 2, i);
            else
                this.indices.push(this.slices+1, (i+1)%(this.slices*2+1), i);
            this.normals.push(Math.cos(ang), -Math.cos(Math.PI/4.0), -Math.sin(ang));
            ang+=alphaAng;
        }

        // side faces
        for (var i = 0; i < this.slices; i++){
            if (i == this.slices - 1) {
                this.indices.push(this.slices*2+1, this.slices+2, 1);
                this.indices.push(1, this.slices, this.slices*2+1);
            }else {
                this.indices.push(i+2, i+1, (this.slices + 2) + i);
                this.indices.push((this.slices + 2) + i, (this.slices + 2) + i + 1, i+2);
            }
            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
