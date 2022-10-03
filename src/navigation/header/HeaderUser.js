import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, Variable, sendApi } from '@betarost/cemjs';
import { checkAnswerApi } from '@src/functions.js';
import svg from '@assets/svg/index.js';
import { If } from '@component/helpers/All.js';
import { Avatar } from "@component/element/Avatar.js";

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

const startView = function () {

    return (
        <div class="c-header__userpanel">
            <div class="c-userpanel c-userpanel--left">
                <div class="c-userpanel__icons">
                    <a data-action="link" class="c-userpanel__icon c-userpanel__icon--logo" href="/">
                        <img width="45" height="39" src={svg["mini_logo"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.home}</div>
                    </a>
                    <If
                        data={Variable.auth}
                        dataIf={<Avatar author={Variable.myInfo} parent={'c-userpanel__icon--avatar'} />}
                    />
                    <a
                        data-needauth="true"
                        data-action="link"
                        class={`c-userpanel__icon c-userpanel__icon--only_mobile_visible ${Variable.dataUrl.adress == "user" ? "c-userpanel__icon--active" : ""}`}
                        href="/user/"
                    >
                        <img src={svg["profile_icon-1"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.profile}</div>
                    </a>
                    <a
                        data-needauth="true"
                        data-action="link"
                        class={`c-userpanel__icon c-userpanel__icon--mobile_visible ${Variable.dataUrl.adress == "lenta-users" ? "c-userpanel__icon--active" : ""}`}
                        href="/lenta-users/"
                    >
                        <img src={svg.user_news_page} />
                        <div class="c-userpanel__description">{Variable.lang.span.userNews}</div>
                    </a>
                    <a
                        data-needauth="true"
                        data-action="user_cabinet_add"
                        class="c-userpanel__icon c-userpanel__icon--mobile_visible"
                    >
                        <img src={svg.plus_in_circle} />
                    </a>
                    <a
                        data-needauth="true"
                        data-action="link"
                        class={`c-userpanel__icon c-userpanel__icon--mobile_visible ${Variable.dataUrl.adress == "user/chats" ? "c-userpanel__icon--active" : ""}`}
                        href="/user/chats/"
                    >
                        <img src={svg["profile_icon-2"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.chats}</div>
                        <div style="display: none;" class="c-userpanel__counter"></div>
                    </a>
                    <a
                        data-needauth="true"
                        data-action="link"
                        class={`c-userpanel__icon ${Variable.dataUrl.adress == "user/awards" ? "c-userpanel__icon--active" : ""}`}
                        href="/user/awards/"
                    >
                        <img src={svg["profile_icon-4"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.awards}</div>
                    </a>
                    <a
                        data-needauth="true"
                        data-updating="true"
                        data-action="link"
                        class={`c-userpanel__icon  ${Variable.dataUrl.adress == "user/quests" ? "c-userpanel__icon--active" : ""}`}
                        href="/user/quests/"
                    >
                        <img src={svg["profile_icon-10"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.tasks}</div>
                    </a>
                    <a
                        style="margin-bottom: 15px;"
                        class="c-userpanel__icon c-userpanel__icon--notification c-userpanel__icon--mobile_visible user_panel_notify"
                        data-action="notifyAction"
                    >
                        <img
                            style={`${(findUnread(Variable.notifyQuestions) || findUnread(Variable.notifyAwards) || findUnread(Variable.notifySystem)) ? "filter: invert(61%) sepia(60%) saturate(485%) hue-rotate(94deg) brightness(94%) contrast(96%)" : ""}`}
                            src={svg.notifications_icon}
                        />
                    </a>
                    <a
                        data-needauth="true"
                        data-action="link"
                        class={`c-userpanel__icon  ${Variable.dataUrl.adress == "user/wallet" ? "c-userpanel__icon--active" : ""}`}
                        href="/user/wallet/"
                    >
                        <img src={svg.absolutely_new_wallet} />
                        <div class="c-userpanel__description">{Variable.lang.a.wallet}</div>
                    </a>
                    <a
                        data-needauth="true"
                        data-action="link"
                        class={`c-userpanel__icon  ${Variable.dataUrl.adress == "user/affiliate" ? "c-userpanel__icon--active" : ""}`}
                        href="/user/affiliate/"
                    >
                        <img src={svg["profile_icon-3"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.affiliate}</div>
                    </a>
                    <If
                        data={Variable.auth}
                        dataIf={<a class="c-userpanel__icon" href="/logout/" data-action="link">
                            <img src={svg["exit-icon"]} />
                            <div class="c-userpanel__description">{Variable.lang.a.exit}</div>
                        </a>}
                    />
                    <a
                        id="mobileUserMenuShow"
                        class="c-userpanel__icon c-userpanel__icon--mobile_visible c-userpanel__icon--burger"
                    >
                        <img src={svg.user_burger_menu} />
                    </a>
                </div>
                <div class="c-userpanel__addmodal">
                    <div class="c-userpanel__inner">
                        <p>{Variable.lang.button.create}</p>
                        <a class="c-userpanel__link" data-action="link" href="/user/posts/">
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
                    <a data-action="link" class="c-userpanel__icon" href="/users/">
                        <img src={svg["profile_icon-1"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.experts}</div>
                    </a>
                    <a data-updating="true" data-action="link" class="c-userpanel__icon" href="/question/">
                        <img src={svg["user_mobile_answers_and_questions"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.questionsAnswers}</div>
                    </a>
                </div>
            </div>
        </div >
    )
}

const ID = 'mainHeader'

const defaultInit = function () {

}

const afterInit = function () {
}

const init = async function (reload) {
    if (!reload) { defaultInit(); }
    await makeDOM(startView(), ID);
    if (!reload) { afterInit(); }
}

export default init;