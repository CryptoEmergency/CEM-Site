import {
    jsx,
    jsxFrag,
    Variable,
    stringToHtml
} from '@betarost/cemjs';
import { ProfileAboutMe } from '@component/element/user/ProfileAboutMe.js';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { numberFixWithSpaces } from '@src/functions.js';
import { If } from '@component/helpers/All.js'

const BlockUserProfileAbout = function ({ lang, myInfo, userInfo, data }) {

    //userInfo.information.about = "test"
    let tmp = '<p class="gggg"><span>fhhhfhf</span></p>'
    return (


        <div data-touchmove="userProfileSlide" data-touchstart="userProfileSlideStart" data-touchend="userProfileSlideEnd" class="bl_one overflowNo" id="UserInfoAbout">
            <h2>{lang.h.personalInfo}</h2>
            <div class="about_user">
                <div class="about_user_section-1 about_user_section-row_type-2">
                    <div class="about_user_section-row_type-3">
                        <div class="about_user_section">
                            <div class="about_user_section_inner">
                                <p>{lang.p.aboutMe}</p>
                                <If
                                    data={userInfo.information.about}
                                    dataIf={
                                        <span class="about_me_block">{userInfo.information.about}</span>
                                    }
                                    dataElse={
                                        stringToHtml(tmp)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export { BlockUserProfileAbout };