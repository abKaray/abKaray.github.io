import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import './style.css'
import App from './classes/App'
import { hideMainPage, hideAboutPage, loadingAnimation, startLoadingAnimation, changeThemeColor } from './scripts'
import { setAmoutMePageMovementVelocity } from './utils'

const canvas = document.querySelector('canvas.webgl')

const app = new App(canvas)

startLoadingAnimation(app)

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(TextPlugin)
})

window.onload = () => {
  app.sphere.createMesh()
  loadingAnimation(app)
}

app.setScrollEvent(app.DOMNodes.containerAboutMePage, () => {
  const setCurrentVelocityScroll = setAmoutMePageMovementVelocity(app)

  gsap.to(app.DOMNodes.aboutMeTitleContainer, { translateY: setCurrentVelocityScroll(0.3) })
  gsap.to(app.DOMNodes.aboutMeSubtitleContainer, { translateY: setCurrentVelocityScroll(0.06) })
  gsap.to(app.DOMNodes.experienceContainer, { translateY: setCurrentVelocityScroll(0.2) })
})

app.setClickEvent(app.DOMNodes.themeToggleButton, () => changeThemeColor(app))
app.setClickEvent(app.DOMNodes.aboutMeButton, () => hideMainPage(app))
app.setClickEvent(app.DOMNodes.buttonBackToMain, () => hideAboutPage(app))
