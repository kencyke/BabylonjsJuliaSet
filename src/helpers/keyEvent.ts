import { Camera } from "@babylonjs/core/Cameras/camera"


export type OnKeyCallback<TCamera extends Camera> = (c: TCamera, ctrl: boolean, alt: boolean) => void

export type EventKeys = {
  readonly keys: Set<string>
  readonly ctrl: boolean
  readonly alt: boolean
  readonly shift: boolean
}

export interface ActionKey {
  readonly key: string
  readonly withAlt?: boolean
  readonly withCtrl?: boolean
  readonly withShift?: boolean
}

export class KeyCondition {
  public readonly keys: ActionKey[]

  constructor(keys: ActionKey[]) {
    this.keys = keys
  }

  isReadyToAction(event: EventKeys): boolean {
    return this.keys.length !== 0 && this.keys.every(key => {
      const keyCheck = event.keys.has(key.key)
      const ctrlCheck = key.withCtrl == null ? true : event.ctrl === key.withCtrl
      const altCheck = key.withAlt == null ? true : event.alt === key.withAlt
      const shiftCheck =key.withShift == null ? true :  event.shift === key.withShift

      return keyCheck && ctrlCheck && altCheck && shiftCheck
    })
  }
}

export class OnKeyEvent<TCamera extends Camera> {
  public readonly condition: KeyCondition
  public readonly onKeyCallback: OnKeyCallback<TCamera>

  constructor(onKeyCallback: OnKeyCallback<TCamera>, condition: KeyCondition) {
    this.condition = condition
    this.onKeyCallback = onKeyCallback
  }

  fire(evtKeys: EventKeys, camera: TCamera): boolean {
    const isReady = this.condition.isReadyToAction(evtKeys)
    if (isReady) {
      this.onKeyCallback(camera, evtKeys.ctrl, evtKeys.alt)
      return true
    }

    return false
  }
}
