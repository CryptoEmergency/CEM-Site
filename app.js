import { CEM } from '@betarost/cemserver/cem.js'

import "@assets/css/index.js"
import allCountries from '@src/modules/lists/allCountries.json'
import phoneCodes from '@src/modules/lists/phoneCodes.json'
import listsLang from '@src/modules/lists/languages.json'
import { storage } from '@src/modules/load/storage.js'
import { listen } from '@src/modules/load/listen.js'
import { indexedDB } from '@src/modules/load/idb.js'
import { Header } from '@src/navigation/header.js'
import { Footer } from '@src/navigation/footer.js'

CEM.initOptions({
    storage,
    listen,
    Header,
    Footer,
    indexedDB,
    data: {
        load: false,
        multiLang: true,
        preLoad: true,
        spinner: 200,
        listsLang,
        allCountries,
        phoneCodes,
    },
    lists: {
        listRouter: import.meta.webpackContext('./src/navigation', {
            recursive: true,
            regExp: /\.js$/,
            exclude: /(header|footer)/
        }),
        listSocket: import.meta.webpackContext('./src/modules/socket', {
            recursive: true,
            regExp: /\.js$/
        }),
        listModals: import.meta.webpackContext('./src/modals', {
            recursive: true,
            regExp: /\.js$/
        }),
        languages: import.meta.webpackContext('./src/modules/languages', {
            recursive: false,
            regExp: /\.json$/
        })
    },
    functions: import.meta.webpackContext('./src/modules/functions', {
        recursive: true,
        regExp: /\.js$/
    }),
    svg: import.meta.webpackContext('./src/assets/svg', {
        recursive: true,
        regExp: /\.(svg)$/
    }),
    images: import.meta.webpackContext('./src/assets/images', {
        recursive: true,
        regExp: /\.(png|jpg|jpeg|gif)$/
    }),
    elements: import.meta.webpackContext('./src/element', {
        recursive: true,
        regExp: /\.js$/
    }),

})
//19.04.2023