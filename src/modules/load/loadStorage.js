import {
    getStorage,
    setStorage,
    Variable
} from '@betarost/cemserver/cem.js'

const loadStorage = async function () {
    try {
        if (!localStorage.getItem('lang')) {
            let language = window.navigator ? (window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage) : "en";
            language = language.substr(0, 2).toLowerCase();
            const siteLanguage = Variable.languages;
            if (!siteLanguage || !siteLanguage[language]) {
                language = "en";
            }
            localStorage.setItem('lang', language)
            localStorage.setItem('auth', false)
            localStorage.setItem('myInfo', "{}")
            localStorage.setItem('filters', "{}")
            localStorage.setItem('uuid', 0)
        }

        Variable.auth = getStorage("auth")
        Variable.myInfo = getStorage("myInfo")

        let timeNow = Math.floor(Date.now() / 1000)
        let objView = getStorage("recordsView")
        for (let key in objView) {
            if (timeNow - objView[key] >= 86400) {
                delete objView[key]
            }
        }
        setStorage("recordsView", objView)

    } catch (error) {
        console.error(error, "loadStorage")
    }
}

// loadStorage()
export { loadStorage };