import {
    jsx,
    jsxFrag,
    init,
    getValue,
    setValue,
    makeDOM,
    getStorage,
    setVal,
    Variable
} from '@betarost/cemjs'
import svg from "@assets/svg/index.js"
//import HeaderEmpty from './HeaderEmpty.js'
//import HeaderNotAuth from './HeaderNotAuth.js'
import HeaderAuth from './HeaderAuth.js'
import HeaderUser from './HeaderUser.js';
import { If } from '@component/helpers/All.js'
import { clickCancel, siteLink, changeLang } from '@src/functions.js'

const showListLang = function (e) {
    Variable.langListShow = !Variable.langListShow
    e.stopPropagation()
}

const showModalAuth = function (e) {
    Variable.authModalShow = !Variable.authModalShow;
    e.stopPropagation();
    // setValue("modals", "authModalShow", !getValue("modals", "authModalShow"))
}

const showModalRegistr = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setValue("modals", "registrationModalShow", !getValue("modals", "registrationModalShow"));
};

const LanguagesList = function (languages) {

    const outClick = function (e) {
        console.log("outClick")
        e.stopPropagation();
        Variable.langListShow = false

    }

    const listLang = Object.keys(languages).map(function (key) {
        return (
            <li class="c-changelanguage__item">
                <a class="c-changelanguage__link" href={"/" + key + "/" + Variable.dataUrl.adress} onclick={changeLang}><span class="c-changelanguage__text">{languages[key].lang_orig}</span></a>
            </li>
        )
    })

    return (
        <ul
            class="c-changelanguage__list"
            outClick={outClick}
        >
            {listLang}
        </ul>
    )

}

const HeaderNotAuth = ({ ref }) => (
    <div class="c-header__container c-container">
        <div class="c-header__inner">
            <div class="c-header__auth">
                <div
                    class="language"
                    onclick={showListLang}
                    ref={ref}
                >
                    <div class="selectlink">
                        <div class="selectlink-control"><span>{Variable.lang.lang_orig}</span></div>
                    </div>
                </div>
                <div
                    class={`c-changelanguage ${Variable.langListShow ? '' : 'dn'}`}
                    id="listLanguage"
                    onclick={clickCancel}>
                    <div class="c-changelanguage__header">
                        <h4 class="c-changelanguage__title">{Variable.lang.h.modal_listLanguage}</h4>
                    </div>
                    {LanguagesList(Variable.languages)}
                </div>
                <a
                    class="log-in"
                    onclick={() => {
                        Variable.SetModals({ name: "ModalAuth", data: {} })
                        //Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div.existing_email } })

                        //console.log("=2=", Variable.Modals)
                    }}
                >
                    {Variable.lang.button.login}
                </a>
                <button
                    class="c-button c-button--gradient"
                    type="button"
                    id="registration"
                // onclick={showModalRegistr}
                >
                    <span class="c-button__text">{Variable.lang.button.registration}</span>
                </button>
            </div>
            <nav class="c-header__menu c-menu">
                <a class="c-logo c-menu__link" href="/" onclick={siteLink}>
                    <img class="c-logo__image" src={svg.logo} />
                </a>
                <a class="c-menu__link" href="/contacts/" onclick={siteLink}>{Variable.lang.a.contacts}</a>
                <a class="c-menu__link" href="/about/" onclick={siteLink}>{Variable.lang.a.about}</a>
                <a class="c-menu__link" href="/blog/" onclick={siteLink}>{Variable.lang.a.blog}</a>
            </nav>
        </div>
    </div>
)


const mainHeader = function () {
    let test
    test = Variable.setRef()
    init(
        () => {
            Variable.langListShow = false;
            Variable.authModalShow = false;
        },
        () => {

            if (Variable.HeaderShow) {
                return (
                    <If
                        data={getStorage("auth")}
                        dataIf={<HeaderAuth />}
                        dataElse={<HeaderNotAuth
                            ref={test}
                        />}
                    />
                )
            } else if (Variable.showUserMenu) {
                return (
                    <HeaderUser />
                )
            } else {
                return (
                    <></>
                )
            }
        }, "mainHeader")
}
export { mainHeader }