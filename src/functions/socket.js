import { socket } from "@src/modules/load/initSocket.js";

const forExport = {}

forExport.send = function (data, callback) {
    socket.emit("Crypto", { T: 1 })

}

forExport.get = async function (data, callback) {
    // console.log('=8ce7cf=', variable)
    // variable.test = "sdfsdf"
    data.method = "get" + data.method
    return new Promise((resolve, reject) => {
        if (!callback) {
            socket.emit("Crypto", data);
            resolve({});
        } else {
            socket.emit("Crypto", data, function ({ method, params, result, _id = null, error = null }) {
                console.log('=7269ff response=', method, params, result, _id, error);
                if (callback) {
                    callback(result)
                }
                resolve(result);
            });
        }
        setTimeout(() => {
            // переведёт промис в состояние fulfilled с результатом "result"
            resolve("result setTimeout");
        }, 2000);
    });



}

forExport.set = function () {
    console.log("dgdfgfgd3")
}

export default forExport