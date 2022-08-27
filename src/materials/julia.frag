precision highp float;

// Uniforms
uniform float time;

// Varyings
varying vec4 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

void main( void ) {
  vec2 z = vPosition.zx;
	float m = 1000.0;
  float l = 0.0;
  for (l = 0.0; l < m; l += 1.0) {
      z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + vec2(-1.0, 0.0);
      if(dot(z, z) > 65536.0) break;
  }
  gl_FragColor = vec4(vec3((l > m - 1.0) ? 0.0 : sin(l / 20.0)) * vec3(0.1, 1.0, 0.8), 1.0);
}