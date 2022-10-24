import {
    jsx,
    jsxFrag,
    init,
    Variable,
    parsingUrl,
    initReload,
} from '@betarost/cemjs'
import svg from "@assets/svg/index.js"

import { If } from '@component/helpers/All.js'
import { siteLink } from '@src/functions.js'
import { Avatar } from '@component/element/Avatar.js';
import { NotifyItem } from '@component/element/NotifyItem.js';

const findUnread = function (arr) {
    let unread = false
    if (arr == undefined) {
        return
    }
    arr.forEach(element => {
        if (!element.read) {
            unread = true
        }
    })
    return unread
};

const mainHeader = async function () {

    let elem = Variable.setRef()
    let notify, currentNotify

    const changeCategory = async function () {
        if (currentNotify[this.dataset.type]) {
            return
        }
        switch (this.dataset.type) {
            case 'question':
                currentNotify = {
                    question: true,
                    awards: false,
                    system: false
                }
                notify = Variable.myInfo.notifyQuestions
                break;
            case 'awards':
                currentNotify = {
                    question: false,
                    awards: true,
                    system: false
                }
                notify = Variable.myInfo.notifyAwards
                break;
            case 'system':
                currentNotify = {
                    question: false,
                    awards: false,
                    system: true
                }
                notify = Variable.myInfo.notifySystem
                break;
        }
        initReload()
    }

    const toggleVisibleNotify = function () {
        Variable.notifyWindowShow = !Variable.notifyWindowShow;
    }

    init(
        async () => {

            notify = Variable.myInfo.notifyQuestions
            //notify = Variable.myInfo.notifyAwards
            //notify = Variable.myInfo.notifySystem
            currentNotify = {
                question: true,
                awards: false,
                system: false
            }
            Variable.langListShow = false;
            Variable.notifyWindowShow = false;
            if (Variable.HeaderShow) {
                Variable.showUserMenu = false
                document.getElementById("mainHeader").classList.remove("c-header--notransform");
            }
            if (Variable.showUserMenu) {
                document.getElementById("mainHeader").classList.add("c-header--notransform");
            }
        },
        () => {

            if (Variable.HeaderShow) {
                return (
                    <div class="c-header__container c-container">
                        <div class="c-header__inner">
                            <div class="c-header__auth">
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
                                    hidden={true}
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
                                <If
                                    data={Variable.auth}
                                    dataIf={
                                        <div class="c-header__wrapper" style="">
                                            <div class="header_avatar_container">
                                                <Avatar author={Variable.myInfo} />
                                            </div>
                                            <div class="auth_user_header">
                                                <div class={`c-header__notifications c-notification ${(findUnread(Variable.notifyQuestions) || findUnread(Variable.notifyAwards) || findUnread(Variable.notifySystem)) ? "c-notification--active" : ""}`}>
                                                    <a class="c-notification__link" onClick={toggleVisibleNotify}></a>
                                                    <div class="c-notification__new"></div>
                                                </div>
                                                {/* <div class="c-header__messages c-messages">
                                                    <a href="/user/chats/" class="c-messages__link" onclick={siteLink}>
                                                        <i class="c-messages__icon"></i>
                                                        <div style="display: none;" class="c-messages__counter"></div>
                                                    </a>
                                                    <div class="c-messages__new"></div>
                                                </div> */}
                                                {/* <i
                                                    class="c-header__burger c-header__burger--noauth"
                                                    onclick={() => {
                                                        Variable.SetModals({ name: "ModalMobileMainSettings", data: {} })
                                                    }}
                                                ></i> */}
                                            </div>
                                            {Variable.auth ?
                                                <div style={`${Variable.notifyWindowShow ? "" : "display: none;"}`} class="user_notifications_block auth_notifications" id="notifications_block">
                                                    <img class="notify_close" src={svg.close} onClick={toggleVisibleNotify} />
                                                    <div class="notifications_title">
                                                        <div class="notifications_titles_line">
                                                            {Variable.lang.text.yourNotification}
                                                            <a data-action="link" href="/user/notify/">{Variable.lang.button.show_all}</a>
                                                        </div>
                                                        <div class="notifications_toggle_block">
                                                            <div data-type='question' onclick={changeCategory} class={currentNotify.question ? 'notifications_toggle_item notifications_toggle_item_active' : 'notifications_toggle_item'}>
                                                                {Variable.lang.text.questions}
                                                            </div>
                                                            <div data-type='awards' onclick={changeCategory} class={currentNotify.awards ? 'notifications_toggle_item notifications_toggle_item_active' : 'notifications_toggle_item'}>
                                                                {Variable.lang.text.awards}
                                                            </div>
                                                            <div data-type='system' onclick={changeCategory} class={currentNotify.system ? 'notifications_toggle_item notifications_toggle_item_active' : 'notifications_toggle_item'}>
                                                                {Variable.lang.text.system}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="notifications_list">
                                                        <div class="notifications_list_inner">
                                                            <div class="notifications_list_part part_questions">
                                                                <NotifyItem
                                                                    data={notify}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div></div>
                                            }

                                        </div>
                                    }
                                    dataElse={
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
                                            <i
                                                class="c-header__burger c-header__burger--noauth"
                                                onclick={() => {
                                                    Variable.SetModals({ name: "ModalMobileMainSettings", data: {} })
                                                }}
                                            ></i>
                                        </div>
                                    }
                                />
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

            } else if (Variable.showUserMenu) {
                return (
                    <div class="c-header__userpanel">
                        <div class="c-userpanel c-userpanel--left">
                            <div class="c-userpanel__icons">
                                <a
                                    class="c-userpanel__icon c-userpanel__icon--logo"
                                    href="/"
                                    onclick={siteLink}>
                                    <img width="45" height="39" src={svg["mini_logo"]} />
                                    <div class="c-userpanel__description">{Variable.lang.a.home}</div>
                                </a>
                                <If
                                    data={Variable.auth}
                                    dataIf={<Avatar author={Variable.myInfo} parent={'c-userpanel__icon--avatar'} />}
                                />
                                <a
                                    class={`c-userpanel__icon c-userpanel__icon--only_mobile_visible ${(Variable.dataUrl.adress == "user" && !Variable.dataUrl.category) ? "c-userpanel__icon--active" : ""}`}
                                    href="/user/"
                                    onclick={siteLink}
                                >
                                    <img src={svg["profile_icon-1"]} />
                                    <div class="c-userpanel__description">{Variable.lang.a.profile}</div>
                                </a>
                                <a
                                    class={`c-userpanel__icon c-userpanel__icon--mobile_visible ${Variable.dataUrl.adress == "lenta-users" ? "c-userpanel__icon--active" : ""}`}
                                    href="/lenta-users/"
                                    onclick={siteLink}
                                >
                                    <img src={svg.user_news_page} />
                                    <div class="c-userpanel__description">{Variable.lang.span.userNews}</div>
                                </a>
                                <a
                                    href="/user/posts/"
                                    onclick={siteLink}
                                    class="c-userpanel__icon c-userpanel__icon--mobile_visible"
                                >
                                    <img src={svg.plus_in_circle} />
                                </a>
                                {/* <a
                                    onclick={siteLink}
                                    class={`c-userpanel__icon c-userpanel__icon--mobile_visible ${(Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "chats") ? "c-userpanel__icon--active" : ""}`}
                                    href="/user/chats/"
                                >
                                    <img src={svg["profile_icon-2"]} />
                                    <div class="c-userpanel__description">{Variable.lang.a.chats}</div>
                                    <div style="display: none;" class="c-userpanel__counter"></div>
                                </a> */}
                                {/* <a
                                    onclick={siteLink}
                                    class={`c-userpanel__icon ${(Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "awards") ? "c-userpanel__icon--active" : ""}`}
                                    href="/user/awards/"
                                >
                                    <img src={svg["profile_icon-4"]} />
                                    <div class="c-userpanel__description">{Variable.lang.a.awards}</div>
                                </a> */}
                                {/* <a
                                    onclick={siteLink}
                                    class={`c-userpanel__icon  ${(Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "quests") ? "c-userpanel__icon--active" : ""}`}
                                    href="/user/quests/"
                                >
                                    <img src={svg["profile_icon-10"]} />
                                    <div class="c-userpanel__description">{Variable.lang.a.tasks}</div>
                                </a> */}
                                <a
                                    href="/user/notify/"
                                    style="margin-bottom: 15px;"
                                    class="c-userpanel__icon c-userpanel__icon--notification c-userpanel__icon--mobile_visible user_panel_notify"
                                    onclick={siteLink}
                                // style="filter: invert(61%) sepia(60%) saturate(485%) hue-rotate(94deg) brightness(94%) contrast(96%);"
                                >
                                    <img
                                        style={`${(findUnread(Variable.notifyQuestions) || findUnread(Variable.notifyAwards) || findUnread(Variable.notifySystem)) ? "filter: invert(61%) sepia(60%) saturate(485%) hue-rotate(94deg) brightness(94%) contrast(96%)" : ""}`}
                                        src={svg.notifications_icon}
                                        width="27"
                                        height="36"
                                    />
                                </a>
                                <a
                                    onclick={siteLink}
                                    class={`c-userpanel__icon  ${(Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "wallet") ? "c-userpanel__icon--active" : ""}`}
                                    href="/user/wallet/"
                                >
                                    <img src={svg.absolutely_new_wallet} />
                                    <div class="c-userpanel__description">{Variable.lang.a.wallet}</div>
                                </a>
                                <a
                                    onclick={siteLink}
                                    class={`c-userpanel__icon  ${(Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "affiliate") ? "c-userpanel__icon--active" : ""}`}
                                    href="/user/affiliate/"
                                >
                                    <img src={svg["profile_icon-3"]} />
                                    <div class="c-userpanel__description">{Variable.lang.a.affiliate}</div>
                                </a>
                                <a
                                    onclick={siteLink}
                                    class={`c-userpanel__icon  ${(Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "settings") ? "c-userpanel__icon--active" : ""}`}
                                    href="/user/settings/"
                                >
                                    <img src={svg["settings_black"]} />
                                </a>
                                {/* <If
                                    data={Variable.auth}
                                    dataIf={<a class="c-userpanel__icon" href="/logout/" onclick={siteLink}>
                                        <img src={svg["exit-icon"]} />
                                        <div class="c-userpanel__description">{Variable.lang.a.exit}</div>
                                    </a>}
                                /> */}
                                <a
                                    onClick={
                                        (e) => {
                                            Variable.SetModals({ name: "ModalMobileSettings", data: {}})
                                            e.stopPropagation();
                                        }
                                    }
                                    id="mobileUserMenuShow"
                                    class="c-userpanel__icon c-userpanel__icon--mobile_visible c-userpanel__icon--burger"
                                >
                                    <img src={svg.user_burger_menu} width="34" height="23" />
                                </a>
                            </div>
                            <div class="c-userpanel__addmodal">
                                <div class="c-userpanel__inner">
                                    <p>{Variable.lang.button.create}</p>
                                    <a class="c-userpanel__link" onclick={siteLink} href="/user/posts/">
                                        <img src={svg["profile_icon-5"]} />
                                        {Variable.lang.h.createPost}
                                    </a>
                                </div>
                                <div data-action="user_cabinet_add_close" class="c-userpanel__close">
                                    <img src={svg.close} />
                                </div>
                            </div>
                        </div>

                        <div class="c-userpanel c-userpanel--right">
                            <div class="c-userpanel__icons">
                                <a onclick={siteLink} class="c-userpanel__icon" href="/users/">
                                    <img src={svg["profile_icon-1"]} />
                                    <div class="c-userpanel__description">{Variable.lang.a.experts}</div>
                                </a>
                                <a onclick={siteLink} class="c-userpanel__icon" href="/question/">
                                    <img src={svg["user_mobile_answers_and_questions"]} />
                                    <div class="c-userpanel__description">{Variable.lang.a.questionsAnswers}</div>
                                </a>
                            </div>
                        </div>
                    </div >
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