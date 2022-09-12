import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import { ProfileAboutMe } from '@component/element/user/ProfileAboutMe.js';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { numberFixWithSpaces } from '@src/functions.js';


const BlockUserProfileAbout = function ({ lang, myInfo, userInfo, data }) {


    return (


        <div data-touchmove="userProfileSlide" data-touchstart="userProfileSlideStart" data-touchend="userProfileSlideEnd" class="bl_one overflowNo" id="UserInfoAbout">
            <h2>{lang.h.personalInfo}</h2>
            <div class="about_user">
                <ProfileAboutMe
                    myInfo={myInfo}
                    lang={lang}
                    userInfo={userInfo}
                    data={data}
                />
            </div>
        </div>

    )
}

export { BlockUserProfileAbout };