import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi,
    Helpers
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { Avatar } from '@component/element/Avatar.js';

import {
    BlockUserProfilePage,
} from '@component/blocks/index.js';
// import { fn } from "moment";

const makeFilter = function (Static) {
    let objReturn = {}
    // if (Static.type && Static.type != "all") {
    //     if (Static.type == "experts") {
    //         objReturn["rank.expert"] = true;
    //     } else if (Static.type == "creator") {
    //         objReturn["rank.creator"] = true;
    //     }
    // } else {
    //     objReturn["$or"] = [
    //         {
    //             "rank.basic": true,
    //             "rank.expert": false,
    //             "rank.creator": false,
    //         },
    //         {
    //             "rank.basic": false,
    //             "rank.expert": true,
    //             "rank.creator": false,
    //         },
    //         {
    //             "rank.basic": false,
    //             "rank.expert": false,
    //             "rank.creator": true,
    //         },
    //     ];
    // }
    // if (Static.filters.group && Static.type == "all") {
    //     if (Static.filters.group.common) {
    //         objReturn["$or"][0]["rank.basic"] = true;
    //     } else {
    //         objReturn["$or"][0]["rank.basic"] = false;
    //     }

    //     if (Static.filters.group.content) {
    //         objReturn["$or"][2]["rank.creator"] = true;
    //     } else {
    //         objReturn["$or"][2]["rank.creator"] = false;
    //     }

    //     if (Static.filters.group.expert) {
    //         objReturn["$or"][1]["rank.expert"] = true;
    //     } else {
    //         objReturn["$or"][1]["rank.expert"] = false;
    //     }
    // }
    // if (Static.filters.language && Static.filters.language.name != "all") {
    //     objReturn["mainLanguage.code"] = Static.filters.language.code
    // }
    // if (Static.filters.country && Static.filters.country.name != "all") {
    //     objReturn["country.code"] = Static.filters.country.code
    // }
    // if (Static.filters.online) {
    //     objReturn.online = true;
    // }
    if (Static.search.value) {
        objReturn.search = Static.search.value;
    }
    return objReturn
}

