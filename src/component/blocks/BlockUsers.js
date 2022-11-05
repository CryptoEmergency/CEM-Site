import {
    jsx,
    jsxFrag,
    Variable,
    initOne,
    Helpers,
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { api } from '@src/apiFunctions.js'
import { UserBadge, Avatar } from '@component/element/index.js';

let elFilters

const BlockUsers = async function ({ title, filters, type, nameRecords, button, limit = 21 }) {
    await initOne(
        async () => {
            await api({ type: "get", action: "getUsers", short: true, cache: true, name: nameRecords, limit: limit, filter: Helpers.getFilterUsers(filters, type) })
        }
    )
    return (
        <div class="c-friends">
            <div class="c-friends__container c-container">
                <h2>
                    {title ? title : Variable.lang.h.top_users}
                </h2>
                <div class="c-friends__block">
                    <div class="c-friends__search">
                        <div class="c-friends__filter">
                            {/* Сделать поиск */}
                            <input
                                class="c-friends__field"
                                autocomplete="off"
                                type="text"
                                placeholder={Variable.lang.placeholder.findFriends}
                            />
                            <div
                                class="c-friends__toggler"
                                onClick={() => {
                                    if (elFilters.dataset.active === "true") {
                                        elFilters.dataset.active = false
                                        elFilters.style = "height: 0px"
                                    } else {
                                        elFilters.dataset.active = true
                                        elFilters.style = "";
                                        let h = elFilters.offsetHeight;
                                        elFilters.style = `height: ${h}px`
                                    }
                                }}
                            >
                                <img src={svg.filter} />
                                <span>{Variable.lang.span.filter}</span>
                            </div>
                        </div>
                        <div
                            class="c-friends__additional"
                            data-active={false}
                            style={"height: 0px"}
                            Element={($el) => {
                                elFilters = $el
                            }}
                        >
                            <div class="c-friends__wrapper">
                                <div
                                    class="c-friends__lang"
                                    onclick={() => {
                                        Variable.SetModals({
                                            name: "ModalChangeLanguage", data: {
                                                onclick: async (langCode, langName) => {
                                                    filters.lang.name = langName;
                                                    filters.lang.code = langCode;
                                                    Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                }
                                            }
                                        })
                                    }}
                                >
                                    {filters.lang.name == "all" ? Variable.lang.text.language : filters.lang.name}
                                </div>
                                <img
                                    style="display: none;"
                                    class="refresh_language"
                                    src={svg.refresh_filter}
                                />
                            </div>
                            <div class="c-friends__wrapper">
                                <div
                                    class="c-friends__country"
                                    onclick={() => {
                                        Variable.SetModals({
                                            name: "ModalSelectCountry", data: {
                                                onclick: async (countryCode, countryName) => {
                                                    filters.country.name = countryName;
                                                    filters.country.code = countryCode;
                                                    Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                }
                                            }
                                        })
                                    }}
                                >
                                    {filters.country.name == "all" ? Variable.lang.text.country : filters.country.name}
                                </div>
                                <img
                                    style="display: none;"
                                    class="refresh_country"
                                    src={svg.refresh_filter}
                                />
                            </div>
                            {() => {
                                if (filters.group != false) {
                                    return (
                                        <div class="c-friends__checkboxes">
                                            <div class="checkbox">
                                                <input
                                                    checked={filters.group.common ? true : false}
                                                    class="checkbox__input"
                                                    type="checkbox"
                                                    id="common"
                                                    required="required"
                                                    onChange={async () => {
                                                        filters.group.common = !filters.group.common
                                                        Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                    }}
                                                />
                                                <label class="checkbox__label" for="common">{Variable.lang.h.top_users}</label>
                                            </div>
                                            <div class="checkbox">
                                                <input
                                                    checked={filters.group.content ? true : false}
                                                    class="checkbox__input"
                                                    type="checkbox"
                                                    id="content-makers"
                                                    required="required"
                                                    onChange={async () => {
                                                        filters.group.content = !filters.group.content
                                                        Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                    }}
                                                />
                                                <label class="checkbox__label" for="content-makers">{Variable.lang.select.users_contentCreater}</label>
                                            </div>
                                            <div class="checkbox">
                                                <input
                                                    checked={filters.group.expert ? true : false}
                                                    class="checkbox__input"
                                                    type="checkbox"
                                                    id="specialists"
                                                    required="required"
                                                    onChange={async () => {
                                                        filters.group.expert = !filters.group.expert
                                                        Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
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
                                                                Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, cache: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                            }}
                                                        />
                                                        <label class="checkbox__label" for="online">{Variable.lang.span.online}</label>
                                                    </div>
                                                */
                                            }

                                        </div>
                                    )
                                } else {
                                    return (
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
                                                                Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, cache: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                            }}
                                                        />
                                                        <label class="checkbox__label" for="online">{Variable.lang.span.online}</label>
                                                    </div>
                                                */
                                            }
                                        </div>
                                    )
                                }
                            }}
                        </div>
                    </div>
                    <div class="c-friends__list top_professionals_block">
                        {() => {
                            if (Variable[nameRecords] && Variable[nameRecords].list_records && Variable[nameRecords].list_records.length) {
                                const arrReturn = Variable[nameRecords].list_records.map(function (user, i) {
                                    return (
                                        <div class="new_professional_card userLoad" data-id={user._id}>
                                            <div class="new_professional_card_top">
                                                <div class="new_professional_card_avatar">
                                                    <Avatar author={user} nickName={true} speciality={[user.information && user.information.speciality ? user.information.speciality : false]} />
                                                </div>
                                                {() => {
                                                    if (user.rank.creator) {
                                                        return (
                                                            <div class="user_rank_badge">
                                                                <img src={images.content_creator} />
                                                            </div>
                                                        )
                                                    }
                                                }}
                                            </div>
                                            <div class="new_professional_card_main">
                                                <a href={`/user/${user.nickname}`}>
                                                    <p
                                                        style="width: 80%; margin: 5px auto;"
                                                        class="new_professional_name "
                                                    > {/* load */}
                                                        {user.nickname}
                                                    </p>
                                                </a>
                                                <p
                                                    style="width: 50%; margin: 0 auto;"
                                                    class="new_professional_spec "
                                                > {/* load */}
                                                    {user.information ? user.information.speciality : ''}
                                                </p>
                                                <div class="new_professional_badges">
                                                    {
                                                        user.awards.slice(0, 5).map(function (badge) {
                                                            return (
                                                                <UserBadge badge={badge} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div class="new_professional_statistic">
                                                    <div class="new_professional_info_block">
                                                        <p class="">{user.statistic.answer}</p> {/* load */}
                                                        <p>{Variable.lang.p.answers}</p>
                                                    </div>
                                                    <div class="new_professional_info_block">
                                                        <p class="">{user.statistic.follower}</p> {/* load */}
                                                        <p>{Variable.lang.p.subscribe}</p>
                                                    </div>
                                                    <div class="new_professional_info_block">
                                                        <p class="">{user.statistic.view}</p> {/* load */}
                                                        <p>{Variable.lang.p.views}</p>
                                                    </div>
                                                </div>
                                                <div class="new_professional_buttons">
                                                    <div class="button-container-preview">
                                                        <a style="opacity: 0.2" class="btn-news-preview " href="#" data-action="link" data-needauth="true">
                                                            <span>
                                                                {Variable.lang.button.write}
                                                            </span>
                                                        </a>
                                                        <a
                                                            class="btn-news-preview"
                                                            data-id="{{_id}}"
                                                            data-action="userSubscribe"
                                                            data-needauth="true"
                                                            onclick={async () => {
                                                                let tmp = await api({ type: "set", action: "setUsers", short: true, data: { value: { subscribed: user._id } } })
                                                                user.subscribe = !user.subscribe
                                                            }}
                                                        >
                                                            <span class="subscribe_status">
                                                                {() => {
                                                                    if (user.subscribe) {
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
                                            </div>
                                        </div>
                                    )
                                })
                                return arrReturn
                            }
                        }}
                    </div>
                </div>
                {button}
            </div>
        </div>
    )
}
export { BlockUsers }