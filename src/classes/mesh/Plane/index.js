import * as THREE from 'three'

import App from '../../App'
import { PLANE_ARGS, PLANE_POSITION, PLANE_ROTATION } from './consts'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default class Plane {
  constructor() {
    this.app = new App()

    this.mouseX = 0
    this.mouseY = 0
    this.scene = this.app.scene
    this.camera = this.app.camera

    this.createGeometry()
    this.createMaterial()
  }

  createGeometry() {
    this.geometry = new THREE.PlaneGeometry(
      PLANE_ARGS.width,
      PLANE_ARGS.height,
      PLANE_ARGS.widthSegments,
      PLANE_ARGS.heightSegments,
    )
  }

  createMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        resolution: { value: new THREE.Vector4() },
        positionTexture: { value: null },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(this.mouseX, this.mouseY) },
      },
      fragmentShader,
      vertexShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }

  createMesh() {
    this.mesh = new THREE.Points(this.geometry, this.material)

    this.mesh.rotation.x = PLANE_ROTATION.x
    this.mesh.position.y = PLANE_POSITION.y
    this.mesh.position.z = PLANE_POSITION.z

    this.scene.add(this.mesh)
  }

  removeMesh() {
    this.geometry.dispose()
    this.material.dispose()
    this.scene.remove(this.mesh)
  }

  handleMouseMove(mouse) {
    this.mouseX = (mouse.clientX / window.innerWidth) * 2 - 1
    this.mouseY = -(mouse.clientY / window.innerHeight) * 2 + 1
  }
}
