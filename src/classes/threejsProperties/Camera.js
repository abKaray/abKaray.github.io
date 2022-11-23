import * as THREE from 'three'

import App from '../App'

const CAMERA_ARGS = {
  fov: 75,
  near: 0.01,
  far: 1000,
}

const CAMERA_POSITION = {
  z: 2,
}

export default class Camera {
  constructor() {
    const app = new App()
    this.sizes = app.sizes
    this.scene = app.scene
    this.canvas = app.canvas

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      CAMERA_ARGS.fov,
      this.sizes.width / this.sizes.height,
      CAMERA_ARGS.near,
      CAMERA_ARGS.far,
    )

    this.instance.position.z = CAMERA_POSITION.z
    this.scene.add(this.instance)
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }
}
