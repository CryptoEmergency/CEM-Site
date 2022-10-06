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
import svg from '@assets/svg/index.js';
import { BlockUserPreview } from '@component/blocks/user/BlockUserPreview.js';
import { getUserQuestions, getUserAnswers, getUserFollowers } from '@src/apiFunctionsL.js'
import {
    BlockUserProfileAbout
} from '@component/blocks/user/BlockUserProfileAbout.js';
import {
    BlockUserProfileQuestions
} from '@component/blocks/user/BlockUserProfileQuestions.js';
import {
    BlockUserProfileAnswers
} from '@component/blocks/user/BlockUserProfileAnswers.js';
import {
    BlockUserProfileFollowers
} from '@component/blocks/user/BlockUserProfileFollowers.js';
import {
    BlockUserProfileSubscribes
} from '@component/blocks/user/BlockUserProfileSubscribes.js';

import { ProfileTabsMenu } from '@component/element/user/ProfileTabsMenu.js';

const start = function () {

    const currentCategory = function () {
        console.log(tabType)
        switch (tabType) {
            case 'lentaFriends':
                return (
                    <div></div>
                )
                break;
            case 'lentaUser':
                return (
                    <div></div>
                )
                break;
            case 'aboutUser':
                return (
                    <BlockUserProfileAbout
                        lang={Variable.lang}
                        myInfo={Variable.myInfo}
                        userInfo={userInfo}
                    />
                )
                break;
            case 'questions':
                return (
                    <BlockUserProfileQuestions
                        lang={Variable.lang}
                        myInfo={Variable.myInfo}
                        userInfo={userInfo}
                        questions={questions}
                    />
                )
                break;
            case 'answers':
                return (
                    <BlockUserProfileAnswers
                        lang={Variable.lang}
                        myInfo={Variable.myInfo}
                        userInfo={userInfo}
                        answers={answers}
                    />
                )
                break;
            case 'subscribers':
                return (
                    <BlockUserProfileFollowers
                        lang={Variable.lang}
                        myInfo={Variable.myInfo}
                        userInfo={userInfo}
                        followers={followers}
                        haveFilter={true}
                    />
                )
                break;
            case 'friends':
                return (
                    <BlockUserProfileSubscribes
                        lang={Variable.lang}
                        myInfo={Variable.myInfo}
                        userInfo={userInfo}
                        haveFilter={true}
                    />
                )
                break;
            case 'awards':
                return (
                    <div></div>
                )
                break;
            case 'social':
                return (
                    <div></div>
                )
                break;
            case 'galary':
                return (
                    <div></div>
                )
                break;
            case 'donation':
                return (
                    <div></div>
                )
                break;
        }
    }

    const changeType = async function () {
        if (this.dataset.tabtype == tabType) {
            return
        }
        tabType = this.dataset.tabtype

        initReload()
    }

    let userInfo,
        tabType,
        questions,
        answers,
        followers

    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true

    init(
        async () => {

            if (!Variable.dataUrl.params || Variable.myInfo.nickname == Variable.dataUrl.params) {
                userInfo = Variable.myInfo
                questions = await getUserQuestions(userInfo._id)
                answers = await getUserAnswers(userInfo._id)
                followers = await getUserFollowers(userInfo._id)
                console.log(followers)
                tabType = 'aboutUser'
            } else {
                // setValue(ID, 'userInfoProfile', await getUserInfoProfile(dataUrl.params));
                tabType = 'aboutUser'
            }

        },
        () => {
            console.log('=d4a15a=', svg)

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
                        {currentCategory()}
                    </div>
                </div>
            )
        })
};


export default start;