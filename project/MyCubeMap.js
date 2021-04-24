import { CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap {
    
    constructor(scene) {
        this.scene = scene;
        this.MyQuad = new MyQuad(this.scene);
        this.initMaterials(this.scene);
        this.initTexture(this.scene);
	}

    initMaterials() {
        this.scene.quadMaterial = new CGFappearance(this.scene);
        this.scene.quadMaterial.setAmbient(0, 0, 0, 1);
        this.scene.quadMaterial.setDiffuse(0, 0, 0, 1);
        this.scene.quadMaterial.setSpecular(0, 0, 0, 1);
        this.scene.quadMaterial.setShininess(100.0);
	}

    initTexture(){
        this.topTexture = new CGFappearance(this.scene);
        this.topTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.topTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.topTexture.setShininess(10.0);
        this.topTexture.loadTexture('images/demo_cubemap/top.png');
        this.topTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.bottomTexture = new CGFappearance(this.scene);
        this.bottomTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottomTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomTexture.setShininess(10.0);
        this.bottomTexture.loadTexture('images/demo_cubemap/bottom.png');
        this.bottomTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.leftTexture = new CGFappearance(this.scene);
        this.leftTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.leftTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leftTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.leftTexture.setShininess(10.0);
        this.leftTexture.loadTexture('images/demo_cubemap/left.png');
        this.leftTexture.setTextureWrap('REPEAT', 'REPEAT');
        
        this.rightTexture = new CGFappearance(this.scene);
        this.rightTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.rightTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rightTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.rightTexture.setShininess(10.0);
        this.rightTexture.loadTexture('images/demo_cubemap/right.png');
        this.rightTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.frontTexture = new CGFappearance(this.scene);
        this.frontTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.frontTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontTexture.setShininess(10.0);
        this.frontTexture.loadTexture('images/demo_cubemap/front.png');
        this.frontTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.backTexture = new CGFappearance(this.scene);
        this.backTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.backTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.backTexture.setShininess(10.0);
        this.backTexture.loadTexture('images/demo_cubemap/back.png');
        this.backTexture.setTextureWrap('REPEAT', 'REPEAT');
    }
    display(){

        // front face
        this.scene.quadMaterial.apply();
        this.frontTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // back face
        this.scene.quadMaterial.apply();
        this.backTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // right face
        this.scene.quadMaterial.apply();
        this.rightTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // left face
        this.scene.quadMaterial.apply();
        this.leftTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // top face
        this.scene.quadMaterial.apply();
        this.topTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // bottom face
        this.scene.quadMaterial.apply();
        this.bottomTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();
    }
}

