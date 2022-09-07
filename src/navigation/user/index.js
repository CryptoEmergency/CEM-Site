import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import { checkAnswerApi } from '@src/functions.js';


const startView = function () {
    const lang = getVariable('languages')[getStorage('lang')];
    const show = getValue('mainHeader', 'show');

    return (
        <div class={show && 'c-main__body' || 'c-main__body--noheader'}>
            gfgfg
        </div>
    )
}

const ID = 'mainBlock'

const defaultInit = function () {
    setValue('mainHeader', 'show', false);
    setValue('mainHeader', 'showUserMenu', false);
    setValue('mainFooter', 'show', true);

}

const afterInit = function () {
}

const init = async function (reload) {
    if (!reload) { defaultInit(); }
    await makeDOM(startView(), ID);
    if (!reload) { afterInit(); }
}

export default init;