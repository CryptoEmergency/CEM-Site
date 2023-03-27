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
import { LazyImage } from "@component/element/index.js";

// import anime from 'animejs/lib/anime.es.js';

import { fn } from "@src/functions/index.js";




import 'swiper/css/bundle';

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        )
    }
};

const start = function (data, ID) {

    Variable.Static.forumHeaderShow = isMobile.any() ? false : true

    let showAllCompanies = false

    const ShowAllCompany = function () {
        showAllCompanies = true
        initReload()
    }

    const swiperGo = function (numIndex) {
        let swiperitem1 = new Swiper("#summer_forum", {
            direction: "horizontal",
            loop: true,
            // autoplay: {
            //     delay: 2000,
            // },
            autoplay: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: false,
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

        swiperitem1.on = {
            slideChange: function () {
                console.log('swiper slide change ***');
                console.log('=8d7c32=', index, Static.elNumberSwiper[index])
                //   Static.elNumberSwiper[index].innerText = this.activeIndex + 1
            }
        }
        // swiperitem1.on('slideChange', function () {
        //     console.log('slide changed');
        // });
    }

    // let options = {
    //     opacityIn: [0, 1],
    //     scaleIn: [0.2, 1],
    //     scaleOut: 3,
    //     durationIn: 800,
    //     durationOut: 600,
    //     delay: 400,
    //     easing: "easeInExpo",
    //     translateY: -100,
    // };

    const slides = [
        // {
        //     path: 'DSC_0в399',
        //     folder: 'summer_forum'
        // },
        {
            path: 'DSC_0вв394',
            folder: 'summer_forum'
        },
        // {
        //     path: 'DSC_0027',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'DSC_0042',
        //     folder: 'summer_forum'
        // },
        {
            path: 'DSC_0112',
            folder: 'summer_forum'
        },
        {
            path: 'DSC_0189',
            folder: 'summer_forum'
        },
        // {
        //     path: 'DSC_0213',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'DSC_0234',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'DSC_0275',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'DSC_0300',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'DSC_0303',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'DSC_0362',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'DSC_0363',
        //     folder: 'summer_forum'
        // },
        {
            path: 'DSC_0373',
            folder: 'summer_forum'
        },
        // {
        //     path: 'DSC_0402',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'DSC_0405',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'DSC_0410',
        //     folder: 'summer_forum'
        // },
        {
            path: 'I98B3417',
            folder: 'summer_forum'
        },
        // {
        //     path: 'I98B3451',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3502-(1)',
        //     folder: 'summer_forum'
        // },
        {
            path: 'I98B3506',
            folder: 'summer_forum'
        },
        // {
        //     path: 'I98B3529',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3536',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3549',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3657',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3660',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3673',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3691',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3711',
        //     folder: 'summer_forum'
        // },
        {
            path: 'I98B3727',
            folder: 'summer_forum'
        },
        // {
        //     path: 'I98B3823',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3843',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3873',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B3889',
        //     folder: 'summer_forum'
        // },
        {
            path: 'I98B3905',
            folder: 'summer_forum'
        },
        // {
        //     path: 'I98B3948',
        //     folder: 'summer_forum'
        // },
        {
            path: 'I98B3968',
            folder: 'summer_forum'
        },
        {
            path: 'I98B3978',
            folder: 'summer_forum'
        },
        // {
        //     path: 'I98B4092',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'I98B4097',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'КРИПТО-ЮГ',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'КРИПТО-ЮГ-2',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'КРИПТО-ЮГ-6',
        //     folder: 'summer_forum'
        // },
        {
            path: 'КРИПТО-ЮГ-12',
            folder: 'summer_forum'
        },
        // {
        //     path: 'КРИПТО-ЮГ-23',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'КРИПТО-ЮГ-32',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'КРИПТО-ЮГ-46',
        //     folder: 'summer_forum'
        // },
        {
            path: 'КРИПТО-ЮГ-48',
            folder: 'summer_forum'
        },
        {
            path: 'КРИПТО-ЮГ-52',
            folder: 'summer_forum'
        },
        // {
        //     path: 'КРИПТО-ЮГ-53',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'КРИПТО-ЮГ-55',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'КРИПТО-ЮГ-56',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'КРИПТО-ЮГ-57',
        //     folder: 'summer_forum'
        // },
        // {
        //     path: 'КРИПТО-ЮГ-65',
        //     folder: 'summer_forum'
        // },
        {
            path: 'КРИПТО-ЮГ-72',
            folder: 'summer_forum'
        },
        // {
        //     path: 'КРИПТО-ЮГ-74',
        //     folder: 'summer_forum'
        // },
        {
            path: 'КРИПТО-ЮГ-88',
            folder: 'summer_forum'
        },
        // {
        //     path: 'КРИПТО-ЮГ-104',
        //     folder: 'summer_forum'
        // },
        {
            path: 'КРИПТО-ЮГ-129',
            folder: 'summer_forum'
        },
        // {
        //     path: 'КРИПТО-ЮГ-147',
        //     folder: 'summer_forum'
        // },
        {
            path: 'КРИПТО-ЮГ-158',
            folder: 'summer_forum'
        },
        // {
        //     path: 'КРИПТО-ЮГ-163',
        //     folder: 'summer_forum'
        // },
    ];

    const speakers = [
        {
            name: "Александр Бражников",
            position: "Исполнительный директор РАКИБ",
            photo: "summer_forum/speaker3",
            show: true,
        },
        {
            name: "Зюзин Алексей",
            position: "Организатор Crypto Summit",
            photo: "summer_forum/speaker5",
            show: true,
        },
        {
            name: "Ян Кривоносов",
            position: "CEO Crypto Emergency",
            photo: "summer_forum/speaker1",
            show: true,
        },
        {
            name: "Балахонцев Александр",
            position: "Директор Blockchain 24",
            photo: "summer_forum/speaker4",
            show: true,
        },
        {
            name: "Андрей Тугарин",
            position: "CEO компании GMT Legal",
            photo: "summer_forum/speaker2",
            show: true,
        },
        {
            name: "Вероника Близнец",
            position: "Адвокат, юрист-международник",
            photo: "summer_forum/speaker6",
            show: true,
        },
        {
            name: "Mr. Sailer YouTube",
            position: "Блогер журналист",
            photo: "summer_forum/speaker7",
            show: false,
        },
        {
            name: "Валерий Осипов",
            position: "ArtEmotioChain",
            photo: "summer_forum/speaker8",
            show: false,
        },
        {
            name: "Александр Изюрьев",
            position: "UnionClub",
            photo: "summer_forum/speaker9",
            show: false,
        },
        {
            name: "Кожухов Ярослав",
            position: "Metis",
            photo: "summer_forum/speaker10",
            show: false,
        },
        {
            name: "Ренат Каличенко",
            position: "Turov Invest",
            photo: "summer_forum/speaker11",
            show: false,
        }
    ]

    const guests = [
        {
            link: "https://youtu.be/J0U0ZpEKxlU",
            photo: "guest1",
            name: "Владислав Мартынов",
            spec: "Автор курса \"КриптоИнвестор\""
        },
        {
            link: "https://youtu.be/Wzo9Cv5xDFw",
            photo: "guest2",
            name: "Наталия Амелин",
            spec: "Директор фонда Genesi в Metis"
        },
        {
            link: "https://youtu.be/iqTQ7zYR5DM",
            photo: "guest3",
            name: "Алексей Зюзин",
            spec: "Организатор Crypto Summit"
        },
        {
            link: "https://youtu.be/aeZfsdraVGo",
            photo: "guest4",
            name: "Сергей Павлович",
            spec: "Канал ЛЮДИ PRO"
        }
    ]

    init(
        async () => {
            // console.log('=bbcdd5=', slides)
        },
        () => {
            // anime.timeline({ loop: true })
            //     .add({
            //         targets: '.с-guests__title',
            //         opacity: options.opacityIn,
            //         translateY: options.translateY,
            //     })

            return (
                <div class='c-main__body с-summerforum'>
                    <div class="page-content page-content--full">
                        <section class="c-aboutforum" id="about">
                            {/* <h4 class="с-summerforum__title c-aboutforum__title">О форуме</h4> */}
                            <div class="c-container">
                                <div class="c-aboutforum__cover">
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
                                        <a href="#" class="c-button c-button--gradient2 tiwo_ticketseller" data-event_id="4623" onclick={() => { return false }}>
                                            <span class="c-button__text">{Variable.lang.button.buyTicket}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="c-aboutforum__text c-container">
                                <p>
                                    Команда <b>Crypto Emergency</b> рада пригласить тебя на второй ежегодный криптофорум <b>Crypto Юг 2023</b>, который состоится  3 и 4 июня в г. Новороссийске.
                                </p>
                                <p>
                                    <b>Crypto Юг 2023</b> - прекрасная возможность провести время приятно и с пользой, открыть для себя новые возможности, повысить экспертность и увеличить доход.
                                </p>
                                <p>
                                    <b>Образование</b> - форум предоставляет доступ к содержательным беседам, семинарам и панельным дискуссиям о последних тенденциях и разработках в индустрии криптовалют.
                                </p>
                                <p>
                                    <b>Живое общение</b> – возможность в живую пообщаться с любимым экспертом или с другими участниками и профессионалами крипторынка.
                                </p>
                                <p>
                                    <b>Нетворкинг</b> – если вы ищите перспективные проекты для поддержки или участия, наш форум предоставляет отличную возможность встретиться и пообщаться с нужными людьми.
                                </p>
                                <p>
                                    <b>Инновации</b> – ты можешь ознакомиться с передовыми технологиями и инновационными решениями, которые формируют будущее индустрии криптовалют.
                                </p>
                                <p>
                                    <b>Вдохновение</b> - на форуме выступают дальновидные спикеры, которые могут вдохновить тебя вывести собственные идеи и проекты на новый уровень.
                                </p>
                                <p>
                                    <b>Заявить о себе</b> - форум предоставляет сцену для демонстрации твоих экспертных знаний в области криптовалют, повышая твою репутацию лидера мысли и эксперта.
                                </p>
                                <p>
                                    <b>Сотрудничество</b> – такие мероприятия является центром сотрудничества и формирования сообщества, предоставляя возможности для совместной работы над проектами и инициативами, которые могут оказать значительное влияние на индустрию.
                                </p>
                                <p>
                                    Мы уверены, что наш криптофорум предоставит тебе всю ценную информацию, связи и возможности, которых больше нигде не найдёшь.
                                </p>

                                <a href="#" class="c-button c-button--gradient2 tiwo_ticketseller" data-event_id="4623" onclick={() => { return false }}>
                                    <span class="c-button__text">Купить билет</span>
                                </a>

                                <div class="swiper-container" replace={true}>
                                    <div id="summer_forum" class="swiper swiper-post_media" After={() => swiperGo()}>
                                        <div class="swiper-wrapper">
                                            {
                                                slides.map((item) => {
                                                    return (
                                                        <a class="swiper-slide" onclick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            fn.modals.ModalViewPhoto({
                                                                path: item.path,
                                                                folderImages: item.folder,
                                                            });
                                                        }}>
                                                            <div class="swiper-post_media_image_container">
                                                                <img style="border-radius: 13px" src={images[`${item.folder}/${item.path}`]} loading="lazy" />
                                                                <div class="swiper-lazy-preloader-white"></div>
                                                            </div>
                                                        </a>
                                                    )
                                                })
                                            }
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
                            </div >
                        </section >

                        <section class="c-speakers c-container" id="speakers">
                            <h4 class="с-summerforum__title c-speakers__title">{Variable.lang.h.speakersForum}</h4>
                            <a href="https://t.me/dmitriibelov" target="_blank" class="c-button c-button--gradient2">
                                <span class="c-button__text">{Variable.lang.button.becomeSpeaker}</span>
                            </a>
                            <ul class="c-speakers__list">
                                {
                                    speakers.map((item) => {
                                        console.log('=1d81fb=', !item.show && showAllCompanies)
                                        return (
                                            <li style={!item.show ? showAllCompanies ? '' : 'display: none' : null}>
                                                <figure class="c-speakers__item">
                                                    <div class="c-speakers__wrappper">
                                                        <img src={images[item.photo]} />
                                                    </div>
                                                    <figcaption class="c-speakers__caption">
                                                        <h3>{item.name}</h3>
                                                        <p>{item.position}</p>
                                                    </figcaption>
                                                </figure>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <a
                                style={showAllCompanies ? 'display: none' : null}
                                class="c-button c-button--transparent"
                                onclick={ShowAllCompany}>
                                <span class="c-button__text">Показать всех</span>
                            </a>
                        </section>

                        <section class="c-eventmap c-container" id="stands">
                            <h4 class="с-summerforum__title c-eventmap__title">{Variable.lang.h.standsForum}</h4>
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
                                                <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                                    <img class="" src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1" width="" height="" />
                                                    <span class="">google.com</span>
                                                </a>
                                                <span class="">Google — корпорация, инвестирующая в интернет-поиск, облачные вычисления и рекламные технологии.</span>
                                            </div>
                                        </div> */}

                                {/** Стенды */}
                                <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--1">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/reserved"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место уже зарезервировано</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--2">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--3">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--4">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--5">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--6">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--7">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--8">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--9">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--10">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--11">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/reserved"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место уже зарезервировано</span>
                                    </div>
                                </div>
                                <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--12">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/reserved"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место уже зарезервировано</span>
                                    </div>
                                </div>
                                <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--13">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/reserved"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место уже зарезервировано</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--14">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--15">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--16">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--17">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/reserved"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место уже зарезервировано</span>
                                    </div>
                                </div>
                                <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--18">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/reserved"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место уже зарезервировано</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--19">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--20">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--21">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--22">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--23">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--24">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="reservedstands" class="c-eventmap__zone c-eventmap__zone--25">
                                    {/* <span class="c-eventmap__titlezone">25</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/reserved"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место уже зарезервировано</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--26">
                                    {/* <span class="c-eventmap__titlezone">25</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="#" target="_blank" rel="nofollow">
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

                            <a href="https://t.me/dmitriibelov" target="_blank" class="c-button c-button--gradient2">
                                <span class="c-button__text">{Variable.lang.button.buyStand}</span>
                            </a>
                        </section>

                        <section class="с-guests c-container" id="guests">
                            <h4 class="с-summerforum__title с-guests__title">{Variable.lang.h.guestsForum}</h4>
                            <ul class="с-guests__list">
                                {
                                    guests.map((item) => {
                                        return (
                                            <li>
                                                <a href={item.link} target="_blank" class="с-guests__item">
                                                    <figure>
                                                        <div class="с-guests__wrap">
                                                            <img src={images[`summer_forum/${item.photo}`]} />
                                                        </div>
                                                        <figcaption>
                                                            <h5>{item.name}</h5>
                                                            <p>{item.spec}</p>
                                                        </figcaption>
                                                    </figure>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </section>

                        <section class="с-forumtopics c-container" id="forumtopics">
                            <p class="с-forumtopics__beforetext">Второй ежегодный криптовалютный форум пройдет в центре города Новороссийска на берегу Черного моря.</p>
                            <h4 class="с-summerforum__title с-forumtopics__title">{Variable.lang.h.forumtopics}:</h4>
                                <ul class="с-forumtopics__themes">
                                    <li>Децентрализованные социальные сети</li>
                                    <li>Как начать свой путь в крипто индустрии</li>
                                    <li>Регуляция и её влияние на рынок</li>
                                    <li>Трейдинг и как на нем заработать</li>
                                    <li>NFT, как прикоснуться к искусству</li>
                                    <li>Майнинг в 2023 году</li>
                                    <li>GameFi получай удовольствие и зарабатывай</li>
                                </ul>
                            
                            <p class="с-forumtopics__subtitle">На форуме Вас будут ждать:</p>
                            <ul class="с-forumtopics__buns">
                                <li>30+ проектов</li>
                                <li>600+ участников</li>
                                <li>30+ спикеров</li>
                                <li>Крупные СМИ</li>
                                <li>Фуршет</li>
                                <li>Большое количество конкурсов с ценными призами</li>
                            </ul>
                        </section>

                        <section class="c-partnersforum c-container" id="partners">
                            <h4 class="с-summerforum__title c-partnersforum__title">{Variable.lang.h.partnersForum}</h4>
                            <div class="c-partnersforum__list">
                                <a
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://тц-черноморский.рф"
                                    class="c-partnersforum__item"
                                >
                                    <img src={svg["summer_forum/partner_7"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://cryptoholding.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_1"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://racib.com"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["summer_forum/partner_21"]} />
                                </a>
                                {/* <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://crypto.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_8"]} />
                                </a> */}
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://carding.pro"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_9"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://blockchain24.pro"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_10"]} />
                                </a>
                                <a
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://www.instagram.com/abrau1870/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["summer_forum/partner_2"]} height="90" />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://www.instagram.com/barycoffee.nvr/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_3"]} />
                                </a>
                                {/* <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://hotel-capital.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_4"]} />
                                </a> */}
                                {/* <a style="display: block!important; background: #FFFFFF"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://seeyour.info/vizhu.more.rest"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_5"]} />
                                </a> */}
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://hginov.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_6"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://ti.turovinvest.ru/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_11"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://cryptonews.net/ru/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_12"]} />
                                </a>
                                {/* <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://digitalfutureclub.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_13"]} />
                                </a>
                                <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://www.onestopmining.com"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_14"]} />
                            </a>*/}
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://cripta.games"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_15"]} />
                                </a>
                                {/* <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://voltep.online"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_16"]} />
                                </a>
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://cryptometa.media"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_17"]} />
                                </a>
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://t.me/unionclub_invest"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_18"]} />
                                </a>
                                <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://hotel-novoros.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_19"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_20"]} />
                                </a> */}
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://www.artemotiochain.ru/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["summer_forum/partner_22"]} height="90" />
                                </a>
                                {/* <a style="background: #1C1A27"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://zerogravity.foundation/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_23"]} />
                                </a>
                                <a style="background: #EDEDED"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://www.zhcashcrypto.site"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_24"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://t.me/zhcashcrypto/1036"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_26"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://bloknot-novorossiysk.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_25"]} />
                                </a>
                                <a style="background: #C4CFE3"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://t.me/zhcashcrypto/1040"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_27"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://www.cls.global"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_28"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://garantex.io/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_30"]} />
                                </a> */}
                            </div>
                            <a href="https://t.me/dmitriibelov" target="_blank" class="c-button c-button--gradient2">
                                <span class="c-button__text">{Variable.lang.button.becomePartner}</span>
                            </a>
                        </section>

                        <section class="c-localmap" id="localmap">
                            <h4 class="с-summerforum__title c-localmap__title">{Variable.lang.h.localmap}</h4>
                            <div id="map"
                                class="c-localmap__map"
                            ></div>
                        </section>
                    </div >
                    <script src="https://widget.tiwo.ru/loader/loader.js.php"></script>
                    {/* <script src="//code.jivo.ru/widget/eSqQ27xJUs" async></script> */}
                    <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full" onload={function () {
                        console.log('=d6ff1f=', DG)
                        var map;
                        DG.then(function () {
                            // console.log('=7a47c8=', "Start DG")
                            map = DG.map('map', {
                                center: [44.712505, 37.78382],
                                zoom: 17,
                                // dragging: false,
                                touchZoom: false,
                                scrollWheelZoom: false,
                                doubleClickZoom: false,
                                boxZoom: false,
                                geoclicker: false,
                                zoomControl: true,
                                fullscreenControl: false
                            });

                            DG.marker([44.712505, 37.78382]).addTo(map).bindPopup(`
                                <div class="c-localmap__marker"></div>
                            `);
                        });
                    }}></script>
                    <script src="https://widget.tiwo.ru/loader/loader.js.php"></script>
                    <script src="//code.jivo.ru/widget/eSqQ27xJUs" async></script>
                </div >
            )
        }, ID
    )
}

export default start;
