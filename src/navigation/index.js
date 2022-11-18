import {
    jsx,
    jsxFrag,
    timersStart,
    sendApi,
    init,
    initReload,
    Variable,
    Helpers
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import images from "@assets/images/index.js";


import {
    BlockUsers,
    BlockBanners,
    BlockExchange,
    BlockInfoPartners,
    BlockProjects,
    BlockTrade,
    BlockQuestions
} from '@component/blocks/index.js';
import { ButtonShowMore } from '@component/element/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    let filtersQuestions

    init(
        async () => {
            Static.dataUsers = {}
            Static.dataQuestions = {}
            fn.initData.users(Static.dataUsers)
            fn.initData.question(Static.dataQuestions)
            Static.dataUsers.nameRecords = "MainUsers"
            Static.dataQuestions.nameRecords = "MainQuestions"
            Static.dataExchange = { nameRecords: "MainExchanges" }
            Static.dataTrade = { nameRecords: "MainTrades" }
            Static.filters = {
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

            Static.filtersQuestions = {
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
            await fn.restApi.getCourse({ cache: true, name: "Course", filter: {} })
            // await api({ type: "get", action: "getCourse", short: true, cache: true, name: "Course" })
            await fn.restApi.getNews({ cache: true, name: "MainNews", filter: {} })
            // await api({ type: "get", action: "getNews", short: true, cache: true, name: "MainNews", })
            timersStart("Course", async () => { fn.restApi.getCourse({ name: "Course", filter: {} }) }, 10000)
        },
        () => {
            return (
                <div class="c-main__body">
                    <div class="с-preview">
                        <img class="с-preview__lines" src={images["background/lines-preview-min"]} />
                        <div class="с-preview__title">
                            <img class="с-preview__bg" src={images["background/cem"]} />
                            <div class="с-preview__text с-preview__text--auth">
                                <span>{Variable.lang.homePreview.ask}</span>
                                <div class="с-preview__imgblock">
                                    <img class="с-preview__img" src={svg.two} />
                                    <img class="с-preview__img" src={svg.two5} />
                                    {Variable.lang.homePreview.earn}
                                </div>
                            </div>
                        </div>
                        <div class="с-preview__crypto">
                            {
                                () => {
                                    if (Variable.Course && Variable.Course.list_records && Variable.Course.list_records.length) {
                                        const arrReturn = Object.keys(Variable.Course.list_records[0]).filter((item) => typeof Variable.Course.list_records[0][item] == 'object').map(function (key) {
                                            let course = Variable.Course.list_records[0][key]
                                            return (
                                                <a
                                                    href={key == "cem" ? "https://www.bitmart.com/trade/en?layout=basic&symbol=CEM_USDT" : "/list-trade/"}
                                                    rel="nofollow noopener"
                                                    target={key == "cem" ? "_blank" : "_self"}
                                                    class="c-currency"
                                                >
                                                    <div class="c-currency__icon">
                                                        <div class={`icon-color-${key}`}>
                                                            <img src={`/assets/icons/coins/${key}2.svg`} />
                                                        </div>
                                                    </div>
                                                    <div class="c-currency__info">
                                                        <div class="c-currency__left">
                                                            <div class="c-currency__name">{key.toLocaleUpperCase() + "/USDT"}</div>
                                                            <div class="c-currency__price"><span class="btcusdt_price">{Helpers.numberFixWithSpaces(course.usdt, key === "cem" ? 4 : 2)}</span></div>
                                                        </div>
                                                        <div class="c-currency__right">
                                                            <div class={`c-currency__percent ${course.change >= 0 ? " c-currency__percent--up" : " c-currency__percent--down"}`}>
                                                                <img src={course.change >= 0 ? svg.up_arrow : svg.down_arrow} />
                                                                <span class="btcusdt_change">{Helpers.numberFixWithSpaces(course.change, 2)}</span>
                                                            </div>
                                                            {/* <div class="c-currency__update">24h.</div> */}
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })
                                        return arrReturn
                                    }
                                }
                            }
                        </div>
                    </div>
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
                        <BlockQuestions Static={Static.dataQuestions} limit={6} />
                        <div class="c-main__wrapperbg2">
                            <BlockBanners />
                            <BlockTrade Static={Static.dataTrade} limit={6} />
                            <div class="top_professionals_container">
                                <BlockExchange Static={Static.dataExchange} limit={6} />
                                <BlockUsers Static={Static.dataUsers} limit={6} />
                                <div class="news_block_container">
                                    <div class="news_block">
                                        <div class="home_page_news">
                                            <a class="crypto_news_link" href="/news/" onclick={(e) => { fn.siteLinkModal(e, { title: Variable.lang.a.news, items: fn.itemsMenu.onlyPage({url: '/news/'}) }) }}>Crypto News</a>
                                            <div class="gradient_line"></div>
                                        </div>
                                        <div class="main_page_news_block">
                                            {() => {
                                                if (Variable.MainNews && Variable.MainNews.list_records && Variable.MainNews.list_records.length) {
                                                    const arrReturn = Variable.MainNews.list_records.map(function (item, i) {
                                                        return (
                                                            <a
                                                                class="blog_news_item"
                                                                onclick={(e) => { fn.siteLinkModal(e, { title: Variable.lang.a.news, item: item, items: fn.itemsMenu.onlyPage({url: `/news/show/${item._id}`}) }) }}
                                                                href={`/news/show/${item._id}`}
                                                            >
                                                                <img
                                                                    style="margin-bottom: 20px"
                                                                    src={`/assets/upload/news/${item.image}`}
                                                                />
                                                                <p style="margin-bottom: 20px" class="blog_new_title ">
                                                                    {item.title}
                                                                </p>
                                                                <div style="display: flex!important;" class="blog_post_stat">
                                                                    <span>
                                                                        <img src={svg.question_views} />
                                                                        <span class="">{item.statistic.view + 1}</span>
                                                                    </span>
                                                                    <span>
                                                                        <img src={svg.question_answers} />
                                                                        <span class="">{item.statistic.comments}</span>
                                                                    </span>
                                                                    <span class="">{Helpers.getDateFormat(item.showDate)}</span>
                                                                </div>
                                                            </a>
                                                        )
                                                    })
                                                    return arrReturn
                                                }
                                            }}
                                        </div>
                                    </div>
                                    <div class="button-container-preview">

                                        <a class="c-button c-button--primary 2btn-news-preview" href="/news/" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.news }) }}>
                                            <span class="c-button__text">
                                                {Variable.lang.button.allNews}
                                            </span>
                                        </a>
                                    </div>
                                </div>

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