import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi
} from "@betarost/cemjs";

import {
    BlockUserProfilePage,
    BlockUserPreview
} from '@component/blocks/index.js';
import { ProfileTabsMenu } from '@component/element/index.js';

const start = function (userInfo) {
    let profilePage,
        activeItems
    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true

    const changeType = async function () {
        if (this.dataset.profilePage == profilePage) {
            return
        }
        profilePage = this.dataset.profilepage
        if (profilePage == "questions") {
            if (userInfo._id == Variable.myInfo._id) {
                activeItems = Variable.PageUserProfileQuestions
            } else {
                activeItems = await sendApi.send({
                    action: "getQuestions", short: true,
                    filter: {
                        author: userInfo._id,
                    },
                    select: { title: 1, text: 1, showDate: 1, statistic: 1, languages: 1, close: 1, bestId: 1, media: 1, author: 1 },
                    limit: 10
                });
            }

        } else if (profilePage == "answers") {
            if (userInfo._id == Variable.myInfo._id) {
                activeItems = Variable.PageUserProfileAnswers
            } else {
                activeItems = await sendApi.send({
                    action: "getAnswers", short: true, filter: {
                        author: userInfo._id,
                    },
                    select: { best: 1, active: 1, author: 1, statistic: 1, showDate: 1, media: 1, text: 1, comments: 1, questionId: 1 },
                    limit: 10
                });
            }
        } else if (profilePage == "subscribers") {
            if (userInfo._id == Variable.myInfo._id) {
                activeItems = Variable.PageUserProfileSubscribers
            } else {
                activeItems = await sendApi.send({
                    action: "getUsers", short: true, filter: {
                        subscribed: userInfo._id,
                    },
                    limit: 20
                });
            }
        } else if (profilePage == "friends") {
            if (userInfo._id == Variable.myInfo._id) {
                activeItems = Variable.PageUserProfileFriends
            } else {
                activeItems = await sendApi.send({
                    action: "getUsers", short: true, filter: {
                        _id: userInfo._id,
                    },
                    select: {
                        _id: 1,
                        subscribed: 1,
                        status: 1
                    },
                    limit: 20
                });
            }
        }
        initReload()
    }

    init(
        async () => {
            profilePage = "aboutUser"

            if (userInfo._id == Variable.myInfo._id) {
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
            }
        },
        () => {

            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    <BlockUserPreview
                        userInfo={userInfo}
                    />
                    <ProfileTabsMenu
                        userInfo={userInfo}
                        profilePage={profilePage}
                        changeType={changeType}
                    />
                    <div class="userMainBlock">
                        <BlockUserProfilePage.questions
                            profilePage={profilePage}
                            items={activeItems}
                            userInfo={userInfo}
                        />
                        <BlockUserProfilePage.answers
                            profilePage={profilePage}
                            items={activeItems}
                            userInfo={userInfo}
                        />

                        <BlockUserProfilePage.friends
                            profilePage={profilePage}
                            items={activeItems}
                            userInfo={userInfo}
                        />

                        <BlockUserProfilePage.subscribers
                            profilePage={profilePage}
                            items={activeItems}
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
                    </div>
                </div>
            )
        })
};

export default start;