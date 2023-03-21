import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    sendApi,
    initGo,
    Helpers,
    init
} from '@betarost/cemserver/cem.js';
import svg from "@assets/svg/index.js";
import { fn } from '@src/functions/index.js';
import youtube from '@assets/svg/youtube_icon.svg'

let elem = {}

const ModalMobileForum = function (data, ID) {

    let socialIcon

    const showSocial = function (e) {
        socialIcon[e.currentTarget.dataset.type] = !socialIcon[e.currentTarget.dataset.type];
        // initGo("mainFooter", true);
    }

    socialIcon = {
        telegram: false,
        // youtube: false,
        tiktok: false
    }
    let close
    init(
        () => {
            elem.telegram = Variable.setRef()
            elem.tiktok = Variable.setRef()
            elem.youtube = Variable.setRef()

            socialIcon = {
                telegram: false,
                youtube: false,
                tiktok: false
            }
        },
        () => {
            return (
                <div class="c-modal c-modal--open c-modal--fullscreen" id="ModalMobileMainSettings"
                    onclick={
                        function (e) {
                            if (close) {

                                fn.modals.close(ID)

                            }

                            if (data.Burger) {
                                data.Burger.classList.remove("c-userpanel__icon--active")
                            }
                        }
                    }
                >
                    <section class="c-modal__dialog"
                        onmouseover={
                            function () {
                                close = false
                            }
                        }
                        onmouseleave={
                            function () {
                                close = true
                            }
                        }
                    >
                        <header class="c-modal__header">
                            <h2 class="c-modal__title"></h2>
                            {/* <div
                                class="language language_visible"
                                onclick={() => {
                                    fn.modals.ModalLanguageSite()
                                }}
                            >
                                <div class="selectlink">
                                    <div class="selectlink-control">
                                        <img class="language_change_world" src={svg.language_change_world} /> {Variable.lang.lang_orig}
                                    </div>
                                </div>
                            </div> */}
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={() => { fn.modals.close(ID) }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="user_mobile_menu_part">
                                <div class="user_mobile_menu_content">
                                    {Variable.lang.text.menu}
                                </div>
                            </div>
                            {() => {
                                if (Variable.auth) {
                                    return (
                                        <div class="user_mobile_menu_content user_mobile_menu_main_content">
                                            <a class="user_icon_mobile_visible user_icon"
                                                style="width: auto; height: auto; padding: 14px 0; text-align: left;"
                                                onclick={(e) => {
                                                fn.modals.close(ID)
                                                window.scrollTo({
                                                    top: document.querySelector("#about").offsetTop - 75,
                                                    behavior: "smooth",
                                                });
                                            }}>
                                                <span class="mobile_user_menu_link" style="position: static;">{Variable.lang.a.aboutForum}</span>
                                            </a>
                                            <a class="user_icon_mobile_visible user_icon"
                                                style="width: auto; height: auto; padding: 14px 0; text-align: left;"
                                                onclick={(e) => {
                                                fn.modals.close(ID)
                                                window.scrollTo({
                                                    top: document.querySelector("#stands").offsetTop - 75,
                                                    behavior: "smooth",
                                                });
                                            }}>
                                                <span class="mobile_user_menu_link" style="position: static;">{Variable.lang.a.stands}</span>
                                            </a>
                                            <a class="user_icon_mobile_visible user_icon"
                                                style="width: auto; height: auto; padding: 14px 0; text-align: left;"
                                                onclick={(e) => {
                                                fn.modals.close(ID)
                                                window.scrollTo({
                                                    top: document.querySelector("#speakers").offsetTop - 75,
                                                    behavior: "smooth",
                                                });
                                            }}>
                                                <span class="mobile_user_menu_link" style="position: static;">{Variable.lang.a.speakers}</span>
                                            </a>
                                            <a class="user_icon_mobile_visible user_icon"
                                                style="width: auto; height: auto; padding: 14px 0; text-align: left;"
                                                onclick={(e) => {
                                                fn.modals.close(ID)
                                                window.scrollTo({
                                                    top: document.querySelector("#guests").offsetTop - 75,
                                                    behavior: "smooth",
                                                });
                                            }}>
                                                <span class="mobile_user_menu_link" style="position: static;">{Variable.lang.a.guests}</span>
                                            </a>
                                            <a class="user_icon_mobile_visible user_icon"
                                                style="width: auto; height: auto; padding: 14px 0; text-align: left;"
                                                onclick={(e) => {
                                                fn.modals.close(ID)
                                                window.scrollTo({
                                                    top: document.querySelector("#partners").offsetTop - 75,
                                                    behavior: "smooth",
                                                });
                                            }}>
                                                <span class="mobile_user_menu_link" style="position: static;">{Variable.lang.a.partnersForum}</span>
                                            </a>
                                            <a class="user_icon_mobile_visible user_icon"
                                                style="width: auto; height: auto; padding: 14px 0; text-align: left;"
                                                onclick={(e) => {
                                                fn.modals.close(ID)
                                                window.scrollTo({
                                                    top: document.querySelector("#localmap").offsetTop - 75,
                                                    behavior: "smooth",
                                                });
                                            }}>
                                                <span class="mobile_user_menu_link" style="position: static;">{Variable.lang.a.localmap}</span>
                                            </a>
                                        </div>
                                    )
                                }
                            }}
                        </div>
                    </section>
                </div>
            )
        }, ID
    )






};


export default ModalMobileForum;