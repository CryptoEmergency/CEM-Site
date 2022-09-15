import { init, build, start } from '@betarost/cem'
import path from 'path'

init({
    path: {
        src: path.resolve('src/index.js'),
        public: path.resolve('public'),
        fileName: "main.js"
    },
<<<<<<< Updated upstream
    port: 80,
    mode: "production",
    api: "office"
=======
    port:80,
    mode:"production",
    api:"office"
>>>>>>> Stashed changes
});

build({}).then((result) => { if (result) start(result) });