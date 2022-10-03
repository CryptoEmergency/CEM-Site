import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi
} from "@betarost/cemjs";
import {
    getUserInfoProfile,
    getUserAboutProfile
} from '@src/apiFunctions.js';
import images from '@assets/images/index.js';
import { BlockUserPreview } from '@component/blocks/user/BlockUserPreview.js';
import {
    BlockUserProfileAbout

} from '@component/blocks/user/BlockUserProfileAbout.js';
import { ProfileTabsMenu } from '@component/element/user/ProfileTabsMenu.js';

const start = function () {

    let userInfo,
        tabType

    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true

    init(
        async () => {

            if (!Variable.dataUrl.params || Variable.myInfo.nickname == Variable.dataUrl.params) {
                userInfo = Variable.myInfo
                tabType = 'lentaFriends'
            } else {
                // setValue(ID, 'userInfoProfile', await getUserInfoProfile(dataUrl.params));
                tabType = 'aboutUser'
            }

        },
        () => {

            return (
                <div class={Variable.HeaderShow && 'c-main__body' || 'c-main__body--noheader'}>
                    <BlockUserPreview
                        userInfo={userInfo}
                    />
                    <ProfileTabsMenu
                        userInfo={userInfo}
                        tabType={tabType}
                    />
                    <div class="userMainBlock">
                        {/* {dataShow} */}
                    </div>
                </div>
            )
        })
};


export default start;