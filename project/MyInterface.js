import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'showSphere').name('Show Sphere');
        this.gui.add(this.scene, 'showAmbient').name('Show Ambient');
        this.gui.add(this.scene, 'showMyMovingObject').name('Show Object');
        this.gui.add(this.scene, 'showCylinder').name('Show Cylinder');
        this.gui.add(this.scene, 'showFish').name('Show Fish');
        this.gui.add(this.scene, 'showSand').name('Show Sand');
        this.gui.add(this.scene, 'showWater').name('Show Water');
        this.gui.add(this.scene, 'showPillars').name('Show Pillars');
        this.gui.add(this.scene, 'showRocks').name('Show Rocks');
        this.gui.add(this.scene, 'showAlgae').name('Show Algae');

        //Dropdown for textures
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureList).name('Selected Texture').onChange(this.scene.selectedTextureChanged.bind(this.scene));
        
        //Slider
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3.0).name('scaleFactor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3.0).name('speedFactor');
        
        this.initKeys();
        return true;
    }


    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
    if( this.activeKeys[keyCode] === true && (keyCode == "keyL" || keyCode == "keyP")) {
                this.activeKeys[keyCode] = false;
                return true;
        }  
        return this.activeKeys[keyCode] || false;
    } 
}
