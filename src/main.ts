import { Engine } from "@babylonjs/core/Engines/engine"
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight"
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector"
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder"
import { Scene } from "@babylonjs/core/scene"

import { DroneCamera } from "@/camera/droneCamera"
import { Axes } from "@/helpers/axes"
import { JuliaMaterial } from "@/materials/juliaMaterial"
import "@/style.css"


// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const canvas = document.getElementById("app")! as HTMLCanvasElement
const engine = new Engine(
  canvas,
  true,
  undefined,
  true
)
const scene = new Scene(engine)

const camera =new DroneCamera("camera", 4, scene)
camera.upVector = new Vector3(0, -1, 0)
camera.attachControl(canvas, true)

const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)
light.intensity = 0.7

const length = 100
new Axes(Vector3.Zero(), length / 2, scene)

const plane = MeshBuilder.CreateGround("plane", { width: length, height: length }, scene)
// ZX plane (normal: -Y direction)
plane.rotationQuaternion = Quaternion.FromEulerAngles(Math.PI, 0, 0)
plane.material = new JuliaMaterial("material", scene)

const resizeObserver = new ResizeObserver(() => {
  engine.resize()
})

resizeObserver.observe(canvas)
engine.runRenderLoop(() => {
  scene.render()
})
