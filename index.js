import { init, build, start } from '@betarost/cem'
import path from 'path'

init({
    path: {
        src: path.resolve('src/index.js'),
        public: path.resolve('public'),
        fileName: "main.js"
    },
    port: 80,
    // mode: "production",
    mode: "development",
    // api: "",
<<<<<<< Updated upstream
    api: ""
=======
    api: "office"
>>>>>>> Stashed changes
});
//I check
build({}).then((result) => { if (result) start(result) });