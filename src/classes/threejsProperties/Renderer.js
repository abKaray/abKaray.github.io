import * as THREE from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import PostProcessing from './postProcessing'

import App from '../App'

export default class Renderer {
  constructor() {
    const app = new App()

    this.canvas = app.canvas
    this.sizes = app.sizes
    this.scene = app.scene
    this.camera = app.camera
    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.composer = new EffectComposer(this.instance)
    this.composer.addPass(new RenderPass(this.scene, this.camera.instance))
    this.customPass = new ShaderPass(PostProcessing)
    this.customPass.uniforms.resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
    this.customPass.uniforms.resolution.value.multiplyScalar(window.devicePixelRatio)
    this.composer.addPass(this.customPass)

    this.composer.setSize(this.sizes.width, this.sizes.height)
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

    this.composer.render()
  }

  update() {
    this.composer.render()
  }
}
