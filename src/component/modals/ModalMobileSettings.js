import {
    jsx,
    jsxFrag,
    initOne,
    setValue,
    Variable,
    getValue,
    initReload,
    sendApi
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';
import { Avatar } from "@component/element/index.js";


const ModalMobileSettings = function ({ }, reload) {
    initOne(
        () => {
        }
    )
    return (
        <div class="c-modal c-modal--open c-modal--fullscreen" id="ModalMobileSettings">
            <div class="c-modal__dialog">
                <div class="c-modal__content">
                    <header class="c-modal__header">
                        <div class="c-modal__title">
                            {/* {{>avatar myInfo}} */}
                            <Avatar author={Variable.myInfo} />
                            <If
                                data={Variable.myInfo.nickname}
                                dataIf={
                                    <div class="user_mobile_menu_title">
                                        {Variable.myInfo.nickname}
                                    </div>
                                }
                                dataElse={
                                    <div class="user_mobile_menu_title">
                                        {Variable.myInfo._id}
                                    </div>
                                }
                            />
                            <div class="user_mobile_status">
                                <span>{Variable.lang.span.status}</span>
                                <div class="user_mobile_status_icon"></div>
                                <span>{Variable.lang.span.online}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            class="c-modal__close"
                            onclick={() => {
                                Variable.DelModals("ModalMobileSettings")
                            }}
                        ></button>
                    </header>
                    <div class="c-modal__body">
                        <div class="user_mobile_menu_part">
                            <div class="user_mobile_menu_content">
                                {Variable.lang.text.sections}
                            </div>
                        </div>
                        <div class="user_mobile_menu_content user_mobile_menu_main_content">
                            <a
                                class={["user_icon_mobile_visible", "user_icon", Variable.pageUrl == "user/news" ? "user_icon_active" : null]}
                                href="/user/news/"
                            >
                                <img src={svg.user_news_page} />
                                <span class="mobile_user_menu_link">{Variable.lang.a.news}</span>
                            </a>
                            <a
                                class={["user_icon_mobile_visible", "user_icon", Variable.pageUrl == "/chats" ? "user_icon_active" : null]}
                                href="#"
                            >
                                <img src={svg["profile_icon-2"]} />
                                <span class="mobile_user_menu_link">{Variable.lang.a.chats}</span>
                            </a>
                            <a
                                class={["user_icon_mobile_visible", "user_icon", Variable.pageUrl == "/posts" ? "user_icon_active" : null]}
                                href="/user/posts/"
                            >
                                <img src={svg["profile_icon-5"]} />
                                <span class="mobile_user_menu_link">{Variable.lang.a.blog}</span>
                            </a>
                            <a
                                class={["user_icon_mobile_visible", "user_icon", Variable.pageUrl == "/awards" ? "user_icon_active" : null]}
                                href="/user/awards/"
                            >
                                <img src={svg["profile_icon-4"]} />
                                <span class="mobile_user_menu_link">{Variable.lang.a.awards}</span>
                            </a>
                            <a
                                class={["user_icon_mobile_visible", "user_icon", Variable.pageUrl == "/quests" ? "user_icon_active" : null]}
                                href="/user/quests/"
                            >
                                <img src={svg["profile_icon-10"]} />
                                <span class="mobile_user_menu_link">{Variable.lang.a.tasks}</span>
                            </a>
                            <a
                                class={["user_icon_mobile_visible", "user_icon", Variable.pageUrl == "/wallet" ? "user_icon_active" : null]}
                                href="/user/wallet/"
                            >
                                <img src={svg.just_new_wallet} />
                                <span class="mobile_user_menu_link">{Variable.lang.a.wallet}</span>
                            </a>
                            <a
                                class={["user_icon_mobile_visible", "user_icon", Variable.pageUrl == "/affiliate" ? "user_icon_active" : null]}
                                href="/user/affiliate/"
                            >
                                <img src={svg["profile_icon-3"]} />
                                <span class="mobile_user_menu_link">{Variable.lang.a.affiliate}</span>
                            </a>
                        </div>
                        <div class="user_mobile_menu_part">
                            <div class="user_mobile_menu_content">
                                {Variable.lang.text.control}
                            </div>
                        </div>
                        <div class="user_mobile_menu_bottom">
                            <div class="user_mobile_menu_content">
                                <a class="user_icon_mobile_visible user_icon" href="/logout/" data-action="link">
                                    <img src={svg["exit-icon"]} />
                                    <span class="mobile_user_menu_link">{Variable.lang.a.exit}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalMobileSettings;