import { Variable, initReload } from '@betarost/cemserver/cem.js'
import { io } from "socket.io-client"

const options = {
    reconnectionDelayMax: 10000,
    pingTimeout: 3000,
    pingInterval: 3000,
    path: '/api/v2/',
    auth: {
        uuid: Variable.uuid
    }
}

let socket = null
// Variable.socket = socket
// Variable.socketConnect = false

const initSocket = async function () {

    return new Promise((resolve, reject) => {
        // return
        options.auth.uuid = Variable.uuid
        options.auth.status = Variable.auth
        socket = io("/", options)

        socket.on("connect", (socket) => {
            Variable.socketConnect = true
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('disconnect', () => {
            socket = null
            Variable.socketConnect = false
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        for (let key in Variable.socketList) {
            socket.on(key, Variable.socketList[key])
        }
    })
}

export { initSocket, socket };