
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float velocity;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset;
	float defaultFreq = velocity + 0.5;
	
	if (aVertexPosition[0] < 0.0)
		offset[2] = aVertexPosition[0] * sin(timeFactor * defaultFreq);
	if (aVertexPosition[0] > 0.0)
		offset[2] = - aVertexPosition[0] * sin(timeFactor * defaultFreq);
	
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
