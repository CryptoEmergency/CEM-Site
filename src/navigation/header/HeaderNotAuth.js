import {
    jsx,
    jsxFrag,
    getVariable,
    setValue,
    getValue,
    getStorage,
} from '@betarost/cemjs'
import svg from "@assets/svg/index.js"
import { clickCancel, siteLink, changeLang } from '@src/functions.js'
import { BlockModal } from '@component/blocks/BlockModal.js';

const ID = "mainHeader"
const showListLang = function (e) {
    e.stopPropagation()
    setValue(ID, "langListShow", !getValue(ID, "langListShow"))
}


const showModalAuth = function (e) {
    e.stopPropagation()
    setValue("modals", "authModalShow", !getValue("modals", "authModalShow"))
}

const LanguagesList = function (languages) {
    const dataUrl = getVariable("dataUrl");
    const listLang = Object.keys(languages).map(function (key) {
        return (
            <li class="c-changelanguage__item">
                <a class="c-changelanguage__link" href={"/" + key + "/" + dataUrl.adress} onclick={changeLang}><span class="c-changelanguage__text">{languages[key].lang_orig}</span></a>
            </li>
        )
    })

    return (
        <ul class="c-changelanguage__list">
            {listLang}
        </ul>
    )

}

const forExport = function () {
    const langListShow = getValue(ID, "langListShow")
    const authModalShow = getValue(ID, "authModalShow")

    const languages = getVariable("languages");
    const lang = languages[getStorage("lang")]
    return (
        <div class="c-header__container c-container">
            <div class="c-header__inner">
                <div class="c-header__auth">
                    <div class="language" onclick={showListLang}>
                        <div class="selectlink">
                            <div class="selectlink-control"><span>{lang.lang_orig}</span></div>
                        </div>
                    </div>
                    <div
                        class={`c-changelanguage ${langListShow ? '' : 'dn'}`}
                        id="listLanguage"
                        onclick={clickCancel}>
                        <div class="c-changelanguage__header">
                            <h4 class="c-changelanguage__title">{lang.h.modal_listLanguage}</h4>
                        </div>
                        {LanguagesList(languages)}
                    </div>
                    <a class="log-in" onclick={showModalAuth}>{lang.button.login}</a>
                    <button class="c-button c-button--gradient" type="button" id="registration" data-action="registrationModal">
                        <span class="c-button__text">{lang.button.registration}</span>
                    </button>
                </div>
                <nav class="c-header__menu c-menu">
                    <a class="c-logo c-menu__link" href="/" onclick={siteLink}>
                        <img class="c-logo__image" src={svg.logo} />
                    </a>
                    <a class="c-menu__link" href="/contacts/" onclick={siteLink}>{lang.a.contacts}</a>
                    <a class="c-menu__link" href="/about/" onclick={siteLink}>{lang.a.about}</a>
                    <a class="c-menu__link" href="/blog/" onclick={siteLink}>{lang.a.blog}</a>
                </nav>
            </div>
        </div>
    )
}

export default forExport