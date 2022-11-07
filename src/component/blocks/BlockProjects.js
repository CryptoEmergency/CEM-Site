import {
    jsx,
    jsxFrag,
    Variable,
    initOne,
    Helpers
} from '@betarost/cemjs';
// check
import svg from "@assets/svg/index.js";
import { Swiper } from '@component/element/index.js';

const swiperOptions = {
    direction: 'horizontal',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        20: {
            slidesPerView: 3,
            spaceBetween: 15
        },
        390: {
            slidesPerView: 4,
            spaceBetween: 10
        },
        465: {
            slidesPerView: 3,
            spaceBetween: 25
        },
        // 320: {
        //     slidesPerView: 2,
        //     spaceBetween: 85
        // },
        // 375: {
        //     slidesPerView: 2,
        //     spaceBetween: 125
        // },
        // 425: {
        //     slidesPerView: 3,
        //     spaceBetween: 35
        // },
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
}

let projects
let projectRecords

const BlockProjects = async function () {

    await initOne(
        () => {
            projects = [
                {
                    "title": Variable.lang.a.exchange,
                    "style": "filter: invert(100%) sepia(15%) saturate(7500%) hue-rotate(180deg) brightness(107%) contrast(114%);",
                    "icon": "exchanger_menu_icon",
                    "link": "list-exchange",
                    modal: true
                },
                // {
                //     "title": Variable.lang.a.university,
                //     "icon": "mortarboard",
                //     "link": "university"
                // },
                {
                    "title": Variable.lang.a.contentCreater,
                    "style": "",
                    "icon": "graph",
                    "link": "content-creator",
                    modal: true
                },
                // {
                //     "title": Variable.lang.a.starups,
                //     "icon": "startup",
                //     "link": "startups"
                // },
                // {
                //     "title": Variable.lang.a.universes,
                //     "icon": "meta_universes",
                //     "link": "university"
                // },
                // {
                //     "title": Variable.lang.a.icoRating,
                //     "icon": "star1",
                //     "link": "ico-rating"
                // },
                {
                    "title": Variable.lang.a.trade,
                    "style": "filter: invert(100%) sepia(15%) saturate(7500%) hue-rotate(180deg) brightness(107%) contrast(114%);",
                    "icon": "exchange_menu_icon",
                    "link": "list-trade",
                    modal: true
                },
                {
                    "title": Variable.lang.a.news,
                    "style": "filter: invert(100%) sepia(15%) saturate(7500%) hue-rotate(180deg) brightness(107%) contrast(114%);",
                    "icon": "news_menu_icon1",
                    "link": "news",
                    modal: true
                },
                {
                    "title": Variable.lang.a.blog,
                    "style": "filter: invert(100%) sepia(15%) saturate(7500%) hue-rotate(180deg) brightness(107%) contrast(114%);",
                    "icon": "blog_menu_icon1",
                    "link": "blog",
                    modal: true
                },
                {
                    "title": Variable.lang.a.experts,
                    "style": "filter: invert(100%) sepia(15%) saturate(7500%) hue-rotate(180deg) brightness(107%) contrast(114%);",
                    "icon": "expert_menu_icon",
                    "link": "experts",
                    modal: true
                },
                // {
                //     "title": Variable.lang.a.nft,
                //     "icon": "nft_icon",
                //     "link": "nft-market"
                // },
                {
                    "title": Variable.lang.span.userNews,
                    "style": "filter: invert(100%) sepia(15%) saturate(7500%) hue-rotate(180deg) brightness(107%) contrast(114%);",
                    "icon": "user_news_page",
                    "link": "lenta-users",
                    modal: true
                },
                {
                    "title": Variable.lang.a.questionsAnswers,
                    "style": "filter: invert(100%) sepia(15%) saturate(7500%) hue-rotate(180deg) brightness(107%) contrast(114%);",
                    "icon": "user_mobile_answers_and_questions",
                    "link": "question",
                    modal: true
                },
                {
                    "title": Variable.lang.a.career,
                    "style": "",
                    "icon": "careers_icon",
                    "link": "career-whith-us",
                    modal: true
                },
            ];

            projectRecords = projects.map(function (item) {
                return (
                    <div class="c-projects__item swiper-slide slide-item">
                        <a href={`/${item.link}/`}
                            onclick={(e) => {
                                if (item.modal) {
                                    Helpers.siteLinkModal(e, { title: item.title })
                                } else {
                                    Helpers.siteLink(e)
                                }
                            }}>
                            <div class="projects_icons_text">
                                <div class="nav-more_item">
                                    <img style={item.style} src={svg[item.icon]} alt="" />
                                </div>
                                <p>{item.title}</p>
                            </div>
                        </a>
                    </div>
                )
            })
        }
    )

    return (
        <div class="c-projects">
            <Swiper
                slide={projectRecords}
                options={swiperOptions}
                className="swiper-icons"
                navigation={
                    <div>
                        <div class="swiper-button-prev">
                            <img src={svg.swiper_arrow_left} style="height: 40%;" />
                        </div>
                        <div class="swiper-button-next">
                            <img src={svg.swiper_arrow_right} style="height: 40%;" />
                        </div>
                    </div>
                }
            />
            {/* <div class="c-projects__more main_page_show_more">
                {Variable.lang.button.see_all}
            </div> */}
        </div>
    )
}
export { BlockProjects }