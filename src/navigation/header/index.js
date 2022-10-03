import {
    jsx,
    jsxFrag,
    init,
    getValue,
    setValue,
    Variable,
    parsingUrl
} from '@betarost/cemjs'
import svg from "@assets/svg/index.js"
import images from '@assets/images/index.js';
//import HeaderEmpty from './HeaderEmpty.js'
//import HeaderNotAuth from './HeaderNotAuth.js'
//import HeaderAuth from './HeaderAuth.js'
import HeaderUser from './HeaderUser.js';
import { If } from '@component/helpers/All.js'
import { clickCancel, siteLink, changeLang } from '@src/functions.js'
import { Avatar } from '@component/element/Avatar.js';

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

    const listLang = Object.keys(languages).map(function (key) {
        return (
            <li class="c-changelanguage__item">
                <a class="c-changelanguage__link" href={"/" + key + "/" + Variable.dataUrl.adress} onclick={changeLang}><span class="c-changelanguage__text">{languages[key].lang_orig}</span></a>
            </li>
        )
    })

    return (
        <ul class="c-changelanguage__list" >
            {listLang}
        </ul>
    )

}

const HeaderAuth = () => (
    <div class="c-header__container c-container">
        <div class="c-header__inner">
            <div class="c-header__auth">
                <div
                    class="language"
                    onclick={showListLang}
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
                <div class="header_avatar_container">


                    {/* <Avatar author={Variable.myInfo} /> */}
                </div>
                <div class="auth_user_header">
                    <div class="c-header__notifications c-notification c-notification--active">
                        <a class="c-notification__link"></a>
                        <div class="c-notification__new"></div>
                    </div>
                    <div class="c-header__messages c-messages">
                        <a href="/user/chats/" class="c-messages__link" onclick={siteLink}>
                            <i class="c-messages__icon"></i>
                            <div style="display: none;" class="c-messages__counter"></div>
                        </a>
                        <div class="c-messages__new"></div>
                    </div>
                    <i class="c-header__burger"></i>
                </div>
                <div style="display: none;" class="user_notifications_block auth_notifications" id="notifications_block">

                </div>
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



const HeaderNotAuth = () => (
    <div class="c-header__container c-container">
        <div class="c-header__inner">
            <div class="c-header__auth">
                <div
                    class="language"
                    onclick={showListLang}
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
                    onclick={() => {
                        Variable.SetModals({ name: "ModalReg", data: {} })
                    }}
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


const mainHeader = async function () {

    let elem = Variable.setRef()

    init(
        () => {
            Variable.langListShow = false;
            if (Variable.showUserMenu) {
                document.getElementById("mainHeader").classList.add("c-header--notransform");
            }
        },
        () => {

            if (Variable.HeaderShow) {
                return (
                    <div class="c-header__container c-container">
                        <div class="c-header__inner">
                            <div
                                class="language"
                                onclick={(e) => {
                                    elem().hidden = !elem().hidden
                                    if (!elem().hidden) {
                                        Variable.OutHideWindows.push([elem, elem])
                                    }
                                    e.stopPropagation();
                                }}
                            >
                                <div class="selectlink">
                                    <div class="selectlink-control"><span>{Variable.lang.lang_orig}</span></div>
                                </div>
                            </div>
                            <div
                                class="c-changelanguage"
                                ref={elem}
                                hidden
                            >
                                <div class="c-changelanguage__header">
                                    <h4 class="c-changelanguage__title">{Variable.lang.h.modal_listLanguage}</h4>
                                </div>
                                <ul class="c-changelanguage__list" >
                                    {Object.keys(Variable.languages).map(function (key) {
                                        return (
                                            <li class="c-changelanguage__item">
                                                <a
                                                    class="c-changelanguage__link"
                                                    href={"/" + key + "/" + Variable.dataUrl.adress}
                                                    onclick={function (e) {
                                                        e.preventDefault();
                                                        elem().hidden = true
                                                        history.pushState(null, null, this.href);
                                                        parsingUrl()
                                                    }}
                                                >
                                                    <span class="c-changelanguage__text">{Variable.languages[key].lang_orig}</span></a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    // <If
                    //     data={Variable.auth}
                    //     dataIf={<HeaderAuth />}
                    //     dataElse={<HeaderNotAuth />}
                    // />
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
    return
}
export { mainHeader }