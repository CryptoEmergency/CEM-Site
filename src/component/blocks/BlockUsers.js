import {
    jsx,
    jsxFrag,
    Variable,
    initOne
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { Avatar, ButtonShowMore, Input, NotFound } from '@component/element/index.js';

const makeFilter = function (Static) {
    let objReturn = {}
    if (Static.type && Static.type != "all") {
        if (Static.type == "experts") {
            objReturn["rank.expert"] = true;
        } else if (Static.type == "creator") {
            objReturn["rank.creator"] = true;
        }
    } else {
        objReturn["$or"] = [
            {
                "rank.basic": true,
                "rank.expert": false,
                "rank.creator": false,
            },
            {
                "rank.basic": false,
                "rank.expert": true,
                "rank.creator": false,
            },
            {
                "rank.basic": false,
                "rank.expert": false,
                "rank.creator": true,
            },
        ];
    }
    if (Static.filters.group && Static.type == "all") {
        if (Static.filters.group.common) {
            objReturn["$or"][0]["rank.basic"] = true;
        } else {
            objReturn["$or"][0]["rank.basic"] = false;
        }

        if (Static.filters.group.content) {
            objReturn["$or"][2]["rank.creator"] = true;
        } else {
            objReturn["$or"][2]["rank.creator"] = false;
        }

        if (Static.filters.group.expert) {
            objReturn["$or"][1]["rank.expert"] = true;
        } else {
            objReturn["$or"][1]["rank.expert"] = false;
        }
    }
    if (Static.filters.language && Static.filters.language.name != "all") {
        objReturn["mainLanguage.code"] = Static.filters.language.code
    }
    if (Static.filters.country && Static.filters.country.name != "all") {
        objReturn["country.code"] = Static.filters.country.code
    }
    if (Static.filters.online) {
        objReturn.online = true;
    }
    if (Static.search.value) {
        objReturn.search = Static.search.value;
    }
    return objReturn
}

const BlockUsers = async function ({ Static, limit = 21 }) {

    await initOne(
        async () => {
            Static.filters.language.onclick = async () => {
                fn.modals.ModalChangeLanguage({
                    onclick: async (langCode, langName, langOrig) => {
                        Static.filters.language.name = langName + ` (${langOrig})`;
                        Static.filters.language.code = langCode;
                        Static.filters.language.value = langName + ` (${langOrig})`;
                        Static.apiFilter = makeFilter(Static)
                        await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
                    }
                }, true)
            }

            Static.filters.country.onclick = async () => {
                fn.modals.ModalSelectCountry({
                    onclick: async (countryCode, countryName) => {
                        Static.filters.country.name = countryName;
                        Static.filters.country.code = countryCode;
                        Static.filters.country.value = countryName;
                        Static.apiFilter = makeFilter(Static)
                        await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
                    }
                }, true)
            }

            Static.search.condition = async (value) => {
                Static.apiFilter = makeFilter(Static)
                await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
                return true
            }

            Static.apiFilter = makeFilter(Static)
            await fn.restApi.getUsers({ cache: true, name: Static.nameRecords, filter: Static.apiFilter })
        }
    )

    return (
        <div class="c-friends">
            <div class="c-friends__container c-container">
                <h2>
                    {!Static.openModals ? Static.type == "creator" ? <h2>{Variable.lang.a.contentCreater}</h2> : Static.type == "experts" ? <h2>{Variable.lang.a.experts}</h2> : <h2>{Variable.lang.h.top_users}</h2> : null}
                </h2>
                <div class="c-friends__block">
                    <div class="c-friends__search">
                        <div class="c-friends__filter">
                            <Input className="c-friends__field" Static={Static.search} />
                            <div
                                class="c-friends__toggler"
                                onClick={() => {
                                    if (Static.elFilters.dataset.active === "true") {
                                        Static.elFilters.dataset.active = false
                                        Static.elFilters.style = "height: 0px"
                                    } else {
                                        Static.elFilters.dataset.active = true
                                        Static.elFilters.style = "";
                                        let h = Static.elFilters.offsetHeight;
                                        Static.elFilters.style = `height: ${h}px; margin-bottom: 20px;`
                                    }
                                }}>
                                <img src={svg.filter} />
                                <span>{Variable.lang.span.filter}</span>
                            </div>
                        </div>
                        <div
                            class="c-friends__additional"
                            data-active={false}
                            style={"height: 0px"}
                            Element={($el) => {
                                Static.elFilters = $el
                            }}>
                            <div class="c-friends__wrapper">
                                <Input classDiv="language_select_wrapper" className="c-friends__lang" Static={Static.filters.language} />
                                <img style="display: none;" class="refresh_language" src={svg.refresh_filter} />
                            </div>
                            <div class="c-friends__wrapper">
                                <Input classDiv="language_select_wrapper" className="c-friends__country" Static={Static.filters.country} />
                                <img style="display: none;" class="refresh_country" src={svg.refresh_filter} />
                            </div>
                            {
                                !Static.filters.group
                                    ?
                                    <div class="c-friends__checkboxes">
                                        {
                                            /* 
                                                <div class="checkbox" data-action="friendsFilterCheckbox">
                                                    <input
                                                        checked={filters.online ? true : false}
                                                        class="checkbox__input"
                                                        type="checkbox"
                                                        id="online"
                                                        required="required"
                                                        onChange={async () => {
                                                            filters.online = !filters.online
                                                            Variable[Static.nameRecords] = await api({ type: "get", action: "getUsers", short: true, cache: true, name: Static.nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                        }}
                                                    />
                                                    <label class="checkbox__label" for="online">{Variable.lang.span.online}</label>
                                                </div>
                                            */
                                        }
                                    </div>
                                    :
                                    <div class="c-friends__checkboxes">
                                        <div class="checkbox">
                                            <input
                                                checked={Static.filters.group.common ? true : false}
                                                class="checkbox__input"
                                                type="checkbox"
                                                id="common"
                                                required="required"
                                                onChange={async () => {
                                                    Static.filters.group.common = !Static.filters.group.common
                                                    Static.apiFilter = makeFilter(Static)
                                                    await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
                                                }}
                                            />
                                            <label class="checkbox__label" for="common">{Variable.lang.h.top_users}</label>
                                        </div>
                                        <div class="checkbox">
                                            <input
                                                checked={Static.filters.group.content ? true : false}
                                                class="checkbox__input"
                                                type="checkbox"
                                                id="content-makers"
                                                required="required"
                                                onChange={async () => {
                                                    Static.filters.group.content = !Static.filters.group.content
                                                    Static.apiFilter = makeFilter(Static)
                                                    await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
                                                }}
                                            />
                                            <label class="checkbox__label" for="content-makers">{Variable.lang.select.users_contentCreater}</label>
                                        </div>
                                        <div class="checkbox">
                                            <input
                                                checked={Static.filters.group.expert ? true : false}
                                                class="checkbox__input"
                                                type="checkbox"
                                                id="specialists"
                                                required="required"
                                                onChange={async () => {
                                                    Static.filters.group.expert = !Static.filters.group.expert
                                                    Static.apiFilter = makeFilter(Static)
                                                    await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter })
                                                }}
                                            />
                                            <label class="checkbox__label" for="specialists">{Variable.lang.select.users_experts}</label>
                                        </div>
                                        {
                                            /* 
                                                <div class="checkbox" data-action="friendsFilterCheckbox">
                                                    <input
                                                        checked={filters.online ? true : false}
                                                        class="checkbox__input"
                                                        type="checkbox"
                                                        id="online"
                                                        required="required"
                                                        onChange={async () => {
                                                            filters.online = !filters.online
                                                            Variable[Static.nameRecords] = await api({ type: "get", action: "getUsers", short: true, cache: true, name: Static.nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                        }}
                                                    />
                                                    <label class="checkbox__label" for="online">{Variable.lang.span.online}</label>
                                                </div>
                                            */
                                        }

                                    </div>
                            }
                        </div>
                    </div>
                    <div class="c-friends__list top_professionals_block">
                        {!Variable[Static.nameRecords] || !Variable[Static.nameRecords].list_records.length
                            ?
                            <NotFound />
                            :
                            Variable[Static.nameRecords].list_records.map(function (user, i) {
                                return (
                                    <div class="new_professional_card userLoad" data-id={user._id}>
                                        <div class="new_professional_card_top">
                                            <div class="new_professional_card_avatar">
                                                <Avatar author={user} nickName={true} speciality={[user.information && user.information.speciality ? user.information.speciality : false]} />
                                            </div>
                                            {
                                                user.rank.creator
                                                    ?
                                                    <div class="user_rank_badge">
                                                        <img src={images.content_creator} />
                                                    </div>
                                                    :
                                                    null}
                                        </div>
                                        <div class="new_professional_card_main">
                                            <a href={`/user/${user.nickname}`}>
                                                <p
                                                    style="width: 80%; margin: 5px auto;"
                                                    class="new_professional_name "
                                                >
                                                    {user.nickname}
                                                </p>
                                            </a>
                                            <p
                                                style="width: 50%; margin: 0 auto;"
                                                class="new_professional_spec "
                                            >
                                                {user.information ? user.information.speciality : ''}
                                            </p>
                                            <div class="new_professional_badges">
                                                {
                                                    user.awards.slice(0, 5).map(function (badge) {
                                                        return (
                                                            <div class="badge_container">
                                                                <div class="badge_description">
                                                                    <p>{Variable.lang.awards[badge.name]}</p>
                                                                    <span>{Variable.lang.awards[badge.description]}</span>
                                                                </div>
                                                                <img src={svg[`badge/${badge.icon.split(".")[0]}`]} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div class="new_professional_statistic">
                                                <div class="new_professional_info_block">
                                                    <p class="">{user.statistic.answer}</p>
                                                    <p>{Variable.lang.p.answers}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="">{user.statistic.follower}</p>
                                                    <p>{Variable.lang.p.subscribe}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="">{user.statistic.view}</p>
                                                    <p>{Variable.lang.p.views}</p>
                                                </div>
                                            </div>
                                            <div class="new_professional_buttons">
                                                <div class="button-container-preview">
                                                    <a class="btn-news-preview " href="#"
                                                        onclick={async () => {
                                                            Variable.Static.startChatsID = user
                                                            fn.siteLink("/user/chats/");
                                                        }} >
                                                        <span>
                                                            {Variable.lang.button.write}
                                                        </span>
                                                    </a>
                                                    <a
                                                        class="btn-news-preview"
                                                        onclick={async () => {
                                                            fn.restApi.setUsers.subscribe({ _id: user._id })
                                                            user.subscribe = !user.subscribe
                                                        }}
                                                    >
                                                        <span class="subscribe_status">
                                                            {
                                                                user.subscribe
                                                                    ?
                                                                    Variable.lang.button.unsubscribe
                                                                    :
                                                                    Variable.lang.button.subscribe
                                                            }
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
                <ButtonShowMore Static={Static} action="getUsers" />
            </div>
        </div >
    )
}
export { BlockUsers }
// OK