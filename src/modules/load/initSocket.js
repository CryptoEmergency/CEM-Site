import { Variable } from '@betarost/cemserver/cem.js'
import { io } from "socket.io-client"

const options = {
    reconnectionDelayMax: 10000,
    path: '/api/v2/',
    auth: {
        uuid: Variable.uuid
    }
}

const socket = null

const initSocket = async function () {
    options.auth.uuid = Variable.uuid
    console.log('=c7b648=', options)
    const socket = io("/", options)

    socket.on("connect", (socket) => {
        console.log("Client connect")
    });

    socket.on('disconnect', () => {
        console.log("Client disconnect")
    });

    socket.on('welcome', (t1, t2, t3) => {
        console.log("Client welcome", t1, t2, t3)
        // socket.emit("welcome", {}, "ggg")
    });

}

export { initSocket, socket };