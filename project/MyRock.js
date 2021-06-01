import {CGFappearance, CGFobject} from '../lib/CGF.js';
/**
 * MyRock
 * @constructor
 * @param  {CGFscene} scene - MyScene object
 * @param  {integer} slices - number of slices around Y axis
 * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
 */
export class MyRock extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;

    this.initMaterials();
    this.initTexture();
    this.initBuffers();
  }
  initMaterials() {
    this.rockMaterial = new CGFappearance(this.scene);
    this.rockMaterial.setAmbient(0, 0, 0, 1);
    this.rockMaterial.setDiffuse(0.41, 0.41, 0.41, 1.0);
    this.rockMaterial.setSpecular(0, 0, 0, 1);
    this.rockMaterial.setShininess(100.0);
}
  initTexture() {
    this.rockTexture = new CGFappearance(this.scene);
    this.rockTexture.setAmbient(0.1, 0.1, 0.1, 1);
    this.rockTexture.setDiffuse(0.9, 0.9, 0.9, 1);
    this.rockTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.rockTexture.setShininess(10.0);
    this.rockTexture.loadTexture('images/earth.jpg');
    this.rockTexture.setTextureWrap('REPEAT', 'REPEAT');
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    var textMapLongitude = 0;
    var textMapLatitude = 0;
    var alphaTextMapLongitude = 1/this.longDivs;
    var alphaTextMapLatitude = 1/this.latDivs;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      textMapLongitude = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;
        this.vertices.push(x, y, z);

        //--- TexCoords
        this.texCoords.push(textMapLongitude, textMapLatitude);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        textMapLongitude += alphaTextMapLongitude;
      }
      phi += phiInc;
      textMapLatitude += alphaTextMapLatitude;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
