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

    const currentCategory = async function(){
        switch(tabType){
            case 'lentaFriends':
                return(
                    <div></div>
                )
                break;
            case 'lentaUser':
                return(
                    <div></div>
                )
                break;
            case 'aboutUser':
                return(
                    <div></div>
                )
                break;
            case 'questions':
                return(
                    <div></div>
                )
                break;
            case 'answers':
                return(
                    <div></div>
                )
                break;
            case 'subscribers':
                return(
                    <div></div>
                )
                break;
            case 'friends':
                return(
                    <div></div>
                )
                break;
            case 'awards':
                return(
                    <div></div>
                )
                break;
            case 'social':
                return(
                    <div></div>
                )
                break;
            case 'galary':
                return(
                    <div></div>
                )
                break;
            case 'donation':
                return(
                    <div></div>
                )
                break;
        }
    }

    const changeType = async function(){
        if(this.dataset.tabtype == tabType){
            return
        }
        tabType = this.dataset.tabtype
        
        initReload()
    }

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
                        changeType={changeType}
                    />
                    <div class="userMainBlock">
                        <BlockUserProfileAbout
                            lang={Variable.lang}
                            myInfo={Variable.myInfo}
                            userInfo={userInfo}
                        />
                    </div>
                </div>
            )
        })
};


export default start;