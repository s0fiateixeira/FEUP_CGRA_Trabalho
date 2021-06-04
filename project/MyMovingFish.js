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
    }
    update(t){
        this.object.tailShader.setUniformsValues({ velocity: this.velocity});
        this.object.leftFinShader.setUniformsValues({ velocity: this.velocity});
        this.object.leftFinShader.setUniformsValues({ leftRotation: this.leftRotation});
        this.object.leftFinShader.setUniformsValues({ rightRotation: this.rightRotation});
        this.object.rightFinShader.setUniformsValues({ velocity: this.velocity});
        this.object.rightFinShader.setUniformsValues({ leftRotation: this.leftRotation});
        this.object.rightFinShader.setUniformsValues({ rightRotation: this.rightRotation});
        this.object.update(t);
        super.update();
    }
}
