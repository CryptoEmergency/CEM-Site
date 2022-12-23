import {
    jsx,
    jsxFrag,
    Variable,
    sendApi,
    initReload
} from "@betarost/cemjs";
import { fn } from "@src/functions/index.js";
import svg from '@assets/svg/index.js';
const findUnread = function (arr, title = false) {
    let unread = false
    if (!arr || !arr.length) { return false }
    if (title) {
        arr.forEach(element => {
            if (!element.read) { unread = title }
        })
    } else {
        arr.forEach(element => {
            if (!element.read) { unread = true }
        })
    }
    return unread
};

const BottomMenu = function () {

 //   console.log('=b85f6c=', Variable.dataUrl)
    return (
        <div class="c-userpanel c-userpanel--bottom">
            <div class="c-userpanel__icons">
                <a
                    href="/"
                    class="c-userpanel__icon c-userpanel__icon--logo c-userpanel__icon--mobile_visible"
                    onclick={fn.siteLink}>
                </a>
                <a
                    href="/lenta-users/"
                    class={["c-userpanel__icon c-userpanel__icon--lenta c-userpanel__icon--mobile_visible", Variable.dataUrl.adress == "lenta-users" ? "c-userpanel__icon--active" : null]}
                    onclick={fn.siteLink}>

                </a>
                {
                    Variable.auth
                        ?
                        <a
                            href="/user/chats/"
                            class={["c-userpanel__icon c-userpanel__icon--chats c-userpanel__icon--mobile_visible", (Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "chats") ? "c-userpanel__icon--active" : null]}
                            onclick={fn.siteLink}>
                            <i></i>
                            {Variable.myInfo && Variable.myInfo.unreadMessage ? <div class="messages_notifications_counter">{Variable.myInfo.unreadMessage}</div> : null}
                        </a>
                        :
                        <a
                            href="/blog/"
                            class={["c-userpanel__icon c-userpanel__icon--blog c-userpanel__icon--mobile_visible", (Variable.dataUrl.adress == "blog" && !Variable.dataUrl.category) ? "c-userpanel__icon--active" : null]}
                            onclick={fn.siteLink}>

                        </a>
                }
                <a
                    href="/user/posts/"
                    class={["c-userpanel__icon c-userpanel__icon--posts c-userpanel__icon--mobile_visible",(Variable.dataUrl.category == "posts") ? "c-userpanel__icon--active" : null]}
                    onclick={(e) => {
                        if (Variable.auth) {
                            fn.siteLink(e)
                        } else {
                            fn.modals.ModalAuth()
                        }
                    }}>
                </a>
                <a
                    href="/question/"
                    class={["c-userpanel__icon c-userpanel__icon--questions c-userpanel__icon--mobile_visible", (Variable.dataUrl.adress == "question") ? "c-userpanel__icon--active" : null]}
                    onclick={fn.siteLink}>
                </a>
                {
                    Variable.auth
                        ?
                        <div class={[
                            "c-notification",
                            (findUnread(Variable.myInfo.notifyQuestions) || findUnread(Variable.myInfo.notifyAwards) || findUnread(Variable.myInfo.notifySystem)) ? "c-notification--active" : null
                        ]}>
                            <a
                                class="c-userpanel__icon c-userpanel__icon--notify c-userpanel__icon--mobile_visible c-notification__link"
                                onClick={async function (e) {
                                    e.stopPropagation();
                                   // console.log('=4c896c=', Variable)
                                    let data = {
                                        value: {
                                            readNotify: findUnread(Variable.myInfo.notifyQuestions, 'questions')
                                                ||
                                                findUnread(Variable.myInfo.notifyAwards, 'awards')
                                                ||
                                                findUnread(Variable.myInfo.notifySystem, 'system')
                                        }
                                    }

                                    let tmpRes = await sendApi.create("setUsers", data);
                                 //   console.log('=e19671=', data, tmpRes)
                                    if (tmpRes.status === 'ok') {
                                        fn.modals.ModalNotify();
                                        initReload()
                                    } else {
                                        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true);
                                    }
                                }}>
                            </a>
                            <div class="c-notification__new"></div>
                        </div>
                        :
                        <a
                            href="/news/"
                            class={["c-userpanel__icon c-userpanel__icon--news c-userpanel__icon--mobile_visible", (Variable.dataUrl.adress == "news") ? "c-userpanel__icon--active" : null]}
                            onclick={fn.siteLink}>
                        </a>
                }
                <a
                    class="c-userpanel__icon c-userpanel__icon--burger c-userpanel__icon--mobile_visible"
                    onClick={(e) => { e.stopPropagation(); fn.modals.ModalMobileMainSettings(); }}>
                </a>
            </div>
            {/* <div class="c-userpanel__addmodal">
                <div class="c-userpanel__inner">
                    <p>{Variable.lang.button.create}</p>
                    <a class="c-userpanel__link" onclick={fn.siteLink} href="/user/posts/">
                        <img src={svg["profile_icon-5"]} />
                        {Variable.lang.h.createPost}
                    </a>
                </div>
                <div data-action="user_cabinet_add_close" class="c-userpanel__close">
                    <img src={svg.close} />
                </div>
            </div> */}
            <div
                id="toTop"
                Element={($el) => { Variable.Static.elArrowTop = $el }}
                onclick={() => {
                    if (!Variable.ModalsPage.length) {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    } else {
                        Variable.ModalsPage[Variable.ModalsPage.length - 1].el.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }
                    Variable.Static.elArrowTop.style.display = "none"
                    clearTimeout(Variable.Static.elArrowTopLink);
                }}
            >
                <img src={svg.arrowTop} />
            </div>
        </div >
    )
};
export { BottomMenu };
// OK