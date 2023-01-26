import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi,
    Helpers
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import { Avatar, ItemsMenu, NotFound, VideoPlayer, Input } from '@component/element/index.js';
import { BlockLentaUsers } from '@component/blocks/index.js';

let visibleEditInterest = false;
let visibleEditWork = false;

const BlockUserProfilePage = {}

BlockUserProfilePage.lentaFriends = function (Static, data, ID) {


    // console.log('=8d74d9=', Static, data)

    if (!data || data.profilePage != "lentaFriends") {
        return (<></>)
    }

    // initOne(
    //     () => {
    //         Static.activeView = "tile";
    //     }
    // )

    return (
        <div class="bl_one c-container" id="UserInfoLenta">
            <div class="user_main_block">
                <div class="user_news">
                    <div
                        class={[
                            "user_news_block",
                            Static.activeView == "tile" ? "user_news_block--tiles" : null
                        ]}
                    >
                        <div class="user_news_header">
                            {
                                data.userInfo._id == Variable.myInfo._id ?
                                    <h2>{Variable.lang.h.posts_my}</h2>
                                    :
                                    <h2>{Variable.lang.h.posts_user}</h2>
                            }

                            <ul class="user_news_togglersview">
                                <li
                                    onclick={function (e) {
                                        e.stopPropagation();
                                        Static.activeView = "list"
                                        initReload();
                                    }}
                                >
                                    <a
                                        href=""
                                        class={[
                                            "user_news_toggler",
                                            "user_news_toggler--list",
                                            Static.activeView == "list" ? "user_news_toggler--active" : null
                                        ]}
                                    >Список</a>
                                </li>
                                <li
                                    onclick={function (e) {
                                        e.stopPropagation();
                                        Static.activeView = "tile"
                                        initReload();
                                    }}
                                >
                                    <a
                                        href=""
                                        class={[
                                            "user_news_toggler",
                                            "user_news_toggler--tile",
                                            Static.activeView == "tile" ? "user_news_toggler--active" : null
                                        ]}
                                    >Плитка</a>
                                </li>
                            </ul>
                        </div>
                        {
                            !Static.activeItems || !Static.activeItems.list_records || !Static.activeItems.list_records.length
                                ?
                                <NotFound />
                                :
                                <div
                                    style="width: 100%"
                                    class={[
                                        Static.activeView == "tile" ? "c-tiles" : null
                                    ]}
                                >
                                    {Static.activeItems.list_records.map((item) => {
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
                                                                    fn.modals.ModalUserInterests({ type: 'add', userInfo: {} });
                                                                }
                                                            },
                                                            {
                                                                text: Variable.lang.button.edit,
                                                                type: "edit",
                                                                onclick: async () => {
                                                                    visibleEditInterest = true
                                                                    initReload()
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
                                                <b>
                                                    {item.title}
                                                    <img
                                                        class="editbigblockinfo"
                                                        src={svg['pencil']}
                                                        style={visibleEditInterest ? "display: inline;" : "display: none;"}
                                                        onclick={async () => {
                                                            fn.modals.ModalUserInterests({ type: 'edit', userInfo: item });
                                                        }}
                                                    />
                                                </b>
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
                                                                    fn.modals.ModalUserAddWork({ type: 'add', userInfo: {} });
                                                                }
                                                            },
                                                            {
                                                                text: Variable.lang.button.edit,
                                                                type: "edit",
                                                                onclick: async () => {
                                                                    visibleEditWork = true
                                                                    initReload()
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
                                                <span>
                                                    {item.title}
                                                    <img
                                                        class="editworkinfo"
                                                        src={svg['pencil']}
                                                        style={visibleEditWork ? "display: inline;" : "display: none;"}
                                                        onclick={async () => {
                                                            fn.modals.ModalUserAddWork({ type: 'edit', userInfo: item });
                                                        }}
                                                    />
                                                </span>
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

BlockUserProfilePage.friends = async function (Static, data) {
    // console.log(data,"block friends")
    if (!data || data.profilePage != "friends") {
        return (<></>)
    }

    console.log('=f1fc83=', Static)

    return (
        <div class="bl_one c-container" id="UserInfoFollowers">
            <h2>{Variable.lang.toggle.friends}</h2>

            {/* <div class="c-questions__searchblock c-search">
                <div class="c-search__container">
                    <div class="c-search__wrapper">
                        <img class="c-search__icon" src={svg.search_icon} />
                        <Input className="c-search__input" Static={Static.search} customStyle={"border-radius: 3px"} />
                    </div>
                    <div style="display: none;" class="questions_search">
                        <div class="question_search_half_empty">
                            {Variable.lang.text.contInput}
                        </div>
                        <div style="display: none;" class="question_search_help"></div>
                    </div>
                </div>
            </div> */}

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

BlockUserProfilePage.social = function (Static, data) {
    if (!data || data.profilePage != "social") {
        return (<></>)
    }

    initOne(
        () => {
            Static.channelNewSocial = "";
            Static.linkNewSocial = "";
            Static.nameNewSocial = "";
            Static.descriptionNewSocial = "";
        }
    )
    console.log('=social Static=', Static)
    // console.log('=social data=', data)

    return (
        <div class="bl_one c-container c-usersocial" id="UserInfoSocial">
            <div class="user_social_header c-usersocial__header">
                <h3>{Variable.lang.h.userSocials}</h3>
                {
                    data.userInfo._id == Variable.myInfo._id ?
                        <img
                            class="c-usersocial__toggler"
                            src={svg["pen"]}
                            onclick={() => {
                                Static.viewForm = !Static.viewForm
                                initReload()
                            }}
                        />
                        : null
                }
            </div>

            <div
                class={[
                    "createSocialForm",
                    Static.viewForm ? null : "c-hidden"
                ]}

            >
                <div class="create_social_icons">
                    <div class="create_social_icons">
                        <div
                            data-link="https://www.youtube.com/c/"
                            data-social="youtube"
                            class="create_social_icon youtube"
                            onclick={(e) => { e.preventDefault(); Static.channelNewSocial = e.currentTarget.dataset.social; Static.linkNewSocial = e.currentTarget.dataset.link; initReload(); }}
                        >
                            <div class="create_social_icon_inner">
                                <img src={svg["youtube_icon"]} />
                            </div>
                        </div>
                        <div
                            data-link="https://www.facebook.com/"
                            data-social="facebook"
                            class="create_social_icon facebook"
                            onclick={(e) => { e.preventDefault(); Static.channelNewSocial = e.currentTarget.dataset.social; Static.linkNewSocial = e.currentTarget.dataset.link; initReload(); }}
                        >
                            <div class="create_social_icon_inner">
                                <img src={svg["facebook_icon"]} />
                            </div>
                        </div>
                        <div
                            data-link="https://www.twitter.com/"
                            data-social="twitter"
                            class="create_social_icon twitter"
                            onclick={(e) => { e.preventDefault(); Static.channelNewSocial = e.currentTarget.dataset.social; Static.linkNewSocial = e.currentTarget.dataset.link; initReload(); }}
                        >
                            <div class="create_social_icon_inner">
                                <img src={svg["twitter_icon"]} />
                            </div>
                        </div>
                        <div
                            data-link="https://www.discord.com/invite/"
                            data-social="discord"
                            class="create_social_icon discord"
                            onclick={(e) => { e.preventDefault(); Static.channelNewSocial = e.currentTarget.dataset.social; Static.linkNewSocial = e.currentTarget.dataset.link; initReload(); }}
                        >
                            <div class="create_social_icon_inner">
                                <img src={svg["discord_icon"]} />
                            </div>
                        </div>
                        <div
                            data-link="https://www.instagram.com/"
                            data-social="instagram"
                            class="create_social_icon instagram"
                            onclick={(e) => { e.preventDefault(); Static.channelNewSocial = e.currentTarget.dataset.social; Static.linkNewSocial = e.currentTarget.dataset.link; initReload(); }}
                        >
                            <div class="create_social_icon_inner">
                                <img src={svg["instagram_icon"]} />
                            </div>
                        </div>
                        <div
                            data-link="https://www.tiktok.com/@"
                            data-social="tiktok"
                            class="create_social_icon tiktok"
                            onclick={(e) => { e.preventDefault(); Static.channelNewSocial = e.currentTarget.dataset.social; Static.linkNewSocial = e.currentTarget.dataset.link; initReload(); }}
                        >
                            <div class="create_social_icon_inner">
                                <img src={svg["tiktok_icon"]} />
                            </div>
                        </div>
                        <div
                            data-link="https://www.twitch.tv/"
                            data-social="twitch"
                            class="create_social_icon twitch"
                            onclick={(e) => { e.preventDefault(); Static.channelNewSocial = e.currentTarget.dataset.social; Static.linkNewSocial = e.currentTarget.dataset.link; initReload(); }}
                        >
                            <div class="create_social_icon_inner">
                                <img src={svg["twitch_icon"]} />
                            </div>
                        </div>
                        <div
                            data-link="https://www.vk.com/"
                            data-social="vk"
                            class="create_social_icon vk"
                            onclick={(e) => { e.preventDefault(); Static.channelNewSocial = e.currentTarget.dataset.social; Static.linkNewSocial = e.currentTarget.dataset.link; initReload(); }}
                        >
                            <div class="create_social_icon_inner">
                                <img src={svg["vk-icon"]} />
                            </div>
                        </div>
                        <div
                            data-link="https://www.t.me/"
                            data-social="telegram"
                            class="create_social_icon telegram"
                            onclick={(e) => { e.preventDefault(); Static.channelNewSocial = e.currentTarget.dataset.social; Static.linkNewSocial = e.currentTarget.dataset.link; initReload(); }}
                        >
                            <div class="create_social_icon_inner">
                                <img src={svg["telegram-icon"]} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="create_social_inputs">
                    <input
                        data-keyup="deleteBorder"
                        class="create_social_link"
                        type="text"
                        placeholder={Variable.lang.placeholder.link}
                        value={Static.linkNewSocial}
                        oninput={function (e) {
                            Static.linkNewSocial = this.value.trim()
                        }}
                    />
                    <input
                        data-keyup="deleteBorder"
                        class="create_social_name"
                        type="text"
                        placeholder={Variable.lang.placeholder.title}
                        value={Static.nameNewSocial}
                        oninput={function (e) {
                            Static.nameNewSocial = this.value.trim()
                        }}
                    />
                    <input
                        data-keyup="deleteBorder"
                        class="create_social_desc"
                        type="text"
                        placeholder={Variable.lang.placeholder.shortDescription}
                        value={Static.descriptionNewSocial}
                        oninput={function (e) {
                            Static.descriptionNewSocial = this.value.trim()
                        }}
                    />
                </div>
                <a
                    href=""
                    class="c-button c-button--primary2"
                    disabled={!Static.isValid ? "disabled" : null}
                    onclick={async function (e) {
                        e.preventDefault();
                        // fn.checkValid(Static, ["descriptionNewSocial", "nameNewSocial", "linkNewSocial"])
                        Static.isValid = (Static.channelNewSocial && Static.channelNewSocial.length > 2)
                            && (Static.descriptionNewSocial && Static.descriptionNewSocial.length > 2)
                            && (Static.nameNewSocial && Static.nameNewSocial.length > 2)
                            && (Static.linkNewSocial && Static.linkNewSocial.length > 2)
                        console.log('=Static.isValid=', Static.isValid)

                        if (!Static.isValid && Static.isValid != 'undefined') {
                            return false;
                        } else {
                            let data = {
                                value: {
                                    social: [
                                        {
                                            channel: Static.channelNewSocial,
                                            description: Static.descriptionNewSocial,
                                            name: Static.nameNewSocial,
                                            url: Static.linkNewSocial,
                                        }
                                    ]
                                }
                            }
                            console.log('=11bc61=data=', data)

                            const response = await fn.restApi.setUsers.update({
                                data: data
                            })

                            console.log('=87542b=response=', response)

                            if (response.status === 'ok') {
                                Static.activeItems.list_records[0].social.push(response.list_records)
                                Static.channelNewSocial = ""
                                Static.descriptionNewSocial = ""
                                Static.nameNewSocial = ""
                                Static.linkNewSocial = ""
                                initReload()
                                Static.viewForm = false;
                                initReload()
                            } else {
                                Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error] } }, true);
                            }
                            initReload()
                        }
                    }}
                >
                    <span class="c-button__wrapper">
                        {Variable.lang.button.add}
                    </span>
                </a>
            </div >

            <div class="user_social_card_list" style={Static.activeItems.list_records[0].social.length ? null : 'grid-template-columns: calc(100% - 10px);'}>
                {
                    Static.activeItems.list_records[0].social.map((socialItem, index) => {
                        return (
                            <a
                                data-id={socialItem._id}
                                target="_blank"
                                href={socialItem.url}
                                class={[
                                    socialItem.channel,
                                    "user_social_card"
                                ]}
                                onclick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    alert("View")
                                }}
                            >
                                <div class="user_social_card_inner">
                                    <div class="{{channel}} user_social_card_type">
                                        <img src={svg[`${socialItem.channel}_icon`]} />
                                    </div>
                                    <div class="user_social_card_text">
                                        <p class="user_social_card_name">{socialItem.name}</p>
                                        <p class="user_social_card_description">{socialItem.description}</p>
                                    </div>
                                </div>
                                <div class="about_user_section_points_container">
                                    <img
                                        class="about_user_section_points"
                                        src={svg["points"]}
                                        onclick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            Static.elShowMenu.forEach((item, i) => {
                                                Static.elShowMenu[i].style = ""
                                            })
                                            Static.elShowMenu[index].style = "display: block"
                                        }}
                                    />
                                    <div
                                        Element={($el) => {
                                            Static.elShowMenu[index] = $el
                                        }}
                                        data-id={index}
                                        class="about_user_section_points_menu"
                                    >
                                        <div
                                            data-id={socialItem._id}
                                            class="about_user_section_points_menu_item about_user_edit_handler"
                                            onclick={async function (e) {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                let data = {
                                                    value: {
                                                        "social.active": false
                                                    },
                                                    filters: { "social._id": socialItem._id }
                                                }
                                                console.log('=11bc67=data=', data)

                                                const response = await fn.restApi.setUsers.update({
                                                    data: data
                                                })

                                                console.log('=875427=response=', response)

                                                if (response.status === 'ok') {
                                                    initReload()
                                                    Static.activeItems.list_records[0].social.map((item, i) => {
                                                        if (item._id == socialItem._id) {
                                                            Static.activeItems.list_records[0].social.splice(i, 1)
                                                            // console.log('=bbe5d9=', Static.activeItems.list_records[0].social)
                                                        }
                                                    })
                                                } else {
                                                    Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error] } }, true);
                                                }
                                                Static.elShowMenu[index].style = ""
                                                initReload()
                                            }}
                                        >
                                            {Variable.lang.select.delete}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
};

BlockUserProfilePage.galary = function (Static, data) {
    if (!data || data.profilePage != "galary") {
        return (<></>)
    }

    initOne(
        () => {
        }
    )
    console.log('=galary Static=', Static)
    // console.log('=galary data=', data)

    return (
        <div class="bl_one c-container gallery" id="UserInfoGallery">
            <div class="gallery_header">
                <h2>{Variable.lang.h.galary}</h2>
                <ul class="c-filetype">
                    <li
                        onclick={function (e) {
                            e.stopPropagation();
                            Static.activeFiletype = "all"
                            initReload();
                        }}
                    >
                        <a
                            href=""
                            class={[
                                "c-filetype__link",
                                "c-filetype__link--all",
                                Static.activeFiletype == "all" ? "c-filetype__link--active" : null
                            ]}
                        >

                        </a>
                    </li>
                    <li
                        onclick={function (e) {
                            e.stopPropagation();
                            Static.activeFiletype = "image"
                            initReload();
                        }}
                    >
                        <a
                            href=""
                            class={[
                                "c-filetype__link",
                                "c-filetype__link--image",
                                Static.activeFiletype == "image" ? "c-filetype__link--active" : null
                            ]}
                        >

                        </a>
                    </li>
                    <li
                        onclick={function (e) {
                            e.stopPropagation();
                            Static.activeFiletype = "video"
                            initReload();
                        }}
                    >
                        <a
                            href=""
                            class={[
                                "c-filetype__link",
                                "c-filetype__link--video",
                                Static.activeFiletype == "video" ? "c-filetype__link--active" : null
                            ]}
                        >

                        </a>
                    </li>
                </ul>
            </div>

            {
                data.userInfo.gallery ?
                    <div class="c-tiles">
                        {
                            Variable.myInfo._id == data.userInfo._id && Static.activeFiletype == "all" ?
                                <label
                                    class="c-tiles__item c-tiles__item--add"
                                >
                                    <figure class="c-tiles__card">
                                        <img class=" c-tiles__image" src={svg["radius_plus"]} />
                                        <input
                                            type="file"
                                            hidden
                                            multiple
                                            onchange={async function (e) {
                                                e.stopPropagation();
                                                let response2;
                                                Array.from(this.files).forEach((item) => {
                                                    let previewObj = {
                                                        src: item.name,//URL.createObjectURL(blob),
                                                        type: item.type,  //"video",
                                                        upload: 0,
                                                        size: 0,
                                                        deleted: false
                                                    }
                                                    Static.mediaInputs.show = true;
                                                    Static.mediaInputs.value.push(previewObj);
                                                    let numItem = Static.mediaInputs.value.length - 1

                                                    fn.uploadMedia(
                                                        item,
                                                        "gallery",
                                                        async function () {
                                                            if (!this.response) {
                                                                alert("Произошла ошибка Попробуйте еще раз")
                                                                return
                                                            }

                                                            let response = JSON.parse(this.response);

                                                            // Static.activeFiletype = response.mimetype.includes("image") ? "image" : "video"
                                                            // console.log('=5c550c Static.activeFiletype=', Static.activeFiletype)

                                                            if (Static.mediaInputs.value[numItem].upload === Static.mediaInputs.value[numItem].size && Static.mediaInputs.value[numItem].upload !== 0) {
                                                                // Static.mediaInputs.value.splice(numItem, 1);
                                                                Static.mediaInputs.value[numItem].deleted = true;
                                                                initReload()
                                                            }

                                                            initReload()

                                                            let data = {
                                                                value: {
                                                                    gallery: [{
                                                                        type: response.mimetype,
                                                                        name: response.name
                                                                    }]
                                                                }
                                                            }

                                                            response2 = await fn.restApi.setUsers.update({
                                                                data: data
                                                            })
                                                        },
                                                        async function (e) {
                                                            let contentLength;
                                                            if (e.lengthComputable) {
                                                                contentLength = e.total;
                                                            } else {
                                                                contentLength = parseInt(
                                                                    e.target.getResponseHeader(
                                                                        "x-decompressed-content-length"
                                                                    ),
                                                                    10
                                                                );
                                                            }

                                                            if (Static.mediaInputs.value[numItem].upload === Static.mediaInputs.value[numItem].size && Static.mediaInputs.value[numItem].upload !== 0) {
                                                                Static.mediaInputs.value.splice(numItem, 1);
                                                                initReload()
                                                            }

                                                            Static.mediaInputs.value[numItem].upload = e.loaded
                                                            Static.mediaInputs.value[numItem].size = contentLength;
                                                            initReload();
                                                        }
                                                    );
                                                })
                                            }}
                                        />
                                    </figure>
                                </label>
                                : null
                        }
                        {/* Вывод плиток фото/видео */}
                        {
                            data.userInfo.gallery.filter((item) => {
                                if (item && item.type && !item.deleted && (item.type.includes(Static.activeFiletype) || Static.activeFiletype == "all")) {
                                    return true
                                }
                                // return item.type.includes(Static.activeFiletype)
                            }).map((item) => {
                                return (
                                    <div
                                        class="c-tiles__item"
                                        onclick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (Static.activeItems.list_records && Static.activeItems.list_records[0].avatar) {
                                                let nameFile;
                                                if (e.currentTarget.querySelector('.c-tiles__image')) {
                                                    nameFile = e.currentTarget.querySelector('.c-tiles__image').attributes.src.value.slice(22);
                                                    fn.modals.ModalViewPhoto({
                                                        path: nameFile,
                                                    });
                                                } else {
                                                    nameFile = e.currentTarget.querySelector('video').attributes.src.value.slice(22);
                                                    fn.modals.ModalViewPhoto({
                                                        path: nameFile,
                                                        video: item
                                                    });
                                                }
                                                // console.log('=c88115=', nameFile)

                                            }
                                        }}
                                    >
                                        <figure class="c-tiles__card">
                                            {
                                                item.type && item.type.includes('image/') ?
                                                    <img class="c-tiles__image" src={`/assets/upload/gallery/${item.name}`} width="100" height="100" />
                                                    : item.type && item.type.includes('video/') ?
                                                        <VideoPlayer Static={Static} item={item} path={`/assets/upload/gallery/`} />
                                                        : null
                                            }

                                            {
                                                Variable.myInfo._id == data.userInfo._id ?
                                                    <div
                                                        class="messages_settings c-tiles__delete"
                                                        title={Variable.lang.text.settings}
                                                        onclick={(e) => {
                                                            let author = Variable.myInfo
                                                            let items = [
                                                                {
                                                                    text: Variable.lang.select.delete,
                                                                    type: "delete",
                                                                    color: "red",
                                                                    onclick: async function (e) {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        const response = await fn.restApi.setUsers.update({
                                                                            data: {
                                                                                value: {
                                                                                    "gallery.active": false
                                                                                },
                                                                                filters: { "gallery._id": item._id }
                                                                            }
                                                                        })
                                                                        initReload();
                                                                    }
                                                                },
                                                            ]
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            Variable.SetModals({ name: "ModalItemsMenu", data: { items, author } }, true);
                                                        }
                                                        }
                                                    >
                                                        <img class="" src={svg.settings_icon} width="20" height="20" />
                                                    </div>
                                                    : null
                                            }
                                        </figure>
                                    </div>
                                )
                            })
                        }
                        {/* preview loaded file */}
                        {
                            Static.mediaInputs.value.filter((preview) => {
                                if (preview && preview.type && !preview.deleted && (preview.type.includes(Static.activeFiletype) || Static.activeFiletype == "all")) {
                                    return true
                                }
                            }).map((preview) => {
                                return (
                                    <div class="c-tiles__item">
                                        <div class="c-tiles__card">
                                            <div class="c-tiles__image c-tiles__image--preview">
                                                {
                                                    preview.size !== undefined
                                                        ?
                                                        <div class="circle-wrap">
                                                            <div class="circle">
                                                                <div
                                                                    class="mask full"
                                                                    style={`transform: rotate( ${(360 / 200) *
                                                                        Math.round((preview.upload / preview.size) * 100)
                                                                        }deg`}
                                                                >
                                                                    <div
                                                                        class="fill"
                                                                        style={`transform: rotate( ${(360 / 200) *
                                                                            Math.round((preview.upload / preview.size) * 100)
                                                                            }deg`}
                                                                    ></div>
                                                                </div>
                                                                <div class="mask half">
                                                                    <div
                                                                        class="fill"
                                                                        style={`transform: rotate( ${(360 / 200) *
                                                                            Math.round((preview.upload / preview.size) * 100)
                                                                            }deg`}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : Variable.myInfo._id == data.userInfo._id ?
                        <label
                            class="c-tiles__item c-tiles__item--add 222"
                        >
                            <figure class="c-tiles__card">
                                <img class=" c-tiles__image" src={svg["radius_plus"]} />
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    onchange={async function (e) {
                                        e.stopPropagation();
                                        Array.from(this.files).forEach((item) => {
                                            fn.uploadMedia(
                                                item,
                                                "gallery",
                                                async function () {
                                                    if (!this.response) {
                                                        alert("Произошла ошибкаю Попробуйте еще раз")
                                                        return
                                                    }

                                                    let response = JSON.parse(this.response);

                                                    let data = {
                                                        value: {
                                                            gallery: [{
                                                                type: response.mimetype,
                                                                name: response.name
                                                            }]
                                                        }
                                                    }

                                                    const response2 = await fn.restApi.setUsers.update({
                                                        data: data
                                                    })
                                                },
                                                async function (e) {
                                                }
                                            );
                                        })
                                    }}
                                />
                            </figure>
                        </label>
                        : <NotFound />
            }
        </div>
    )
};

export { BlockUserProfilePage }
