import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import { checkAnswerApi } from '@src/functions.js';
import images from '@assets/images/index.js';


const startView = function () {
    const lang = getVariable('languages')[getStorage('lang')];
    const show = getValue('mainHeader', 'show');
    const myInfo = getStorage(myInfo);
    //const userInfo = getValue('ID', 'userInfoProfile');
    return (
        <div class={show && 'c-main__body' || 'c-main__body--noheader'}>
            <div class="user_main" style="background:linear-gradient(45deg,#F5FCFF 0,#B8C3C6 20%,#F5FCFF 40%,#B8C3C6 60%,#F5FCFF 80%,#B8C3C6 100%)">
                <div class="user_background">
                    <div class="big_user_avatar" data-action="fullSizeAvatar">
                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src={images["profile/avatar/default"]} />
                    </div>
                    <img id="currentUserBackground" src={images["profile/background/big_background_2"]} />
                </div>
            </div>
        </div>
    )
}

const ID = 'mainBlock'

const defaultInit = async function () {
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