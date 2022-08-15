precision highp float;

// Uniforms
uniform float time;

// Varyings
varying vec4 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

float checker(vec2 uv, float repeats) {
	float cx = floor(repeats * uv.x);
	float cy = floor(repeats * uv.y);
	float result = mod(cx + cy, 2.0);
	return sign(result);
}

void main(void) {
	vec3 ambient = vec3(0.4);
	vec3 direction = vec3(0.0, 1.0, 1.0);
	vec3 lightColor = vec3(1.0);
	float incidence = max(dot(vNormal.xyz, direction), 0.0);
	vec3 light = clamp(ambient + lightColor * incidence, 0.0, 1.0);

	vec3 color = (checker(vUV, 8.0) * light);
	gl_FragColor = vec4(color, 1.0);
}