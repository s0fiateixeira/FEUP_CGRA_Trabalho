import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';
/**
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFish extends MyMovingObject {
	constructor(scene) {
		super(scene);
        super.object = new MyFish(scene);
        this.fish = this.object;
    }
    update(t){
        this.object.update(t);
        super.update();
    }
}
