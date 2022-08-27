import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera"
import { Engine } from "@babylonjs/core/Engines/engine"
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight"
import { Vector3 } from "@babylonjs/core/Maths/math.vector"
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder"
import { Scene } from "@babylonjs/core/scene"

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

const camera = new ArcRotateCamera("camera", 0, 0, 4, Vector3.Zero(), scene)
camera.speed = 1
camera.wheelPrecision = 10
camera.angularSensibilityX = 200
camera.angularSensibilityY = 200
camera.panningSensibility = 200
camera.inertia = 0
camera.attachControl(canvas, true)

const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)
light.intensity = 0.7

const plane = MeshBuilder.CreateGround("plane", { width: 100, height: 100 }, scene)
plane.material = new JuliaMaterial("material", scene)

const resizeObserver = new ResizeObserver(() => {
  engine.resize()
})

resizeObserver.observe(canvas)
engine.runRenderLoop(() => {
  scene.render()
})
