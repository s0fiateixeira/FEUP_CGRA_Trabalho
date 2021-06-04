
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform bool leftRotation;
uniform bool rightRotation;
uniform float velocity;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset;
	float defaultFreq = velocity + 0.5;
	
	if (aVertexPosition[0] < 0.0 && rightRotation)
		offset[2] = aVertexPosition[0] * sin(0.5*timeFactor*defaultFreq);
	if (aVertexPosition[0] < 0.0 && !leftRotation && !rightRotation)
		offset[2] = aVertexPosition[0] * sin(0.5*timeFactor*defaultFreq);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
