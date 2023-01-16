import { initCache, Variable } from '@betarost/cemserver/cem.js'

const loadData = async function () {
    Variable.load = false
    Variable.multiLang = true
    Variable.preLoad = true
    Variable.spinner = 200
    try {
        await initCache();
    } catch (error) {
        console.error(error, "initCache")
    }
}

export { loadData };