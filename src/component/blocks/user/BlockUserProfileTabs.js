import { jsx, jsxFrag, getVariable, getStorage, makeDOM, timersStart, setValue, getValue, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { numberFixWithSpaces } from '@src/functions.js';


const BlockUserProfileTabs = function ({ lang, myInfo, userInfo }) {


    return (



        <div class="userMainBlock">

            <div
                data-touchmove="userProfileSlide"
                data-touchstart="userProfileSlideStart"
                data-touchend="userProfileSlideEnd"
                class="bl_one bl_active"
                id="UserInfoLentaFriends"
            >

                <div
                    data-touchmove="userProfileSlide"
                    data-touchstart="userProfileSlideStart"
                    data-touchend="userProfileSlideEnd"
                    class="bl_one bl_active"
                    id="UserInfoLentaFriends"
                >
                    <div class="user_main_block">
                        <div class="user_news">
                            <div class="user_news_block">


                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export { BlockUserProfileTabs };