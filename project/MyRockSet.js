import { CGFobject } from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";

/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
	constructor(scene) {
		super(scene);
        this.numberRocks = Math.floor(Math.random() * 100) + 10;
        this.randomXs = [];
        this.randomYs = [];
        this.randomZs = [];
        this.randomPositionXs = [];
        this.randomPositionZs = [];

        for (var i = 0; i < this.numberRocks; i++){
            this.rock = new MyRock(scene, 16, 8);
            this.randomX = Math.floor(Math.random() * 20);
            this.randomX /= 100;
            this.randomXs.push(this.randomX);
            this.randomY = Math.floor(Math.random() * 20);
            this.randomY /= 100;
            this.randomYs.push(this.randomY);
            this.randomZ = Math.floor(Math.random() * 20);
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
    display(){

        this.rock.rockMaterial.apply()

        // Draw Rocks
        for (var i = 1; i <= this.numberRocks; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.randomPositionXs[this.randomPositionXs.length-i], -7.2, this.randomPositionZs[this.randomPositionZs.length-i]);
            this.scene.scale(this.randomXs[this.randomXs.length-i], this.randomYs[this.randomYs.length-i], this.randomZs[this.randomZs.length-i]);
            this.rock.display();
            this.scene.popMatrix();
        }
    }
}
