import { Effect } from "@babylonjs/core/Materials/effect"
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial"
import { Scene } from "@babylonjs/core/scene"

import FRAGMENT_SHADER from "@/materials/julia.frag"
import VERTEX_SHADER from "@/materials/julia.vert"


const shaderName = "julia"
Effect.ShadersStore[`${shaderName}VertexShader`] = VERTEX_SHADER
Effect.ShadersStore[`${shaderName}FragmentShader`] = FRAGMENT_SHADER


export class JuliaMaterial extends ShaderMaterial {
  constructor(name: string, scene: Scene) {
    super(name, scene, { vertex: shaderName, fragment: shaderName }, {
      attributes: ["position", "normal", "uv"],
      uniforms: ["worldViewProjection", "time"]
    })

    const startTime = Date.now()

    scene.registerBeforeRender(() => {
      const currentTime = Date.now()
      const time = currentTime - startTime

      this.time = time / 1000
    })
  }

  set time(value: number) {
    this.setFloat("time", value)
  }
}
