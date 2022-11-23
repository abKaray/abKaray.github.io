import gsap from 'gsap'

import { THEME_COLOR } from '../const'

export const changeThemeColor = app => {
  const currentThemeColor = document.firstElementChild.getAttribute('data-theme')
  const updatedThemeColor = currentThemeColor === THEME_COLOR.light ? THEME_COLOR.dark : THEME_COLOR.light

  if (updatedThemeColor === THEME_COLOR.light) {
    gsap.to(app.DOMNodes.themeCurtain, { translateY: 0, duration: 1 })
  } else {
    gsap.to(app.DOMNodes.themeCurtain, { translateY: `${200}%`, duration: 1 }).eventCallback('onComplete', () => {
      gsap.set(app.DOMNodes.themeCurtain, { translateY: `${-100}%` })
    })
  }
  document.firstElementChild.setAttribute('data-theme', updatedThemeColor)
}
