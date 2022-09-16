import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const UserBadge = function ({ lang, badge }) {

    return (
        <div class="badge_container">
            <div class="badge_description">
                <p>{lang.awards[badge.name]}</p>
                <span>{lang.awards[badge.description]}</span>
            </div>
            <img src={svg[`badge/${badge.icon.split(".")[0]}`]} />
        </div>
    )
}

export { UserBadge }