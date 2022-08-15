precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

// Varyings
varying vec4 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

void main() {
  vPosition = vec4( position, 1. );
  vNormal = normal;
  vUV = uv;
  gl_Position = worldViewProjection * vPosition;
}