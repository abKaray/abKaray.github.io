import * as THREE from 'three'

import Renderer from './threejsProperties/Renderer'
import Sphere from './mesh/Sphere'
import Plane from './mesh/Plane'
import Sizes from './utils/Sizes'
import Mouse from './utils/Mouse'
import Camera from './threejsProperties/Camera'
import Time from './utils/Time'

let instance = null

export default class App {
  constructor(canvas) {
    // Singleton
    if (instance) {
      return instance
    }
    instance = this

    this.canvas = canvas

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.sphere = new Sphere()
    this.plane = new Plane()
    this.camera = new Camera()
    this.mouse = new Mouse()
    this.renderer = new Renderer()

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.mouse.on('mousemove', () => {
      if (this.sphere.mesh) {
        this.sphere.handleMouseMove(this.mouse)
      }
      if (this.plane.mesh) {
        this.plane.handleMouseMove(this.mouse)
        this.plane.material.uniforms.uMouse.value.x = -this.plane.mouseX
        this.plane.material.uniforms.uMouse.value.y = this.plane.mouseY
      }
    })

    // Time tick event
    this.time.on('tick', () => {
      this.renderer.customPass.uniforms.time.value = this.time.elapsedTime

      if (this.plane.mesh) this.plane.mesh.material.uniforms.uTime.value = this.time.elapsedTime

      this.sphere.setSphereAnimation()

      this.update()
    })

    this.DOMNodes = this.initilizedDomNodes()
  }

  // eslint-disable-next-line class-methods-use-this
  initilizedDomNodes() {
    const loadingText = document.querySelector('.loading-text')
    const svgLoaderAnimation = document.querySelector('.loader-svg.animate')
    const svgLoaderBackground = document.querySelector('.loader-svg.bg')
    const asideText = document.querySelector('.personal-site-text')
    const logoIcon = document.querySelector('.logo-icon')
    const outlineLetters = document.querySelectorAll('.hero-text-wrapper .hero-letter')
    const hobbyText = document.querySelector('.hobby-text')
    const aboutMeButton = document.querySelector('.menu-content-button')
    const mainContainer = document.querySelector('.main-container')
    const containerAboutMePage = document.querySelector('.about-page-container')
    const mainAboutMePage = document.querySelector('.about-page-container .about-me-page')
    const aboutMeTitleTextList = document.querySelectorAll('.main-container-title-container .animation-translate')
    const aboutMeTitleContainer = document.querySelectorAll('.main-container-title-container')
    const aboutMeSubtitleContainer = document.querySelectorAll('.main-container-subtitle-container')
    const buttonBackToMain = document.querySelector('.button-back-text')
    const experienceContainer = document.querySelector('.experience-container')
    const themeToggleButton = document.querySelector('.theme-toggle')
    const themeCurtain = document.querySelector('.theme-curtain')

    return {
      loadingText,
      svgLoaderAnimation,
      svgLoaderBackground,
      asideText,
      logoIcon,
      outlineLetters,
      hobbyText,
      aboutMeButton,
      mainContainer,
      containerAboutMePage,
      mainAboutMePage,
      aboutMeTitleTextList,
      aboutMeTitleContainer,
      aboutMeSubtitleContainer,
      buttonBackToMain,
      experienceContainer,
      themeToggleButton,
      themeCurtain,
    }
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.renderer.update()
  }
}
