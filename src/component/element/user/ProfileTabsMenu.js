import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    Variable
} from '@betarost/cemjs';
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const ProfileTabsMenu = function ({ userInfo, tabType, changeType }) {


    return (
        <div class="c-usercategories">


            {/* <div class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/user_feeds${tabType != 'lentaFriends' ? '_inactive' : ''}`]}
                    data-tabType = "lentaFriends"
                    onclick={changeType}
                />
            </div> */}


            <div class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/information${tabType != 'aboutUser' ? '_inactive' : ''}`]}
                    data-tabType="aboutUser"
                    onclick={changeType}
                />
            </div>
            <div data-type="questions" class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/questions${tabType != 'questions' ? '_inactive' : ''}`]}
                    data-tabType="questions"
                    onclick={changeType}
                />
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.question}</span>
                    </div>
                </div>
            </div>
            <div data-type="answers" class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/answers${tabType != 'answers' ? '_inactive' : ''}`]}
                    data-tabType="answers"
                    onclick={changeType}
                />
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.answer}</span>
                    </div>
                </div>
            </div>
            <div data-type="subscribers" class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/followers${tabType != 'subscribers' ? '_inactive' : ''}`]}
                    data-tabType="subscribers"
                    onclick={changeType}
                />
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.follower}</span>
                    </div>
                </div>
            </div>
            <div data-type="friends" class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/friends${tabType != 'friends' ? '_inactive' : ''}`]}
                    data-tabType="friends"
                    onclick={changeType}
                />
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.subscribe}</span>
                    </div>
                </div>
            </div>
            <div data-type="awards" class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/awards${tabType != 'awards' ? '_inactive' : ''}`]}
                    data-tabType="awards"
                    onclick={changeType}
                />
            </div>
            <div data-type="social" class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/social${tabType != 'social' ? '_inactive' : ''}`]}
                    data-tabType="social"
                    onclick={changeType}
                />
            </div>
            {/* <div data-type="galary" class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/galary${tabType != 'galary' ? '_inactive' : ''}`]}
                    data-tabType="galary"
                    onclick={changeType}
                />
            </div> */}
            {/* <div data-updating="true" data-type="donation" data-action="link" class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/donation${tabType != 'donation' ? '_inactive' : ''}`]}
                    data-tabType="donation"
                    onclick={changeType}
                />
            </div> */}
        </div>
    )
}

export { ProfileTabsMenu }