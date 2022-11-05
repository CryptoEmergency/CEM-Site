import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
//check
import svg from "@assets/svg/index.js";

const UserBadge = function ({ badge }) {
    return (
        <div class="badge_container">
            <div class="badge_description">
                <p>{Variable.lang.awards[badge.name]}</p>
                <span>{Variable.lang.awards[badge.description]}</span>
            </div>
            <img src={svg[`badge/${badge.icon.split(".")[0]}`]} />
        </div>
    )
}
export { UserBadge }