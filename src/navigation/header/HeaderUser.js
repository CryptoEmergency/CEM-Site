import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import { checkAnswerApi } from '@src/functions.js';
import svg from '@assets/svg/index.js';


const startView = function () {
    const lang = getVariable('languages')[getStorage('lang')];
    const show = getValue('mainHeader', 'show');

    return (
        <div class="userpanelheader">
            <div class="user-left-panel">
                <div class="left_panel_icons">
                    <a data-action="link" class="user_main_page_logo" href="/">
                        <img src={svg["mini_logo"]} />
                        <div class="user_left_menu_description">{lang.a.home}</div></a>
                </div>
            </div>

            <div class="right_panel_icons">
                <a data-action="link" class="user_icon" href="/users/">
                    <img src={svg["profile_icon-1"]} /><div class="user_right_menu_description">{lang.a.experts}</div></a>
                <a data-updating="true" data-action="link" class="user_icon" href="/question/"><img src={svg["user_mobile_answers_and_questions"]} /><div class="user_right_menu_description">{lang.a.questionsAnswers}</div></a>
            </div>
        </div>
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