import { Variable } from '@betarost/cemserver/cem.js'

import { default as languages } from '@src/languages/index.js'
import listsLang from '@src/lists/languages.json'
import phoneCodes from '@src/lists/phoneCodes.json'
import allCountries from '@src/lists/allCountries.json'
import { modalsList } from "@src/lists/modalsList.js";
import { routerList } from "@src/lists/routerList.js";

const loadLists = async function () {
    Variable.languages = languages
    Variable.allCountries = allCountries
    Variable.listsLang = listsLang
    Variable.phoneCodes = phoneCodes
    Variable.listModals = modalsList()
    Variable.listRouter = routerList()
}

// loadLists();
export { loadLists };