import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi
} from "@betarost/cemjs";

import svg from '@assets/svg/index.js';
import { BlockUserProfilePage } from '@component/blocks/index.js';





import {
    getUserInfoProfile,
    getUserAboutProfile
} from '@src/apiFunctions.js';


import { BlockUserPreview } from '@component/blocks/user/BlockUserPreview.js';
import { getUserQuestions, getUserAnswers, getUserFollowers, getUserSubscribes, getUserByNickname } from '@src/apiFunctionsL.js'



import { ProfileTabsMenu } from '@component/element/user/ProfileTabsMenu.js';

const start = function () {
    let profilePage
    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true

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
        followers,
        subscribes



    init(
        async () => {



            if (!Variable.dataUrl.params || Variable.myInfo.nickname == decodeURI(Variable.dataUrl.params)) {
                userInfo = Variable.myInfo
                tabType = 'aboutUser'
            } else {
                userInfo = (await getUserByNickname(decodeURI(Variable.dataUrl.params))).list_records[0]
                tabType = 'aboutUser'
            }


            //Variable.MainTrades = await sendApi.send({ action: "getTrade", short: true, cache: true, name: "MainTrades" });
            profilePage = "aboutUser"

            Variable.PageUserProfileQuestions = await sendApi.send({
                action: "getQuestions", short: true, cache: true, name: "PageUserProfileQuestions", filter: {
                    author: userInfo._id,
                },
                select: { title: 1, text: 1, showDate: 1, statistic: 1, languages: 1, close: 1, bestId: 1, media: 1, author: 1 },
                limit: 10
            });

            Variable.PageUserProfileAnswers = await sendApi.send({
                action: "getAnswers", short: true, cache: true, name: "PageUserProfileAnswers", filter: {
                    author: userInfo._id,
                },
                select: { best: 1, active: 1, author: 1, statistic: 1, showDate: 1, media: 1, text: 1, comments: 1, questionId: 1 },
                limit: 10
            });

            Variable.PageUserProfileFriends = await sendApi.send({
                action: "getUsers", short: true, cache: true, name: "PageUserProfileFriends", filter: {
                    _id: userInfo._id,
                },
                select: {
                    _id: 1,
                    subscribed: 1,
                    status: 1
                },
                limit: 20
            });

            Variable.PageUserProfileSubscribers = await sendApi.send({
                action: "getUsers", short: true, cache: true, name: "PageUserProfileSubscribers", filter: {
                    subscribed: userInfo._id,
                },
                limit: 20
            });

        },
        () => {

            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    <BlockUserPreview
                        userInfo={userInfo}
                    />
                    <ProfileTabsMenu
                        userInfo={userInfo}
                        tabType={tabType}
                        changeType={changeType}
                    />
                    <div class="userMainBlock">
                        <BlockUserProfilePage.questions
                            profilePage={profilePage}
                            items={Variable.PageUserProfileQuestions}
                            userInfo={userInfo}
                        />
                        <BlockUserProfilePage.answers
                            profilePage={profilePage}
                            items={Variable.PageUserProfileAnswers}
                            userInfo={userInfo}
                        />

                        <BlockUserProfilePage.friends
                            profilePage={profilePage}
                            items={Variable.PageUserProfileFriends}
                            userInfo={userInfo}
                        />

                        <BlockUserProfilePage.subscribers
                            profilePage={profilePage}
                            items={Variable.PageUserProfileSubscribers}
                            userInfo={userInfo}
                        />

                        <BlockUserProfilePage.awards
                            profilePage={profilePage}
                            userInfo={userInfo}
                        />

                        <BlockUserProfilePage.aboutUser
                            profilePage={profilePage}
                            userInfo={userInfo}
                        />
                        {/* {currentCategory()} */}
                    </div>
                </div>
            )
        })
};


export default start;