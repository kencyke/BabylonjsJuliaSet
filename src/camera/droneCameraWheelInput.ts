import { Camera } from "@babylonjs/core/Cameras/camera"
import { ICameraInput } from "@babylonjs/core/Cameras/cameraInputsManager"
import { PointerEventTypes, PointerInfo } from "@babylonjs/core/Events/pointerEvents"
import { Observer } from "@babylonjs/core/Misc/observable"
import { Nullable } from "@babylonjs/core/types"

import { DroneCamera } from "@/camera/droneCamera"


export class DroneCameraMouseWheelInput implements ICameraInput<DroneCamera> {
  public camera!: DroneCamera

  private _sensitivity: number
  private _wheel!: Nullable<(p: PointerInfo) => void>
  private _observer!: Nullable<Observer<PointerInfo>>

  constructor(sensitivity: number) {
    this._sensitivity = sensitivity
  }

  public attachControl(noPreventDefault?: boolean): void {
    const scene = this.camera.getScene()

    this._wheel = (p) => {
      if (this.camera.mode !== Camera.ORTHOGRAPHIC_CAMERA) return
      if (p.type !== PointerEventTypes.POINTERWHEEL) return

      const event = p.event as WheelEvent


      let delta = 0
      if (event.detail) {
        delta = -event.detail
      } else if (event.deltaY) {
        delta = event.deltaY
      }

      if (delta) {
        if (!this.camera.orthoLeft || !this.camera.orthoRight || !this.camera.orthoBottom || !this.camera.orthoTop) {
          return
        }

        this.camera.addOrthoScale(delta, this._sensitivity)
      }

      if (event.preventDefault) {
        if (!noPreventDefault) {
          event.preventDefault()
        }
      }
    }

    this._observer = scene.onPointerObservable.add(this._wheel, PointerEventTypes.POINTERWHEEL)
  }

  public detachControl(): void {
    if (this._observer) {
      this.camera.getScene().onPointerObservable.remove(this._observer)
      this._observer = null
      this._wheel = null
    }
  }

  public getClassName(): string {
    return "DroneCameraMouseWheelInput"
  }

  public getSimpleName(): string {
    return "mousewheel"
  }
}
