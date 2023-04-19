import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initReload,
    load,
    Data,
    CEM
} from "@betarost/cemserver/cem.js";

// import { fn } from '@src/functions/index.js';
// import svg from '@assets/svg/index.js';
import images from "@assets/images/index.js";
import { Avatar, LentaMedia, Evaluation, ItemsMenu, ButtonShowMore, ButtonSubmit, TextArea, NotFound, Comment } from "@elements/element/index.js";
import { BlockError404 } from '@elements/blocks/index.js';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

const { svg, fn } = CEM

const start = function (data, ID) {
    let [Static, item] = fn.GetParams({ data, ID, initData: "event_show" })

    Variable.HeaderShow = true;

    const swiperGo = function (numIndex) {
        let swiperitem = new Swiper(".swiper-post_event", {
            grabCursor: true,
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
            slidesPerView: 1,
        });
    }

    load({
        ID,
        fnLoad: async () => {
            Static.activeCategory = "All"
        },

        fn: async () => {

            if (!item._id) { return (<div><BlockError404 /></div>) }

            return (
                <div
                    class={[
                        "c-event",
                        "c-container",
                        Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
                    ]}
                >
                    <h2 class="c-event__title">Название мероприятия</h2>

                    {/* Слайдер */}
                    <div class="c-event__slider swiper swiper-post_event" After={() => swiperGo()}>
                        <div class="swiper-wrapper">
                            <a
                                class="swiper-slide"
                            >
                                <div class="swiper-post_media_image_container">
                                    <figure class="c-event__sliderwrap">
                                        <img src="https://forklog.com/wp-content/uploads/bychii-rynok-tendentsii-kriptorynka-rost-tseny-bitkoina.webp" />
                                    </figure>
                                </div>
                            </a>
                            <a
                                class="swiper-slide"
                            >
                                <div class="swiper-post_media_image_container">
                                    <figure class="c-event__sliderwrap">
                                        <img src="https://forklog.com/wp-content/uploads/fuel-for-bitcoin-growth.webp" />
                                    </figure>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-pagination swiper-pagination-post_media"></div>
                        <div class="swiper-scrollbar-post_media"></div>
                    </div>

                    {/* О мероприятии */}
                    <section class="c-event__about">
                        <h5 class="c-event__subtitle">{Variable.lang.h.aboutEvents}:</h5>
                        <p>
                            Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."
                        </p>
                    </section>

                    {/* Место прведения */}
                    <div class="c-event__place">
                        <h5 class="c-event__subtitle">{Variable.lang.h.placeEvent}:</h5>
                        <span class="">{`${item.country}, ${item.city}, ${item.place}`}</span>
                    </div>

                    {/* Дата проведения */}
                    <div class="c-event__date">
                        <h5 class="c-event__subtitle">{Variable.lang.h.dateEvent}:</h5>
                        <date class="" datetime="">{item.date}</date>
                    </div>

                    {/* Контакты */}
                    <div class="c-event__contacts">
                        <h5 class="c-event__subtitle">{Variable.lang.a.contacts}</h5>
                        <ul class="c-event__list">
                            {
                                item.contacts && item.contacts.length ?
                                    item.contacts.map((item) => {
                                        return (
                                            <li>
                                                <a href="" class="c-event__link">{item}</a>
                                            </li>
                                        )
                                    })
                                    :
                                    null
                            }
                        </ul>
                    </div>

                    {/* Кнопка-ссылка на сайт мероприятия */}
                    <a class="c-event__btn c-button c-button--gradient2" href="">
                        <span class="c-button__text">{Variable.lang.button.joinEvent}</span>
                    </a>
                </div>
            )
        },
    })
    return
};

export default start;