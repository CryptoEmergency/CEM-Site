import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable
} from "@betarost/cemjs";
import { mainUsers } from "@src/apiFunctions.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { UserItem } from '@component/element/UserItem.js';
import { If } from '@component/helpers/All.js';
import { Select } from '@component/element/Select.js';

const start = function () {
    Variable.HeaderShow = true
    Variable.FooterShow = true
    Variable.visibleFilterUser = false

    let
        users,
        nowShow,
        totalRecords;

    const showMore = async function (e) {
        e.preventDefault();
        const tmp = await mainUsers(18, nowShow);
        nowShow += tmp.list_records.length
        users.push(...tmp.list_records)
        // console.log('=758ae5=', users)
        initReload()
    }

    const toggleFilterUser = function () {
        const filter = document.querySelector('.c-friends__additional');
        const h = filter.offsetHeight;
        console.log('=edd207=', h)
        Variable.visibleFilterUser == true ? filter.style = `height: ${h}px;` : filter.style = "height: 0px";
        Variable.visibleFilterUser = !Variable.visibleFilterUser;
    }

    init(
        async () => {
            console.log("First Init")

            let tmp = await mainUsers(21);
            users = tmp.list_records;
            nowShow = 21;
            totalRecords = tmp.totalFound;
            // console.log("users", tmp);
        },
        () => {
            console.log("Second Init")
            return (
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
                    <div class="c-friends">
                        <div class="c-friends__container c-container">
                            <h2>{Variable.lang.h.top_users}</h2>
                            <div data-type="main_page_users" class="c-friends__block">
                                <div class="c-friends__search">
                                    <div class="c-friends__filter">
                                        <input
                                            class="c-friends__field"
                                            autocomplete="off"
                                            type="text"
                                            data-keyup="friendsSearchType"
                                            placeholder={Variable.lang.placeholder.findFriends}
                                        />
                                        <div class="c-friends__toggler" onClick={toggleFilterUser}>
                                            <img src={svg.filter} />
                                            <span>{Variable.lang.span.filter}</span>
                                        </div>
                                    </div>
                                    <div class={`c-friends__additional`} style={`${Variable.visibleFilterUser ? "" : "height: 0px"}`}>
                                        <div class="c-friends__wrapper">
                                            <div
                                                data-language="all"
                                                data-language_code="all"
                                                class="c-friends__lang"
                                                // data-action="friendsLanguageFilter"
                                                data-name={Variable.lang.text.language}
                                            >
                                                {Variable.lang.text.language}
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
                                                data-country="all"
                                                data-country_code="all"
                                                class="c-friends__country"
                                                // data-action="friendsCountryFilter"
                                                data-name={Variable.lang.text.country}
                                            >
                                                {Variable.lang.text.country}
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
                                                <input checked="false" class="checkbox__input" type="checkbox" id="common" required="required" />
                                                <label class="checkbox__label" for="common">{Variable.lang.h.top_users}</label>
                                            </div>
                                            <div class="checkbox" data-action="friendsFilterCheckbox">
                                                <input checked="true" class="checkbox__input" type="checkbox" id="content-makers" required="required" />
                                                <label class="checkbox__label" for="content-makers">{Variable.lang.select.users_contentCreater}</label>
                                            </div>
                                            <div class="checkbox" data-action="friendsFilterCheckbox">
                                                <input checked="true" class="checkbox__input" type="checkbox" id="specialists" required="required" />
                                                <label class="checkbox__label" for="specialists">{Variable.lang.select.users_experts}</label>
                                            </div>
                                            <div class="checkbox" data-action="friendsFilterCheckbox">
                                                <input class="checkbox__input" type="checkbox" id="online" required="required" />
                                                <label class="checkbox__label" for="online">{Variable.lang.span.online}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="c-friends__list top_professionals_block">
                                    {
                                        users.map(function (user) {
                                            return (
                                                <UserItem lang={Variable.lang} user={user} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <If
                                data={nowShow < totalRecords}
                                dataIf={<a onClick={showMore} class="btn-view-all-a">
                                    <div class="btn-view-all">
                                        <div>{Variable.lang.button.showMore}</div>
                                    </div>
                                </a>}
                            />
                        </div>
                    </div>
                </div>
            )
        }
    )
}

export default start;