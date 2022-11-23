import * as THREE from 'three'

import gsap from 'gsap'

import App from '../../App'
import { SPHERE_ARGS, SPHERE_POSITION } from './consts'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { isMobileDevice } from '../../../utils'

export default class Sphere {
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
    this.geometry = new THREE.IcosahedronGeometry(SPHERE_ARGS.radius, SPHERE_ARGS.details)
  }

  setSphereAnimation() {
    this.material.uniforms.uTime.value = this.app.time.elapsedTime
    this.material.uniforms.uMouse.value.x = -this.mouseX
    this.material.uniforms.uMouse.value.y = this.mouseY

    if (!this.mesh) return

    if (!isMobileDevice()) {
      gsap.to(this.mesh.rotation, {
        x: -this.mouseY * 1.1,
        y: this.mouseX * 1.1,
        duration: 2,
      })

      return
    }

    this.mesh.rotation.y += 0.0009
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
    this.mesh.position.z = SPHERE_POSITION.z

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
