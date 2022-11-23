import gsap from 'gsap'
import { Power3 } from 'gsap/gsap-core'

export const startLoadingAnimation = app => {
  gsap.fromTo(app.DOMNodes.svgLoader, { opacity: 0 }, { opacity: 1, duration: 1, ease: Power3.easeOut })
  gsap.fromTo(app.DOMNodes.loadingText, { y: `${-150}%` }, { y: 0, duration: 2, ease: Power3.easeOut })
}
