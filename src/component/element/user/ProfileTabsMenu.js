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

const ProfileTabsMenu = function ({ lang, myInfo, userInfo, tabType }) {


    return (
        <div class="users_news_categories user_profile_list">


            <div class="users_news_category">
                <img
                    src={svg[`sections/user_feeds${tabType != 'test' ? '_inactive' : ''}`]}
                    onclick={() => { setValue('mainBlock', 'userProfileActiveTab', 'lentaUser'); }}
                />
            </div>


            <div class="users_news_category">
                <img
                    src={svg[`sections/information${tabType != 'aboutUser' ? '_inactive' : ''}`]}
                    onclick={() => { setValue('mainBlock', 'userProfileActiveTab', 'aboutUser'); }}
                />
            </div>
            <div data-type="questions" data-action="user_main_category_toggle" class="users_news_category">
                <img src={svg[`sections/questions${tabType != 'test' ? '_inactive' : ''}`]} />
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.question}</span>
                    </div>
                </div>
            </div>
            <div data-type="answers" data-action="user_main_category_toggle" class="users_news_category">
                <img src={svg[`sections/answers${tabType != 'test' ? '_inactive' : ''}`]} />
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.answer}</span>
                    </div>
                </div>
            </div>
            <div data-type="subscribers" data-action="user_main_category_toggle" class="users_news_category">
                <img src={svg[`sections/followers${tabType != 'test' ? '_inactive' : ''}`]} />
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.follower}</span>
                    </div>
                </div>
            </div>
            <div data-type="friends" data-action="user_main_category_toggle" class="users_news_category">
                <img src={svg[`sections/friends${tabType != 'test' ? '_inactive' : ''}`]} />
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.subscribe}</span>
                    </div>
                </div>
            </div>
            <div data-type="awards" data-action="user_main_category_toggle" class="users_news_category">
                <img src={svg[`sections/awards${tabType != 'test' ? '_inactive' : ''}`]} />
            </div>
            <div data-type="social" data-action="user_main_category_toggle" class="users_news_category">
                <img src={svg[`sections/social${tabType != 'test' ? '_inactive' : ''}`]} />
            </div>
            <div data-type="galary" data-action="user_main_category_toggle" class="users_news_category">
                <img src={svg[`sections/galary${tabType != 'test' ? '_inactive' : ''}`]} />
            </div>
            <div data-updating="true" data-type="donation" data-action="link" class="users_news_category">
                <img src={svg[`sections/donation${tabType != 'test' ? '_inactive' : ''}`]} />
            </div>
        </div>
    )
}

export { ProfileTabsMenu }