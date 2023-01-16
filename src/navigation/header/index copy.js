import {
    jsx,
    jsxFrag,
    Variable,
    load
} from '@betarost/cemserver/cem.js'


import svg from "@assets/svg/index.js"
import { fn } from '@src/functions/index.js';
import { Avatar } from '@component/element/index.js';

const mainHeader = async function () {

    load({
        ID: "mainHeader",
        fn: () => {
            if (Variable.Static.HeaderShow) {
                return (
                    <div class="c-header__container c-container">
                        <div class="c-header__inner">
                            <div class="c-header__auth">
                                <div
                                    class="language"
                                    onclick={() => {
                                        fn.modals.ModalLanguageSite({})
                                        // Variable.SetModals({ name: "ModalLanguageSite", data: {}, });
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
                                <a class="c-logo c-menu__link" href="/" onclick={fn.siteLink}>
                                    <img class="c-logo__image" src={svg.logo} />
                                </a>
                                <a class="c-menu__link" href="/contacts/" onclick={(e) => {
                                    fn.siteLinkModal(e, {
                                        title: Variable.lang.a.contacts, items: fn.itemsMenu.onlyPage({ url: '/contacts/' })
                                    })
                                }}>{Variable.lang.a.contacts}</a>
                                <a class="c-menu__link" href="/about/" onclick={(e) => {
                                    fn.siteLinkModal(e, {
                                        title: Variable.lang.a.about, items: fn.itemsMenu.onlyPage({ url: '/about/' })
                                    })
                                }}>{Variable.lang.a.about}</a>
                                <a class="c-menu__link" href="/blog/" onclick={(e) => {
                                    fn.siteLinkModal(e, { title: Variable.lang.h.blog, items: fn.itemsMenu.onlyPage({ url: '/blog/' }) })
                                }}>{Variable.lang.a.blog}</a>
                            </nav>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div></div>
                )
            }
        },
    })
    return
}

export { mainHeader }