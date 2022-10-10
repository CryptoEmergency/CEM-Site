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
import {
    BlockUserProfileAbout
} from '@component/blocks/user/BlockUserProfileAbout.js';
// import {
//     BlockUserProfileQuestions
// } from '@component/blocks/user/BlockUserProfileQuestions.js';
import {
    BlockUserProfileAnswers
} from '@component/blocks/user/BlockUserProfileAnswers.js';
import {
    BlockUserProfileFollowers
} from '@component/blocks/user/BlockUserProfileFollowers.js';
import {
    BlockUserProfileSubscribes
} from '@component/blocks/user/BlockUserProfileSubscribes.js';
import {
    BlockUserProfileAwards
} from '@component/blocks/user/BlockUserProfileAwards.js';
import {
    BlockUserProfileSocials
} from '@component/blocks/user/BlockUserProfileSocials.js';

import { ProfileTabsMenu } from '@component/element/user/ProfileTabsMenu.js';

const start = function () {
    let profilePage
    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true


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
                    <></>
                    // <BlockUserProfileQuestions
                    //     lang={Variable.lang}
                    //     myInfo={Variable.myInfo}
                    //     userInfo={userInfo}
                    //     questions={questions}
                    // />
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
                        subscribes={subscribes.list_records[0].subscribed}
                    />
                )
                break;
            case 'awards':
                return (
                    <BlockUserProfileAwards
                        lang={Variable.lang}
                        myInfo={Variable.myInfo}
                        userInfo={userInfo}
                        haveFilter={true}
                    />
                )
                break;
            case 'social':
                return (
                    <BlockUserProfileSocials
                        lang={Variable.lang}
                        myInfo={Variable.myInfo}
                        userInfo={userInfo}
                        haveFilter={true}
                    />
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
        followers,
        subscribes



    init(
        async () => {



            if (!Variable.dataUrl.params || Variable.myInfo.nickname == decodeURI(Variable.dataUrl.params)) {
                userInfo = Variable.myInfo
                tabType = 'questions'
            } else {
                userInfo = (await getUserByNickname(decodeURI(Variable.dataUrl.params))).list_records[0]
                tabType = 'questions'
            }
            questions = await getUserQuestions(userInfo._id)
            answers = await getUserAnswers(userInfo._id)
            followers = await getUserFollowers(userInfo._id)
            subscribes = await getUserSubscribes(userInfo._id)

            console.log(Variable.auth)



            //Variable.MainTrades = await sendApi.send({ action: "getTrade", short: true, cache: true, name: "MainTrades" });
            profilePage = "questions"
            Variable.PageUserProfileQuestions = await sendApi.send({
                action: "getQuestions", short: true, cache: true, name: "MainTrades", filter: {
                    author: userInfo._id,
                },
                select: { title: 1, text: 1, showDate: 1, statistic: 1, languages: 1, close: 1, bestId: 1, media: 1, author: 1 }
            });



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
                        <BlockUserProfilePage.questions
                            profilePage={profilePage}
                            items={Variable.PageUserProfileQuestions}
                        />
                        {/* {currentCategory()} */}
                    </div>
                </div>
            )
        })
};


export default start;