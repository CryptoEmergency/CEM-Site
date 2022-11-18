import { init, build, start } from '@betarost/cem'
import path from 'path'
init({
    //Указываем пути к папке ресурсов, публичной папки.
    path: {
        src: path.resolve('src/index.js'),
        public: path.resolve('public'),
        fileName: "main.js"
    },
    // Порт сервера
    port: 80,
    //Режим запуска
    // mode: "production",
    mode: "development",
    // Какую базу подключить office - локальную, "" - основную, test - Тестовую
    //api: "",
      api: "office"
});
//Собираем и запускаем
build({}).then((result) => { if (result) start(result) });