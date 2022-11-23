import gsap from 'gsap'
import { Power3 } from 'gsap/gsap-core'

import { isMobileDevice } from '../utils'

export const loadingAnimation = app => {
  const loadingTextAnimation = gsap.to(app.DOMNodes.loadingText, {
    duration: 1,
    delay: 1,
    text: 'LOADING...',
    ease: 'none',
    repeat: 14,
  })

  gsap.delayedCall(3, () => {
    gsap
      .fromTo(app.DOMNodes.loadingText, { y: 0 }, { y: `-${150}%`, duration: 1, ease: Power3.easeInOut })
      .eventCallback('onComplete', () => {
        loadingTextAnimation.pause()
        app.DOMNodes.svgLoaderAnimation.classList.remove('animate')
        app.DOMNodes.svgLoaderBackground.classList.remove('bg')
      })
  })

  gsap.delayedCall(4, () => {
    gsap.fromTo(app.sphere.mesh.position, { z: 4 }, { z: -0.5, duration: 2 })
  })

  gsap.delayedCall(6, () => {
    if (!isMobileDevice()) gsap.fromTo(app.DOMNodes.asideText, { translateY: `-${100}%` }, { translateY: 0 })
    gsap.fromTo(app.DOMNodes.logoIcon, { translateX: `-${100}%` }, { translateX: 0 })
    gsap.fromTo(app.DOMNodes.hobbyText, { translateY: `-${100}%` }, { translateY: 0 })
    gsap.fromTo(app.DOMNodes.aboutMeButton, { translateY: `-${100}%` }, { translateY: 0 })
    gsap.fromTo(app.DOMNodes.themeToggleButton, { translateY: `-${100}%` }, { translateY: 0 })
  })

  gsap.delayedCall(7, () => {
    app.DOMNodes.outlineLetters.forEach((letter, index) => {
      gsap.to(letter, { translateY: 0, duration: 0.1, delay: index * 0.05 })
    })
  })
}
