import {
    jsx,
    jsxFrag,
    timersStart,
    sendApi,
    init,
    Variable,
    Helpers
} from '@betarost/cemjs';

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
            Variable.Course = await sendApi.send({ action: "getCourse", short: true, cache: true, name: "Course" });
            Variable.MainQuestions = await sendApi.send({ action: "getQuestions", short: true, cache: true, name: "MainQuestions" });
            Variable.MainTrades = await sendApi.send({ action: "getTrade", short: true, cache: true, name: "MainTrades" });
            Variable.MainExchanges = await sendApi.send({ action: "getExchange", short: true, cache: true, name: "MainExchanges" });
            Variable.MainUsers = await sendApi.send({ action: "getUsers", short: true, cache: true, name: "MainUsers" });
            Variable.MainNews = await sendApi.send({ action: "getNews", short: true, cache: true, name: "MainNews" });
            timersStart("Course", async () => { Variable.Course = await sendApi.send({ action: "getCourse", short: true }) }, 10000)
        },
        () => {

            return (
                <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
                    <BlockPreview />
                    <BlockProjects />
                    {/* <div class="c-main__wrapperbg">
                        <BlockQuestions
                            button={
                                <div class="c-questions__footer">
                                    <a
                                        class="c-button c-button--gray"
                                        href="/question/"
                                        onclick={Helpers.siteLink}
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
                                            <a class="c-button c-button--gray" href="/list-exchange/" onclick={Helpers.siteLink}>
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
                    </div> */}
                </div>
            )
        })
};

export default start;