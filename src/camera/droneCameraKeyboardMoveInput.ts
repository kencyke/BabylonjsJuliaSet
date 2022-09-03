import { TargetCamera } from "@babylonjs/core/Cameras/targetCamera"
import { Vector3 } from "@babylonjs/core/Maths/math.vector"

import { DroneCamera } from "@/camera/droneCamera"
import { ActionKey, KeyCondition, OnKeyEvent } from "@/helpers/keyEvent"


export interface DroneMoveArgs {
  speed: number
  upKeys: Array<string | ActionKey>
  leftKeys: Array<string | ActionKey>
  downKeys: Array<string | ActionKey>
  rightKeys: Array<string | ActionKey>
}

function toKey(keyOrStr: ActionKey | string): ActionKey {
  return typeof keyOrStr === "string" ? { key: keyOrStr } : keyOrStr
}

function cond(keys: Array<string | ActionKey>): KeyCondition {
  return new KeyCondition(keys.map(toKey))
}

function createEvent(
  condition: KeyCondition,
  speed: number,
  toVector: (c: DroneCamera) => Vector3
): OnKeyEvent<DroneCamera> {
  return new OnKeyEvent(
    (c) => {
      const currentTarget = c.getTarget()
      const scaleFactor = c.getOrthoSizeScale()
      const moveVector = toVector(c).scale(speed * scaleFactor)
      c.position = c.position.add(moveVector)
      const newTarget = currentTarget.add(moveVector)
      c.setTarget(newTarget)
    },
    condition
  )
}

const localX = new Vector3(1, 0, 0)
const localY = new Vector3(0, 1, 0)

function upVector(c: TargetCamera): Vector3 {
  return c.getDirection(localY)
}

function downVector(c: TargetCamera): Vector3 {
  return upVector(c).scale(-1)
}

function rightVector(c: TargetCamera): Vector3 {
  return c.getDirection(localX)
}

function leftVector(c: TargetCamera): Vector3 {
  return rightVector(c).scale(-1)
}

export function droneMoveInputs(args: DroneMoveArgs): OnKeyEvent<DroneCamera>[] {
  return [
    createEvent(cond(args.upKeys), args.speed, upVector),
    createEvent(cond(args.downKeys), args.speed, downVector),
    createEvent(cond(args.leftKeys), args.speed, leftVector),
    createEvent(cond(args.rightKeys), args.speed, rightVector),
  ]
}
