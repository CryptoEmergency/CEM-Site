import {
    jsx,
    jsxFrag,
    initReload,
    Variable
} from '@betarost/cemjs';
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";
import { Avatar } from '@component/element/Avatar.js';
import { UserBadge } from '@component/element/UserBadge.js';
import { changeSubscription } from "@src/apiFunctions.js";
import { api } from '@src/apiFunctions.js'

const UserItem = function ({ user }) {
    return (
        <div class="new_professional_card userLoad" data-id={user._id}>
            <div class="new_professional_card_top">
                <div class="new_professional_card_avatar">
                    <Avatar author={user} nickName={true} speciality={[user.information && user.information.speciality ? user.information.speciality : false]} />
                </div>
                {()=>{
                    if(user.rank.creator){
                        return(
                            <div class="user_rank_badge">
                                <img src={images.content_creator} />
                            </div> 
                        )
                    }
                }}
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
                                <UserBadge badge={badge} />
                            )
                        })
                    }
                </div>
                <div class="new_professional_statistic">
                    <div class="new_professional_info_block">
                        <p class="">{user.statistic.answer}</p> {/* load */}
                        <p>{Variable.lang.p.answers}</p>
                    </div>
                    <div class="new_professional_info_block">
                        <p class="">{user.statistic.follower}</p> {/* load */}
                        <p>{Variable.lang.p.subscribe}</p>
                    </div>
                    <div class="new_professional_info_block">
                        <p class="">{user.statistic.view}</p> {/* load */}
                        <p>{Variable.lang.p.views}</p>
                    </div>
                </div>
                <div class="new_professional_buttons">
                    <div class="button-container-preview">
                        <a style="opacity: 0.2" class="btn-news-preview " href="#" data-action="link" data-needauth="true">
                            <span>
                                {Variable.lang.button.write}
                            </span>
                        </a>
                        <a 
                            class="btn-news-preview" 
                            data-id="{{_id}}" 
                            data-action="userSubscribe" 
                            data-needauth="true"
                            onclick={async()=>{
                                let tmp = await api({ type: "set", action: "setUsers", short: true, data: {value: {subscribed: user._id}}})
                                user.subscribe = !user.subscribe
                            }}
                        >
                            <span class="subscribe_status">
                                {()=>{
                                    if(user.subscribe){
                                        return(
                                            Variable.lang.button.unsubscribe
                                        )
                                    } else {
                                        return(
                                            Variable.lang.button.subscribe
                                        )
                                    }
                                }}
                                
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { UserItem }