const start = function (userInfo, ID = "mainBlock") {
    let [Static] = fn.GetParams({ userInfo, ID })
    console.log('=07dba5=', userInfo)
    Variable.Static.FooterShow = false
    let profilePage
    Static.activeItems = {}
    Variable.HeaderShow = true
    Variable.FooterShow = true
    Variable.showUserMenu = false
    if (Variable.auth == false && !localStorage.getItem('refId')) {
        localStorage.setItem('refId', userInfo.nickname)
    }
    const changeType = async function () {
        if (this.dataset.profilePage == profilePage) {
            return
        }
        profilePage = this.dataset.profilepage
        if (profilePage == "lentaFriends") {
            Static.lentaFilters.author = userInfo._id
            Static.activeItems = await fn.restApi.getPost({ short: true, cache: false, name: "PageUserProfileMyLenta", filter: { author: userInfo._id, "languages.code": "all" }, select: { author: 1, forFriends: 1, languages: 1, media: 1, showDate: 1, statistic: 1, status: 1, text: 1, title: 1, updateTime: 1 }, limit: 12 })
            // console.log('=2b1496=', activeItems)

        } else if (profilePage == "questions") {
            Static.activeItems = await fn.restApi.getQuestions({ short: true, cache: false, name: "PageUserProfileQuestions", filter: { author: userInfo._id, }, select: { title: 1, text: 1, showDate: 1, statistic: 1, languages: 1, close: 1, bestId: 1, media: 1, author: 1 }, limit: 10 })

        } else if (profilePage == "answers") {
            Static.activeItems = await sendApi.send({
                action: "getAnswers", short: true, filter: {
                    author: userInfo._id,
                },
                select: { best: 1, active: 1, author: 1, statistic: 1, showDate: 1, media: 1, text: 1, comments: 1, questionId: 1 },
                limit: 10
            });
        } else if (profilePage == "subscribers") {
            Static.activeItems = await sendApi.send({
                action: "getUsers", short: true, filter: {
                    subscribed: userInfo._id,
                },
                limit: 20
            });
        } else if (profilePage == "friends") {
            fn.initData.friends(Static)
            Static.activeItems = await sendApi.send({
                action: "getUsers", short: true, filter: {
                    _id: userInfo._id,
                },
                select: {
                    _id: 1,
                    subscribed: 1,
                    status: 1
                },
                limit: 24
            });
            Static.search = {
                value: "",
                label: "",
                condition: async (value) => {
                    console.log('=028b3c=', value)
                    Static.apiFilter = makeFilter(Static)
                    console.log('=028b3c=', Static)
                    // Static.apiFilterSort = makeFilterSort(Static)
                    // await fn.restApi.getQuestions({ name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
                    // let a = await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
                    Static.activeItems = await sendApi.send({
                        action: "getUsers", short: true, filter: {
                            _id: userInfo._id,
                            // search: value
                        },
                        select: {
                            _id: 1,
                            subscribed: 1,
                            status: 1
                        },
                        limit: 24
                    });
                    // console.log('=8f2c43=', a)
                    return true
                }
            }
            // Static.apiFilter = makeFilter(Static)
            // Static.apiFilterSort = makeFilterSort(Static)
            // await fn.restApi.getQuestions({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
        } else if (profilePage == "galary") {
            Static.activeItems = await fn.restApi.getUsers({ filter: { nickname: userInfo.nickname }, select: { gallery: 1 } })

            Static.mediaInputs = {
                value: [],
                show: false,
            }
        } else if (profilePage == "social") {
            Static.activeItems = await fn.restApi.getUsers({ filter: { nickname: userInfo.nickname }, select: { social: 1 } })
            Static.viewForm = false;
            Static.isValid = false;
            // Static.elShowMenu = null
            Static.elShowMenu = []
            // Static.channelNewSocial = "";
            // Static.linkNewSocial = "";
            // Static.nameNewSocial = "";
            // Static.descriptionNewSocial = "";
        }
        initReload()
    }

    init(
        async () => {
            fn.initData.lenta_users(Static)

            Variable.PageUserProfileMyLenta = await fn.restApi.getPost({ short: true, cache: false, name: "PageUserProfileMyLenta", filter: { author: userInfo._id, "languages.code": "all" }, select: { author: 1, forFriends: 1, languages: 1, media: 1, showDate: 1, statistic: 1, status: 1, text: 1, title: 1, updateTime: 1 }, limit: 51 })

            Variable.PageUserProfileQuestions = fn.restApi.getQuestions({ short: true, cache: false, name: "PageUserProfileQuestions", filter: { author: userInfo._id, }, select: { title: 1, text: 1, showDate: 1, statistic: 1, languages: 1, close: 1, bestId: 1, media: 1, author: 1 }, limit: 10 })

            Variable.PageUserProfileAnswers = sendApi.send({
                action: "getAnswers", short: true, cache: false, name: "PageUserProfileAnswers", filter: {
                    author: userInfo._id,
                },
                select: { best: 1, active: 1, author: 1, statistic: 1, showDate: 1, media: 1, text: 1, comments: 1, questionId: 1 },
                limit: 10
            });

            Variable.PageUserProfileFriends = sendApi.send({
                action: "getUsers", short: true, cache: false, name: "PageUserProfileFriends", filter: {
                    _id: userInfo._id,
                },
                select: {
                    _id: 1,
                    subscribed: 1,
                    status: 1
                },
                limit: 20
            });

            Variable.PageUserProfileSubscribers = sendApi.send({
                action: "getUsers", short: true, cache: false, name: "PageUserProfileSubscribers", filter: {
                    subscribed: userInfo._id,
                },
                limit: 20
            });


            profilePage = "aboutUser"
            Static.activeView = "tile";
            Static.activeFiletype = "all";
            if (userInfo && userInfo.nickname == Variable.myInfo.nickname && Variable.PageUserProfileMyLenta.list_records.length != 0) {
                profilePage = "lentaFriends";
                Static.activeItems = Variable.PageUserProfileMyLenta
            }



        },
        () => {
            if (userInfo && userInfo.nickname == Variable.myInfo.nickname) { userInfo = Variable.myInfo }
            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    <div class="c-userpreview c-container">
                        <div class="c-userpreview__header"
                            ElemVisible={() => {
                                fn.recordsView(userInfo._id, "setUsers")
                            }}
                        >

                            <div class="c-userpreview__avatar">
                                <Avatar author={userInfo} parent={'big_user_avatar'} settings={true} />
                            </div>
                            <img
                                id="currentUserBackground"
                                class="c-userpreview__bg"
                                src={userInfo.background && userInfo.background.name ? `/assets/upload/background/${userInfo.background.name}` : images["profile/background/big_background_2"]}
                            />

                            {() => {
                                if (Variable.auth && userInfo._id != Variable.myInfo._id) {
                                    return (
                                        <div class="c-userpreview__buttons">
                                            <div class="c-userpreview__container">
                                                <a
                                                    class="c-userpreview__btn 89"
                                                    onclick={async () => {
                                                        if (Variable.ModalsPage.length) {
                                                            Variable.ModalsPage = []
                                                            initReload("modalsPage")
                                                        }
                                                        Variable.Static.startChatsID = userInfo
                                                        fn.siteLink("/user/chats/");
                                                    }}
                                                >
                                                    <span>
                                                        {Variable.lang.button.write}
                                                    </span>
                                                </a>
                                                <a
                                                    class="c-userpreview__btn"
                                                    onclick={async () => {
                                                        fn.restApi.setUsers.subscribe({ _id: userInfo._id })
                                                        userInfo.subscribe = !userInfo.subscribe
                                                    }}
                                                >
                                                    <span class="subscribe_status">
                                                        {() => {
                                                            if (userInfo.subscribe) {
                                                                return (
                                                                    Variable.lang.button.unsubscribe
                                                                )
                                                            } else {
                                                                return (
                                                                    Variable.lang.button.subscribe
                                                                )
                                                            }
                                                        }}
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    )
                                }
                            }}

                            <div class="c-userpreview__settings">
                                {/* 
                                    <img
                                        class="c-userpreview__toggler"
                                        src={svg.user_custimize_settings}
                                    /> 
                                */}
                                <div
                                    style="display: none;"
                                    class="c-userpreview__menu"
                                >
                                    {/* IF (userInfo._id=myInfo._id) */}
                                    <p data-action="changeAvatarModal" class="c-userpreview__action">{Variable.lang.text.changeAvatar}</p>
                                    <p data-action="showBackgroundsModal" class="c-userpreview__action">{Variable.lang.text.changeBackground}</p>
                                    <p data-action="showFramesModal" class="c-userpreview__action">{Variable.lang.text.changeFrame}</p>
                                    <p
                                        class="c-userpreview__action share"
                                        data-answer-id={userInfo.nickname}
                                        data-type="user"
                                    >
                                        {Variable.lang.select.share}
                                    </p>
                                    <p data-action="showFramesModal" class="c-userpreview__action">
                                        {/* <a onclick={Helpers.siteLink} href="/user/settings/">{Variable.lang.text.settings}</a> */}
                                    </p>
                                    {/* ELSE */}

                                    <p
                                        class="c-userpreview__action share"
                                        data-answer-id={userInfo.nickname}
                                        data-type="user"
                                    >
                                        {Variable.lang.select.share}
                                    </p>
                                    <p
                                        class="c-userpreview__action complain"
                                        data-answer-id={userInfo._id}
                                        data-type="user"
                                    >
                                        {Variable.lang.select.complainUser}
                                    </p>
                                    <p
                                        class="c-userpreview__action block"
                                        data-answer-id={userInfo._id}
                                        data-type="user"
                                    >
                                        {Variable.lang.select.blackList}
                                    </p>

                                    <p
                                        style="color: #32DE80;"
                                        class="c-userpreview__action ban"
                                        data-answer-id={userInfo._id}
                                        data-type="user"
                                    >Забанить</p>
                                </div>
                            </div>

                        </div>

                        <div class="c-userpreview__shortinfo c-usershortinfo">
                            <div class="c-usershortinfo__main">
                                <a class="c-usershortinfo__"></a>
                                <a class="c-usershortinfo__flag">
                                    {/* <img src={userInfo.country.code ? svg["flagsnew/" + userInfo.country.code] : svg["flagsnew/olympics"]} /> */}
                                    <img src={userInfo.country.code ? `/assets/icons/flagsnew/${userInfo.country.code}.svg` : "/assets/icons/flagsnew/olympics.svg"} />
                                </a>
                                <img class="c-usershortinfo__edit" src={svg.pencil} />
                                <input
                                    id="username"
                                    class="c-usershortinfo__name userinfoinput"
                                    readonly
                                    value={userInfo.nickname ? userInfo.nickname : userInfo._id}
                                />
                                <a href="#" class="c-usershortinfo__rating">
                                    {Helpers.numberFixWithSpaces(userInfo.statistic.rating, 2)}
                                </a>
                                <p></p>
                                {
                                    Variable.myInfo._id == userInfo._id ?
                                        <div
                                            class="c-usershortinfo__status"
                                            id="userstatus"
                                            contenteditable="true"
                                            onblur={async function (e) {
                                                if(!e.target.innerText.trim()) {
                                                    return
                                                }
                                                console.log('=6569c1=', `статус: ${e.target.innerText}`)
                                                let data = {
                                                    value: {
                                                        "information.status": e.target.innerText.trim()
                                                    }
                                                }
                                                // console.log('=11bc62=data=', data)
                                                const response = await fn.restApi.setUsers.update({
                                                    data: data
                                                })

                                                // console.log('=87542b=response=', response)
                                                if (response.status === 'ok') {
                                                    
                                                } else {
                                                    Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error] } }, true);
                                                }
                                                initReload()
                                            }}
                                        >
                                            {userInfo.information && userInfo.information.status ? userInfo.information.status : Variable.lang.span.status}
                                        </div>
                                        :

                                        <div
                                            class="c-usershortinfo__status"
                                            id="userstatus"
                                        >
                                            {userInfo.information && userInfo.information.status ? userInfo.information.status : Variable.lang.span.status}
                                        </div>
                                }
                            </div>

                            {/* IF (myInfo._id=userInfo._id) */}
                            <div class="c-userpreview__level">
                                <div
                                    style={`width: ${fn.percent(userInfo.statistic.exp, userInfo.statistic.expNext)}%;`}
                                    class="c-userpreview__current"
                                ></div>
                                <div class="c-userpreview__num">{userInfo.statistic.exp}/{userInfo.statistic.expNext}</div>
                            </div>
                        </div>
                    </div>


                    <div class="c-usercategories  c-container">



                        <div class="c-usercategories__item">
                            <i
                                class={[
                                    'c-usercategories__icon',
                                    profilePage == 'lentaFriends' ? 'c-usercategories__icon--lentafriends' : 'c-usercategories__icon--lentafriends_inactive'
                                ]}
                                data-profilePage="lentaFriends"
                                onclick={changeType}
                            ></i>
                        </div>



                        <div class="c-usercategories__item">
                            <i
                                class={[
                                    'c-usercategories__icon',
                                    profilePage == 'aboutUser' ? 'c-usercategories__icon--information' : 'c-usercategories__icon--information_inactive'
                                ]}
                                data-profilePage="aboutUser"
                                onclick={changeType}
                            ></i>
                        </div>
                        <div data-type="questions" class="c-usercategories__item">
                            <i
                                class={[
                                    'c-usercategories__icon',
                                    profilePage == 'questions' ? 'c-usercategories__icon--questions' : 'c-usercategories__icon--questions_inactive'
                                ]}
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
                                class={[
                                    'c-usercategories__icon',
                                    profilePage == 'answers' ? 'c-usercategories__icon--answers' : 'c-usercategories__icon--answers_inactive'
                                ]}
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
                                class={[
                                    'c-usercategories__icon',
                                    profilePage == 'subscribers' ? 'c-usercategories__icon--followers' : 'c-usercategories__icon--followers_inactive'
                                ]}
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
                                class={[
                                    'c-usercategories__icon',
                                    profilePage == 'friends' ? 'c-usercategories__icon--friends' : 'c-usercategories__icon--friends_inactive'
                                ]}
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
                                class={[
                                    'c-usercategories__icon',
                                    profilePage == 'awards' ? 'c-usercategories__icon--awards' : 'c-usercategories__icon--awards_inactive'
                                ]}
                                data-profilePage="awards"
                                onclick={changeType}
                            ></i>
                        </div>
                        <div data-type="social" class="c-usercategories__item">
                            <i
                                class={[
                                    'c-usercategories__icon',
                                    profilePage == 'social' ? 'c-usercategories__icon--social' : 'c-usercategories__icon--social_inactive'
                                ]}
                                data-profilePage="social"
                                onclick={changeType}
                            ></i>
                        </div>
                        <div data-type="galary" class="c-usercategories__item">
                            <i
                                class={[
                                    'c-usercategories__icon',
                                    profilePage == 'galary' ? 'c-usercategories__icon--galary' : 'c-usercategories__icon--galary_inactive'
                                ]}
                                data-profilePage="galary"
                                onclick={changeType}
                            ></i>
                            {/* <img
                                class="c-usercategories__img"
                                src={svg[`sections/galary${profilePage != 'galary' ? '_inactive' : ''}`]}
                                data-profilePage="galary"
                                onclick={changeType}
                            /> */}
                        </div>

                        {/* 
                            <div data-updating="true" data-type="donation" data-action="link" class="c-usercategories__item">
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
                            </div> 
                        */}
                    </div>

                    <div class="userMainBlock">
                        {() => {

                            return BlockUserProfilePage[profilePage](Static, { profilePage, userInfo })
                        }}
                    </div>
                </div>
            )
        }, ID)
};

export default start;