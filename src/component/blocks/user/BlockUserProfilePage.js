import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi,
    Helpers
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import { Avatar, ItemsMenu, NotFound } from '@component/element/index.js';
import { BlockLentaUsers } from '@component/blocks/index.js';

const BlockUserProfilePage = {}

BlockUserProfilePage.lentaFriends = function (Static, data, ID) {
    // console.log('=8d74d9=', data)

    if (!data || data.profilePage != "lentaFriends") {
        return (<></>)
    }

    return (
        <div class="bl_one c-container" id="UserInfoLenta">
            <div class="user_main_block">
                <div class="user_news">
                    <div class="user_news_block">
                        {
                            data.userInfo._id == Variable.myInfo._id ?
                                <h2>{Variable.lang.h.posts_my}</h2>
                                :
                                <h2>{Variable.lang.h.posts_user}</h2>
                        }
                        {
                            !data.items || !data.items.list_records.length
                                ?
                                <NotFound />
                                :
                                <div style="width: 100%">
                                    {data.items.list_records.map((item) => {
                                        return (
                                            <BlockLentaUsers
                                                Static={Static}
                                                item={item}
                                                ElemVisible={() => {
                                                    fn.recordsView(item._id, "setPost")
                                                }}
                                            />
                                        )
                                    })
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

BlockUserProfilePage.aboutUser = function (Static, data) {
    if (!data || data.profilePage != "aboutUser") {
        return (<></>)
    }

    return (
        <div class="bl_one c-container" id="UserInfoAbout">
            <h2>{Variable.lang.h.personalInfo}</h2>
            <div class="about_user">
                <div class="about_user_section-1 about_user_section-row_type-2">
                    <div class="about_user_section-row_type-3">
                        <div class="about_user_section">
                            {() => {
                                if (Variable.myInfo._id == data.userInfo._id) {
                                    return (
                                        <div class="about_user_section_inner">
                                            <p>{Variable.lang.p.aboutMe}</p>
                                            <span class="about_me_block">
                                                {data.userInfo.information.about ? Helpers.clearText(data.userInfo.information.about) : ''}
                                            </span>
                                            <img class="edit_about_me" src={svg['pencil']} />
                                            <div class="user_grid_info-1">
                                                <div class="user_short_info_row">
                                                    <span>{Variable.lang.label.name}</span>
                                                    <div>
                                                        <img class="editblockinfo" src={svg['pencil']} />
                                                        <input id="fullname" class="userinfoinput" readonly value={data.userInfo.fullname} /></div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{Variable.lang.label.speciality}</span>
                                                    <div>
                                                        <img class="editblockinfo" src={svg['pencil']} />
                                                        <input id="speciality" class="userinfoinput" readonly value={data.userInfo.information.speciality} />
                                                    </div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{Variable.lang.label.country}</span>
                                                    <div><input id="country" class="userinfoinput" readonly value={data.userInfo.country.eng_name} />
                                                    </div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{Variable.lang.label.city}</span>
                                                    <div><img class="editblockinfo" src={svg['pencil']} />
                                                        <input id="city" class="userinfoinput" readonly value={data.userInfo.information.city} />
                                                    </div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{Variable.lang.label.birthDate}</span>
                                                    <div>
                                                        <img class="editblockinfo" src={svg['pencil']} />
                                                        <input type="date" id="birthday" class="userinfoinput" readonly value={data.userInfo.information.birthday ? Helpers.getDateFormat(data.userInfo.information.birthday) : ''} /></div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{Variable.lang.span.regDate}</span>
                                                    <div><input type="date" class="userinfoinput" readonly value={Helpers.getDateFormat(data.userInfo.information.dateCreate)} /></div>
                                                </div>
                                            </div>

                                            <div class="about_user_section_points_container">
                                                <img
                                                    onclick={() => {
                                                        fn.modals.ModalUserInfoEdit(data.userInfo);
                                                        // Variable.SetModals({ name: "ModalUserInfoEdit", data: data.userInfo })
                                                    }}
                                                    class="about_user_section_points"
                                                    src={svg['pencil']}
                                                />
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div class="about_user_section_inner">
                                            <p>{Variable.lang.p.aboutMe}</p>
                                            {() => {
                                                if (data.userInfo.information.about) {
                                                    return (
                                                        <span class="about_me_block">{Helpers.clearText(data.userInfo.information.about)}</span>
                                                    )
                                                }
                                            }}
                                            <div class="user_grid_info-1">
                                                {() => {
                                                    if (data.userInfo.fullname) {
                                                        return (
                                                            <div class="user_short_info_row">
                                                                <span>{Variable.lang.label.name}</span>
                                                                <div><input id="fullname" class="userinfoinput" readonly value={data.userInfo.fullname} /></div>
                                                            </div>
                                                        )
                                                    }
                                                }}
                                                {() => {
                                                    if (data.userInfo.information.speciality) {
                                                        return (
                                                            <div class="user_short_info_row">
                                                                <span>{Variable.lang.label.speciality}</span>
                                                                <div><input id="speciality" class="userinfoinput" readonly value={data.userInfo.information.speciality} /></div>
                                                            </div>
                                                        )
                                                    }
                                                }}
                                                {() => {
                                                    if (data.userInfo.country.eng_name) {
                                                        return (
                                                            <div class="user_short_info_row">
                                                                <span>{Variable.lang.label.country}</span>
                                                                <div><input id="country" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={data.userInfo.country.eng_name} /></div>
                                                            </div>
                                                        )
                                                    }
                                                }}
                                                {() => {
                                                    if (data.userInfo.information.city) {
                                                        return (
                                                            <div class="user_short_info_row">
                                                                <span>{Variable.lang.label.city}</span>
                                                                <div><input id="city" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={data.userInfo.information.city} /></div>
                                                            </div>
                                                        )
                                                    }
                                                }}
                                                {() => {
                                                    if (data.userInfo.information.dateCreate) {
                                                        return (
                                                            <div class="user_short_info_row">
                                                                <span>{Variable.lang.span.regDate}</span>
                                                                <div><input type="date" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={Helpers.getDateFormat(data.userInfo.information.dateCreate)} /></div>
                                                            </div>
                                                        )
                                                    }
                                                }}
                                                {/* <If
                                                    data={data.userInfo.information.birthday}
                                                    dataIf={
                                                        <div class="user_short_info_row">
                                                            <span>{Variable.lang.label.birthDate}</span>
                                                            <div><input type="date" id="birthDate" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={Helpers.getDateFormat(data.userInfo.information.birthday)} /></div>
                                                        </div>
                                                    }
                                                /> */}
                                            </div>
                                        </div>
                                    )
                                }
                            }}
                        </div>
                    </div>
                </div>
                <div class="about_user_section-1 about_user_section-row_type-2">
                    <div class="about_user_section-row_type-3">
                        <div class="about_user_section">
                            <div class="about_user_section_inner interests_block">
                                <p>{Variable.lang.p.interests}</p>
                                {() => {
                                    if (Variable.myInfo._id == data.userInfo._id) {
                                        return (
                                            <div class="about_user_section_points_container">
                                                <ItemsMenu
                                                    author={data.userInfo}
                                                    items={
                                                        [
                                                            {
                                                                text: Variable.lang.button.add,
                                                                type: "edit",
                                                                onclick: async () => {
                                                                    Variable.SetModals({ name: "ModalUserInterests", data: {} })

                                                                }
                                                            },
                                                            {
                                                                text: Variable.lang.button.edit,
                                                                type: "edit",
                                                                onclick: async () => {
                                                                 //   console.log('=7e4dce=', "gggg")

                                                                }
                                                            }
                                                        ]
                                                    }
                                                />
                                            </div>
                                        )
                                    }
                                }}
                                {
                                    data.userInfo.interest.map((item, index) => {
                                        return (
                                            <div>
                                                <b>{item.title}<img class="editbigblockinfo" style="display: none;" src={svg['pencil']} /></b>
                                                <span>{item.description}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div class="about_user_section-row_type-3">
                        <div class="about_user_section">
                            <div class="about_user_section_inner work_block">
                                <p>{Variable.lang.p.work}</p>
                                <div class="work_and_education">
                                </div>
                                {() => {
                                    if (Variable.myInfo._id == data.userInfo._id) {
                                        return (
                                            <div class="about_user_section_points_container">
                                                <ItemsMenu
                                                    author={data.userInfo}
                                                    items={
                                                        [
                                                            {
                                                                text: Variable.lang.button.add,
                                                                type: "edit",
                                                                onclick: async () => {
                                                                 //   console.log('=7e4dce=', "gggg")

                                                                }
                                                            },
                                                            {
                                                                text: Variable.lang.button.edit,
                                                                type: "edit",
                                                                onclick: async () => {
                                                                 //   console.log('=7e4dce=', "gggg")

                                                                }
                                                            }

                                                        ]
                                                    }
                                                />
                                            </div>
                                        )
                                    }
                                }}
                                {
                                    data.userInfo.work.map((item, index) => {
                                        return (
                                            <div id={item._id} class="work_and_education_block">
                                                <span>{item.title} <img class="editworkinfo" style="display: none;" src={svg['pencil']} /></span>
                                                <span>{item.period}</span>
                                                <span>{item.description}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

BlockUserProfilePage.awards = function (Static, data) {
    if (!data || data.profilePage != "awards") {
        return (<></>)
    }


    return (
        <div class="bl_one c-container" id="UserInfoAwards">
            <h2>{Variable.lang.h.reciveAwards}</h2>
            <div class="awards_block">
                <div class="awards_body">
                    {
                        data.userInfo.awards.map((item, index) => {
                         
                            let icon = item.icon.split(".")[0];
                            return (
                                <div class="award">
                                    <img src={svg[`badge/${icon}`]} class="awards_small_badge" />
                                    <img src={svg[`badge/${icon}`]} class="awards_badge" />
                                    <div class="award_description">
                                        <p class="awards_title">{Variable.lang.awards[item.name]}</p>
                                        <p class="awards_text">{item.action.split("-")[1]} {Variable.lang.awards[item.description]}</p>
                                        <p class="progress_bar_label">{Variable.lang.p.receive}</p>
                                        <p class="progress_bar_label">{Helpers.getDateFormat(item.dateCreate)}</p>
                                    </div>
                                </div>
                            )
                        })
                    }


                    {/* {ListAwards} */}
                </div>
            </div>
        </div>
    )
}

BlockUserProfilePage.subscribers = function (Static, data) {
    if (!data || data.profilePage != "subscribers") {
        return (<></>)
    }

    return (
        <div class="bl_one c-container" id="UserInfoFollowers">
            <h2>{Variable.lang.toggle.subscribers}</h2>
            <div class="friends_block">
                {
                    Static.activeItems.list_records.map((item, index) => {
                        return (
                            <div
                                class="friend"
                                onclick={(e) => {
                                    if (Variable.myInfo && Variable.myInfo.nickname == item.nickname) {
                                        fn.siteLink(e)
                                    } else {
                                        fn.siteLinkModal(e, { title: item.nickname, style: 'background: #1D2029;' })
                                    }
                                }
                                }
                                data-href={'/user/' + item.nickname}>
                                <Avatar author={item} />
                                <div class="friend_info">
                                    <p>{item.nickname}</p>
                                    <p>{item.fullname ? item.fullname : ''}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* <If
                data={haveFilter}
                dataIf={
                    <div class="friends friends_block_container" data-type="{{typeSearch}}">
                        <h2></h2>
                        <div class="friends_search">
                            <div class="friends_search_top">
                                <input autocomplete="off" type="text" data-keyup="friendsSearchType" data-type="followers" placeholder="{{findPreholder}}"/>
                                <div class="filter_summoner" data-action="filterSummoner">
                                    <img src={svg['filter']}/>
                                    <span>{Variable.lang.span.filter}</span>
                                </div>
                            </div>
                            <div style="display: none" class="friends_search_filter">
                                <div class="filter_block_container">
                                    <div data-language="all" data-language_code="all" class="friends_filter_language" data-action="friendsLanguageFilter" data-name="{{Variable.lang.text.language}}">
                                        {Variable.lang.text.language}
                                    </div>
                                    <img style="display: none;" class="refresh_language" data-action="refreshLanguage" src="/assets/icon/refresh_filter.svg"/>
                                </div>
                                <div class="filter_block_container">
                                    <div data-country="all" data-country_code="all" class="friends_filter_country" data-action="friendsCountryFilter" data-name="{{Variable.lang.text.country}}">
                                        {Variable.lang.text.country}
                                    </div>
                                    <img style="display: none;" class="refresh_country" data-action="refreshCountry" src="/assets/icon/refresh_filter.svg"/>
                                </div>   
                                <div class="friends_filter_checkboxs">
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input checked="false" class="checkbox__input" type="checkbox" id="common" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{Variable.lang.select.users_regular}</label>
                                    </div>
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input checked="true" class="checkbox__input" type="checkbox" id="content-makers" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{Variable.lang.select.users_contentCreater}</label>
                                    </div>
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input checked="true" class="checkbox__input" type="checkbox" id="specialists" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{Variable.lang.select.users_experts}</label>
                                    </div>
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input class="checkbox__input" type="checkbox" id="online" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{Variable.lang.span.online}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="friends_block">
                            {ListSubscribes}
                        </div>
                    </div>
                }
                dataElse={
                    {ListSubscribes}
                }
            /> */}
        </div >
    )

}

BlockUserProfilePage.friends = function (Static, data) {
   // console.log(data,"block friends")
    if (!data || data.profilePage != "friends") {
        return (<></>)
    }
    return (
        <div class="bl_one c-container" id="UserInfoFollowers">
            <h2>{Variable.lang.toggle.friends}</h2>
            <div class="friends_block">
                {
                    Static.activeItems.list_records[0].subscribed.map((item, index) => {
                        return (
                            <div
                                class="friend"
                                onclick={(e) => {
                                    if (Variable.myInfo && Variable.myInfo.nickname == item.nickname) {
                                        fn.siteLink(e)
                                    } else {
                                        fn.siteLinkModal(e, { title: item.nickname, style: 'background: #1D2029;' })
                                    }
                                }
                                }
                                data-href={'/user/' + item.nickname}>
                                <Avatar author={item} />
                                <div class="friend_info">
                                    <p>{item.nickname}</p>
                                    <p>{item.fullname ? item.fullname : ''}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* <If
                data={haveFilter}
                dataIf={
                    <div class="friends friends_block_container" data-type="{{typeSearch}}">
                        <h2></h2>
                        <div class="friends_search">
                            <div class="friends_search_top">
                                <input autocomplete="off" type="text" data-keyup="friendsSearchType" data-type="followers" placeholder="{{findPreholder}}"/>
                                <div class="filter_summoner" data-action="filterSummoner">
                                    <img src={svg['filter']}/>
                                    <span>{Variable.lang.span.filter}</span>
                                </div>
                            </div>
                            <div style="display: none" class="friends_search_filter">
                                <div class="filter_block_container">
                                    <div data-language="all" data-language_code="all" class="friends_filter_language" data-action="friendsLanguageFilter" data-name="{{Variable.lang.text.language}}">
                                        {Variable.lang.text.language}
                                    </div>
                                    <img style="display: none;" class="refresh_language" data-action="refreshLanguage" src="/assets/icon/refresh_filter.svg"/>
                                </div>
                                <div class="filter_block_container">
                                    <div data-country="all" data-country_code="all" class="friends_filter_country" data-action="friendsCountryFilter" data-name="{{Variable.lang.text.country}}">
                                        {Variable.lang.text.country}
                                    </div>
                                    <img style="display: none;" class="refresh_country" data-action="refreshCountry" src="/assets/icon/refresh_filter.svg"/>
                                </div>   
                                <div class="friends_filter_checkboxs">
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input checked="false" class="checkbox__input" type="checkbox" id="common" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{Variable.lang.select.users_regular}</label>
                                    </div>
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input checked="true" class="checkbox__input" type="checkbox" id="content-makers" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{Variable.lang.select.users_contentCreater}</label>
                                    </div>
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input checked="true" class="checkbox__input" type="checkbox" id="specialists" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{Variable.lang.select.users_experts}</label>
                                    </div>
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input class="checkbox__input" type="checkbox" id="online" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{Variable.lang.span.online}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="friends_block">
                            {ListSubscribes}
                        </div>
                    </div>
                }
                dataElse={
                    {ListSubscribes}
                }
            /> */}
        </div >
    )
}


BlockUserProfilePage.answers = function (Static, data) {
    if (!data || data.profilePage != "answers") {
        return (<></>)
    }

    return (
        <div class="bl_one c-container" id="UserInfoAnswers">
            <h2>{Variable.lang.h.sendAnswers}</h2>
            <div class="your_answers_table_labels">
                <span>{Variable.lang.tableTitle.question}</span>
                <span>{Variable.lang.tableTitle.comments}</span>
                <span>{Variable.lang.tableTitle.rank}</span>
                <span>{Variable.lang.tableTitle.answer}</span>
            </div>
            {
                Static.activeItems.list_records.map((item, index) => {
                    return (
                        <div class={["your_answers_table_item", !item.close ? 'deleted_question' : null]}>
                            <div class="your_answers_main">
                                <div class="my_answers_title_block">
                                    <Avatar
                                        author={item.questionId.author}
                                    />
                                    <div>
                                        <a href={'/question/show/' + item.questionId._id} onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.questionsAnswers, itemID: item.questionId._id }) }}>
                                            <div class="user_question_title">
                                                {item.questionId.title}
                                            </div>
                                        </a>
                                        <div>
                                            <div class="user_answer_created">
                                                <span>{Helpers.getDateFormat(item.questionId.showDate, "time")}</span>
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="your_answers_counter">
                                <span class="your_answers_counter_desc">{Variable.lang.tableTitle.comments}</span><span class="your_answers_counter_number">{item.statistic.comments}</span>
                            </div>
                            <div class="your_answers_counter">
                                <span class="your_answers_counter_desc">{Variable.lang.tableTitle.rank}</span><span class="your_answers_counter_number">{item.statistic.rating}</span>
                            </div>
                            <div class={item.best ? 'your_answers_avatar your_answer_text_best' : 'your_answers_avatar'}>
                                <div class="your_answer_text">
                                    {Helpers.clearText(item.text)}
                                </div>
                            </div>
                            {() => {
                                if (item.active) {
                                    return (
                                        <div data-action="yourAnswersOptional" class="your_answers_optional">
                                            <ItemsMenu author={item.author} items={fn.itemsMenu.answer(Static, item, data.items)} />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div class="delete_question"></div>
                                    )
                                }
                            }}
                        </div>
                    )
                })
            }
            {() => {
                if (Static.activeItems.list_records.length < Static.activeItems.totalFound) {
                    return (
                        <div class="crypto_exchanges_footer">
                            <a class="btn-view-all-a"
                                onclick={async () => {

                                    let tmp = await sendApi.send({
                                        action: "getAnswers", short: true, filter: {
                                            author: data.userInfo._id,
                                        },
                                        select: { best: 1, active: 1, author: 1, statistic: 1, showDate: 1, media: 1, text: 1, comments: 1, questionId: 1 },
                                        limit: 10,
                                        offset: Static.activeItems.list_records.length
                                    });

                                    Variable.PageUserProfileAnswers.list_records.push(...tmp.list_records)
                                    initReload()
                                }
                                }
                            >
                                <div class="btn-view-all" >
                                    <div>{Variable.lang.button.showMore}</div>
                                </div>
                            </a>
                        </div>
                    )
                }
            }}
        </div>
    )

}

BlockUserProfilePage.questions = function (Static, data) {
    if (!data || data.profilePage != "questions") {
        return (<></>)
    }

    initOne(
        () => {

        }
    )

    return (
        <div class="bl_one c-container" id="UserInfoQuestions">
            <h2>{Variable.lang.h.sendQuestions}</h2>
            <div class="your_answers_table_labels">
                <span>{Variable.lang.tableTitle.question}</span>
                <span>{Variable.lang.tableTitle.answers}</span>
                <span>{Variable.lang.tableTitle.views}</span>
                <span>{Variable.lang.tableTitle.bestanswer}</span>
            </div>
            <div class="your_answers_table">
                {
                    Static.activeItems.list_records.map((item, index) => {
                        return (
                            <div class={["your_answers_table_item", !item.close ? 'deleted_question' : null]}>
                                <div class="your_answers_main">
                                    <a href={'/question/show/' + item._id} onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.questionsAnswers, item: item }) }}>
                                        <div class="user_question_title">
                                            {item.title}
                                        </div>
                                    </a>
                                    <div>
                                        <div class="user_answer_created">
                                            <span>{Helpers.getDateFormat(item.showDate, "time")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="your_answers_counter">
                                    <span class="your_answers_counter_desc">{Variable.lang.tableTitle.answers}</span><span class="your_answers_counter_number">{item.statistic.answer}</span>
                                </div>
                                <div class="your_answers_counter">
                                    <span class="your_answers_counter_desc">{Variable.lang.tableTitle.views}</span><span class="your_answers_counter_number">{item.statistic.view}</span>
                                </div>
                                {() => {
                                    if (item.bestId) {
                                        return (
                                            <div class="your_answers_avatar">
                                                <Avatar
                                                    author={item.bestId.author}
                                                />
                                                <div class="your_answers_name">
                                                    <p>{item.bestId.author.nickname}</p>
                                                    <p> </p>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div class="your_answers_avatar">
                                                ---
                                            </div>
                                        )
                                    }
                                }}
                                <div class="your_answers_status">
                                    <div class="your_answers_status_inner">
                                        {() => {
                                            if (item.del) {
                                                return (
                                                    <img src={svg['question_status_delete']} />
                                                )
                                            } else if (item.close) {
                                                if (item.bestId) {
                                                    return (
                                                        <img src={svg['best_answer']} />
                                                    )
                                                } else {
                                                    return (
                                                        <img src={svg['closed_question']} />
                                                    )
                                                }
                                            } else {
                                                return (
                                                    <img src={svg['open_question']} />
                                                )
                                            }
                                        }}
                                    </div>
                                </div>
                                {() => {
                                    if (item.del) {
                                        return (
                                            <div class="delete_question"></div>
                                        )
                                    } else {
                                        return (
                                            <div class="your_answers_optional">
                                                <ItemsMenu author={item.author} items={fn.itemsMenu.question(Static, item)} />
                                            </div>
                                        )
                                    }
                                }}
                            </div>
                        )
                    })
                }
            </div>
            {() => {
                if (Static.activeItems.list_records.length < Static.activeItems.totalFound) {
                    return (
                        <div class="crypto_exchanges_footer">
                            <a class="btn-view-all-a"
                                onclick={async () => {

                                    let tmp = await sendApi.send({
                                        action: "getQuestions", short: true, filter: {
                                            author: data.userInfo._id,
                                        },
                                        select: { title: 1, text: 1, showDate: 1, statistic: 1, languages: 1, close: 1, bestId: 1, media: 1, author: 1 },
                                        limit: 10,
                                        offset: Static.activeItems.list_records.length
                                    });

                                    Variable.PageUserProfileQuestions.list_records.push(...tmp.list_records)
                                    initReload()
                                }}
                            >
                                <div class="btn-view-all" >
                                    <div>{Variable.lang.button.showMore}</div>
                                </div>
                            </a>
                        </div>
                    )
                }
            }}
        </div>
    )
};

export { BlockUserProfilePage }