import EventEmitter from './EventEmitter'

export default class Mouse extends EventEmitter {
  constructor() {
    super()

    this.clientX = 0
    this.clientY = 0
    this.pageX = 0
    this.pageY = 0

    window.addEventListener('mousemove', event => {
      this.clientX = event.clientX
      this.clientY = event.clientY
      this.pageX = event.pageX
      this.pageY = event.pageY

      this.trigger('mousemove')
    })
  }
}
