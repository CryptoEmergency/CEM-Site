import {
    jsx,
    jsxFrag,
    getVariable,
    getStorage,
    makeDOM,
    timersStart,
    setValue,
    getValue,
    sendApi
} from '@betarost/cemjs'
import { timerCourse, checkAnswerApi } from '@src/functions.js'

import { BlockPreview } from '@component/blocks/BlockPreview.js';
import { BlockProjects } from '@component/blocks/BlockProjects.js';
import { BlockQuestions } from '@component/blocks/BlockQuestions.js';
import { BlockBanners } from '@component/blocks/BlockBanners.js';
import { BlockTrade } from '@component/blocks/BlockTrade.js';
import { BlockExchange } from '@component/blocks/BlockExchange.js';
import { BlockUsers } from '@component/blocks/BlockUsers.js';
import { BlockMainNews } from '@component/blocks/BlockMainNews.js';
import { BlockInfoPartners } from '@component/blocks/BlockInfoPartners.js';


const mainView = function () {
    const lang = getVariable("languages")[getStorage("lang")]
    const course = getValue(ID, "mainCourse");
    const show = getValue("mainHeader", "show");
    const projects = [
        {
            "title": lang.a.exchange,
            "icon": "shuffle",
            "link": "list-exchange"
        },
        {
            "title": lang.a.university,
            "icon": "mortarboard",
            "link": "library"
        },
        {
            "title": lang.a.contentCreater,
            "icon": "graph",
            "link": "content-creator"
        },
        {
            "title": lang.a.starups,
            "icon": "startup",
            "link": "startups"
        },
        {
            "title": lang.a.universes,
            "icon": "meta_universes",
            "link": "university"
        },
        {
            "title": lang.a.icoRating,
            "icon": "star1",
            "link": "ico-rating"
        },
        {
            "title": lang.a.trade,
            "icon": "stock-market",
            "link": "list-trade"
        },
        {
            "title": lang.a.news,
            "icon": "world-news",
            "link": "news"
        },
        {
            "title": lang.a.experts,
            "icon": "user",
            "link": "experts"
        },
        {
            "title": lang.a.nft,
            "icon": "nft_icon",
            "link": "nft-market"
        },
        {
            "title": lang.a.career,
            "icon": "careers_icon",
            "link": "experts"
        },
    ];
    const questions = getValue(ID, "mainQuestions");
    const banners = [
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
            "image": "plus_forum"
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

    return (
        <div class={show && "c-main__body" || "c-main__body--noheader"}>
            <BlockPreview lang={lang} course={course} />
            <BlockProjects lang={lang} projects={projects} />
            <div class="index-questions_wrapper">
                <BlockQuestions lang={lang} questions={questions} />
            </div>
            <div class="sturtups-wrapper">
                <BlockBanners banners={banners} />
            </div>
            <div class="sturtups-wrapper">
                <BlockTrade lang={lang} />
            </div>
            <div class="sturtups-wrapper">
                <BlockExchange lang={lang} />
            </div>
            <div class="top_professionals_container">
                <BlockUsers lang={lang} />
            </div>
            <div class="news_block_container">
                <BlockMainNews lang={lang} />
            </div>
            <div class="top_professionals_container">
                <BlockInfoPartners lang={lang} />
            </div>
        </div>
    )

}


const ID = "mainBlock"

const init = async function (reload) {
    if (!reload) {
        if (!getValue(ID, "mainCourse")) {
            const course = checkAnswerApi(await sendApi.getCourse())
            setValue(ID, "mainCourse", course.list_records[0])
        }

        if (!getValue(ID, "mainQuestions")) {

            let data = {
                "filter": {
                    "languages.code": getStorage("lang")
                },
                "select": {
                    "title": 1,
                    "showDate": 1,
                    "statistic": 1,
                    "languages": 1,
                    "close": 1,
                    "bestId": 1,
                    "media": 1,
                    "author": 1
                },
                "sort": {
                    "showDate": -1
                },
                "limit": 6
            }
            // console.log( checkAnswerApi(await sendApi.create("getQuestions",data)));
            setValue(ID, "mainQuestions", checkAnswerApi(await sendApi.create("getQuestions", data)).list_records)
        }


        timersStart("Course", timerCourse, 10000)
    }
    setValue("mainHeader", "show", true);
    setValue("mainFooter", "show", true);


    await makeDOM(mainView(), ID);
}

export default init