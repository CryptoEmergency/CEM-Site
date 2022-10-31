import {
    jsx,
    jsxFrag,
    init,
    Variable,
    parsingUrl,
    initReload,
    Helpers
} from '@betarost/cemjs'

import svg from "@assets/svg/index.js"
import { Avatar } from '@component/element/index.js';

const mainHeader = async function () {

    init(
        async () => {
            if (Variable.Static.HeaderShow) {
                document.getElementById("mainHeader").classList.remove("c-header--notransform");
            }
            if (Variable.dataUrl.adress != "forum") {
                if (document.getElementById("jivo-iframe-container")) {
                    document.getElementById("jivo-iframe-container").remove()
                }
                if (document.querySelectorAll('jdiv') && document.querySelectorAll('jdiv').length) {
                    document.querySelectorAll('jdiv')[0].remove()
                }
            }
        },
        () => {
            if (Variable.Static.HeaderShow) {
                return (
                    <div class="c-header__container c-container">
                        <div class="c-header__inner">
                            <div class="c-header__auth">
                                <div
                                    class="language"
                                    onclick={() => {
                                        Variable.SetModals({
                                            name: "ModalChangeLanguage",
                                            data: {
                                                onclick: async (langCode, langName, langOrig) => {
                                                    initReload()
                                                },
                                            },
                                        });
                                    }}
                                >
                                    <div class="selectlink">
                                        <div class="selectlink-control"><span>{Variable.lang.lang_orig}</span></div>
                                    </div>
                                </div>
                                {
                                    () => {
                                        if (Variable.auth && Variable.myInfo) {
                                            return (
                                                <div class="c-header__wrapper" style="">
                                                    <div class="header_avatar_container">
                                                        <Avatar
                                                            author={Variable.myInfo}
                                                        //   settings={true} 
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div style="display: flex; align-items: center">
                                                    <a
                                                        class="log-in"
                                                        onclick={(e) => {
                                                            Variable.SetModals({ name: "ModalAuth", data: {} })
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        {Variable.lang.button.login}
                                                    </a>
                                                    <button
                                                        class="c-button c-button--gradient"
                                                        type="button"
                                                        onclick={(e) => {
                                                            Variable.SetModals({ name: "ModalReg", data: {} })
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        <span class="c-button__text">{Variable.lang.button.registration}</span>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    }
                                }
                            </div>
                            <nav class="c-header__menu c-menu">
                                <a class="c-logo c-menu__link" href="/" onclick={Helpers.siteLink}>
                                    <img class="c-logo__image" src={svg.logo} />
                                </a>
                                <a class="c-menu__link" href="/contacts/" onclick={Helpers.siteLink}>{Variable.lang.a.contacts}</a>
                                <a class="c-menu__link" href="/about/" onclick={(e) => { Helpers.siteLinkModal(e, {}) }}>{Variable.lang.a.about}</a>
                                {/* <a class="c-menu__link" href="/about/" onclick={Helpers.siteLinkModal}>{Variable.lang.a.about}</a> */}
                                {/* <a class="c-menu__link" href="/about/" onclick={Helpers.siteLink}>{Variable.lang.a.about}</a> */}
                                <a class="c-menu__link" href="/blog/" onclick={Helpers.siteLink}>{Variable.lang.a.blog}</a>
                            </nav>
                        </div>
                    </div>
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