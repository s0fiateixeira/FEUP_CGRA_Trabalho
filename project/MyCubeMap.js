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
        this.texture = 0;
	}

    initMaterials() {
        this.scene.quadMaterial = new CGFappearance(this.scene);
        this.scene.quadMaterial.setAmbient(0, 0, 0, 1);
        this.scene.quadMaterial.setDiffuse(0, 0, 0, 1);
        this.scene.quadMaterial.setSpecular(0, 0, 0, 1);
        this.scene.quadMaterial.setShininess(100.0);
	}

    initTexture(){

        // Demo cube map texture

        this.demoTopTexture = new CGFappearance(this.scene);
        this.demoTopTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.demoTopTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.demoTopTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.demoTopTexture.setShininess(10.0);
        this.demoTopTexture.loadTexture('images/demo_cubemap/top.png');
        this.demoTopTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.demoBottomTexture = new CGFappearance(this.scene);
        this.demoBottomTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.demoBottomTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.demoBottomTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.demoBottomTexture.setShininess(10.0);
        this.demoBottomTexture.loadTexture('images/demo_cubemap/bottom.png');
        this.demoBottomTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.demoLeftTexture = new CGFappearance(this.scene);
        this.demoLeftTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.demoLeftTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.demoLeftTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.demoLeftTexture.setShininess(10.0);
        this.demoLeftTexture.loadTexture('images/demo_cubemap/left.png');
        this.demoLeftTexture.setTextureWrap('REPEAT', 'REPEAT');
        
        this.demoRightTexture = new CGFappearance(this.scene);
        this.demoRightTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.demoRightTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.demoRightTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.demoRightTexture.setShininess(10.0);
        this.demoRightTexture.loadTexture('images/demo_cubemap/right.png');
        this.demoRightTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.demoFrontTexture = new CGFappearance(this.scene);
        this.demoFrontTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.demoFrontTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.demoFrontTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.demoFrontTexture.setShininess(10.0);
        this.demoFrontTexture.loadTexture('images/demo_cubemap/front.png');
        this.demoFrontTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.demoBackTexture = new CGFappearance(this.scene);
        this.demoBackTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.demoBackTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.demoBackTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.demoBackTexture.setShininess(10.0);
        this.demoBackTexture.loadTexture('images/demo_cubemap/back.png');
        this.demoBackTexture.setTextureWrap('REPEAT', 'REPEAT');



        // Test cube map texture

        this.testTopTexture = new CGFappearance(this.scene);
        this.testTopTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.testTopTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.testTopTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.testTopTexture.setShininess(10.0);
        this.testTopTexture.loadTexture('images/test_cubemap/py.png');
        this.testTopTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.testBottomTexture = new CGFappearance(this.scene);
        this.testBottomTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.testBottomTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.testBottomTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.testBottomTexture.setShininess(10.0);
        this.testBottomTexture.loadTexture('images/test_cubemap/ny.png');
        this.testBottomTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.testLeftTexture = new CGFappearance(this.scene);
        this.testLeftTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.testLeftTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.testLeftTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.testLeftTexture.setShininess(10.0);
        this.testLeftTexture.loadTexture('images/test_cubemap/nx.png');
        this.testLeftTexture.setTextureWrap('REPEAT', 'REPEAT');
        
        this.testRightTexture = new CGFappearance(this.scene);
        this.testRightTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.testRightTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.testRightTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.testRightTexture.setShininess(10.0);
        this.testRightTexture.loadTexture('images/test_cubemap/px.png');
        this.testRightTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.testFrontTexture = new CGFappearance(this.scene);
        this.testFrontTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.testFrontTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.testFrontTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.testFrontTexture.setShininess(10.0);
        this.testFrontTexture.loadTexture('images/test_cubemap/pz.png');
        this.testFrontTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.testBackTexture = new CGFappearance(this.scene);
        this.testBackTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.testBackTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.testBackTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.testBackTexture.setShininess(10.0);
        this.testBackTexture.loadTexture('images/test_cubemap/nz.png');
        this.testBackTexture.setTextureWrap('REPEAT', 'REPEAT');
    
    }

    selectedTextureChanged(selectedTexture){
        if (selectedTexture == 0)
            this.texture = 0;
        else if (selectedTexture == 1)
            this.texture = 1;
    }

    display(){

        // front face
        this.scene.quadMaterial.apply();

        if (this.texture == 0)
            this.demoFrontTexture.apply();
        else if (this.texture == 1)
            this.testFrontTexture.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // back face
        this.scene.quadMaterial.apply();
        
        if (this.texture == 0)
            this.demoBackTexture.apply();
        else if (this.texture == 1)
            this.testBackTexture.apply();
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // right face
        this.scene.quadMaterial.apply();
        
        if (this.texture == 0)
            this.demoRightTexture.apply();
        else if (this.texture == 1)
            this.testRightTexture.apply();
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // left face
        this.scene.quadMaterial.apply();
        
        if (this.texture == 0)
            this.demoLeftTexture.apply();
        else if (this.texture == 1)
            this.testLeftTexture.apply();
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // top face
        this.scene.quadMaterial.apply();

        if (this.texture == 0)
            this.demoTopTexture.apply();
        else if (this.texture == 1)
            this.testTopTexture.apply();
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();

        // bottom face
        this.scene.quadMaterial.apply();
        
        if (this.texture == 0)
            this.demoBottomTexture.apply();
        else if (this.texture == 1)
            this.testBottomTexture.apply();
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0,0,0.5);
        this.MyQuad.display();
        this.scene.popMatrix();
    }
}
