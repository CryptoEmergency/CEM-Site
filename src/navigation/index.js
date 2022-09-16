import {
    jsx,
    jsxFrag,
    getVariable,
    getStorage,
    makeDOM,
    timersStart,
    setValue,
    getValue,
    sendApi,
    init,
    Variable
} from '@betarost/cemjs'
import { timerCourse, checkAnswerApi } from '@src/functions.js'
import { mainQuestions } from "@src/apiFunctions.js";

import { BlockPreview } from '@component/blocks/BlockPreview.js';
import { BlockProjects } from '@component/blocks/BlockProjects.js';
import { BlockQuestions } from '@component/blocks/BlockQuestions.js';
import { BlockBanners } from '@component/blocks/BlockBanners.js';
import { BlockTrade } from '@component/blocks/BlockTrade.js';
import { BlockExchange } from '@component/blocks/BlockExchange.js';
import { BlockUsers } from '@component/blocks/BlockUsers.js';
import { BlockMainNews } from '@component/blocks/BlockMainNews.js';
import { BlockInfoPartners } from '@component/blocks/BlockInfoPartners.js';




const init22 = async function (reload) {
    if (!reload) {



        if (!getValue(ID, "mainTrades")) {

            let data = {
                "sort": {
                    "score": -1
                },
                "limit": 6
            }
            setValue(ID, "mainTrades", checkAnswerApi(await sendApi.create("getTrade", data)).list_records)
        }

        if (!getValue(ID, "mainExchanges")) {
            let data = {
                "sort": {
                    "score": -1
                },
                "limit": 6
            }
            setValue(ID, "mainExchanges", checkAnswerApi(await sendApi.create("getExchange", data)).list_records)
        }

        if (!getValue(ID, "mainUsers")) {
            let data = {
                "filter": {
                    "confirm.registrasion": true
                },
                "select": {
                    "rank": 1,
                    "social": 1,
                    "subscribe": 1,
                    "nickname": 1,
                    "fullname": 1,
                    "information.speciality": 1,
                    "avatar.name": 1,
                    "frame.name": 1,
                    "statistic": 1,
                    "online": 1,
                    "awards": 1,
                    "status": 1
                },
                "limit": 6
            }
            setValue(ID, "mainUsers", checkAnswerApi(await sendApi.create("getUsers", data)).list_records)
        }

        if (!getValue(ID, "mainNews")) {
            let data = {
                "filter": {
                    "type": "news",
                    "languages.code": "ru"
                },
                "select": {
                    "title": 1,
                    "preview": 1,
                    "image": 1,
                    "showDate": 1,
                    "statistic.view": 1,
                    "statistic.comments": 1
                },
                "sort": {
                    "showDate": -1
                },
                "limit": 6
            }
            setValue(ID, "mainNews", checkAnswerApi(await sendApi.create("getNews", data)).list_records)
        }

    }

}



const start = function () {

    let projects,
        banners,
        partners,
        questions

    Variable.HeaderShow = true
    Variable.FooterShow = true

    // const trades = getValue(ID, "mainTrades");
    // const exchanges = getValue(ID, "mainExchanges");
    // const users = getValue(ID, "mainUsers");
    // const news = getValue(ID, "mainNews");


    init(
        async () => {

            if (!Variable.course) {
                let tpm = checkAnswerApi(await sendApi.getCourse())
                Variable.course = tpm.list_records[0]
            }
            timersStart("Course", timerCourse, 10000)

            questions = await mainQuestions()

            projects = [
                {
                    "title": Variable.lang.a.exchange,
                    "icon": "shuffle",
                    "link": "list-exchange"
                },
                {
                    "title": Variable.lang.a.university,
                    "icon": "mortarboard",
                    "link": "university"
                },
                {
                    "title": Variable.lang.a.contentCreater,
                    "icon": "graph",
                    "link": "content-creator"
                },
                {
                    "title": Variable.lang.a.starups,
                    "icon": "startup",
                    "link": "startups"
                },
                {
                    "title": Variable.lang.a.universes,
                    "icon": "meta_universes",
                    "link": "university"
                },
                {
                    "title": Variable.lang.a.icoRating,
                    "icon": "star1",
                    "link": "ico-rating"
                },
                {
                    "title": Variable.lang.a.trade,
                    "icon": "stock-market",
                    "link": "list-trade"
                },
                {
                    "title": Variable.lang.a.news,
                    "icon": "world-news",
                    "link": "news"
                },
                {
                    "title": Variable.lang.a.experts,
                    "icon": "user",
                    "link": "experts"
                },
                {
                    "title": Variable.lang.a.nft,
                    "icon": "nft_icon",
                    "link": "nft-market"
                },
                {
                    "title": Variable.lang.a.career,
                    "icon": "careers_icon",
                    "link": "experts"
                },
            ];

            banners = [
                {
                    "id": "62dd2ca100978d192547427c",
                    "image": "lbf_banner"
                },
                {
                    "id": "62bab2ac962df43c3fd94755",
                    "image": "blockchain24"
                },
                {
                    "id": "62f0da1ef2b8fa66345ef411",
                    "image": "crypto_summit"
                },
                {
                    "id": "630382384dab714d6e986cd6",
                    "image": "1200х580-(fb)"
                },
                {
                    "id": "62fb66bd4dab714d6e955d80",
                    "image": "blockchain_life"
                },
                {
                    "id": "62d134221de982539a72345e",
                    "image": "crypto_future_banner"
                }
            ];

            partners = [
                {
                    "link": "https://sberunity.ru/main/startups/879d88aa-4729-4788-a541-20cc8cc3cb14",
                    "image": "sber_unity"
                },
                {
                    "link": "https://sk.ru",
                    "image": "skolkovo"
                },
                {
                    "link": "https://cryptosummit.ru",
                    "image": "crypto_summit"
                },
                {
                    "link": "https://plus-forum.co",
                    "image": "plus_forum"
                },
                {
                    "link": "https://blockchain-life.com/europe/ru/",
                    "image": "blockchain_life"
                },
                {
                    "link": "https://rbw.moscow/?utm_source=infopartner&utm_medium=cryptoemergency&utm_campaign=pressreliz",
                    "image": "b4_week"
                },
                {
                    "link": "https://ru.beincrypto.com",
                    "image": "be_in_crypto"
                },
                {
                    "link": "https://mining-cryptocurrency.ru",
                    "image": "crypto_mining"
                },
                {
                    "link": "https://cryptomania.moscow",
                    "image": "cryptomania"
                },
                {
                    "link": "https://techweek.moscow",
                    "image": "tech_week"
                }
            ];

        },
        () => {



            return (
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
                    <BlockPreview />
                    <BlockProjects projects={projects} />
                    <div class="c-main__wrapperbg">
                        <BlockQuestions lang={Variable.lang} questions={questions} />

                        {/* <div class="c-main__wrapperbg2">
                            <BlockBanners banners={banners} />
                            <BlockTrade lang={Variable.lang} trades={trades} />
                            <div class="top_professionals_container">
                                <BlockExchange lang={Variable.lang} exchanges={exchanges} />
                                <BlockUsers lang={Variable.lang} users={users} />
                                <BlockMainNews lang={Variable.lang} news={news} />
                                <BlockInfoPartners lang={Variable.lang} partners={partners} />
                            </div>
                        </div> */}
                    </div>
                </div>
            )
        })
};

export default start;