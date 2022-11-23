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

app.DOMNodes.containerAboutMePage.addEventListener('scroll', () => {
  const setCurrentVelocityScroll = setAmoutMePageMovementVelocity(app)

  gsap.to(app.DOMNodes.aboutMeTitleContainer, { translateY: setCurrentVelocityScroll(0.3) })
  gsap.to(app.DOMNodes.aboutMeSubtitleContainer, { translateY: setCurrentVelocityScroll(0.06) })
  gsap.to(app.DOMNodes.experienceContainer, { translateY: setCurrentVelocityScroll(0.2) })
})

app.DOMNodes.themeToggleButton.addEventListener('click', () => {
  changeThemeColor(app)
})

app.DOMNodes.aboutMeButton.addEventListener('click', () => hideMainPage(app))

app.DOMNodes.buttonBackToMain.addEventListener('click', () => hideAboutPage(app))
