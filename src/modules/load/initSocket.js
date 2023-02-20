import { Variable, initReload } from '@betarost/cemserver/cem.js'
import { io } from "socket.io-client"

const options = {
    reconnectionDelayMax: 10000,
    path: '/api/v2/',
    auth: {
        uuid: Variable.uuid
    }
}

let socket = null
// Variable.socket = socket
// Variable.socketConnect = false

const initSocket = async function () {
    // return
    options.auth.uuid = Variable.uuid
    options.auth.status = Variable.auth
    socket = io("/", options)

    socket.on("connect", (socket) => {
        Variable.socketConnect = true
        if (Variable.load) {
            initReload()
        }
    });

    socket.on('disconnect', () => {
        socket = null
        Variable.socketConnect = false
        if (Variable.load) {
            initReload()
        }
    });

    for (let key in Variable.socketList) {
        socket.on(key, Variable.socketList[key])
    }
}

export { initSocket, socket };