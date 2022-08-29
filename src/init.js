import { setAction} from '@betarost/cemjs'
import { init as startMake } from '@src/router.js'

const ID = "App";

const start = async function () {
    startMake()
}

setAction(ID, "start", start)

const init = function () {
    start()
}

export { init }