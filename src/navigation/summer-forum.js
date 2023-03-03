import {
    jsx,
    jsxFrag,
    sendApi,
    Variable,
    init,
    initReload,
    Helpers
} from "@betarost/cemserver/cem.js";


import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Swiper from 'swiper/bundle';

import { fn } from "@src/functions/index.js";




import 'swiper/css/bundle';


const start = function (data, ID) {
    let showAllCompanies = false
    Variable.Static.forumHeaderShow = true

    const swiperGo = function (numIndex) {
        // if (!swiperitem) {
        let swiperitem1 = new Swiper("#summer_forum", {
            direction: "horizontal",
            loop: true,
            autoplay: {
                delay: 2000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: false,
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
            breakpoints: {
                100: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                620: {
                    //600
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                // 768: {
                //   slidesPerView: 2,
                //   spaceBetween: 50
                // },
                910: {
                    //800
                    slidesPerView: 3,
                    spaceBetween: 46,
                },
                1240: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
        // }
    }

    const swiperTwo = function (numIndex) {
        // if (!swiperitem) {
        let swiperitem2 = new Swiper(".swiper-two", {
            effect: "creative",
            grabCursor: true,
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
            loop: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination-two',
            },
            scrollbar: {
                el: '.swiper-scrollbar-two',
            },
            slidesPerView: 1,
            spaceBetween: 20
        });
        // }
    }

    const ShowAllCompany = function () {
        showAllCompanies = true
        initReload()
    }

    init(
        async () => {
            // console.log('=bbcdd5=', Variable)
        },
        () => {
            return (
                <div class='c-main__body с-summerforum'>
                    <div class="page-content page-content--full">
                        {/* <div style="max-width: 1280px; margin: 0 auto; padding: 0 20px; margin-top: 30px"> */}
                        <section class="c-aboutforum" id="about">
                            {/* <h4 class="с-summerforum__title c-aboutforum__title">О форуме</h4> */}
                            <div class="c-aboutforum__cover c-container">
                                <figure class="c-aboutforum__logo">
                                    <img src={images["summer_forum/logo"]} />
                                </figure>
                                <div class="c-aboutforum__caption">
                                    <h2 class="">Ежегодный криптовалютный форум</h2>
                                    <span class="">
                                        3-4 июня
                                        <br />
                                        г. Новороссийск
                                    </span>
                                    <a href="#" class="c-button c-button--gradient2">
                                        <span class="c-button__text">Купить билет</span>
                                    </a>
                                </div>
                            </div>

                            <div class="c-aboutforum__text c-container">
                                <p>
                                    Команда <b>Crypto Emergency</b> приглашает Вас на второй ежегодный форум Crypto Юг 2023  в качестве спонсора.
                                </p>
                                <p>
                                    <b>Crypto Юг 2023</b> это самый крупный форум в сфере криптовалют на Юге России, который состоится 3 - 4 июня в г. Новороссийске.
                                </p>
                                <p>
                                    Наш форум привлекает разнообразную аудиторию инвесторов, трейдеров, энтузиастов и профессионалов из разных ниш. Как спонсор, у Вас будет возможность продемонстрировать свои материалы заинтересованной аудитории, повысив свой авторитет и узнаваемость в индустрии.
                                </p>

                                <a href="#" class="c-button c-button--gradient2">
                                    <span class="c-button__text">Купить билет</span>
                                </a>

                                <div class="swiper-container">
                                    <div id="summer_forum" class="swiper swiper-post_media" After={() => swiperGo()}>
                                        <div class="swiper-wrapper">
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 218px; border-radius: 13px" src={images['summer_forum/slide_about']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 218px; border-radius: 13px" src={images['summer_forum/slide_about']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="height: 218px; border-radius: 13px" src={images['summer_forum/slide_about']} />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="swiper-button-prev">
                                            <img src={svg["summer_forum/slider_arrow"]} />
                                        </div>
                                        <div class="swiper-button-next">
                                            <img src={svg["summer_forum/slider_arrow"]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="c-speakers c-container" id="speakers">
                            <h4 class="с-summerforum__title c-speakers__title">Спикеры</h4>
                            <ul class="c-speakers__list">
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker1"]} />
                                        </div>
                                        <figcaption>
                                            <h3></h3>
                                            <p></p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker1"]} />
                                        </div>
                                        <figcaption>
                                            <h3></h3>
                                            <p></p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker1"]} />
                                        </div>
                                        <figcaption>
                                            <h3></h3>
                                            <p></p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker1"]} />
                                        </div>
                                        <figcaption>
                                            <h3></h3>
                                            <p></p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker1"]} />
                                        </div>
                                        <figcaption>
                                            <h3></h3>
                                            <p></p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker1"]} />
                                        </div>
                                        <figcaption>
                                            <h3></h3>
                                            <p></p>
                                        </figcaption>
                                    </figure>
                                </li>
                            </ul>
                            <a href="#" class="c-button c-button--gradient2">
                                <span class="c-button__text">Стать спикером</span>
                            </a>
                        </section>

                        <section class="c-eventmap c-container" id="stands">
                            <h4 class="с-summerforum__title c-eventmap__title">Стенды</h4>
                            <div class="c-eventmap__wrapper">
                                {/** Фоновая карта */}
                                <img class="c-eventmap__imagebg" src={svg['summer_forum/map']} />

                                {/** Спецификация */}
                                {/* <h5 class="c-eventmap__highlight c-eventmap__highlight--general">Генеральный спонсор</h5> */}
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--entrance">Вход</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--registration">Регистрация</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--buffet">Буфет</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--photozone">Фотозона</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--restzone">Зона отдыха</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--scene">Сцена</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--ourstand">CryptoEmergency</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--freestands">Свободные стенды</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--reservedstands">Зарезервированные стенды</h5>

                                {/** "VIP-зоны" */}
                                {/* <div data-zone="general" class="c-eventmap__zone c-eventmap__zone--23">
                                            <span class="c-eventmap__titlezone">23</span>
                                            <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                                <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                                    <img class="" src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1" width="" height="" />
                                                    <span class="">google.com</span>
                                                </a>
                                                <span class="">Google — корпорация, инвестирующая в интернет-поиск, облачные вычисления и рекламные технологии.</span>
                                            </div>
                                        </div> */}

                                {/** Стенды */}
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--1">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--2">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--3">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--4">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--5">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--6">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--7">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--8">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--9">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--10">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--11">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--12">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--13">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--14">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--15">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--16">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--17">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--18">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--19">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--20">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--21">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--22">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--23">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--24">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--25">
                                    {/* <span class="c-eventmap__titlezone">25</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--26">
                                    {/* <span class="c-eventmap__titlezone">25</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class="">google.com</span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>

                                {/** тематические зоны */}
                                <div data-zone="entrance" class="c-eventmap__area c-eventmap__area--entrance"></div>
                                <div data-zone="registration" class="c-eventmap__area c-eventmap__area--registration"></div>
                                <div data-zone="scene" class="c-eventmap__area c-eventmap__area--scene"></div>
                                <div data-zone="buffet" class="c-eventmap__area c-eventmap__area--buffet"></div>
                                <div data-zone="photozone" class="c-eventmap__area c-eventmap__area--photozone"></div>
                                <div data-zone="restzone" class="c-eventmap__area c-eventmap__area--restzone"></div>
                                <div data-zone="ourstand" class="c-eventmap__area c-eventmap__area--ourstand"></div>

                                {/** попапы тематических зон */}
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--entrance">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Вход</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/entrance"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Вход - это начальная часть помещения форума, отсюда всё начинается</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--registration">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Регистрация</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/registration"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Для того, чтобы получить доступ к форуму и стать его участником необходимо зарегистрироваться</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--scene">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Сцена</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/scene"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Сцена - это ключевая часть помещения форума, место основного действия</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--buffet">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Буфет</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/buffet"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Зона кофе-брейков с напитками, закусками и обедом для участников форума</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--photozone">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Фотозона</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/photozone"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Фотозона на мероприятиях – это ключевое место для мероприятия, так как именно она попадает на огромное множество фотографий с гостями.</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--restzone">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Зона отдыха</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/restzone"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Зона отдыха на мероприятиях – это место отдыха от насыщенного дня и устанавления неформальных связей</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--ourstand">
                                    <header class="c-eventmap__areatitle">
                                        <h5>CryptoEmergency</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/our_stand"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Организатор форума. Объединяем криптоэнтузиастов всего мира на единой многофункциональной платформе Crypto Emergency.</p>
                                    </div>
                                </div>
                            </div>
                            <img class="c-eventmap__image" src={svg['summer_forum/map']} />
                        </section>

                        {/* </div> */}

                    </div>
                    <script src="https://widget.tiwo.ru/loader/loader.js.php"></script>
                    {/* <script src="//code.jivo.ru/widget/eSqQ27xJUs" async></script> */}
                </div>
            )
        }, ID
    )
}

export default start;
