import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';

const BlockUserPreview = function ({ lang, myInfo, userInfo }) {
    const gg = '<p>gdfkjgkdljfg<a class="c-footer__link" href="/about/"><span>{lang.a.about}</span></a></p>'
    const tt = (`{${gg}}`)
    return (
        <div class="user_main">
            <div class="user_background" style={{ background: 'red' }}>
                <div class="big_user_avatar" data-action="fullSizeAvatar">
                    <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src={userInfo.avatar ?
                        `/assets/upload/avatar/${userInfo.avatar.name}` :
                        images["profile/avatar/default"]} />
                    <img style="position: absolute; top: 0;left: 0;z-index: 2; height: 100%;width: " src={svg[`profile/frame/${userInfo.frame ? userInfo.frame.name.split(".")[0] : 'default'}`]} />
                </div>
                <img id="currentUserBackground" src={images["profile/background/big_background_2"]} />
            </div>

            <pre>
                {tt}
            </pre>
        </div>
    )
}

export { BlockUserPreview };