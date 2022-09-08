import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import { checkAnswerApi } from '@src/functions.js';
import images from '@assets/images/index.js';
import { BlockUserPreview } from '@component/blocks/user/BlockUserPreview.js';

const startView = function () {
    const lang = getVariable('languages')[getStorage('lang')];
    const show = getValue('mainHeader', 'show');
    const myInfo = getStorage('myInfo');
    const userInfo = getValue(ID, 'userInfoProfile');

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


        const userInfo = checkAnswerApi(await sendApi.create("getUsers", {
            "filter": {
                "nickname": dataUrl.params
            },
            "select": {
                "_id": 1,
                "subscribe": 1,
                "fullname": 1,
                "nickname": 1,
                "information": 1,
                "avatar.name": 1,
                "frame.name": 1,
                "background.name": 1,
                "statistic": 1,
                "online": 1,
                "awards": 1,
                "email": 1,
                "country": 1,
                "rank": 1,
                "status": 1,
                "startDelete": 1
            },
            "limit": 1
        }))

        if (userInfo && userInfo.list_records && userInfo.list_records[0]) {
            setValue(ID, 'userInfoProfile', userInfo.list_records[0]);
        } else {
            setValue(ID, 'userInfoProfile', {});
        }
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