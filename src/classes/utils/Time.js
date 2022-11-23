import * as THREE from 'three'
import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter {
  constructor() {
    super()
    this.clock = new THREE.Clock()

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    this.elapsedTime = this.clock.getElapsedTime()
    this.trigger('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
