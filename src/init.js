import { setAction } from '@betarost/cemjs'
import { init as startMake } from '@src/router.js'
setAction("App", "start", startMake)
const init = function () { startMake() }
export { init }
console.log("werty")