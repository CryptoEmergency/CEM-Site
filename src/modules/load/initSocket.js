import { Variable, initReload } from '@betarost/cemserver/cem.js'
import { io } from "socket.io-client"

const options = {
    reconnectionDelayMax: 10000,
    path: '/api/v2/',
    auth: {
        uuid: Variable.uuid
    }
}

const socket = null
Variable.socketConnect = false

const initSocket = async function () {
    options.auth.uuid = Variable.uuid
    options.auth.status = Variable.auth
    const socket = io("/", options)

    socket.on("connect", (socket) => {
        Variable.socketConnect = true
        initReload()
    });

    socket.on('disconnect', () => {
        Variable.socketConnect = false
        initReload()
    });

    for (let key in Variable.socketList) {
        socket.on(key, Variable.socketList[key])
    }

    setTimeout(() => {
        socket.emit("welcome", { test: "fff" }, (response) => {
            console.log("=====", response); // "got it"
        });
    }, 7000);
}

export { initSocket, socket };