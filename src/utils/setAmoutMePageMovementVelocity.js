import { isMobileDevice } from './isMobileDevice'

export const setAmoutMePageMovementVelocity = app => velocity => {
  // Make speed of scroll velocity less on mobile devices
  const currentVelocity = isMobileDevice() ? velocity * 0.4 : velocity
  return -(app.DOMNodes.containerAboutMePage.scrollTop * currentVelocity)
}
