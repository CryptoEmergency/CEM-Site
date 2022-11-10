import {
    jsx,
    jsxFrag,
    Helpers,
    Variable
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { If } from "@component/helpers/All.js";

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

const BottomMenu = function () {

    const toggleVisibleNotify = function () {
        Variable.notifyWindowShow = !Variable.notifyWindowShow;
    }
    console.log('=b084b4=', Variable.dataUrl)
    return (

        <If
            data={Variable.auth}
            dataIf={
                <div class="c-userpanel c-userpanel--bottom">
                    <div class="c-userpanel__icons">
                        <a
                            class="c-userpanel__icon c-userpanel__icon--logo c-userpanel__icon--mobile_visible"
                            href="/"
                            onclick={Helpers.siteLink}>
                            {/* <img src={svg["mini_logo"]} width="31" height="27" /> */}
                        </a>
                        <a
                            class={`c-userpanel__icon c-userpanel__icon--lenta c-userpanel__icon--mobile_visible ${Variable.dataUrl.adress == "lenta-users" ? "c-userpanel__icon--active" : ""}`}
                            href="/lenta-users/"
                            onclick={Helpers.siteLink}
                        ></a>
                        <a
                            class={`c-userpanel__icon c-userpanel__icon--chats c-userpanel__icon--disabled c-userpanel__icon--mobile_visible ${(Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "chats") ? "c-userpanel__icon--active" : ""}`}
                            //c-userpanel__icon--disabled
                            href="/user/chats/"
                            onclick={Helpers.siteLink}
                        >
                            {() => {
                                if (Variable.myInfo && Variable.myInfo.unreadMessage) {
                                    return (<div class="messages_notifications_counter">{Variable.myInfo.unreadMessage}</div>)
                                }
                            }}

                        </a>

                        <a
                            href="/user/posts/"
                            onclick={Helpers.siteLink}
                            class="c-userpanel__icon c-userpanel__icon--posts c-userpanel__icon--mobile_visible"
                        ></a>
                        <a
                            onclick={Helpers.siteLink}
                            class={`c-userpanel__icon c-userpanel__icon--questions c-userpanel__icon--mobile_visible ${(Variable.dataUrl.adress == "question") ? "c-userpanel__icon--active" : ""}`}
                            href="/question/"
                        ></a>
                        {/* <a
                        onclick={Helpers.siteLink}
                        class={`c-userpanel__icon c-userpanel__icon--mobile_visible ${(Variable.dataUrl.adress == "news") ? "c-userpanel__icon--active" : ""}`}
                        href="/news/"
                    >
                        <img src={svg.news_menu_icon1} width="42" height="39" />
                    </a> */}

                        {/* <a
                        href="/user/notify/"
                        style="margin-bottom: 15px;"
                        class={`c-userpanel__icon c-userpanel__icon--notification c-userpanel__icon--mobile_visible ${(Variable.dataUrl.adress == "notify") ? "c-userpanel__icon--active" : ""}`}
                        onclick={Helpers.siteLink}
                    >
                        <img
                            style={`${(findUnread(Variable.notifyQuestions) || findUnread(Variable.notifyAwards) || findUnread(Variable.notifySystem)) ? "filter: invert(61%) sepia(60%) saturate(485%) hue-rotate(94deg) brightness(94%) contrast(96%)" : ""}`}
                            src={svg.notifications_icon}
                            width="27"
                            height="36"
                        />
                    </a> */}

                        <div class={`c-notification ${(findUnread(Variable.notifyQuestions) || findUnread(Variable.notifyAwards) || findUnread(Variable.notifySystem)) ? "c-notification--active" : ""}`}>
                            <a
                                class="c-userpanel__icon c-userpanel__icon--notify c-userpanel__icon--mobile_visible c-notification__link"
                                // onClick={toggleVisibleNotify}
                                onClick={
                                    (e) => {
                                        Variable.SetModals({ name: "ModalNotify", data: {} })
                                        e.stopPropagation();
                                    }
                                }
                            ></a>
                            <div class="c-notification__new"></div>
                        </div>

                        <a
                            onClick={
                                (e) => {
                                    Variable.SetModals({ name: "ModalMobileMainSettings", data: {} })
                                    e.stopPropagation();
                                }
                            }
                            class="c-userpanel__icon c-userpanel__icon--burger c-userpanel__icon--mobile_visible"
                        ></a>
                    </div>
                    <div class="c-userpanel__addmodal">
                        <div class="c-userpanel__inner">
                            <p>{Variable.lang.button.create}</p>
                            <a class="c-userpanel__link" onclick={Helpers.siteLink} href="/user/posts/">
                                <img src={svg["profile_icon-5"]} />
                                {Variable.lang.h.createPost}
                            </a>
                        </div>
                        <div data-action="user_cabinet_add_close" class="c-userpanel__close">
                            <img src={svg.close} />
                        </div>
                    </div>
                </div>
            }
            dataElse={
                <div class="c-userpanel c-userpanel--bottom">
                    <div class="c-userpanel__icons">
                        <a
                            class="c-userpanel__icon c-userpanel__icon--logo c-userpanel__icon--mobile_visible"
                            href="/"
                            onclick={Helpers.siteLink}>
                            {/* <img src={svg["mini_logo"]} /> */}
                        </a>
                        <a
                            class={`c-userpanel__icon c-userpanel__icon--lenta c-userpanel__icon--mobile_visible ${Variable.dataUrl.adress == "lenta-users" ? "c-userpanel__icon--active" : ""}`}
                            href="/lenta-users/"
                            onclick={Helpers.siteLink}
                        ></a>
                        <a
                            class={`c-userpanel__icon c-userpanel__icon--blog c-userpanel__icon--mobile_visible ${(Variable.dataUrl.adress == "blog" && !Variable.dataUrl.category) ? "c-userpanel__icon--active" : ""}`}
                            href="/blog/"
                            onclick={Helpers.siteLink}
                        ></a>

                        <a
                            onclick={(e) => {
                                Variable.SetModals({ name: "ModalAuth", data: {} })
                                e.stopPropagation();
                            }}
                            class="c-userpanel__icon c-userpanel__icon--posts c-userpanel__icon--mobile_visible"
                        ></a>
                        <a
                            onclick={Helpers.siteLink}
                            class={`c-userpanel__icon c-userpanel__icon--questions c-userpanel__icon--mobile_visible ${(Variable.dataUrl.adress == "question") ? "c-userpanel__icon--active" : ""}`}
                            href="/question/"
                        ></a>
                        <a
                            onclick={Helpers.siteLink}
                            class={`c-userpanel__icon c-userpanel__icon--news c-userpanel__icon--mobile_visible ${(Variable.dataUrl.adress == "news") ? "c-userpanel__icon--active" : ""}`}
                            href="/news/"
                        ></a>

                        <a
                            onClick={
                                (e) => {
                                    Variable.SetModals({ name: "ModalMobileMainSettings", data: {} })
                                    e.stopPropagation();
                                }
                            }
                            class="c-userpanel__icon c-userpanel__icon--burger c-userpanel__icon--mobile_visible"
                        ></a>
                    </div>
                    <div class="c-userpanel__addmodal">
                        <div class="c-userpanel__inner">
                            <p>{Variable.lang.button.create}</p>
                            <a class="c-userpanel__link" onclick={Helpers.siteLink} href="/user/posts/">
                                <img src={svg["profile_icon-5"]} />
                                {Variable.lang.h.createPost}
                            </a>
                        </div>
                        <div data-action="user_cabinet_add_close" class="c-userpanel__close">
                            <img src={svg.close} />
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export { BottomMenu };