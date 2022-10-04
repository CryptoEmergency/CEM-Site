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
import { If } from '@component/helpers/All.js'

const BlockUserProfileQuestions = function ({ lang, myInfo, userInfo, data }) {
    const ListInterests = Object.keys(userInfo.interest).map(function (key) {
        return (
            <div id={userInfo.interest[key]._id}>
                <b>{userInfo.interest[key].title}<img data-action="editInterest" class="editbigblockinfo" style="display: none;" src={svg['pencil']}/></b>
                <span>{userInfo.interest[key].description}</span>
            </div>
        )
    })

    return (
       

    )
}

export { BlockUserProfileQuestions };