import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { numberFixWithSpaces } from '@src/functions.js';
import { Avatar } from '@component/element/Avatar.js';
import { percent } from '@component/helpers/All.js';

const BlockUserPreview = function ({ lang, myInfo, userInfo }) {
    return (
        <div class="c-userpreview">
            <div class="c-userpreview__header">

                <div class="c-userpreview__avatar">
                    <Avatar lang={lang} author={userInfo} parent={'big_user_avatar'} />
                </div>
                <img
                    id="currentUserBackground"
                    class="c-userpreview__bg"
                    src={userInfo.background ? `/assets/upload/background/${userInfo.background.name}` : images["profile/background/big_background_2"]}
                />

                <div class="c-userpreview__buttons">
                    <div class="c-userpreview__container">
                        <a class="c-userpreview__btn">
                            <span>
                                {lang.button.write}
                            </span>
                        </a>
                        <a class="c-userpreview__btn">
                            <span class="subscribe_status">
                                {lang.button.subscribe}
                            </span>
                        </a>
                    </div>
                </div>

                <div class="c-userpreview__settings">
                    <img
                        class="c-userpreview__toggler"
                        src={svg.user_custimize_settings}
                    />
                    <div
                        style="display: none;"
                        class="c-userpreview__menu"
                    >
                        {/* IF (userInfo._id=myInfo._id) */}
                        <p data-action="changeAvatarModal" class="c-userpreview__action">{lang.text.changeAvatar}</p>
                        <p data-action="showBackgroundsModal" class="c-userpreview__action">{lang.text.changeBackground}</p>
                        <p data-action="showFramesModal" class="c-userpreview__action">{lang.text.changeFrame}</p>
                        <p
                            class="c-userpreview__action share"
                            data-answer-id={userInfo.nickname}
                            data-type="user"
                        >
                            {lang.select.share}
                        </p>
                        <p data-action="showFramesModal" class="c-userpreview__action">
                            <a data-action="link" href="/user/settings/">{lang.text.settings}</a>
                        </p>
                        {/* ELSE */}

                        <p
                            class="c-userpreview__action share"
                            data-answer-id={userInfo.nickname}
                            data-type="user"
                        >
                            {lang.select.share}
                        </p>
                        <p
                            class="c-userpreview__action complain"
                            data-answer-id={userInfo._id}
                            data-type="user"
                        >
                            {lang.select.complainUser}
                        </p>
                        <p
                            class="c-userpreview__action block"
                            data-answer-id={userInfo._id}
                            data-type="user"
                        >
                            {lang.select.blackList}
                        </p>

                        <p
                            style="color: #32DE80;"
                            class="c-userpreview__action ban"
                            data-answer-id={userInfo._id}
                            data-type="user"
                        >Забанить</p>
                    </div>
                </div>

            </div>

            <div class="c-userpreview__shortinfo c-usershortinfo">
                <div class="c-usershortinfo__main">
                    <a class="c-usershortinfo__"></a>
                    <a class="c-usershortinfo__flag">
                        <img src={userInfo.country.code ? svg["flagsnew/" + userInfo.country.code] : svg["flagsnew/olympics"]} />
                    </a>
                    <img class="c-usershortinfo__edit" src={svg.pencil} />
                    <input
                        id="username"
                        class="c-usershortinfo__name userinfoinput"
                        readonly
                        value={userInfo.nickname ? userInfo.nickname : userInfo._id}
                    />
                    <a href="#" class="c-usershortinfo__rating">
                        {numberFixWithSpaces(userInfo.statistic.rating, 2)}
                    </a>
                    <p></p>
                    <div class="c-usershortinfo__status" id="userstatus">
                        {userInfo.information && userInfo.information.status ? userInfo.information.status : lang.span.status}
                    </div>
                </div>

                {/* IF (myInfo._id=userInfo._id) */}
                <div class="c-userpreview__level">
                    <div
                        style={`width: ${percent(userInfo.statistic.exp, userInfo.statistic.expNext)}%;`}
                        class="c-userpreview__current"
                    ></div>
                    <div class="c-userpreview__num">{userInfo.statistic.exp}/{userInfo.statistic.expNext}</div>
                </div>
            </div>
        </div>
    )
}

export { BlockUserPreview };