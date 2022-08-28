import { Color3, Color4 } from "@babylonjs/core/Maths/math.color"
import { Vector3 } from "@babylonjs/core/Maths/math.vector"
import { LinesMesh } from "@babylonjs/core/Meshes/linesMesh"
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder"
import { Scene } from "@babylonjs/core/scene"


const red = Color4.FromColor3(Color3.Red())
const green = Color4.FromColor3(Color3.Green())
const blue = Color4.FromColor3(Color3.Blue())

export class Axes {
  private _xAxis: LinesMesh
  private _yAxis: LinesMesh
  private _zAxis: LinesMesh

  constructor(origin: Vector3, length: number, scene: Scene) {

    const o = origin
    const x = new Vector3(o.x + length, o.y, o.z)
    const y = new Vector3(o.x, o.y + length, o.z)
    const z = new Vector3(o.x, o.y, o.z + length)

    this._xAxis = MeshBuilder.CreateLines(
      "x-axis",
      {
        points: [o, x],
        colors: [red, red],
        updatable: false
      },
      scene
    )
    this._yAxis = MeshBuilder.CreateLines(
      "y-axis",
      {
        points: [o, y],
        colors: [green, green],
        updatable: false
      },
      scene
    )
    this._zAxis = MeshBuilder.CreateLines(
      "z-axis",
      {
        points: [o, z],
        colors: [blue, blue],
        updatable: false
      },
      scene
    )
  }

  public dispose(): void {
    this._xAxis.dispose()
    this._yAxis.dispose()
    this._zAxis.dispose()
  }
}

