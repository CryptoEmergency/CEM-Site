import {
    jsx,
    jsxFrag,
    Variable,
    initOne,
    initReload,
    Helpers,
    sendApi
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { siteLink } from '@src/functions.js'
import { UserItem } from '@component/element/UserItem.js';
import { If, Map } from '@component/helpers/All.js';

import {
    ButtonShowMore,
    NewsCategory,
    NewsItem
} from '@component/element/index.js';
// const toggleFilterUser = function () {
//     const filter = document.querySelector('.c-friends__additional');
//     const h = filter.offsetHeight;
//     // console.log('=edd207=', h)
//     Variable.visibleFilterUser == true ? filter.style = `height: ${h}px;` : filter.style = "height: 0px";
//     Variable.visibleFilterUser = !Variable.visibleFilterUser;
// }

let elem = Variable.setRef()

const BlockUsers = function ({ title, filters, items, type, name }) {
    return (
        <div class="c-friends">
            <div class="c-friends__container c-container">
                <h2>
                    <If
                        data={title}
                        dataIf={title}
                        dataElse={Variable.lang.h.top_users}
                    />
                </h2>
                <div class="c-friends__block">
                    <div class="c-friends__search">
                        <div class="c-friends__filter">
                            <input
                                class="c-friends__field"
                                autocomplete="off"
                                type="text"
                                placeholder={Variable.lang.placeholder.findFriends}
                            />
                            <div
                                class="c-friends__toggler"
                                onClick={(e) => {
                                    if (elem().dataset.active === "true") {
                                        elem().dataset.active = false
                                        elem().style = "height: 0px"
                                    } else {
                                        elem().dataset.active = true
                                        elem().style = "height: 80px"
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
                            ref={elem}
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
                                                    Variable[name] = await sendApi.send({ action: "getUsers", short: true, limit: 21, filter: Helpers.getFilterUsers(filters, type) });
                                                    // initReload()
                                                }
                                            }
                                        })
                                    }}
                                >
                                    <If
                                        data={filters.lang.name == "all"}
                                        dataIf={Variable.lang.text.language}
                                        dataElse={filters.lang.name}
                                    />
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
                                                    Variable[name] = await sendApi.send({ action: "getUsers", short: true, limit: 21, filter: Helpers.getFilterUsers(filters, type) });
                                                    // initReload();
                                                }
                                            }
                                        })
                                    }}
                                >
                                    <If
                                        data={filters.country.name == "all"}
                                        dataIf={Variable.lang.text.country}
                                        dataElse={filters.country.name}
                                    />

                                </div>
                                <img
                                    style="display: none;"
                                    class="refresh_country"
                                    // data-action="refreshCountry"
                                    src={svg.refresh_filter}
                                />
                            </div>
                            <div class="c-friends__checkboxes">
                                <div class="checkbox" data-action="friendsFilterCheckbox">
                                    <input
                                        checked={filters.group.common ? true : false}
                                        class="checkbox__input"
                                        type="checkbox"
                                        id="common"
                                        required="required"
                                        onChange={async () => {
                                            filters.group.common = !filters.group.common
                                            Variable[name] = await sendApi.send({ action: "getUsers", short: true, limit: 21, filter: Helpers.getFilterUsers(filters, type) });
                                        }}
                                    />
                                    <label class="checkbox__label" for="common">{Variable.lang.h.top_users}</label>
                                </div>
                                <div class="checkbox" data-action="friendsFilterCheckbox">
                                    <input
                                        checked={filters.group.content ? true : false}
                                        class="checkbox__input"
                                        type="checkbox"
                                        id="content-makers"
                                        required="required"
                                        onChange={async () => {
                                            filters.group.content = !filters.group.content
                                            Variable[name] = await sendApi.send({ action: "getUsers", short: true, limit: 21, filter: Helpers.getFilterUsers(filters, type) });
                                        }}
                                    />
                                    <label class="checkbox__label" for="content-makers">{Variable.lang.select.users_contentCreater}</label>
                                </div>
                                <div class="checkbox" data-action="friendsFilterCheckbox">
                                    <input
                                        checked={filters.group.expert ? true : false}
                                        class="checkbox__input"
                                        type="checkbox"
                                        id="specialists"
                                        required="required"
                                        onChange={async () => {
                                            filters.group.expert = !filters.group.expert
                                            Variable[name] = await sendApi.send({ action: "getUsers", short: true, limit: 21, filter: Helpers.getFilterUsers(filters, type) });
                                        }}
                                    />
                                    <label class="checkbox__label" for="specialists">{Variable.lang.select.users_experts}</label>
                                </div>
                                <div class="checkbox" data-action="friendsFilterCheckbox">
                                    <input
                                        checked={filters.online ? true : false}
                                        class="checkbox__input"
                                        type="checkbox"
                                        id="online"
                                        required="required"
                                        onChange={async () => {
                                            filters.online = !filters.online
                                            Variable[name] = await sendApi.send({ action: "getUsers", short: true, limit: 21, filter: Helpers.getFilterUsers(filters, type) });
                                        }}
                                    />
                                    <label class="checkbox__label" for="online">{Variable.lang.span.online}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="c-friends__list top_professionals_block">
                        <Map
                            data={items.list_records}
                            dataIf={(item, index) => {
                                return (
                                    <UserItem user={item} />
                                )
                            }}
                        />

                    </div>
                </div>
                <If
                    data={items.list_records.length < items.totalFound}
                    dataIf={
                        <ButtonShowMore
                            onclick={async () => {
                                let tmp = await sendApi.send({ action: "getUsers", short: true, limit: 21, filter: Helpers.getFilterUsers(filters, type), offset: Variable[name].list_records.length });
                                Variable[name].list_records.push(...tmp.list_records)
                                initReload()
                            }}
                        />
                    }
                />
            </div>
        </div>
    )
}

export { BlockUsers }