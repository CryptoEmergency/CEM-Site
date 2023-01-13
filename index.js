import { init, build, start } from '@betarost/cem'
import path from 'path'

const port = 80
const target = "crypto-emergency.com"
// const target = "idns.work"
const mode = "development"
// const mode = "production"

init({
    //Указываем пути к папке ресурсов, публичной папки.
    path: {
        src: path.resolve('src/index.js'),
        public: path.resolve('public'),
        fileName: "main.js"
    },
    // Порт сервера
    port,
    //Режим запуска
    mode,
    allowedHosts: [target],
    proxy: {
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
//Собираем и запускаем
build({}).then((result) => { if (result) start(result) });