import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import { getuserInfoProfile } from '@src/apiFunctions.js';
import images from '@assets/images/index.js';
import { BlockUserPreview } from '@component/blocks/user/BlockUserPreview.js';

const startView = function () {
    const lang = getVariable('languages')[getStorage('lang')];
    const show = getValue('mainHeader', 'show');
    const myInfo = getStorage('myInfo');
    const userInfo = getValue(ID, 'userInfoProfile');
    console.log("userInfo", userInfo);
    //const userInfo = getValue('ID', 'userInfoProfile');
    return (
        <div class={show && 'c-main__body' || 'c-main__body--noheader'}>
            <BlockUserPreview
                myInfo={myInfo}
                lang={lang}
                userInfo={userInfo}
            />
        </div>
    )
}

const ID = 'mainBlock'

const defaultInit = async function () {
    setValue('mainHeader', 'show', false);
    setValue('mainHeader', 'showUserMenu', false);
    setValue('mainFooter', 'show', true);
    const dataUrl = getVariable('dataUrl')
    const myInfo = getStorage('myInfo');

    if (!dataUrl.params || myInfo.nickname == dataUrl.params) {
        setValue(ID, 'userInfoProfile', myInfo);
    } else {
        setValue(ID, 'userInfoProfile', await getuserInfoProfile(dataUrl.params));
    }
}

const afterInit = async function () {
}

const init = async function (reload) {
    if (!reload) { await defaultInit(); }
    await makeDOM(startView(), ID);
    if (!reload) { await afterInit(); }
}

export default init;