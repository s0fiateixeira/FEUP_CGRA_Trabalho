#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler3;

uniform float timeFactor;
vec2 coords;

void main() {
	
	vec4 color = texture2D(uSampler1, vTextureCoord);
	vec4 filter = texture2D(uSampler3, vTextureCoord);

    coords = vec2 (vTextureCoord.x + (filter.r - 0.5), vTextureCoord.y + (filter.g - 0.5));

	coords.x = clamp(coords.x, 0.0, 1.0);
	coords.y = clamp(coords.y, 0.0, 1.0);

	vec4 coordsWater = texture2D(uSampler1, coords);

	gl_FragColor = color * coordsWater;
}
