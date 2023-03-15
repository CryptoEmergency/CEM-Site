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
    console.log('=c937ad=', "Start socket connect")
    return new Promise((resolve, reject) => {
        // return
        let linkTimer = setTimeout(() => {
            Variable.socketConnect = false
            resolve()
        }, 2000);
        options.auth.uuid = Variable.uuid
        options.auth.status = Variable.auth
        socket = io("/", options)

        socket.on("connect", (socket) => {
            console.log('=c937ad=', "Connect socket!")
            Variable.socketConnect = true
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('disconnect', () => {
            console.log('=c937ad=', "Connect socket!")
            socket = null
            Variable.socketConnect = false
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('disconnect', () => {
            console.log('=3cd7cf=', "socket disconnect")
            socket = null
            Variable.socketConnect = false
            clearTimeout(linkTimer)
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('connect_error', () => {
            console.log('=3cd7cf=', "socket connect_error")
            socket = null
            Variable.socketConnect = false
            clearTimeout(linkTimer)
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('reconnect', () => {
            console.log('=3cd7cf=', "socket reconnect")
            socket = null
            Variable.socketConnect = false
            clearTimeout(linkTimer)
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('reconnect_attempt', () => {
            console.log('=3cd7cf=', "socket reconnect_attempt")
            socket = null
            Variable.socketConnect = false
            clearTimeout(linkTimer)
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('reconnect_error', () => {
            console.log('=3cd7cf=', "socket reconnect_error")
            socket = null
            Variable.socketConnect = false
            clearTimeout(linkTimer)
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('reconnect_failed', () => {
            console.log('=3cd7cf=', "socket reconnect_failed")
            socket = null
            Variable.socketConnect = false
            clearTimeout(linkTimer)
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('error', (error) => {
            console.log('=3cd7cf=', "socket error", error)
            socket = null
            Variable.socketConnect = false
            clearTimeout(linkTimer)
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