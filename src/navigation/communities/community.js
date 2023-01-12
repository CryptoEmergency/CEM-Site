import {
    jsx,
    jsxFrag,
    init,
    Variable,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { fn } from '@src/functions/index.js';
import { Swiper } from '@component/element/index.js';

const Tags = function ({ Static, classActive, text, type }) {
    return (
        <div class={["tag_button", classActive]}
            onclick={async () => {
                if (Static.activeCategory == type) {
                    return;
                }
                Static.activeCategory = type;
                Static.apiFilter = makeFilter(Static)
                await fn.restApi.getCommunity({ name: Static.nameRecords, filter: Static.apiFilter })
            }}>
            <span>{text}</span>
        </div>
    )
}

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    console.log('=23889a=', data, Variable.dataUrl)

    const swiperOptions = {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 2000,
        },
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },
        pagination: false,
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
        breakpoints: {
            100: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            480: {  //600
                slidesPerView: 2,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 50
            },
            910: {  //800
                slidesPerView: 4,
                spaceBetween: 46,
            },
            1240: {
                slidesPerView: 6,
                spaceBetween: 30,
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },
            },
        },
    };

    const defaultSlides = [
        {
            "path": "",
            "image": "anon_nft",
        },
        {
            "path": "",
            "image": "community3",
        },
        {
            "path": "",
            "image": "community4",
        }
    ];

    let slides = (data && data.community && data.community.galary.length) ?
        data.community.galary
        :
        defaultSlides;

    const slidesRecords = slides.map(function (item) {
        return (
            <a
                href=""
                class="swiper-slide"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    fn.modals.ModalViewPhoto({
                        path: item.image,
                    });
                }}
            >
                <div>
                    <img src={images[`community/${item.image}`]} style="max-width: 100%" />
                </div>
            </a>
        )
    })

    init(
        null,
        () => {
            if (data && data.community && !data.custom) {
                return (
                    <div class="c-community c-main__body">
                        <div class="c-community__container c-container">
                            <div class="c-community__photo">
                                <img src={images[`community/${data.community.src}`]} />    {/* {images[`${data.src}`]} */}
                            </div>
                            <div class="c-community__tags tags">
                                <Tags
                                    Static={Static}
                                    text={Variable.lang.categoryName.all}
                                    classActive={Static.activeCategory == "All" ? "tag_button_active" : ""}
                                    type="All"
                                />
                                {() => {
                                    if (Variable[Static.nameRecords + "Category"]) {
                                        let arrReturn = Variable[Static.nameRecords + "Category"].list_records.filter((item) => item.name !== null).map((item) => {
                                            return (
                                                <Tags
                                                    Static={Static}
                                                    text={Variable.lang.categoryName[item.name]}
                                                    classActive={Static.activeCategory == item.name ? "tag_button_active" : ""}
                                                    type={item.name}
                                                />
                                            )
                                        })
                                        return arrReturn
                                    }
                                }}
                            </div>
                            <ul class="c-community__characteristics">
                                <li class="c-community__line">
                                    <span class="c-community__caption">Название:</span>
                                    <span class="c-community__value c-community__value--name">{data.community.name}</span>  {/* {data.name} */}
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Краткое описание:</span>
                                    <span class="c-community__value">{data.community.short}</span>
                                </li> <li class="c-community__line">
                                    <span class="c-community__caption">Описание:</span>
                                    <span class="c-community__value">{data.community.description}</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Категории:</span>
                                    <span class="c-community__value">
                                        {
                                            data.community.categories.map((category) => {
                                                return (
                                                    <span>{category}, </span>
                                                )
                                            })
                                        }
                                    </span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Создатель:</span>
                                    <span class="c-community__value">
                                        <a href={data.community.creator.href} class="c-community__link">{data.community.creator.title}</a>
                                    </span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Количество участников:</span>
                                    <span class="c-community__value">{data.community.member ? data.community.member : 0} участников</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Язык:</span>
                                    <span class="c-community__value">{data.community.language}</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Страна:</span>
                                    <span class="c-community__value">{data.community.country}</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Город:</span>
                                    <span class="c-community__value">{data.community.city}</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Контакты:</span>
                                    <span class="c-community__value">
                                        {
                                            data.community.contacts.phone ?
                                                <a href={`tel:${data.community.contacts.phone}`} class="c-community__link">{data.community.contacts.phone}</a>
                                                :
                                                null
                                        }
                                        {
                                            data.community.contacts.web ?
                                                <a href={data.community.contacts.web} target="_blank" class="c-community__link">{data.community.contacts.web}</a>
                                                :
                                                null
                                        }

                                    </span>
                                </li>
                                <li class="c-community__line c-community__line--center">
                                    <span class="c-community__caption">Социальные сети:</span>
                                    <span class="c-community__value">
                                        <ul class="c-community__socials">
                                            {
                                                data.community.social.telegram ?
                                                    <li>
                                                        <a href={data.community.social.telegram} class="c-community__social" target="_blank">
                                                            <img src={svg["community/telegram"]} />
                                                        </a>
                                                    </li>
                                                    :
                                                    null
                                            }
                                            {
                                                data.community.social.twitter ?
                                                    <li>
                                                        <a href={data.community.social.twitter} class="c-community__social" target="_blank">
                                                            <img src={svg["community/twitter"]} />
                                                        </a>
                                                    </li>
                                                    :
                                                    null
                                            }
                                            {
                                                data.community.social.discord ?
                                                    <li>
                                                        <a href={data.community.social.discord} class="c-community__social" target="_blank">
                                                            <img src={svg["community/discord"]} />
                                                        </a>
                                                    </li>
                                                    :
                                                    null
                                            }
                                            {
                                                data.community.social.instagram ?
                                                    <li>
                                                        <a href={data.community.social.instagram} class="c-community__social" target="_blank">
                                                            <img src={svg["community/instagram"]} />
                                                        </a>
                                                    </li>
                                                    :
                                                    null
                                            }
                                        </ul>
                                    </span>
                                </li>
                            </ul>
                            <div class="c-community__actions">
                                <a
                                    class="c-button c-button--outline2"
                                    href=""
                                    onclick={(e) => {
                                        // fn.siteLinkModal(e, { title: 'Страница сообщества' })
                                    }}
                                >
                                    <div class="c-button__wrapper">
                                        {Variable.lang.button.join}
                                    </div>
                                </a>
                                <a
                                    class="c-button c-button--outline2"
                                    href=""
                                    onclick={(e) => {
                                        // fn.siteLinkModal(e, { title: 'Страница сообщества' })
                                    }}
                                >
                                    <div class="c-button__wrapper">
                                        {Variable.lang.button.pin}
                                    </div>
                                </a>
                            </div>
                            <div class="c-community__galary">
                                <Swiper
                                    slide={slidesRecords}
                                    options={swiperOptions}
                                    className="c-projects__item swiper-slide slide-item"
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
                            </div>
                            <div class="c-community__eventsblock">
                                <h5 class="c-community__caption">Список мероприятий:</h5>
                                <div class="c-community__events">
                                    {
                                        !data.community.events
                                            ?
                                            <NotFound />
                                            :
                                            data.community.events.map(function (eventItem, i) {
                                                return (
                                                    <div class="c-table">
                                                        <div class="c-table__cell">
                                                            <p>{eventItem.title}</p>
                                                        </div>
                                                        <div class="c-table__cell">
                                                            <p>{eventItem.date}</p>
                                                        </div>
                                                        <div class="c-table__cell">
                                                            <p>{eventItem.place}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else if (data && data.community && data.custom) {
                if (data.custom == "anonymus") {
                    return (
                        <section class="c-community c-community--anonymus c-main__body">
                            <div class="c-container">
                                <header class="c-community__header">
                                    <h1 class="c-community__title">{data.community.name}</h1>
                                    <p class="c-community__slogan">{Variable.lang.p.communityWelcome}</p>
                                    <ul class="c-community__heroes">
                                        {
                                            data.community.heroes ?
                                                data.community.heroes.map((hero) => {
                                                    return (
                                                        <li class="c-community__hero">
                                                            <figure class="c-community__heroavatar">
                                                                <img class="" src={images["community/" + hero.path + "/" + hero.image]} width="150" height="150" />
                                                                <figcaption class="c-community__heroname"><span>{hero.name}</span></figcaption>
                                                            </figure>
                                                        </li>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </ul>
                                </header>
                                <div class="c-community__main">
                                    <div class="c-community__tabs c-tab">
                                        <input type="radio" id="tab1" class="c-tab__radio" name="tab-group" checked />
                                        <label for="tab1" class="c-tab__title">Общий чат</label>
                                        <section class="c-tab__content">
                                            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                                        </section>
                                        <input type="radio" id="tab2" class="c-tab__radio" name="tab-group" />
                                        <label for="tab2" class="c-tab__title">Сотрудничество</label>
                                        <section class="c-tab__content">Два</section>
                                        <input type="radio" id="tab3" class="c-tab__radio" name="tab-group" />
                                        <label for="tab3" class="c-tab__title">Pro merch</label>
                                        <section class="c-tab__content">Три</section>
                                        <input type="radio" id="tab4" class="c-tab__radio" name="tab-group" />
                                        <label for="tab4" class="c-tab__title">Шифры</label>
                                        <section class="c-tab__content">Четыре</section>
                                        <input type="radio" id="tab5" class="c-tab__radio" name="tab-group" />
                                        <label for="tab5" class="c-tab__title">Идеи</label>
                                        <section class="c-tab__content">Пять</section>
                                    </div>
                                </div>
                                <footer class="c-community__footer">
                                    <ul class="c-community__actions">
                                        {
                                            data.community.actions ?
                                                data.community.actions.map((action) => {
                                                    return (
                                                        <li class="c-community__action">
                                                            <a href={action.link ? action : "#"} target="_blank" class="">
                                                                <span>{action.title}</span>
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </ul>
                                </footer>
                            </div>
                        </section>
                    )
                }
            } else {
                return (
                    <div class="c-community c-main__body">
                        <div class="c-community__container c-container">
                            {/* <h1 class="c-community__title">Сообщество</h1> */}
                            <div class="c-community__photo">
                                <img src={images["community/community1"]} />    {/* {images[`${data.src}`]} */}
                            </div>
                            <div class="c-community__tags tags">
                                <Tags
                                    Static={Static}
                                    text={Variable.lang.categoryName.all}
                                    classActive={Static.activeCategory == "All" ? "tag_button_active" : ""}
                                    type="All"
                                />
                                {() => {
                                    if (Variable[Static.nameRecords + "Category"]) {
                                        let arrReturn = Variable[Static.nameRecords + "Category"].list_records.filter((item) => item.name !== null).map((item) => {
                                            return (
                                                <Tags
                                                    Static={Static}
                                                    text={Variable.lang.categoryName[item.name]}
                                                    classActive={Static.activeCategory == item.name ? "tag_button_active" : ""}
                                                    type={item.name}
                                                />
                                            )
                                        })
                                        return arrReturn
                                    }
                                }}
                            </div>
                            <ul class="c-community__characteristics">
                                <li class="c-community__line">
                                    <span class="c-community__caption">Название:</span>
                                    <span class="c-community__value c-community__value--name">Anonymous NFT TON</span>  {/* {data.name} */}
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Описание:</span>
                                    <span class="c-community__value">Децентрализованное сообщество людей, объединённых великой целью - стать лучшей версией себя</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Категория:</span>
                                    <span class="c-community__value">Название_категории</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Создатель:</span>
                                    <span class="c-community__value">Vin Diesel</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Количество участников:</span>
                                    <span class="c-community__value">1296 чел</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Язык:</span>
                                    <span class="c-community__value">Русский</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Страна:</span>
                                    <span class="c-community__value">Бразилия</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Город:</span>
                                    <span class="c-community__value">Рио-де-Жанейро</span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Контакты:</span>
                                    <span class="c-community__value">
                                        <a href="tel:89888888888" class="c-community__link">8(988)888-88-88</a>
                                        <a href="https://anon-nft.com/" target="_blank" class="c-community__link">https://anon-nft.com/</a>
                                    </span>
                                </li>
                                <li class="c-community__line">
                                    <span class="c-community__caption">Социальные сети:</span>
                                    <span class="c-community__value">
                                        <ul class="c-community__socials">
                                            <li>
                                                <a href="https://t.me/tonanon_nft" class="c-community__social" target="_blank">
                                                    <img src={svg["community/telegram"]} />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://twitter.com/tonanon_nft" class="c-community__social" target="_blank">
                                                    <img src={svg["community/twitter"]} />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://discord.gg/mGZM3Ydq" class="c-community__social" target="_blank">
                                                    <img src={svg["community/discord"]} />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://instagram.com/tonanon_nft" class="c-community__social" target="_blank">
                                                    <img src={svg["community/instagram"]} />
                                                </a>
                                            </li>
                                        </ul>
                                    </span>
                                </li>
                            </ul>
                            <div class="c-community__actions">
                                <a
                                    class="c-button c-button--outline2"
                                    href=""
                                    onclick={(e) => {
                                        // fn.siteLinkModal(e, { title: 'Страница сообщества' })
                                    }}
                                >
                                    <div class="c-button__wrapper">
                                        {Variable.lang.button.join}
                                    </div>
                                </a>
                                <a
                                    class="c-button c-button--outline2"
                                    href=""
                                    onclick={(e) => {
                                        // fn.siteLinkModal(e, { title: 'Страница сообщества' })
                                    }}
                                >
                                    <div class="c-button__wrapper">
                                        {Variable.lang.button.pin}
                                    </div>
                                </a>
                            </div>
                            <div class="c-community__galary">
                                <Swiper
                                    slide={slidesRecords}
                                    options={swiperOptions}
                                    className="c-projects__item swiper-slide slide-item"
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
                            </div>
                            <div class="c-community__eventsblock">
                                <h5 class="c-community__caption">Список мероприятий:</h5>
                                <div class="c-community__events  c-table">
                                    <div class="c-table__cell">
                                        <p>Что такое NFT?</p>
                                    </div>
                                    <div class="c-table__cell">
                                        <p>02.02.2023</p>
                                    </div>
                                    <div class="c-table__cell">
                                        <p>Онлайн</p>
                                    </div>
                                    <div class="c-table__cell">
                                        <p>NFT-конференция Юга</p>
                                    </div>
                                    <div class="c-table__cell">
                                        <p>20.02.2023</p>
                                    </div>
                                    <div class="c-table__cell">
                                        <p>г.Новороссийск, ТРЦ "Черноморский"</p>
                                    </div>
                                    <div class="c-table__cell">
                                        <p>Разговор с гуру NFT Ивановым И</p>
                                    </div>
                                    <div class="c-table__cell">
                                        <p>14.03.2023</p>
                                    </div>
                                    <div class="c-table__cell">
                                        <p>Онлайн</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }, ID
    );
};
export default start;
  // OK