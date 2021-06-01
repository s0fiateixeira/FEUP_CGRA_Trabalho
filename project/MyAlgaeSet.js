import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyAlgae } from "./MyAlgae.js";

/**
 * MyAlgaeSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAlgaeSet extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials();
        this.numberAlgae = Math.floor(Math.random() * 50) + 10;
        this.colors = [];
        this.randomXs = [];
        this.randomYs = [];
        this.randomZs = [];
        this.randomPositionXs = [];
        this.randomPositionZs = [];
        for (var i = 0; i < this.numberAlgae; i++){
            this.algae = new MyAlgae(this.scene);
            this.color = Math.floor(Math.random() * 4);
            this.colors.push(this.color);
            this.randomX = Math.floor(Math.random() * 50);
            this.randomX /= 100;
            this.randomXs.push(this.randomX);
            this.randomY = Math.floor(Math.random()* 200) + 20;
            this.randomY /= 100;
            this.randomYs.push(this.randomY);
            this.randomZ = Math.floor(Math.random() * 50);
            this.randomZ /= 100;
            this.randomZs.push(this.randomZ);
            this.randomPositionX = Math.floor(Math.random() * 50);
            this.randomPositionX -= 25;
            this.randomPositionXs.push(this.randomPositionX);
            this.randomPositionZ = Math.floor(Math.random() * 50);
            this.randomPositionZ -= 25;
            this.randomPositionZs.push(this.randomPositionZ);
        }
	}
    initMaterials() {
        this.algaeMaterial = new CGFappearance(this.scene);
        this.algaeMaterial.setAmbient(0, 0, 0, 1);
        this.algaeMaterial.setSpecular(0, 0, 0, 1);
        this.algaeMaterial.setShininess(100.0);
	}
    display(){
        // Draw Algae
        for (var i = 1; i <= this.numberAlgae; i++){
            if (this.colors[this.colors.length - i] == 0)
                this.algaeMaterial.setDiffuse(0.33, 0.42, 0.18, 1.0);   //dark olive green
            else if (this.colors[this.colors.length - i] == 1)
                this.algaeMaterial.setDiffuse(0.00, 0.50, 0.00, 1.0);   //green
            else if (this.colors[this.colors.length - i] == 2)
                this.algaeMaterial.setDiffuse(0.18, 0.55, 0.34, 1.0);   //sea green
            else if (this.colors[this.colors.length - i] == 3)
                this.algaeMaterial.setDiffuse(0.00, 0.39, 0.00, 1.0);   //dark green
            this.algaeMaterial.apply();
            this.scene.pushMatrix();
            this.algaeMaterial.apply();
            this.scene.translate(this.randomPositionXs[this.randomPositionXs.length-i], -7.2, this.randomPositionZs[this.randomPositionZs.length-i]);
            this.scene.scale(this.randomXs[this.randomXs.length-i], this.randomYs[this.randomYs.length-i], this.randomZs[this.randomZs.length-i]);
            this.algae.display();
            this.scene.popMatrix();
        }
    }
}
