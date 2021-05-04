import {CGFappearance, CGFobject} from '../lib/CGF.js';
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
        this.initTexture(this.scene);
        this.initBuffers(this.scene);
    }
    initTexture() {
        //------ Texture
        this.cylinderTexture = new CGFappearance(this.scene);
        this.cylinderTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.cylinderTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cylinderTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.cylinderTexture.setShininess(10.0);
        this.cylinderTexture.loadTexture('images/earth.jpg');
        this.cylinderTexture.setTextureWrap('REPEAT', 'REPEAT');
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.textureCoords = [];
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
        this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
        ang += alphaAng;    
        for (var i = 0; i < this.slices * 2; i++){
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            
            this.indices.push(i, i+1, i+2);
            this.indices.push(i, i+2, i+1);

            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            

            this.textureCoords.push(0, (1/this.slices)*i);
            this.textureCoords.push(1, 0);
            this.cylinderTexture.apply();

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
