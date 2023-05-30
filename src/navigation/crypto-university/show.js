import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initReload,
    load,
    Data,
    CEM,
    Helpers
} from "@betarost/cemserver/cem.js";

// import { fn } from '@src/functions/index.js';
// import svg from '@assets/svg/index.js';
// import images from "@assets/images/index.js";
import { Avatar, LentaMedia, Evaluation, ItemsMenu, ButtonShowMore, ButtonSubmit, TextArea, NotFound, Comment } from "@elements/element/index.js";
import { BlockError404 } from '@elements/blocks/index.js';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

const { images, svg, fn, elements } = CEM

const makeFilter = function (Static) {
    let objReturn = { type: Static.type }
    if (Static.type == "university") {
        objReturn["languages.code"] = Static.activeCategory
    } else {
        if (Static.activeCategory != "All") {
            objReturn["category.name"] = Static.activeCategory
        }
    }
    return objReturn
}

const start = function (data, ID) {
    let [Static, item] = fn.GetParams({ data, ID, initData: "cryptouniversity_show" })

    Variable.HeaderShow = true;

    const arrAccordeon = [
        {
            title: "Подойдёт ли мне эта профессия?",
            description: "Для тех, кто сомневается, мы спроектировали бесплатную часть, которая поможет получить ответ на этот вопрос. Если вы убедитесь, что выбранная профессия вам не подходит, — это тоже положительный результат.",
            hidden: true,
        },
        {
            title: "Можно ли обучиться профессии за 5 месяцев?",
            description: "Да, программа рассчитана на это. Но многое зависит и от вас — чтобы пройти курс до конца, нужно уделять учёбе достаточно времени: читать теорию, практиковаться в тренажёре и делать учебные проекты.",
            hidden: true,
        },
        {
            title: "Что делать, если я не справлюсь с нагрузкой?",
            description: "Если вам понадобится сделать паузу в учёбе или уделить больше времени закреплению материала, напишите своему куратору.",
            hidden: true,
        },
        {
            title: "Смогу ли я найти работу после обучения?",
            description: "Гарантий нет, но мы верим, что сможете. Мы составляли программу курса, отталкиваясь от современных требований работодателей и обязанностей, которые указаны в вакансиях продакт-менеджеров. Рынок требует, чтобы вы умели делать что-то на практике, а не просто обладали набором знаний. Поэтому мы научим вас не только владеть всеми необходимыми инструментами по управлению продуктами, но и применять их на практике.",
            hidden: true,
        },
        {
            title: "Если не понравится, я могу вернуть деньги?",
            description: "Да, причём в любой момент. Если обучение в потоке уже началось, придётся оплатить прошедшие дни — но мы вернём деньги за оставшееся время обучения.",
            hidden: true,
        },
    ];

    const swiperGo = function (numIndex) {
        let swiperitem = new Swiper(".swiper-post_teachers", {
            // effect: "cube",
            grabCursor: true,
            // cubeEffect: {
            //     shadow: true,
            //     slideShadows: true,
            //     shadowOffset: 20,
            //     shadowScale: 0.94,
            // },
            loop: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination-post_media',
            },
            scrollbar: {
                el: '.swiper-scrollbar-post_media',
            },
            // slidesPerView: 1,
            breakpoints: {
                100: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                620: {  //600
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 50
                },
                910: {  //800
                    slidesPerView: 3,
                    spaceBetween: 46,
                },
                1240: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
            spaceBetween: 20
        });
    }

    load({
        ID,
        fnLoad: async () => {
            if (Variable.dataUrl.params) {
                Static.item = await fn.socket.get({
                    method: "Courses",
                    _id: Variable.dataUrl.params,
                    params: {
                        populate: {
                            path: 'teachers company',
                        }
                    }
                })
                console.log('=9ebbf7=', Static.item)
            }
        },

        fn: async () => {
            console.log('=9ebbf7=', Static.item)
            if (!item._id) { return (<div><BlockError404 /></div>) }

            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">
                            <div class="course">
                                <div class="course__container">
                                    <div class="course-header">
                                        <img class="course-header__background"
                                            src={images["university/background_it"]}
                                        />
                                        <div class="course-header__container">
                                            <div class="course-header__title">
                                                {Static.item.name}
                                            </div>
                                            <div class="course-header__description">
                                                {Static.item.description}
                                            </div>
                                            <div class="course-header__company">
                                                <span>Подробнее о школе</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="course-learn">
                                        <div class="course__subtitle">
                                            Вы научитесь
                                        </div>
                                        <ul class="course-learn__list">
                                            <li class="course-learn__item">
                                                <div class="course-learn__subtitle">
                                                    Проводить анализ и диагностику продукта
                                                </div>
                                                <div class="course-learn__description">
                                                    Исходя из полученных результатов вы сможете проектировать решения по изменению продукта
                                                </div>

                                            </li>
                                            <li class="course-learn__item">
                                                <div class="course-learn__subtitle">
                                                    Принимать решения по развитию продукта
                                                </div>
                                                <div class="course-learn__description">
                                                    Начнёте приоритизировать варианты развития продукта, исходя из целей компании и продуктовой аналитики
                                                </div>

                                            </li>
                                            <li class="course-learn__item">
                                                <div class="course-learn__subtitle">
                                                    Помогать бизнесу расти
                                                </div>
                                                <div class="course-learn__description">
                                                    Будете выявлять возможности для кратного роста продукта, формулировать концепции роста и монетизации
                                                </div>

                                            </li>
                                            <li class="course-learn__item">
                                                <div class="course-learn__subtitle">
                                                    Планировать и согласовывать развитие
                                                </div>
                                                <div class="course-learn__description">
                                                    Сможете формировать стратегический план развития продукта и согласовывать его со стейкхолдерами
                                                </div>

                                            </li>
                                        </ul>
                                    </div>
                                    <div class="course-teachers">
                                        <div class="course__subtitle">
                                            Преподаватели курса
                                        </div>
                                        <div class="swiper-container">
                                            <div class="swiper swiper-post_teachers" After={() => swiperGo()}>
                                                <div class="swiper-wrapper">
                                                    {Static.item.teachers?.map((item) => {
                                                        return (
                                                            <a class="swiper-slide"
                                                                onclick={() => [
                                                                    fn.modals.ModalTeachers(item)
                                                                ]}
                                                            >
                                                                <div class="course-teachers__item">
                                                                    <img src={`/assets/upload/worldPress/${item.image}`} />
                                                                    <span class="course-teachers__name">{item.name}</span>
                                                                    <span>{item.profession}</span>
                                                                </div>
                                                            </a>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="course-reviews">
                                        <div class="course__subtitle">
                                            Отзывы
                                        </div>
                                        <div class="course-reviews__container">
                                            <div class="course-reviews__add"
                                                onclick={() => {
                                                    fn.modals.ModalComingSoon()
                                                }}
                                            >
                                                <span>Оставить отзыв</span>
                                            </div>
                                            <img class="university-author__image" src={images["university/reviews"]} />
                                        </div>
                                    </div>
                                    <div class="course-questions">
                                        <div class="course__subtitle">
                                            Вопросы и ответы
                                        </div>
                                        <elements.Accordeon records={arrAccordeon} />
                                    </div>
                                    <div class="course-footer">
                                        <div class="course-footer__container">
                                            <div class="course-footer__info">
                                                <div class="course-footer__info-header">
                                                    <div class="course-footer__info_price">
                                                        Стоимость курса
                                                    </div>
                                                    <div>   
                                                        <div class="course-footer__info_duration">
                                                            Длительность курса: {Static.item.duration}
                                                            <span>
                                                                {
                                                                    Static.item.timeCount == "month"
                                                                        ?
                                                                        " месяца"
                                                                        :
                                                                        " дней"
                                                                }
                                                            </span>
                                                        </div>
                                                        <div class="course-footer__info_data">
                                                            Старт курса: {fn.getDateFormat(Static.item.dateStart, "course")}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div class="course-footer__prices">
                                                    <div class="course-footer__cost">
                                                        <div class="course-footer__cost_section">
                                                            <span class="course-footer__cost_old">
                                                                {`${Static.item.costAll * 1.3} ₽`}
                                                            </span>
                                                            <div class="course-footer__cost_discount">
                                                                <span>-30%</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="course-footer__cost_new">
                                                            {Static.item.costAll} ₽
                                                            <div>Новая цена</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="course-footer__enroll tag_button">
                                                    <span>Записаться на курс</span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
    })
    return
};

export default start;