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

const Avatar = function ({ lang, author }) {
    // console.log("Avatar = ", lang, author);

    return (
        <a href={`/user/${author.nickname}`} class="comment_avatar">
            <div class="micro_user_avatar">
                <img
                    style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);"
                    src={author.avatar.name ? `/assets/upload/avatar/${author.avatar.name}` : images["profile/avatar/default"]}
                />
                <img
                    style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: "
                    src={svg.frame_default}
                />
                <div class="user_avatar_level">
                    <img src={svg.levelGray} />
                    <span>{author.statistic.level}</span>
                </div>
                <div style="display: none;" class="avatar_user_online"></div>
                <div style="display: none;" class="avatar_user_offline"></div>
            </div>
        </a>
    )
}

export { Avatar }