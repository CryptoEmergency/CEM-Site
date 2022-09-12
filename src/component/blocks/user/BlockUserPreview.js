import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { numberFixWithSpaces } from '@src/functions.js';
const BlockUserPreview = function ({ lang, myInfo, userInfo }) {


    return (
        <div class="user_main">
            <div class="user_background">
                <div class="big_user_avatar" data-action="fullSizeAvatar">
                    <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src={userInfo.avatar ?
                        `/assets/upload/avatar/${userInfo.avatar.name}` :
                        images["profile/avatar/default"]} />
                    <img style="position: absolute; top: 0;left: 0;z-index: 2; height: 100%;width: "
                        src={userInfo.frame ? images[`profile/frame/${userInfo.frame.name.split(".")[0]}`] : svg["profile/frame/default"]}
                    />
                </div>
                <img id="currentUserBackground" src={userInfo.background ? `/assets/upload/background/${userInfo.background.name}` : images["profile/background/big_background_2"]} />

                <div class="new_professional_buttons">
                    <div class="button-container-preview">
                        <a class="btn-news-preview">
                            <span>
                                {lang.button.write}
                            </span>
                        </a>
                        <a class="btn-news-preview">
                            <span class="subscribe_status">
                                {lang.button.subscribe}
                            </span>
                        </a>
                    </div>
                </div>

            </div>

            <div class="user_short_info">
                <div class="user_short_info-2">
                    <p>
                        <a data-action="roleShow">
                            <div class="flag_border">
                                <img style="height: 27px; width: auto;transform: translateY(-3px)" src={userInfo.country.code ? svg["flagsnew/" + userInfo.country.code] : svg["flagsnew/olympics"]} />
                            </div>
                        </a>
                        <a data-action="infoShow">
                            <input style="text-align: center;font-weight: 500;font-size: 24px;line-height: 18px;color: #fff;width: 250px;" id="username" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.nickname ? userInfo.nickname : userInfo._id} />
                        </a>
                        <a data-action="testShow">
                            <span class="user_rating">{numberFixWithSpaces(userInfo.statistic.rating, 2)}</span>
                        </a>
                    </p>

                    <p>
                        <div id="userstatus">
                            {userInfo.information && userInfo.information.status ? userInfo.information.status : lang.span.status}
                        </div>




                    </p>
                </div>
            </div>

        </div>
    )
}

export { BlockUserPreview };