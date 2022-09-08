import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';

const BlockUserPreview = function ({ lang, myInfo, userInfo }) {


    return (
        <div class="user_main">
            <div class="user_background" style={{ background: 'red' }}>
                <div class="big_user_avatar" data-action="fullSizeAvatar">
                    <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src={userInfo.avatar ?
                        `/assets/upload/avatar/${userInfo.avatar.name}` :
                        images["profile/avatar/default"]} />
                    <img style="position: absolute; top: 0;left: 0;z-index: 2; height: 100%;width: "
                        src={userInfo.frame ? images[`profile/frame/${userInfo.frame.name.split(".")[0]}`] : svg["profile/frame/default"]}
                    />
                </div>
                <img id="currentUserBackground" src={images["profile/background/big_background_2"]} />
            </div>

        </div>
    )
}

export { BlockUserPreview };