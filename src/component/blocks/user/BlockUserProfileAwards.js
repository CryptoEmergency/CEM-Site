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
import { getDateFormat } from '@src/functions.js'
import { Avatar } from '@component/element/Avatar.js';
import { If } from '@component/helpers/All.js'

const BlockUserProfileAwards = function ({ lang, myInfo, userInfo, data, haveFilter=false }) {
    const ListAwards = Object.keys(userInfo.awards).map(function (key) {
        return (
            <div class="award">
                    <img src={svg[userInfo.awards[key].icon]} class="awards_small_badge" />
                    <img src={svg[userInfo.awards[key].icon]} class="awards_badge" />
                    <div class="award_description">
                        <p class="awards_title">{lang.awards[userInfo.awards[key].name]}</p>
                        <p class="awards_text">{lang.awards[userInfo.awards[key].description] }</p>   
                        <p class="progress_bar_label">{lang.p.receive}</p> 
                        <p class="progress_bar_label">{getDateFormat(userInfo.awards[key].dateCreate)}</p>           
                    </div>
                </div>
        )
    })

    return (
        <div data-touchmove="userProfileSlide" data-touchstart="userProfileSlideStart" data-touchend="userProfileSlideEnd" class="bl_one" id="UserInfoAwards">
            <h2>{lang.h.reciveAwards}</h2>
                <div class="awards_block">
                    <div class="awards_body">
                        {ListAwards}
                    </div>
                </div>
        </div>
    )
}

export { BlockUserProfileAwards };