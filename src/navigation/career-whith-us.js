import {
    jsx,
    jsxFrag,
    Variable,
    init,
    load
} from "@betarost/cemserver/cem.js";
import Elements from "@src/elements/export.js";

const vacancies = [
    {
        icon: "product",
        title: "HTML-верстальщик",
        status: "active",
        experience: "1–3 года",
        fulltime: true,
        fullday: true,
        responsibilities: [
            {
                text: "Верстка шаблонов веб-страниц «с нуля»"
            },
            {
                text: "Изменение существующих шаблонов сайта"
            },
            {
                text: "Взаимодействие с дизайнером, программистом"
            },
            {
                text: "Тестирование функционала готовых проектов"
            },
        ],
        requirements: [
            {
                text: "Умение уверенно верстать флексами и гридами, понимать чем одно отличается от другого"
            },
            {
                text: "JS-программирование простейшей логики форм будет большим плюсом (валидация, модалки)"
            },
            {
                text: "Аккуратность, внимательность, педантичность к своему и чужому коду"
            },
            {
                text: "Опыт работы верстальщиком или Front-end разработчиком от 1 года"
            },
            {
                text: "Кроссбраузерная pixel-perfect верстка и оптимизация под мобильные девайсы"
            },
            {
                text: "Отличные знания HTML5, CSS3, SCSS, Figma"
            },
            {
                text: "Знания JavaScript и библиотек (jQuery), DOM"
            },
            {
                text: "Навыки редактирования изображений, фотографий, минимальные знания Adobe Photoshop"
            }
        ],
        skills: [
            {
                tag: "JavaScript"
            },
            {
                tag: "CSS3"
            },
            {
                tag: "HTML5"
            },
            {
                tag: "jQuery"
            },
            {
                tag: "Git"
            },
            {
                tag: "Figma"
            },
            {
                tag: "Adobe Photoshop"
            },
            {
                tag: "Web-дизайн"
            },
            {
                tag: "Чувство стиля"
            },
            {
                tag: "Креативность"
            },
        ]
    },
    {
        icon: "product",
        title: "Frontend developer",
        status: "active",
        experience: "1–3 года",
        fulltime: true,
        fullday: true,
        responsibilities: [
            {
                text: "Поддержка и улучшение существующего продукта"
            },
            {
                text: "Разработка и развитие клиентской части проекта на JavaScript"
            },
            {
                text: "Постоянное улучшение своих знаний в области веб-технологий"
            },
        ],
        requirements: [
            {
                text: "Отличное знание языка JavaScript"
            },
            {
                text: "Навыки работы с GIT"
            },
            {
                text: "Уверенное знание HTML5, CSS3"
            },
            {
                text: "Умение предлагать рациональные решения поставленных задач"
            },
            {
                text: "Стремление к профессиональному росту‚ обязательность‚ ответственность"
            },
            {
                text: "Умение разбираться в чужом коде"
            },
            {
                text: "Опыт работы с js-фреймворками (Backbone, AngularJS, Vue.js и др.)"
            },
        ],
        skills: [
            {
                tag: "JavaScript"
            },
            {
                tag: "Node.js"
            },
            {
                tag: "Git"
            },
            {
                tag: "CSS"
            },
            {
                tag: "HTML"
            },
            {
                tag: "MongoDB"
            },
            {
                tag: "JSX"
            },
        ]
    },
    {
        icon: "product",
        title: "Frontend React developer",
        status: "active",
        experience: "1–3 года",
        fulltime: true,
        fullday: true,
        responsibilities: [
            {
                text: "Разработка UI"
            },
            {
                text: "Фронтенд разработка нового функционала"
            },
            {
                text: "Сопровождение имеющегося кода, его доработка и оптимизация"
            },
            {
                text: "Постоянное улучшение своих знаний в области веб-технологий"
            },
            {
                text: "Умение работать самостоятельно, стремление к саморазвитию, высокая обучаемость, внимательность"
            },
        ],
        requirements: [
            {
                text: "Отличное знание языка JavaScript"
            },
            {
                text: "Знание и умение работать с фреймворками Vue/React"
            },
            {
                text: "Навыки работы с GIT"
            },
            {
                text: "Уверенное знание HTML5, CSS3"
            },
            {
                text: "Умение предлагать рациональные решения поставленных задач"
            },
            {
                text: "Стремление к профессиональному росту‚ обязательность‚ ответственность"
            },
            {
                text: "Умение разбираться в чужом коде"
            },
        ],
        skills: [
            {
                tag: "JavaScript"
            },
            {
                tag: "Node.js"
            },
            {
                tag: "Git"
            },
            {
                tag: "CSS"
            },
            {
                tag: "HTML"
            },
            {
                tag: "MongoDB"
            },
            {
                tag: "React"
            },
            {
                tag: "Vue"
            },
            {
                tag: "JSX"
            },
        ]
    },
    {
        icon: "security",
        title: "Backend developer",
        status: "active",
        experience: "1–3 года",
        fulltime: true,
        fullday: true,
        responsibilities: [
            {
                text: "Разработка кода backend части web проекта"
            },
            {
                text: "Поддержка существующей кодовой базы"
            },
            {
                text: "Разрабатывать новые компоненты системы"
            },
            {
                text: "Участвовать в проработке архитектурных решений"
            },
        ],
        requirements: [
            {
                text: "Глубокие знания Javascript и Node.js"
            },
            {
                text: "Опыт работы с NodeJS в baсkend приложениях"
            },
            {
                text: "Опыт работы с MongoDB"
            },
            {
                text: "Опыт работы с Git"
            },
            {
                text: "Опыт использования Redis"
            },
            {
                text: "Понимание REST-архитектуры, опыт разработки серверной части REST(REST API)"
            },
            {
                text: "Умение писать чистый, валидный код"
            },
        ],
        skills: [
            {
                tag: "JavaScript"
            },
            {
                tag: "Git"
            },
            {
                tag: "Node.js"
            },
            {
                tag: "MongoDB"
            },
            {
                tag: "REST"
            },
        ]
    },
    {
        icon: "security",
        title: "DevOps",
        status: "active",
        experience: "1–3 года",
        fulltime: true,
        fullday: true,
        responsibilities: [
            {
                text: "Обеспечение бесперебойного функционирования IT–инфраструктуры"
            },
            {
                text: "Устранение инцидентов и неисправностей в работе IT-инфраструктуры"
            },
            {
                text: "Поддерживать и развивать базовую инфраструктуру (мониторинг, логирование, etc)"
            },
            {
                text: "Поддерживать и развивать инфраструктуру проектов (CDN, защита от DDoS, etc)"
            },
            {
                text: "Администрирование удаленных серверов на Linux"
            },
        ],
        requirements: [
            {
                text: "Опыт работы с *nix системами, уверенное знание Linux"
            },
            {
                text: "Понимание механизма работы сетей (протоколы (в том числе видео), cdn, облака и т.д.)"
            },
            {
                text: "Опыт работы с Nginx"
            },
            {
                text: "Опыт работы с Docker Swarm"
            },
            {
                text: "Навыки программирования на скриптовых языках (bash/Python)"
            },
        ],
        skills: [
            {
                tag: "CDN"
            },
            {
                tag: "DDoS"
            },
            {
                tag: "Linux"
            },
            {
                tag: "Nginx"
            },
            {
                tag: "Docker Swarm"
            },
            {
                tag: "bash"
            },
        ]
    },
    {
        icon: "product",
        title: "React native developer",
        status: "active",
        experience: "1–3 года",
        fulltime: true,
        fullday: true,
        responsibilities: [
            {
                text: "Разработка кросс платформенных приложений на React Native с нуля"
            },
            {
                text: "Поддержка и доработка существующий приложений"
            },
            {
                text: "Участие в оценке и планировании"
            },
        ],
        requirements: [
            {
                text: "Отличное знание React Native, его использование на коммерческих проектах"
            },
            {
                text: "Понимание концепции работы React Native и встраиваемых модулей"
            },
            {
                text: "Понимание концепции работы React Hooks"
            },
            {
                text: "Хорошие знания TypeScript"
            },
            {
                text: "Опыт работы Firebase"
            },
            {
                text: "Знание работы Xcode, Android Studio"
            },
            {
                text: "Наличие практического опыта работы с Google Play и App Store (включая подписи приложений, заливку и публикацию в сторы)"
            },
        ],
        skills: [
            {
                tag: "React"
            },
            {
                tag: "React Native"
            },
            {
                tag: "TypeScript"
            },
            {
                tag: "Firebase"
            },
            {
                tag: "Xcode"
            },
            {
                tag: "Android Studio"
            },
            {
                tag: "Google Play"
            },
            {
                tag: "App Store"
            },
        ]
    },
    {
        icon: "security",
        title: "Blockchain developer",
        status: "active",
        experience: "1–3 года",
        fulltime: true,
        fullday: true,
        responsibilities: [
            {
                text: "Участвовать в проектировании, разработке и внедрении блокчейн-проектов"
            },
            {
                text: "Разрабатывать, тестировать, анализировать смарт-контракты"
            },
        ],
        requirements: [
            {
                text: "Базовое понимание технологии blockchain"
            },
            {
                text: "Базовые знания blockchain-инфраструктуры (NFT-marketplace, DAO, DeFI, DEX, и пр)"
            },
            {
                text: "Понимание Blockchain. Знание Solidity, hardhat, web3"
            },
            {
                text: "Умение читать и разрабатывать smart-контракты"
            },
            {
                text: "Опыт выпуска собственных токенов на Ethereum"
            },
            {
                text: "Будет плюсом опыт создания собственных монет"
            },
            {
                text: "Широкий технический кругозор (знание других языков программирования, инфраструктурных решений, бэкграунд в системном администрировании и DevOps)"
            },
            {
                text: "Опыт разворачивания собственных нод и оракулов"
            },
        ],
        skills: [
            {
                tag: "blockchain"
            },
            {
                tag: "NFT"
            },
            {
                tag: "DAO"
            },
            {
                tag: "DeFI"
            },
            {
                tag: "Xcode"
            },
            {
                tag: "DEX"
            },
            {
                tag: "Solidity"
            },
            {
                tag: "web3"
            },
        ]
    },
    {
        icon: "marketing",
        title: "SEO-специалист",
        status: "active",
        experience: "1–3 года",
        fulltime: true,
        fullday: true,
        responsibilities: [
            {
                text: "Работа с информационными статьями репутационного характера"
            },
            {
                text: "SEO-оптимизация сайтов"
            },
            {
                text: "Проработка поисковых подсказок"
            },
            {
                text: "Фиксация результатов поиска Яндекс и Google"
            },
            {
                text: "Анализ результатов поиска в системах Яндекс и Google по запросам"
            },
            {
                text: "Регулярный анализ динамики приоритетных запросов"
            },
            {
                text: "Подбор и анализ целевых запросов, составление семантического ядра"
            },
            {
                text: "Поиск новых способов продвижения сайта"
            },
            {
                text: "Создавать и публиковать уникальный и интересный контент в Instagram, Telegram, YouTube, ВКонтакте"
            },
            {
                text: "Оформление аккаунтов, ежедневный постинг, копирайтинг / рерайтинг. Посевы в пабликах"
            },
            {
                text: "Разработка и реализация стратегии SMM для привлечения аудитории, составление контент-плана"
            },
        ],
        requirements: [
            {
                text: "Хорошее знание принципов и факторов ранжирования в Яндекс и Google"
            },
            {
                text: "Умение работать с сервисами: ahrefs, topvisor, checktrust, Google Analytics, Яндекс Метрика и т. д."
            },
            {
                text: "Умение работать в команде, работать с большими объемами информации, быстро принимать решения, воплощать их в жизнь и нести ответственность за результат"
            },
            {
                text: "Знаете что такое информационный стиль и пишите соответствующие тексты, без орфографических и пунктуационных ошибок"
            },
            {
                text: "Постоянно развиваетесь и готовы бесконечно совершенствовать аккаунты и контент"
            },
        ],
        skills: [
            {
                tag: "SEO"
            },
            {
                tag: "Яндекс Метрика"
            },
            {
                tag: "Google Analytics"
            },
            {
                tag: "checktrust"
            },
            {
                tag: "topvisor"
            },
            {
                tag: "ahrefs"
            },
            {
                tag: "Instagram"
            },
            {
                tag: "Telegram"
            },
            {
                tag: "YouTube"
            },
            {
                tag: "ВКонтакте"
            },
            {
                tag: "Яндекс"
            },
            {
                tag: "Google"
            },
        ]
    }
];

