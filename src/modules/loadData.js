import { initCache, Variable } from '@betarost/cemserver/cem.js'

const loadData = async function () {
    Variable.load = false
    try {
        await initCache();
    } catch (error) {
        console.error(error, "initCache")
    }
}

export { loadData };