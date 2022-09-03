import { Camera } from "@babylonjs/core/Cameras/camera"
import { ICameraInput } from "@babylonjs/core/Cameras/cameraInputsManager"
import { Engine } from "@babylonjs/core/Engines/engine"
import { IKeyboardEvent } from "@babylonjs/core/Events/deviceInputEvents"
import { KeyboardEventTypes, KeyboardInfo } from "@babylonjs/core/Events/keyboardEvents"
import { Observer } from "@babylonjs/core/Misc/observable"
import { Nullable } from "@babylonjs/core/types"

import { EventKeys, OnKeyEvent } from "@/helpers/keyEvent"


export class CameraKeyboardMoveInput<TCamera extends Camera> implements ICameraInput<TCamera> {
  public camera!: TCamera

  private events: OnKeyEvent<TCamera>[]
  private _keys = new Set<string>()
  private _ctrlPressed = false
  private _altPressed = false
  private _shiftPressed = false
  private _onCanvasBlurObserver: Nullable<Observer<Engine>> = null
  private _onKeyboardObserver: Nullable<Observer<KeyboardInfo>> = null

  constructor(events: OnKeyEvent<TCamera>[]) {
    this.events = events
  }

  private onKeyUp(event: IKeyboardEvent, noPreventDefault?: boolean): void {
    const evtKey = event.key
    if (this._keys.has(evtKey)) {
      this._keys.delete(evtKey)
      if (!noPreventDefault) {
        event.preventDefault()
      }
    }
  }

  private onKeyDown(event: IKeyboardEvent, noPreventDefault?: boolean): void {
    this._ctrlPressed = event.ctrlKey
    this._altPressed = event.altKey
    this._shiftPressed = event.shiftKey

    const evtKey = event.key
    if (!this._keys.has(evtKey)) {
      this._keys.add(evtKey)
      if (!noPreventDefault) {
        event.preventDefault()
      }
    }
  }


  attachControl(noPreventDefault?: boolean): void {
    if (this._onCanvasBlurObserver) {
      return
    }

    this._onCanvasBlurObserver = this.camera.getEngine().onCanvasBlurObservable.add(() => {
      this._keys = new Set()
    })

    this._onKeyboardObserver = this.camera.getScene().onKeyboardObservable.add(info => {
      const evt = info.event

      if (info.type === KeyboardEventTypes.KEYDOWN) {
        this.onKeyDown(evt, noPreventDefault)
      } else if (info.type === KeyboardEventTypes.KEYUP) {
        this.onKeyUp(evt, noPreventDefault)
      }
    })
  }

  detachControl(): void {
    if (this._onKeyboardObserver) {
      this.camera.getScene().onKeyboardObservable.remove(this._onKeyboardObserver)
    }

    if (this._onCanvasBlurObserver) {
      this.camera.getEngine().onCanvasBlurObservable.remove(this._onCanvasBlurObserver)
    }
    this._onKeyboardObserver = null
    this._onCanvasBlurObserver = null
    this._keys = new Set()
  }

  checkInputs(): void {
    if (!this._onKeyboardObserver) {
      return
    }

    const evtKeys: EventKeys = {
      keys: this._keys,
      ctrl: this._ctrlPressed,
      alt: this._altPressed,
      shift: this._shiftPressed
    }

    let fired = false
    for (const event of this.events) {
      fired = event.fire(evtKeys, this.camera) || fired
    }
  }

  getClassName(): string {
    return "DroneCameraKeyboardMoveInput"
  }

  getSimpleName(): string {
    return "keyboardmove"
  }
}
