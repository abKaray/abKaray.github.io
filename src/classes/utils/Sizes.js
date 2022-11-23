import EventEmitter from './EventEmitter'

export default class Resize extends EventEmitter {
  constructor() {
    super()

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight

      this.trigger('resize')
    })
  }
}
