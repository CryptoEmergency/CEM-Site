import {
  jsx,
  jsxFrag,
  initGo,
  getStorage,
  setStorage,
  init,
  Variable,
} from "@betarost/cemjs";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID = "mainBlock") {
  let filterArrLogo, type, arrLogo, teachers, courses;

  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  const clickButton = (filter) => {
    setStorage("FILTER_UNIVERSITY", filter);
    type = filter;
    initGo(null, true);
  };

  init(
    () => {
      arrLogo = [
        {
          title: "Crypto Emergency",
          description:
            "atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expeditan distinctio! blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expeditan distinctio!",
          type: "profession",
          img: svg["logo"],
          stock: [
            {
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
              promo: "Promo1"
            },
            {
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
              promo: "Promo2"
            },
            {
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
              promo: "Promo3"
            },
          ]
        },
        {
          title: "Crypto Summit",
          description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
          type: "language",
          img: images["banners/crypto_summit"],
          stock: [
            {
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
              promo: "Promo1"
            },
            {
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
              promo: "Promo2"
            },
            {
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
              promo: "Promo3"
            },
          ]
        },
        {
          title: "Blockchain24.pro",
          description:
            "Ведущий информационный портал о криптовалютах и технологиях blockchain",
          type: "education",
          img: images["banners/blockchain24"],
          stock: [
            {
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
              promo: "Promo1"
            },
            {
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
              promo: "Promo2"
            },
            {
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
              promo: "Promo3"
            },
          ]
        },
      ];

      teachers = [
        {
          title: "Преподаватель",
          src: "university/teacher2",
          name: "Анастасия Рудаченко",
          position: "Криптоэксперт-практик, основатель академии криптовалют.",
          biography: "Обучила финансовой и крипто-грамотности более 1000 человек. Провела свыше 2500 часов консультаций для клиентов в направлениях финансового планирования и инвестирования. Максимальная сделка за все время в криптосфере — 7000%. Собрала более 150 инструментов заработка в своем инвестиционном портфеле",
          achievements: "Эксперт-практик в сфере криптовалют с 2015 года. Член лидерского совета крупнейших блокчейн-компаний в Дубае. Основатель Академии Криптовалют «Digital Future». Создатель закрытого инвестиционного клуба. Имеет 2 высших образования и степень МВА Finance Британского университета.",
          contacts: {
            email: "",
            phone: "",
            telegram: "",
          },
          link: "/university/teachers/anastasiya/"
        },
        {
          title: "Преподаватель",
          src: "university/teacher1",
          name: "Евгений Царицанский",
          position: "Криптоэксперт, основатель академии криптовалют.",
          biography: "Работал экономистом в крупнейших банках РФ, прежде чем окончательно перешел в криптосферу. За 2 года с помощью работы с криптовалютой увеличил свой доход в 30 раз. Максимальная сделка за все время в криптосфере — 3900%.",
          achievements: "Эксперт в сфере блокчейна и криптовалют с 2020 года. Основатель Академии Криптовалют «Digital Future». Создатель закрытого инвестиционного клуба. Два высших образования в областях экономики и психологии. Волонтер и соорганизатор благотворительного сообщества «СВОИ»",
          contacts: {
            email: "",
            phone: "+79881234568",
            telegram: "",
          },
          link: "/university/teachers/evgeniy/"
        },
        {
          title: "Преподаватель",
          src: "university/teacher3",
          name: "Валерий Осипов",
          position: "Эксперт в сфере NFT, криптовалют и блокчейна",
          biography: "Автор свыше 1000 статей о рынке криптовалют и NFT на русском и английском языках. Сотрудничал с лучшими новостными ресурсами на криптовалютном рынке. Контент-продюсер криптовалютных проектов уровня Tier-1 сегмента SocialFi. Автор курсов по криптовалютам и писательскому мастерству. Создатель творческого проекта learn-&earn для писателей, живописцев и криптоэнтузиастов ArtEmotioChain. Спикер и модератор на конференциях по криптовалютам и NFT",
          achievements: "Эксперт в сфере NFT, криптовалют и блокчейна. Основатель ArtEmotioChain",
          contacts: {
            email: "cryptosip@gmail.com",
            phone: "+79881234568",
            telegram: " t.me/valeriyosipov",
            web: "www.artemotiochain.ru"
          },
          link: "/university/teachers/valerii/"
        },
        {
          title: "Преподаватель",
          src: "university/teacher4",
          name: "Олеся Осипова",
          position: "NFT-артист, художник, иллюстратор, дизайнер, создатель проекта эмоциональной живописи Art Emotio ",
          biography: "Работала в сфере коммуникаций и фирменного стиля, благодаря чему смогла ощутить динамику современных технологий. Обучалась авторским техникам в архитектурно-строительном университете и Санкт-Петербургской государственной художественно-промышленной академии имени А.Л. Штиглица, мастерских и художественных студиях. Автор курсов креативному мышлению художника и занятий эмоцио-живописи. Пишет картины в яркой живописной технике маслом. Ведущая занятий по современному искусству. Автор NFT-коллекций.",
          achievements: "NFT-артист, создатель проекта эмоциональной живописи Art Emotio",
          contacts: {
            email: "cryptosip@gmail.com",
            phone: "+79881234568",
            telegram: " t.me/valeriyosipov",
            web: "www.artemotiochain.ru"
          },
          link: "/university/teachers/olesya/"
        },
      ]

      courses = [
        {
          logo: "",
          title: "Курс 'SILVER'",
          link: "/university/courses/silver/",
          src: "university/course1",
          resourse: "https://digitalfutureclub.ru/",
          for_whom: "Для тех, кто хочет самостоятельно научиться работать с криптовалютой",
          booking: true,
          installment_plan: true,
          modules: [
            {
              item: "Модуль «Предобучение»"
            },
            {
              item: "Модуль «Базовый»"
            },
            {
              item: "Модуль «Фундаментальный»"
            },
            {
              item: "Модуль «Децентрализованные финансы»"
            },
            {
              item: "Модуль «Создание криптопортфеля»"
            },
          ],
          content: [
            {
              item: "4 секретных урока"
            },
            {
              item: "1 живая встреча «Вопрос-Ответ»"
            },
            {
              item: "Дневник траектории успеха"
            },
            {
              item: "Набор чек-листов и образовательных материалов"
            },
            {
              item: "Сертификат об окончании курса"
            },
          ],
          primary_color: "#083c61"
        },
        {
          logo: "",
          title: "Курс 'GOLD'",
          link: "/university/courses/gold/",
          src: "university/course1",
          resourse: "https://digitalfutureclub.ru/",
          for_whom: "Для тех, кто хочет научиться работать с криптовалютой под наставничеством опытного куратора",
          booking: true,
          installment_plan: true,
          modules: [
            {
              item: "Модуль «Предобучение»"
            },
            {
              item: "Модуль «Базовый»"
            },
            {
              item: "Модуль «Фундаментальный»"
            },
            {
              item: "Модуль «Децентрализованные финансы»"
            },
            {
              item: "Модуль «Создание криптопортфеля»"
            },
          ],
          content: [
            {
              item: "4 секретных урока"
            },
            {
              item: "Проверка домашних заданий куратором"
            },
            {
              item: "4 видеоурока по проработке мышления миллионера"
            },
            {
              item: "4 живые встреча «Вопрос-Ответ»"
            },
            {
              item: "Дневник траектории успеха"
            },
            {
              item: "Набор чек-листов и образовательных материалов"
            },
            {
              item: "Сертификат об окончании курса"
            },
          ],
          primary_color: "#083c61"
        },
        {
          logo: "",
          title: "Курс 'PLATINUM'",
          link: "/university/courses/platinum/",
          src: "university/course1",
          resourse: "https://digitalfutureclub.ru/",
          for_whom: "Для тех, кто хочет научиться работать с криптовалютой под наставничеством опытного куратора",
          booking: true,
          installment_plan: true,
          modules: [
            {
              item: "Модуль «Предобучение»"
            },
            {
              item: "Модуль «Базовый»"
            },
            {
              item: "Модуль «Фундаментальный»"
            },
            {
              item: "Модуль «Децентрализованные финансы»"
            },
            {
              item: "Модуль «Создание криптопортфеля»"
            },
          ],
          content: [
            {
              item: "4 секретных урока"
            },
            {
              item: "Проверка домашних заданий лично экспертами"
            },
            {
              item: "4 видеоурока по проработке мышления миллионера"
            },
            {
              item: "4 живые встреча «Вопрос-Ответ»"
            },
            {
              item: "Служба заботы"
            },
            {
              item: "Дневник траектории успеха"
            },
            {
              item: "Набор чек-листов и образовательных материалов"
            },
            {
              item: "Сертификат об окончании курса"
            },
          ],
          primary_color: "#083c61"
        }
      ]

      if (!getStorage("FILTER_UNIVERSITY")) {
        setStorage("FILTER_UNIVERSITY", "all");
        type = "all";
      } else {
        type = getStorage("FILTER_UNIVERSITY");
      }
    },
    () => {
      {
        type === "all"
          ? (filterArrLogo = arrLogo)
          : (filterArrLogo = arrLogo.filter((item) => item.type === type));
      }

      return (
        <div
          class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
            } c-university`}
        >
          <div class="c-university__container c-container">
            <h1 class="c-university__title" style={"padding-top: 10vw"}
            // onclick ={(e) => {
            //   console.log('=b7c203=')
            //   e.stopPropagation();
            //   e.preventDefault();
            //   Variable.SetModals({
            //     name: "ModalContextMenu",
            //     data: {},
            //   });
            // }}
            >
              Крипто университет
            </h1>

            <h2 class="c-university__subtitle">Преподаватели</h2>
            <div class="c-university__teachers">
              {
                teachers.map(function (teacher, i) {
                  return (
                    <a
                      href={teacher.link}
                      class="c-university__teacher"
                      onclick={(e) => {
                        fn.siteLinkModal(e, teacher)
                      }}
                    >
                      <span class="c-university__wrapper">
                        <img class="c-university__photo" src={images[`${teacher.src}`]} />
                      </span>
                      <span class="c-university__caption">
                        <p class="c-university__name">{teacher.name}</p>
                        <p class="c-university__position">{teacher.position}</p>
                      </span>
                    </a>
                  )
                })
              }
            </div>
            <div class="c-university__courses">
              <h2 class="c-university__subtitle">Курсы</h2>
              <div class="c-university__courseslist">
                {
                  courses.map(function (course, i) {
                    return (
                      <a
                        href={course.link}
                        class="c-university__course"
                        onclick={(e) => {
                          fn.siteLinkModal(e, course)
                        }}
                      >
                        <span class="c-university__wrapper" style={`--bg: ${course.primary_color}`}>
                          <img class="c-university__photo" src={images[`${course.src}`]} />
                        </span>
                        <span class="c-university__caption">
                          <p class="c-university__name">{course.title}</p>
                        </span>
                      </a>
                    )
                  })
                }
              </div>
            </div>
            {/* <h3 class="c-university__promo">
              At vero eos et accusamus et iusto odio dignissimos ducimus, qui
              blanditiis praesentium voluptatum deleniti atque corrupti, quos
              dolores et quas molestias excepturi sint, obcaecati cupiditate non
              provident, similique sunt in culpa, qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio!
            </h3> */}
            {/* <div class="c-university__toggles customscroll--gorizontal">
              <div
                class="button-container-preview "
                onclick={() => clickButton("all")}
              >
                <a
                  class={[
                    "btn-news-preview",
                    type !== "all" ? " c-button--inactive" : null,
                  ]}
                >
                  <span>Всё</span>
                </a>
              </div>
              <div
                class="button-container-preview "
                onclick={() => clickButton("education")}
              >
                <a
                  class={[
                    "btn-news-preview",
                    type !== "education" ? " c-button--inactive" : null,
                  ]}
                >
                  <span>Crypto образование</span>
                </a>
              </div>
              <div
                class="button-container-preview "
                onclick={() => clickButton("profession")}
              >
                <a
                  class={[
                    "btn-news-preview",
                    type !== "profession" ? " c-button--inactive" : null,
                  ]}
                >
                  <span>Профессии</span>
                </a>
              </div>
              <div
                class="button-container-preview "
                onclick={() => clickButton("language")}
              >
                <a
                  class={[
                    "btn-news-preview",
                    type !== "language" ? " c-button--inactive" : null,
                  ]}
                >
                  <span>Иностранные языки</span>
                </a>
              </div> */}

            {/* <button
                class={`c-university__btn ${type === "all" ? " c-university__btn--active" : ""}`}
                onclick={() => clickButton("all")}
              >
                Всё
              </button>
              <button
                class={`c-university__btn ${type === "profession" ? " c-university__btn--active" : ""}`}
                onclick={() => clickButton("profession")}
              >
                Профессии
              </button>
              <button
                class={`c-university__btn ${type === "language" ? " c-university__btn--active" : ""}`}
                onclick={() => clickButton("language")}
              >
                Иностранные языки
              </button> */}
            {/* </div>
            <ul class="c-university__list">
              {filterArrLogo.map((item, i) => {
                return (
                  <li
                    class="c-universitycard"
                    style={"margin-bottom:40px"}
                    key={i}
                  >
                    <div class="c-universitycard__wrapper" style={"border-radius:18px;overflow:hidden "}>
                      <img class="c-universitycard__img" src={item.img}></img>
                    </div>
                    <div class="c-universitycard__info">
                      <h5 class="c-universitycard__title">{item.title}</h5>
                      <p class="c-universitycard__text">{item.description}</p> */}
            {/* <button class="c-universitycard__btn">Подробнее</button> */}

            {/* <div class="c-question__footer"   style={"width:25vw"} > */}
            {/* <a
                        class="c-universitycard__btn c-button c-button--outline2 "
                        onclick={() => {
                          // Variable.SetModals({
                          //   name: "ModalFullSize",
                          //   data: {
                          //     item, type: "university"
                          //   },
                          // });
                        }}
                      >
                        <div class="c-button__wrapper">
                          Подробнее
                        </div>
                      </a> */}
            {/* </div> */}
            {/* </div>
                  </li>
                );
              })}
            </ul> */}
          </div>
        </div >
      );
    }, ID
  );
};

export default start;
