import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, Variable, sendApi } from '@betarost/cemjs';
import { checkAnswerApi } from '@src/functions.js';
import svg from '@assets/svg/index.js';
import { If } from '@component/helpers/All.js';
import { Avatar } from "@component/element/Avatar.js";


const startView = function () {
    // const lang = getVariable('languages')[getStorage('lang')];
    // const show = getValue('mainHeader', 'show');

    console.log('=b7a7af=', Variable.dataUrl.adress)

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
                        class={`c-userpanel__icon  user_icon c-userpanel__icon--only_mobile_visible ${Variable.dataUrl.adress == "user" ? "user_icon_active" : ""}`}
                        href="/user/"
                    >
                        <img src={svg["profile_icon-1"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.profile}</div>
                    </a>
                    <a
                        data-needauth="true"
                        data-action="link"
                        class={`c-userpanel__icon  user_icon c-userpanel__icon--mobile_visible ${Variable.dataUrl.adress == "lenta-users" ? "user_icon_active" : ""}`}
                        href="/lenta-users/"
                    >
                        <img src={svg.user_news_page} />
                        <div class="c-userpanel__description">{Variable.lang.span.userNews}</div>
                    </a>
                    <a
                        data-needauth="true"
                        data-action="user_cabinet_add"
                        class="c-userpanel__icon  user_icon c-userpanel__icon--mobile_visible"
                    >
                        <img src={svg.plus_in_circle} />
                    </a>
                    <a
                        data-needauth="true"
                        data-action="link"
                        class={`c-userpanel__icon  user_icon c-userpanel__icon--mobile_visible ${Variable.dataUrl.adress == "user/chats" ? "user_icon_active" : ""}`}
                        href="/user/chats/"
                    >
                        <img src={svg["profile_icon-2"]} />
                        <div class="c-userpanel__description">{Variable.lang.a.chats}</div>
                        <div style="display: none;" class="messages_notifications_counter"></div>
                    </a>
                    <a
                        data-needauth="true"
                        data-action="link"
                        class={`c-userpanel__icon ${Variable.dataUrl.adress == "user/awards" ? "user_icon_active" : ""}`}
                        href="/user/awards/"
                    >
                        <img src={svg["profile_icon-4"]} />
                        <div class="user_left_menu_description">{Variable.lang.a.awards}</div>
                    </a>
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