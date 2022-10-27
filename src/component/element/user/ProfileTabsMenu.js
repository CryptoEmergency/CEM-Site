import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    Variable
} from '@betarost/cemjs';
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const ProfileTabsMenu = function ({ userInfo, profilePage, changeType }) {


    return (
        <div class="c-usercategories  c-container">


            {/* <div class="c-usercategories__item">
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/user_feeds${profilePage != 'lentaFriends' ? '_inactive' : ''}`]}
                    data-profilePage = "lentaFriends"
                    onclick={changeType}
                />
            </div> */}


            <div class="c-usercategories__item">
                <i
                    class={`c-usercategories__icon c-usercategories__icon--information${profilePage != 'aboutUser' ? '_inactive' : ''}`}
                    data-profilePage="aboutUser"
                    onclick={changeType}
                ></i>
            </div>
            <div data-type="questions" class="c-usercategories__item">
                <i
                    class={`c-usercategories__icon c-usercategories__icon--questions${profilePage != 'questions' ? '_inactive' : ''}`}
                    data-profilePage="questions"
                    onclick={changeType}
                ></i>
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.question}</span>
                    </div>
                </div>
            </div>
            <div data-type="answers" class="c-usercategories__item">
                <i
                    class={`c-usercategories__icon c-usercategories__icon--answers${profilePage != 'answers' ? '_inactive' : ''}`}
                    data-profilePage="answers"
                    onclick={changeType}
                ></i>
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.answer}</span>
                    </div>
                </div>
            </div>
            <div data-type="subscribers" class="c-usercategories__item">
                <i
                    class={`c-usercategories__icon c-usercategories__icon--followers${profilePage != 'subscribers' ? '_inactive' : ''}`}
                    data-profilePage="subscribers"
                    onclick={changeType}
                ></i>
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.follower}</span>
                    </div>
                </div>
            </div>
            <div data-type="friends" class="c-usercategories__item">
                <i
                    class={`c-usercategories__icon c-usercategories__icon--friends${profilePage != 'friends' ? '_inactive' : ''}`}
                    data-profilePage="friends"
                    onclick={changeType}
                ></i>
                <div class="user_category_gradient_frame">
                    <div class="user_category_gray_background">
                        <span class="user_category_gradient_text">{userInfo.statistic.subscribe}</span>
                    </div>
                </div>
            </div>
            <div data-type="awards" class="c-usercategories__item">
                <i
                    class={`c-usercategories__icon c-usercategories__icon--awards${profilePage != 'awards' ? '_inactive' : ''}`}
                    data-profilePage="awards"
                    onclick={changeType}
                ></i>
            </div>
            {/* <div data-type="social" class="c-usercategories__item">
                <i
                    class={`c-usercategories__icon c-usercategories__icon--social${profilePage != 'social' ? '_inactive' : ''}`}
                    data-profilePage="social"
                    onclick={changeType}
                ></i>
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/social${profilePage != 'social' ? '_inactive' : ''}`]}
                    data-profilePage="social"
                    onclick={changeType}
                />
            </div> */}
            {/* <div data-type="galary" class="c-usercategories__item">
                <i
                    class={`c-usercategories__icon c-usercategories__icon--galary${profilePage != 'galary' ? '_inactive' : ''}`}
                    data-profilePage="galary"
                    onclick={changeType}
                ></i>
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/galary${profilePage != 'galary' ? '_inactive' : ''}`]}
                    data-profilePage="galary"
                    onclick={changeType}
                />
            </div> */}
            {/* <div data-updating="true" data-type="donation" data-action="link" class="c-usercategories__item">
                <i
                    class={`c-usercategories__icon c-usercategories__icon--donation${profilePage != 'donation' ? '_inactive' : ''}`}
                    data-profilePage="donation"
                    onclick={changeType}
                ></i>
                <img
                    class="c-usercategories__img"
                    src={svg[`sections/donation${profilePage != 'donation' ? '_inactive' : ''}`]}
                    data-profilePage="donation"
                    onclick={changeType}
                />
            </div> */}
        </div>
    )
}

export { ProfileTabsMenu }