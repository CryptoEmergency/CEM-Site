import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';

import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const ProfileAboutMe = function ({ lang, myInfo, userInfo, data }) {


    return (
        <div class="about_user_section-1 about_user_section-row_type-2">
            <div class="about_user_section-row_type-3">
                <div class="about_user_section">
                    <div class="about_user_section_inner">
                        <p>{lang.p.aboutMe}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProfileAboutMe }