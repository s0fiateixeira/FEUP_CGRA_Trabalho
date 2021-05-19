
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;
bool isLeftFin;

void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset;
	
	if (aVertexPosition[1] < 0.0)
		offset[2] = aVertexPosition[1] * sin(0.5*timeFactor);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

