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
import { UserItem } from '@component/element/UserItem.js';

import { api } from '@src/apiFunctions.js'

import {
    ButtonShowMore,
    NewsCategory,
    NewsItem
} from '@component/element/index.js';

let elem = Variable.setRef()

const BlockUsers = async function ({ title, filters, type, nameRecords }) {

    await initOne(
        async () => {
            let limit = 21
            if(Variable.dataUrl && Variable.dataUrl.adress == ""){
                limit = 6
            }
            await api({ type: "get", action: "getUsers", short: true, cache: true, name: nameRecords, limit: limit, filter: Helpers.getFilterUsers(filters, type) })
        }
    )
    return (
        <div class="c-friends">
            <div class="c-friends__container c-container">
                <h2>
                    {()=>{
                        if(title){
                            return(
                                title
                            )
                        } else {
                            return(
                                Variable.lang.h.top_users
                            )
                        }
                    }}
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
                                        elem().style = "";
                                        let h = elem().offsetHeight;
                                        elem().style = `height: ${h}px`
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
                                                    Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, cache: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                }
                                            }
                                        })
                                    }}
                                >
                                    {()=>{
                                        if(filters.lang.name == "all"){
                                            return(
                                                Variable.lang.text.language
                                            )
                                        } else {
                                            return(
                                                filters.lang.name
                                            )
                                        }
                                    }}
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
                                                    Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, cache: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
                                                }
                                            }
                                        })
                                    }}
                                >
                                    {()=>{
                                        if(filters.country.name == "all"){
                                            return(
                                                Variable.lang.text.country
                                            )
                                        } else {
                                            return(
                                                filters.country.name
                                            )
                                        }
                                    }}
                                </div>
                                <img
                                    style="display: none;"
                                    class="refresh_country"
                                    src={svg.refresh_filter}
                                />
                            </div>
                            {()=>{
                                if(filters.group != false){
                                    return(
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
                                                        Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, cache: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
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
                                                        Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, cache: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
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
                                                        Variable[nameRecords] = await api({ type: "get", action: "getUsers", short: true, cache: true, name: nameRecords, limit: 21, filter: Helpers.getFilterUsers(filters, type) })
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
                                    return(
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
                        {
                            Variable[nameRecords].list_records.map((item, index) => {
                                return (
                                    <UserItem user={item} />
                                )
                            })
                        }

                    </div>
                </div>
                {()=>{
                    if(Variable.dataUrl && Variable.dataUrl.adress == "users" && Variable[nameRecords].list_records.length < Variable[nameRecords].totalFound){
                        return(
                            <ButtonShowMore
                                onclick={async () => {
                                    let tmp = await api({ type: "get", action: "getUsers", short: true, limit: 21, filter: Helpers.getFilterUsers(filters, type), offset: Variable[nameRecords].list_records.length})
                                    Variable[nameRecords].list_records.push(...tmp.list_records)
                                }}
                            />
                        )
                    }
                }}
                {()=>{
                    if(Variable.dataUrl && Variable.dataUrl.adress == ""){
                        return(
                            <a class="btn-view-all-a c-button c-button--gray" href="/users/" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.h.top_users }) }}>
                                <span class="c-button__wrapper">{Variable.lang.button.show_all}</span>
                            </a>
                        )
                    }
                }}
            </div>
        </div>
    )
}

export { BlockUsers }