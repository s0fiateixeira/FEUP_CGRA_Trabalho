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
        this.initTexture();
        this.initBuffers();
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
        this.texCoords = [];

        var angle = 0;
        var alphaAngle = 2 * Math.PI/this.slices;
        
        var mapTexture = 0;
        var alphaMapTexture = 1/this.slices;

        for (var i = 0; i <= this.slices; i++){
            this.vertices.push(Math.cos(angle), 0, -Math.sin(angle));
            this.vertices.push(Math.cos(angle), 1, -Math.sin(angle));
            
            this.normals.push(Math.cos(angle), 0, -Math.sin(angle));
            this.normals.push(Math.cos(angle), 0, -Math.sin(angle));
            
            this.texCoords.push(mapTexture, 1);
            this.texCoords.push(mapTexture, 0);

            this.indices.push((i*2)+2, (i*2)+1, (i*2));
            this.indices.push((i*2)+2, (i*2)+3, (i*2)+1);
            
            angle += alphaAngle;
            mapTexture += alphaMapTexture;
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
