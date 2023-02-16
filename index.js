import { ServerInit, ServerBuild, ServerStart } from '@betarost/cemserver'
import path from 'path'

const port = 80
const target = "crypto-emergency.com"
// const target = "idns.work"
const mode = "development"
// const mode = "production"

ServerInit({
    path: {
        src: path.resolve('src/index.js'),
        public: path.resolve('public'),
        fileName: "main.js"
    },
    port,
    mode,
    allowedHosts: [target],
    proxy: {
        // '/api/v2': {
        //     target: `http://127.0.0.1:6060`,
        //     changeOrigin: true,
        //     secure: false,
        //     ws: true
        // },
        '/api': {
            target: `https://${target}`,
            changeOrigin: true,
            secure: false
        },
        '/assets/upload': {
            target: `https://${target}`,
            changeOrigin: true,
            secure: false
        },
        '/upload': {
            target: `https://${target}`,
            changeOrigin: true,
            secure: false
        },
    }
});

ServerBuild({}).then((result) => { if (result) ServerStart(result) });