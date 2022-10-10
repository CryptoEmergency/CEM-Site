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


const BlockUsers = function (data) {
    console.log('=666f29= BlockUsers', data)
    return (
        <div class="c-friends">
            <div class="c-friends__container c-container">
                <h2>
                    <If
                        data={data.title}
                        dataIf={data.title}
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
                                                    data.filters.lang.name = langName;
                                                    data.filters.lang.code = langCode;
                                                    console.log('=a2ef89= 2', Variable.PageUsers, Helpers.getFilterUsers(data))
                                                    Variable.PageUsers = await sendApi.send({ action: "getUsers", short: true, limit: 21, filter: Helpers.getFilterUsers(data) });
                                                }
                                            }
                                        })
                                    }}
                                >
                                    <If
                                        data={data.filters.lang.name == "all"}
                                        dataIf={Variable.lang.text.language}
                                        dataElse={data.filters.lang.name}
                                    />
                                </div>
                                <img
                                    style="display: none;"
                                    class="refresh_language"
                                    data-action="refreshLanguage"
                                    src={svg.refresh_filter}
                                />
                            </div>
                            <div class="c-friends__wrapper">
                                <div
                                    class="c-friends__country"
                                    onclick={() => {
                                        Variable.SetModals({ name: "ModalSelectCountry", data: { onclick: (countryCode, countryName) => { data.filters.country.name = countryName; data.filters.country.code = countryCode; initReload(); } } })
                                    }}
                                >
                                    <If
                                        data={data.filters.country.name == "all"}
                                        dataIf={Variable.lang.text.country}
                                        dataElse={data.filters.country.name}
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
                                        checked={data.filters.group.common ? true : false}
                                        class="checkbox__input"
                                        type="checkbox"
                                        id="common"
                                        required="required"
                                    // onChange={changeFilterUsers}
                                    />
                                    <label class="checkbox__label" for="common">{Variable.lang.h.top_users}</label>
                                </div>
                                <div class="checkbox" data-action="friendsFilterCheckbox">
                                    <input
                                        checked={data.filters.group.content ? true : false}
                                        class="checkbox__input"
                                        type="checkbox"
                                        id="content-makers"
                                        required="required"
                                    // onChange={changeFilterUsers}
                                    />
                                    <label class="checkbox__label" for="content-makers">{Variable.lang.select.users_contentCreater}</label>
                                </div>
                                <div class="checkbox" data-action="friendsFilterCheckbox">
                                    <input
                                        checked={data.filters.group.expert ? true : false}
                                        class="checkbox__input"
                                        type="checkbox"
                                        id="specialists"
                                        required="required"
                                    // onChange={changeFilterUsers}
                                    />
                                    <label class="checkbox__label" for="specialists">{Variable.lang.select.users_experts}</label>
                                </div>
                                <div class="checkbox" data-action="friendsFilterCheckbox">
                                    <input
                                        checked={data.filters.online ? true : false}
                                        class="checkbox__input"
                                        type="checkbox"
                                        id="online"
                                        required="required"
                                    // onChange={changeFilterUsers}
                                    />
                                    <label class="checkbox__label" for="online">{Variable.lang.span.online}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="c-friends__list top_professionals_block">
                        <Map
                            data={data.items.list_records}
                            dataIf={(item, index) => {
                                return (
                                    <UserItem user={item} />
                                )
                            }}
                        />

                    </div>
                </div>
                {/* <If
                    data={Variable.PageBlog.list_records.length < Variable.PageBlog.totalFound}
                    dataIf={
                        <ButtonShowMore
                            onclick={async () => {
                                let filter = { type: "blog" }
                                if (activeCategory != "All") {
                                    filter["category.name"] = activeCategory
                                }
                                let tmp = await sendApi.send({ action: "getNews", short: true, filter: filter, offset: Variable.PageBlog.list_records.length })
                                Variable.PageBlog.list_records.push(...tmp.list_records)
                                initReload()
                            }}
                        />
                    }
                /> */}
            </div>
        </div>
    )
}

export { BlockUsers }