import { Variable } from "@betarost/cemserver/cem.js";
import { socket } from "@src/modules/load/initSocket.js";
// import { fn } from '@src/functions/index.js';
const forExport = {}

forExport.send = function (data, callback) {
    socket.emit("Crypto", { T: 1 })

}

forExport.get = async function (data, callback) {
    if (!socket.connected) {
        console.log('=b91e2c=', "Socket not connected!!!", data)
        return []
    }
    data.method = "get" + data.method
    // console.log('=6284c7=', socket.connected, Variable.socketConnect)
    // if (data.cache) {
    //     delete data.cache
    // }
    return new Promise((resolve, reject) => {
        if (!callback) {
            socket.emit("Crypto", data, function ({ method, params, result, _id = null, error = null }) {
                // console.log('=7269ff response22=', method, params, result, _id, error);
                if (data.cache) {
                    // fn.idb.set("CachePage", data.cache, result)
                }
                resolve(result);
            });
        } else {
            socket.emit("Crypto", data, function ({ method, params, result, _id = null, error = null }) {
                console.log('=7269ff response=', method, params, result, _id, error);
                if (callback) {
                    callback(result)
                }
                if (data.cache) {
                    // fn.idb.set("CachePage", data.cache, result)
                }
                resolve(result);
            });
        }
        setTimeout(() => {
            // console.log('=b8e375= setTimeout Socket', data)
            resolve("result setTimeout");
        }, 2000);
    });



}

forExport.set = function () {
    console.log("dgdfgfgd3")
}

export default forExport