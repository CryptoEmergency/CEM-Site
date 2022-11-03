import {
    jsx,
    jsxFrag,
    timersStart,
    sendApi,
    getStorage,
    setStorage,
    init,
    initReload,
    Variable,
    Helpers
} from '@betarost/cemjs';
import { If } from '@component/helpers/All.js';
import { BlockUsers, BlockMainNews, BlockBanners, BlockExchange, BlockInfoPartners, BlockPreview, BlockProjects } from '@component/blocks/index.js';


import images from "@assets/images/index.js";

import { BlockQuestions } from '@component/blocks/BlockQuestions.js';
import { BlockTrade } from '@component/blocks/BlockTrade.js';

import { ButtonShowMore } from '@component/element/index.js';
const start = function () {
    let filters,
        filtersQuestions
    let type = "all"
    Variable.visibleFilterUser = false

    init(
        async () => {
            filters = {
                lang: {
                    code: "",
                    name: "all"
                },
                country: {
                    code: "",
                    name: "all"
                },
                group: {
                    common: true,
                    content: true,
                    expert: true
                },
                online: false
            }

            filtersQuestions = {
                lang: {
                    code: Variable.lang.code,
                    name: `${Variable.lang.lang} (${Variable.lang.lang_orig})`
                },
                questions: {
                    value: "all"
                },
                date: {
                    value: "date"
                },
                desc: -1
            }
            Variable.MainQuestions = await sendApi.send({ action: "getQuestions", short: true, cache: true, name: "MainQuestions", filter: Helpers.getFilterQuestions(filtersQuestions), sort: Helpers.getSortQuestions(filtersQuestions), limit: 6 });
            Variable.MainTrades = await sendApi.send({ action: "getTrade", short: true, cache: true, name: "MainTrades" });
            timersStart("Course", async () => { Variable.Course = await sendApi.send({ action: "getCourse", short: true }) }, 10000)
        },
        () => {
            return (
                <div class="c-main__body">
                    <BlockPreview />
                    <BlockProjects />
                    <div class="c-main__wrapperbg">
                        {() => {
                            if (Variable.lang.code == "ru") {
                                return (
                                    <a onclick={Helpers.siteLink} href="/forum/" style="max-width: 1240px; margin: 10px auto;display: block">
                                        <img style="border-radius: 4px; width: 100%" src={images['forum/forum_banner']} />
                                    </a>
                                )
                            }
                        }}
                        <BlockQuestions
                            version={Variable.dataUrl}
                            filters={filtersQuestions}
                            button={
                                // <div class="c-questions__footer">
                                //     <a
                                //         class="c-button c-button--gray"
                                //         href="/question/"
                                //         onclick={Helpers.siteLink}
                                //     >
                                //         <span class="c-button__wrapper">{Variable.lang.button.allQuestions}</span>
                                //     </a>
                                // </div>
                                <If
                                    data={Variable.dataUrl && Variable.dataUrl.adress == "question" && Variable.MainQuestions.list_records.length < Variable.MainQuestions.totalFound}
                                    dataIf={
                                        <ButtonShowMore
                                            onclick={async () => {
                                                let tmp = await sendApi.send({ action: "getQuestions", short: true, limit: 6, offset: Variable.MainQuestions.list_records.length, filter: Helpers.getFilterQuestions(filtersQuestions), sort: Helpers.getSortQuestions(filtersQuestions) })
                                                Variable.MainQuestions.list_records.push(...tmp.list_records)
                                                // console.log('=Variable.MainQuestions.list_records=', Variable.MainQuestions.list_records)
                                                // console.log('= Variable.MainQuestions.list_records.length.MainQuestions.totalFound=', Variable.MainQuestions.list_records.length)
                                                initReload()
                                            }}
                                        />
                                    }
                                    dataElse={
                                        <a class="btn-view-all-a c-button c-button--gray" href="/question/" onclick={Helpers.siteLink}>
                                            <span class="c-button__wrapper">{Variable.lang.button.show_all}</span>
                                        </a>
                                    }
                                />
                            }
                            callBack={
                                async function (active, nameOptions) {
                                    filtersQuestions[nameOptions].value = active
                                    Variable.MainQuestions = await sendApi.send({ action: "getQuestions", short: true, filter: Helpers.getFilterQuestions(filtersQuestions), sort: Helpers.getSortQuestions(filtersQuestions) });
                                    initReload();
                                }
                            }
                            name={"MainQuestions"}
                            items={Variable.MainQuestions}
                        />
                        <div class="c-main__wrapperbg2">
                            <BlockBanners />
                            <BlockTrade
                                nameRecords="MainTrades"
                                button={
                                    <div class="crypto_exchanges_footer">
                                        <a class="c-button c-button--gray" href="/list-trade/" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.h.trade }) }}>
                                            <span class="c-button__wrapper">{Variable.lang.button.show_all}</span>
                                        </a>
                                    </div>
                                }
                            />
                            <div class="top_professionals_container">
                                <BlockExchange
                                    nameRecords="MainExchanges"
                                    limit={6}
                                    button={
                                        <div class="crypto_exchanges_footer">
                                            <a class="c-button c-button--gray" href="/list-exchange/" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.h.exchange }) }}>
                                                <span class="c-button__wrapper">{Variable.lang.button.show_all}</span>
                                            </a>
                                        </div>
                                    }
                                />
                                <BlockUsers
                                    title={Variable.lang.h.top_users}
                                    filters={filters}
                                    nameRecords="MainUsers"
                                    type={type}
                                    limit={6}
                                    button={
                                        <a class="btn-view-all-a c-button c-button--gray" href="/users/" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.h.top_users }) }}>
                                            <span class="c-button__wrapper">{Variable.lang.button.show_all}</span>
                                        </a>
                                    }
                                />
                                <BlockMainNews />
                                <BlockInfoPartners
                                    limit={4}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
};

export default start;