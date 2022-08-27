import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera"
import { Camera } from "@babylonjs/core/Cameras/camera"
import { Vector3 } from "@babylonjs/core/Maths/math.vector"
import { Scene } from "@babylonjs/core/scene"

import { DroneCameraMouseWheelInput } from "@/camera/droneCameraWheelInput"


export class DroneCamera extends ArcRotateCamera {
  private _initOrthoSize = 2
  private _orthoSizeScale = 1

  constructor(
    name: string,
    distance: number,
    scene: Scene
  ) {
    super(name, 0, 0, distance, Vector3.Zero(), scene)
    this.mode = Camera.ORTHOGRAPHIC_CAMERA
    this.inputs.clear()
    this.inputs.add(new DroneCameraMouseWheelInput(1000))
    this.updateOrthoSize()
  }

  private getAspectRatio(): number {
    const canvas = this.getEngine().getRenderingCanvas()
    if (!canvas) return 1
    return canvas.clientWidth / canvas.clientHeight
  }

  public updateOrthoSize(): void {
    const ar = this.getAspectRatio()

    this.orthoLeft = (-this._initOrthoSize * ar * this._orthoSizeScale) / 2
    this.orthoRight = (this._initOrthoSize * ar * this._orthoSizeScale) / 2
    this.orthoBottom = (-this._initOrthoSize * this._orthoSizeScale) / 2
    this.orthoTop = (this._initOrthoSize * this._orthoSizeScale) / 2
  }

  public addOrthoScale(delta: number, sensitivity: number): void {
    let diff = this._orthoSizeScale * delta / sensitivity
    if (this._orthoSizeScale <= 1.0) {
      diff *= 0.1
    } else {
      diff *= 0.4
    }
    const newScale = this._orthoSizeScale + diff
    if (0.1 <= newScale && newScale <= 10) {
      this._orthoSizeScale = newScale
      this.updateOrthoSize()
    }
  }

  public dispose(): void {
    this.inputs.clear()
    super.dispose()
  }

  public getClassName(): string {
    return "DroneCamera"
  }
}
