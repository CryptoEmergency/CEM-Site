
const start = async function (t1, t2, t3) {
    this.emit("welcome", { test: "fff" }, (response) => {
        console.log("=====", response); // "got it"
    });
    // console.log("Client welcome", t1, t2, t3, this)
    // socket.emit("welcome", {}, "ggg")
}

export default start;