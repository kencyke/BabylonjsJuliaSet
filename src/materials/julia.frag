precision highp float;

// Uniforms
uniform float time;

// Varyings
varying vec4 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

float abs(vec2 z) {
  return sqrt(dot(z, z));
}

void main( void ) {
  float size = 100.0;
  vec2 tUV = (vUV - 0.5) * size;
  vec2 z = vec2(-tUV.y, tUV.x);
	float m = 100.0;
  float l = 0.0;
  for (l = 0.0; l < m; l += 1.0) {
      z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + vec2(-1.0, 0.0);
      if(dot(z, z) > 4.0) break;
  }
  vec3 base = vec3(0.1, 1.0, 0.8);
  vec3 color = l == m ? base : log(abs(z)) / pow(2.0, l) * base;
  gl_FragColor = vec4(color, 1.0);
}