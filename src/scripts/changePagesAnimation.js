/* eslint-disable no-param-reassign */
import gsap from 'gsap'

import { isMobileDevice } from '../utils/isMobileDevice'

const showAboutMePage = app => {
  app.DOMNodes.mainAboutMePage.hidden = false
  gsap
    .fromTo(app.sphere.mesh.position, { z: -0.5 }, { z: 4, duration: 2, delay: 0.5 })
    .eventCallback('onComplete', () => {
      if (isMobileDevice()) gsap.to(app.DOMNodes.logoIcon, { translateY: `${-100}%` })
      app.sphere.removeMesh()
      app.DOMNodes.containerAboutMePage.classList.remove('hide')
      app.DOMNodes.aboutMeTitleTextList.forEach(aboutMeTitleText => {
        gsap.to(aboutMeTitleText, { translateY: 0, duration: 1 })
      })
      gsap.to(app.DOMNodes.buttonBackToMain, { translateY: 0 })
      app.plane.createMesh()
      gsap.fromTo(app.plane.mesh.position, { y: -1, z: 2.5 }, { y: 0, z: 1.4, duration: 1 })
    })
}

const showMainPage = app => {
  gsap.delayedCall(1, () => {
    gsap
      .fromTo(app.sphere.mesh.position, { z: 4 }, { z: -0.5, duration: 2, delay: 0.5 })
      .eventCallback('onComplete', () => {
        if (isMobileDevice()) gsap.to(app.DOMNodes.logoIcon, { translateY: 0 })
        gsap.fromTo(app.DOMNodes.hobbyText, { translateY: `${-100}%` }, { translateY: 0 })
        gsap.fromTo(app.DOMNodes.aboutMeButton, { translateY: `${-100}%` }, { translateY: 0 })
        app.DOMNodes.outlineLetters.forEach((letter, index) => {
          gsap.to(letter, { translateY: 0, duration: 0.1, delay: index * 0.05 })
        })
        app.DOMNodes.mainContainer.hidden = false
      })
  })
}

export const hideMainPage = app => {
  app.DOMNodes.outlineLetters.forEach(letter => {
    gsap.to(letter, { translateY: `${-100}%`, duration: 1 })
  })

  gsap.fromTo(app.DOMNodes.hobbyText, { translateY: 0 }, { translateY: `${-100}%` })
  gsap
    .fromTo(app.DOMNodes.aboutMeButton, { translateY: 0 }, { translateY: `${-100}%` })
    .eventCallback('onComplete', () => {
      app.DOMNodes.aboutMeButton.classList.add('hide')
    })

  app.DOMNodes.mainContainer.hidden = true

  showAboutMePage(app)
}

export const hideAboutPage = app => {
  gsap.to(app.DOMNodes.buttonBackToMain, { translateY: `${-100}%` })
  app.DOMNodes.aboutMeTitleTextList.forEach(aboutMeTitleText => {
    gsap.to(aboutMeTitleText, { translateY: `${-100}%`, duration: 1 })
  })
  gsap
    .fromTo(app.plane.mesh.position, { y: 0, z: 1.4 }, { y: -1, z: 2.5, duration: 1 })
    .eventCallback('onComplete', () => {
      app.plane.removeMesh()
      app.DOMNodes.containerAboutMePage.classList.add('hide')
      app.DOMNodes.aboutMeButton.classList.remove('hide')
      app.DOMNodes.mainAboutMePage.hidden = true
      app.sphere.createMesh()
    })
  showMainPage(app)
}
