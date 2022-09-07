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

//console.log("getVariable", getVariable("languages"))



let options ={}
let sortSelects = {}


const mainView = function () {
 const lang = getVariable("languages")[getStorage("lang")]
 console.log("getVariable", getVariable("languages"))

    
    
    
    const changeSelect = (e, type, ID , value) => {
        e.stopPropagation();
        let show = getValue(ID, "showObject")[type]
        if (e.target.localName === "li") {
            let tmp = { ...sortSelects, [type]: value };
            sortSelects = { ...tmp };
            console.log("sortSelects",sortSelects)
        }
        setValue(ID, "showObject", { [type]: !show });
        init(true)
    }


   
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
            "link": "university"
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
    const trades = getValue(ID, "mainTrades");
    const exchanges = getValue(ID, "mainExchanges");
    const users = getValue(ID, "mainUsers");
    const news = getValue(ID, "mainNews");
    const partners = [
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

    return (
        <div class={show && "c-main__body" || "c-main__body--noheader"}>
            <BlockPreview lang={lang} course={course} />
            <BlockProjects lang={lang} projects={projects} />
            <div class="c-main__wrapperbg">
                <BlockQuestions lang={lang} questions={questions} options = {options} 
                changeSelect={changeSelect} sortSelects = {sortSelects} />

                <div class="sturtups-wrapper">
                    <BlockBanners banners={banners} />
                    <BlockTrade lang={lang} trades={trades} />
                    <div class="top_professionals_container">
                        <BlockExchange lang={lang} exchanges={exchanges} />
                        <BlockUsers lang={lang} users={users} />
                        <BlockMainNews lang={lang} news={news} />
                        <BlockInfoPartners lang={lang} partners={partners} />
                    </div>
                </div>
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

        timersStart("Course", timerCourse, 10000);
        setValue(ID, "showObject", { selectBlockQuestions1: false });
        setValue(ID, "showObject", { selectBlockQuestions2: false });

        const lang = getVariable("languages")[getStorage("lang")]
        options = {
            questions: [
                { value: lang.select.showAllQuestions },
                { value: lang.select.openQuestions },
                { value: lang.select.closeQuestions },
                { value: lang.select.bestQuestions }
            ],
            date: [
                { value: lang.select.byDate },
                { value: lang.select.byViews },
                { value: lang.select.byAnswers },
            ]
        }

        sortSelects = {
            selectBlockQuestions1: options.questions[0].value,
            selectBlockQuestions2: options.date[0].value,
        }
        // let sortSelects = {
        //     selectBlockQuestions1: options.questions[0].value,
        //     selectBlockQuestions2: options.date[0].value,
        // }
    }

    setValue("mainHeader", "show", true);
    setValue("mainFooter", "show", true);
    await makeDOM(mainView(), ID);
}

export default init;