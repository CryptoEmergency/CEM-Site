import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import {
    getUserInfoProfile,
    getUserAboutProfile
} from '@src/apiFunctions.js';
import images from '@assets/images/index.js';
import { BlockUserPreview } from '@component/blocks/user/BlockUserPreview.js';
import {
    BlockUserProfileAbout

} from '@component/blocks/user/BlockUserProfileAbout.js';
import { ProfileTabsMenu } from '@component/element/user/ProfileTabsMenu.js';

const tabs = async function (tabType, lang, myInfo, userInfo) {
    if (tabType == "aboutUser") {
        const data = await getUserAboutProfile(userInfo.nickname);
        return BlockUserProfileAbout({ lang, myInfo, userInfo, data })
    }
}


const startView = async function () {
    const lang = getVariable('languages')[getStorage('lang')];
    const show = getValue('mainHeader', 'show');
    const myInfo = getStorage('myInfo');
    const userInfo = getValue(ID, 'userInfoProfile');
    const tabType = getValue(ID, 'userProfileActiveTab');

    const dataShow = await tabs(tabType, lang, myInfo, userInfo)

    console.log('=537f26=', tabType, dataShow)

    return (
        <div class={show && 'c-main__body' || 'c-main__body--noheader'}>
            <BlockUserPreview
                myInfo={myInfo}
                lang={lang}
                userInfo={userInfo}
            />
            <ProfileTabsMenu
                myInfo={myInfo}
                lang={lang}
                userInfo={userInfo}
                tabType={tabType}
            />
            <div class="userMainBlock">
                {dataShow}
            </div>
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
        setValue(ID, 'userProfileActiveTab', 'lentaFriends');
    } else {
        setValue(ID, 'userInfoProfile', await getUserInfoProfile(dataUrl.params));
        //  setValue(ID, 'userProfileActiveTab', 'lentaUser');
        setValue(ID, 'userProfileActiveTab', 'aboutUser');
    }
}

const afterInit = async function () {
}

const init = async function (reload) {
    if (!reload) { await defaultInit(); }
    await makeDOM(await startView(), ID);
    if (!reload) { await afterInit(); }
}

export default init;