const start = function (data, ID) {

    load({
        ID,
        fn: () => {
            return (

                <div class="c-jobs c-main__body">
                    <div class="c-jobs__page">
                        <div class="c-jobs__preview">
                            <div class="c-jobs__textpreview">
                                <h3 class="c-jobs__title">{Variable.lang.h.career_with_us}</h3>
                                <p>{Variable.lang.p.connectTeam}</p>
                                {/* <a href="" class="c-button c-button--primary">
                                    <span class="c-button__text">{Variable.lang.button.our_vacancies}</span>
                                </a> */}
                            </div>
                        </div>

                        <div class="c-jobs__advantages">
                            <h2 class="c-jobs__subtitle">{Variable.lang.h.advantages}</h2>
                            <div class="c-jobs__listadvantages">
                                <div class="c-jobs__itemadvantages">
                                    <div class="c-jobs__iconadvantages c-jobs__iconadvantages--comand"></div>
                                    <h5>{Variable.lang.p.friendlyTeam}</h5>
                                    <p>{Variable.lang.p.friendlyTeamDesc}</p>
                                </div>
                                <div class="c-jobs__itemadvantages">
                                    <div class="c-jobs__iconadvantages c-jobs__iconadvantages--company"></div>
                                    <h5>{Variable.lang.p.IntCcompany}</h5>
                                    <p>{Variable.lang.p.IntCcompanyDesc}</p>
                                </div>
                                <div class="c-jobs__itemadvantages">
                                    <div class="c-jobs__iconadvantages c-jobs__iconadvantages--comfortable"></div>
                                    <h5>{Variable.lang.p.comfortWorking}</h5>
                                    <p>{Variable.lang.p.comfortWorkingDesc}</p>
                                </div>
                                <div class="c-jobs__itemadvantages">
                                    <div class="c-jobs__iconadvantages c-jobs__iconadvantages--contract"></div>
                                    <h5>{Variable.lang.p.employmentStandart}</h5>
                                    <p>{Variable.lang.p.employmentStandartDesc}</p>
                                </div>
                            </div>
                        </div>

                        <div class="c-jobs__how">
                            <h2 class="c-jobs__subtitle">{Variable.lang.h.how_get_job}</h2>
                            <div class="c-jobs__listhow">
                                <div class="c-jobs__itemhow">
                                    <span>01</span>
                                    <p>{Variable.lang.p.stepGetJobOne}</p>
                                </div>
                                <div class="c-jobs__itemhow">
                                    <span>02</span>
                                    <p>{Variable.lang.p.stepGetJobTwo}</p>
                                </div>
                                <div class="c-jobs__itemhow">
                                    <span>03</span>
                                    <p>{Variable.lang.p.stepGetJobThree}</p>
                                </div>
                                <div class="c-jobs__itemhow">
                                    <span>04</span>
                                    <p>{Variable.lang.p.stepGetJobFour}</p>
                                </div>
                            </div>
                        </div>

                        <div class="c-jobs__profession">
                            <h2 class="c-jobs__subtitle">{Variable.lang.h.profession}</h2>
                            <div class="c-jobs__listprofession">
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--business"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionOne}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--marketing"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionTwo}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--support"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionThree}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--product"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionFour}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--security"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionFive}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--management"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionSix}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--strategic"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionSeven}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--department"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionEight}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--videoediting"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionNine}</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        
                        <div class="c-jobs__vacancies">
                            {
                                vacancies.map(function (vacancy, i) {
                                    // console.log('=7b5cad= vacancy =', vacancy)
                                    return (
                                        <div class="c-jobs__vacancy">
                                            <div class="c-jobs__headervacancy">
                                                <i
                                                    class={[
                                                        "c-jobs__iconprofession",
                                                        `c-jobs__iconprofession--${vacancy.icon}`
                                                    ]}
                                                ></i>
                                                <div class="c-jobs__titlevacancy">{vacancy.title}</div>
                                                <div class="c-jobs__statusvacancy">
                                                    {vacancy.status == "active" ? "Активно" : "Не активно"}
                                                </div>
                                            </div>
                                            <div class="c-jobs__mainvacancy">
                                                <p class="c-jobs__experience">Требуемый опыт работы: {vacancy.experience}</p>
                                                <p class="c-jobs__fullday">{vacancy.fullday ? "Полная" : "Неполная"} занятость, {vacancy.fulltime ? " полный" : " неполный"} день</p>

                                                <p style="margin-bottom: 0;">Работа исключительно в офисе.</p>
                                                <p>В данный момент ведется разработка нескольких крупных проектов.</p>

                                                <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                                                    <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                                        <p class="c-jobs__subsubtitle">Обязанности:</p>
                                                        {
                                                            vacancy.responsibilities.map(function (item, ind) {
                                                                return (
                                                                    <p style="font-size: 14px; margin-bottom: 7px; color: #CACACA">{item.text}{ind == vacancy.responsibilities.length - 1 ? "." : ";"}</p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                                        <p class="c-jobs__subsubtitle">Требования:</p>
                                                        {
                                                            vacancy.requirements.map(function (item, ind) {
                                                                return (
                                                                    <p style="font-size: 14px; margin-bottom: 7px; color: #CACACA">{item.text}{ind == vacancy.requirements.length - 1 ? "." : ";"}</p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>

                                                <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня (10:00 - 18:00 Мск)</p>
                                                <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>

                                                <p class="c-jobs__subsubtitle">Ключевые навыки</p>
                                                <ul class="c-jobs__skills">
                                                    {
                                                        vacancy.skills.map(function (item, ind) {
                                                            return (
                                                                <li>{item.tag}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <div class="c-jobs__actionvacancy">
                                                <div
                                                    class="c-button"
                                                    onclick={(e) => {
                                                        Variable.SetModals({ name: "ModalWorkMessage", data: {} })
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <div class="c-button__text">
                                                        Откликнуться
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div class="c-job__withus">
                            <h2 class="c-jobs__subtitle">{Variable.lang.p.waitYouTeam}</h2>
                        </div>
                    </div>
                </div>

            )
        }
    })
};
export default start;