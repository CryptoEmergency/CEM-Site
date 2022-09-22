import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";
import { Avatar } from '@component/element/Avatar.js';
import { UserBadge } from '@component/element/UserBadge.js';
import { If } from '@component/helpers/All.js';

const UserItem = function ({ lang, user }) {
    // console.log("UserItem", user);

    return (
        <div class="new_professional_card userLoad" data-id={user._id}>
            <div class="new_professional_card_top">
                <div class="new_professional_card_avatar">
                    <Avatar lang={lang} author={user} />
                </div>
                <If
                    data={user.rank.creator}
                    dataIf={<div class="user_rank_badge">
                        <img src={images.content_creator} />
                    </div>}
                />
            </div>
            <div class="new_professional_card_main">
                <a href={`/user/${user.nickname}`}>
                    <p
                        style="width: 80%; margin: 5px auto;"
                        class="new_professional_name "
                    > {/* load */}
                        {user.nickname}
                    </p>
                </a>
                <p
                    style="width: 50%; margin: 0 auto;"
                    class="new_professional_spec "
                > {/* load */}
                    {user.information ? user.information.speciality : ''}
                </p>
                <div class="new_professional_badges">
                    {
                        user.awards.slice(0, 5).map(function (badge) {
                            return (
                                <UserBadge lang={lang} badge={badge} />
                            )
                        })
                    }
                </div>
                <div class="new_professional_statistic">
                    <div class="new_professional_info_block">
                        <p class="">{user.statistic.answer}</p> {/* load */}
                        <p>{lang.p.answers}</p>
                    </div>
                    <div class="new_professional_info_block">
                        <p class="">{user.statistic.follower}</p> {/* load */}
                        <p>{lang.p.subscribe}</p>
                    </div>
                    <div class="new_professional_info_block">
                        <p class="">{user.statistic.view}</p> {/* load */}
                        <p>{lang.p.views}</p>
                    </div>
                </div>
                <div class="new_professional_buttons">
                    <div class="button-container-preview">
                        <a class="btn-news-preview" href="/user/chats/id{{_id}}" data-action="link" data-needauth="true">
                            <span>
                                {lang.button.write}
                            </span>
                        </a>
                        <a class="btn-news-preview" data-id="{{_id}}" data-action="userSubscribe" data-needauth="true">
                            <span class="subscribe_status">
                                {lang.button.subscribe}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { UserItem }