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
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { Select } from '@component/element/Select.js';
import { timerCourse, checkAnswerApi } from '@src/functions.js'
import { mainQuestions, mainTrades, mainExchanges, mainUsers, mainNews } from "@src/apiFunctions.js";

import { QuestionItem } from '@component/element/QuestionItem.js';
import { BlockPreview } from '@component/blocks/BlockPreview.js';
import { BlockProjects } from '@component/blocks/BlockProjects.js';
// import { BlockQuestions } from '@component/blocks/BlockQuestions.js';
import { BlockBanners } from '@component/blocks/BlockBanners.js';
import { BlockTrade } from '@component/blocks/BlockTrade.js';
import { BlockExchange } from '@component/blocks/BlockExchange.js';
import { BlockUsers } from '@component/blocks/BlockUsers.js';
import { BlockMainNews } from '@component/blocks/BlockMainNews.js';
import { BlockInfoPartners } from '@component/blocks/BlockInfoPartners.js';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


const start = function () {

    let projects,
        banners,
        partners,
        questions,
        trades,
        exchanges,
        users,
        news,
        // totalRecords,
        // nowShow,
        optionsSelect;

    let swiperitem = {}

    const selectCallBack = async function (value, nameOptions) {
        console.log("selectCallBack", value, nameOptions);
        if (nameOptions == "questions") {
            // nowShow = 0
            const tmp = await mainQuestions(optionsSelect, 6, nowShow);
            // nowShow += tmp.list_records.length
            // totalRecords = tmp.totalFound
            questions = tmp.list_records
            initReload()
        } else if (nameOptions == "date") {
            // nowShow = 0
            const tmp = await mainQuestions(optionsSelect, 6, nowShow);
            // nowShow += tmp.list_records.length
            // totalRecords = tmp.totalFound
            questions = tmp.list_records
            initReload()
        }
    };

    Variable.HeaderShow = true
    Variable.FooterShow = true

    const swiperLoad = function () {
        //console.log('=66d8ba= swiperLoad', swiperitem)
        // if (!swiperitem.one) {
        swiperitem.one = new Swiper('#swiper-one', {
            direction: 'horizontal',
            navigation: {
                nextEl: '#next-icons',
                prevEl: '#prev-icons',
            },
            breakpoints: {
                20: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                320: {
                    slidesPerView: 3,
                    spaceBetween: 15
                },
                425: {
                    slidesPerView: 3,
                    spaceBetween: 25
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 65
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 88
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 158
                },
                1240: {
                    slidesPerView: 9,
                    spaceBetween: 66,
                },
            },
        });
        // }

        // if (!swiperitem.desktop) {

        swiperitem.desktop = new Swiper('#swiper-desktop', {
            direction: 'horizontal',
            navigation: {
                nextEl: '#next-desktop-icons',
                prevEl: '#prev-desktop-icons',
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 85
                },
                375: {
                    slidesPerView: 2,
                    spaceBetween: 125
                },
                425: {
                    slidesPerView: 3,
                    spaceBetween: 35
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 65
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 88
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 40
                },
                1240: {
                    slidesPerView: 9,
                    spaceBetween: 30,
                },
            },
        });
        // }
        return

    }

    init(
        async () => {
            Variable.SwiperLoad.push(swiperLoad)
            //let tpm = checkAnswerApi(await sendApi.getCourse({ setIntervalFunc: timerCourse }))
            Variable.course = checkAnswerApi(await sendApi.getCourse({ setIntervalFunc: timerCourse })).list_records[0]
            timersStart("Course", timerCourse, 10000)

            optionsSelect = {
                questions: {
                    nameOptions: "questions",
                    title: Variable.lang.span.sort,
                    items: [
                        { text: Variable.lang.select.showAllQuestions, value: "all", active: true },
                        { text: Variable.lang.select.openQuestions, value: "open" },
                        { text: Variable.lang.select.closeQuestions, value: "closed" },
                        { text: Variable.lang.select.bestQuestions, value: "best" }
                    ],
                    open: false,
                    active: "all"
                },
                date: {
                    nameOptions: "date",
                    title: Variable.lang.span.sort,
                    items: [
                        { text: Variable.lang.select.byDate, value: "date", active: true },
                        { text: Variable.lang.select.byViews, value: "views" },
                        { text: Variable.lang.select.byAnswers, value: "answers" },
                    ],
                    open: false,
                    active: "date"
                }

            }

            const tmp = await mainQuestions(optionsSelect, 6);
            // nowShow = 12
            // totalRecords = tmp.totalFound
            questions = tmp.list_records;

            // questions = await mainQuestions()



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

            trades = await mainTrades();

            exchanges = await mainExchanges();

            const data_users = await mainUsers(6);

            users = data_users.list_records;

            news = await mainNews();

        },
        () => {

            return (
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
                    <BlockPreview />
                    <BlockProjects />

                    <div class="c-main__wrapperbg">
                        {/* <BlockQuestions /> */}
                        <div class="c-questions">
                            <div class="c-questions__header">
                                {/* <div class="c-questions__searchblock c-search">
                                    <div class="c-search__container">
                                        <div class="c-search__wrapper">
                                            <img class="c-search__icon" src={svg.search_icon} />
                                            <input class="c-search__input" type="text" placeholder={`${Variable.lang.placeholder.question}`} autocomplete="disabled" />
                                            <img class="c-search__icon c-search__icon--filter" src={svg.filter} />

                                        </div>
                                        <div style="display: none;" class="questions_search">
                                            <div class="question_search_half_empty">
                                                {Variable.lang.text.contInput}
                                            </div>
                                            <div style="display: none;" class="question_search_help">
                                            </div>
                                        </div>
                                    </div>
                                    <div data-needauth="true" data-action="askQuestionModal" class="mobile_search_container">
                                        <div class="search-button" style="width:238px;">
                                            {Variable.lang.button.giveQuestion}
                                        </div>
                                    </div>


                                </div> */}

                                {/* <div class="c-questions__filter questions_filter">
                                    <Select
                                        options={optionsSelect.questions}
                                        callback={selectCallBack}
                                    />
                                    <Select
                                        options={optionsSelect.date}
                                        callback={selectCallBack}
                                        toggler={true}
                                    />

                                    <div class="c-questions__lang">
                                        {Variable.lang.lang}
                                    </div>
                                </div> */}

                                <h4>{Variable.lang.h.lastQuestions}</h4>


                            </div>

                            {/* <div class="c-questions__list questions-blocks">
                                {
                                    questions.map((item) => {
                                        console.log("item=", item);
                                        return (
                                            <QuestionItem question={item} />
                                        )
                                    })
                                }
                            </div>

                            <div class="c-questions__footer">
                                <a
                                    class="c-button c-button--gray"
                                    href="question/"
                                >
                                    <span class="c-button__wrapper">{Variable.lang.button.showMore}</span>
                                </a>
                            </div> */}
                        </div>


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