import {
    jsx,
    jsxFrag,
    timersStart,
    sendApi,
    init,
    Variable
} from '@betarost/cemjs';

import { timerCourse, checkAnswerApi, siteLink } from '@src/functions.js'

import { BlockPreview } from '@component/blocks/BlockPreview.js';
import { BlockProjects } from '@component/blocks/BlockProjects.js';
import { BlockQuestions } from '@component/blocks/BlockQuestions.js';
import { BlockBanners } from '@component/blocks/BlockBanners.js';
import { BlockTrade } from '@component/blocks/BlockTrade.js';
import { BlockExchange } from '@component/blocks/BlockExchange.js';
import { BlockUsers } from '@component/blocks/BlockUsers.js';
import { BlockMainNews } from '@component/blocks/BlockMainNews.js';
import { BlockInfoPartners } from '@component/blocks/BlockInfoPartners.js';

const start = function () {

    Variable.HeaderShow = true
    Variable.FooterShow = true
    Variable.visibleFilterUser = false

    init(
        async () => {

            Variable.Course = checkAnswerApi(await sendApi.getCourse({ setIntervalFunc: timerCourse }))
            timersStart("Course", timerCourse, 10000)

            Variable.MainQuestions = checkAnswerApi(await sendApi.getMainQuestions(
                {
                    setIntervalFunc: async () => {
                        Variable.MainQuestions = checkAnswerApi(await sendApi.getMainQuestions({ name: "getMainQuestions" }))
                    },
                    name: "getMainQuestions"
                }
            )
            )

            Variable.MainTrades = checkAnswerApi(await sendApi.getMainTrades(
                {
                    setIntervalFunc: async () => {
                        Variable.MainTrades = checkAnswerApi(await sendApi.getMainTrades({ name: "getMainTrades" }))
                    },
                    name: "getMainTrades"

                }
            )
            )

            Variable.MainExchanges = checkAnswerApi(await sendApi.getMainExchanges(
                {
                    setIntervalFunc: async () => {
                        Variable.MainExchanges = checkAnswerApi(await sendApi.getMainExchanges({ name: "getMainExchanges" }))
                    },
                    name: "getMainExchanges"
                }
            )
            )

            Variable.MainUsers = checkAnswerApi(await sendApi.getMainUsers(
                {
                    setIntervalFunc: async () => {
                        Variable.MainUsers = checkAnswerApi(await sendApi.getMainUsers({ name: "getMainUsers" }))
                    },
                    name: "getMainUsers"
                }
            )
            )

            Variable.MainNews = checkAnswerApi(await sendApi.getMainNews(
                {
                    setIntervalFunc: async () => {
                        Variable.MainNews = checkAnswerApi(await sendApi.getMainNews({ name: "getMainNews" }))
                    },
                    name: "getMainNews"
                }
            )
            )


        },
        () => {

            return (
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
                    <BlockPreview />
                    <BlockProjects />
                    <div class="c-main__wrapperbg">
                        <BlockQuestions
                            button={
                                <div class="c-questions__footer">
                                    <a
                                        class="c-button c-button--gray"
                                        href="/question/"
                                        onclick={siteLink}
                                    >
                                        <span class="c-button__wrapper">{Variable.lang.button.showMore}</span>
                                    </a>
                                </div>
                            }
                        />
                        <div class="c-main__wrapperbg2">
                            <BlockBanners />
                            <BlockTrade />
                            <div class="top_professionals_container">
                                <BlockExchange
                                    button={
                                        <div class="crypto_exchanges_footer">
                                            <a class="c-button c-button--gray" href="/list-exchange/" onclick={siteLink}>
                                                <span class="c-button__wrapper">{Variable.lang.button.show_all}</span>
                                            </a>
                                        </div>
                                    }
                                />
                                <BlockUsers />
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