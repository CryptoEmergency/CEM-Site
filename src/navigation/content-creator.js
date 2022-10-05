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
        // console.log('=edd207=', h)
        Variable.visibleFilterUser == true ? filter.style = `height: ${h}px;` : filter.style = "height: 0px";
        Variable.visibleFilterUser = !Variable.visibleFilterUser;
    }

    const changeFilterUsers = async function (e) {
        const checkboxes = e.currentTarget.closest(".c-friends__checkboxes").querySelectorAll(".checkbox__input");
        let checks = [];
        checkboxes.forEach((item) => {
            const id = item.id;
            const active = item.checked;
            let field = {
                id,
                active,
                group: "creator"
            }
            checks.push(field)
        })

        nowShow = 0
        const tmp = await mainUsers(21, nowShow, checks);
        nowShow += tmp.list_records.length
        totalRecords = tmp.totalFound
        users = tmp.list_records
        initReload()
    }

    init(
        async () => {
            console.log("First Init")
            let checks = [];
            const field = {
                id: "online",
                active: false,
                group: "creator"
            }
            checks.push(field)
            let tmp = await mainUsers(21, 0, checks);
            users = tmp.list_records;
            nowShow = 21;
            totalRecords = tmp.totalFound;
            // console.log("users = ", users);
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
                                                <input
                                                    class="checkbox__input"
                                                    type="checkbox"
                                                    id="online"
                                                    required="required"
                                                    onChange={changeFilterUsers}
                                                />
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