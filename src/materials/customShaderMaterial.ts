import { Effect } from "@babylonjs/core/Materials/effect"
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial"
import { Scene } from "@babylonjs/core/scene"

import FRAGMENT_SHADER from "@/materials/julia.frag"
import VERTEX_SHADER from "@/materials/julia.vert"


const shaderName = "julia"
Effect.ShadersStore[`${shaderName}VertexShader`] = VERTEX_SHADER
Effect.ShadersStore[`${shaderName}FragmentShader`] = FRAGMENT_SHADER


export class CustomShaderMaterial extends ShaderMaterial {
  constructor(name: string, scene: Scene) {
    super(name, scene, { vertex: shaderName, fragment: shaderName }, {
      // cf. https://doc.babylonjs.com/advanced_topics/shaders/introToShaders#built-in-inputs
      attributes: ["position", "normal", "uv"],
      uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "time"]
    })
  }
}
