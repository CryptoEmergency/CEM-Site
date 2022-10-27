import {
  jsx,
  jsxFrag,
  init,
  Variable
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID = "mainBlock") {

  init(
    null,
    () => {
      return (
        <div class="c-aboutus about_us_container c-main__body">
          <div class="c-aboutus__whowe c-whowe">
            <div class="c-whowe__inner">
              <h2
                class="c-whowe__title"
                onclick={() => {
                  Variable.SetModals({
                    name: "ModalPage",
                    data: {
                      item: {
                        statistic: {
                          view: 6,
                          rating: 1,
                          comments: 0,
                          unreadComments: 0,
                          complain: 0
                        },
                        _id: "633ed4163ad616be4b41b70b",
                        comments: [],
                        forFriends: false,
                        media: [],
                        complain: [],
                        evaluation: [
                          {
                            author: {
                              statistic: {
                                level: 10
                              },
                              avatar: {
                                type: "image",
                                name: "8562aa1b8a9b042559eeb1ff972e1b87.jpeg",
                                active: true,
                                dateCreate: "2022-06-28T08:22:52.905Z"
                              },
                              frame: {
                                active: true,
                                dateCreate: "2022-06-28T07:09:19.070Z",
                                name: "default.svg"
                              },
                              _id: "62baa91ff558ee4424f1f4ed",
                              online: true,
                              nickname: "Yan_Krivonosov"
                            }
                          },
                          {
                            author: {
                              statistic: {
                                level: 5
                              },
                              avatar: {
                                type: "image",
                                name: "639bca4d772f79d70eb18e91d5490eab.png",
                                active: true,
                                dateCreate: "2022-06-28T08:22:54.351Z"
                              },
                              frame: {
                                active: true,
                                dateCreate: "2022-06-28T07:09:32.630Z",
                                name: "rainbow.gif"
                              },
                              _id: "62baa92cf558ee4424f1f736",
                              online: false,
                              nickname: "Betarost"
                            }
                          },
                          {
                            author: {
                              statistic: {
                                level: 0
                              },
                              avatar: {
                                active: true,
                                dateCreate: "2022-09-23T09:02:10.332Z"
                              },
                              frame: {
                                active: true,
                                dateCreate: "2022-09-23T09:02:10.332Z"
                              },
                              _id: "632d7612b7cd91af0a36c947",
                              online: false,
                              nickname: "Shadow"
                            }
                          }
                        ],
                        showDate: "2022-10-06T13:11:50.906Z",
                        author: {
                          status: {
                            banned: false,
                            role: true,
                            active: true,
                            delete: false,
                            team: true
                          },
                          statistic: {
                            level: 10
                          },
                          avatar: {
                            type: "image",
                            name: "7645a8d8641078195b89b1b7f096c7b2.gif",
                            active: true,
                            dateCreate: "2022-06-28T08:23:06.591Z"
                          },
                          frame: {
                            active: true,
                            dateCreate: "2022-06-28T07:09:15.920Z",
                            name: "animate.gif"
                          },
                          _id: "62baa91bf558ee4424f1f44c",
                          online: true,
                          subscribed: [
                            "62baa926f558ee4424f1f624",
                            "62baa941f558ee4424f1fadc",
                            "62baa91ff558ee4424f1f4ed",
                            "62baa92bf558ee4424f1f6e7",
                            "62baaa25f558ee4424f2284b",
                            "62c441972f4921393fd1bc07",
                            "62cd7e7d5c4adb8a6641458a",
                            "62cbea36f1832e5e2df774a9",
                            "62baa92cf558ee4424f1f736",
                            "62e22b22a8f616d91c294baa",
                            "62baa930f558ee4424f1f7ea",
                            "62f1473af2b8fa66345f5293",
                            "62d7e80490edc15f690791b0",
                            "6310b80a6e34eecb0995043d"
                          ],
                          nickname: "Dmitrii_Belov"
                        },
                        text: "<p>⚡️⚡️⚡️Важная информация⚡️⚡️⚡️</p><p><span style=\"font-size: var(--bs-body-font-size); text-align: var(--bs-body-text-align);\">Сейчас все </span><span style=\"font-size: var(--bs-body-font-size); text-align: var(--bs-body-text-align);\">новостные</span><span style=\"text-align: var(--bs-body-text-align);\"> издания и телеграм каналы сеют панику о страшном 8 пакете санкций, бояться этого не нужно!</span></p><p><span style=\"font-size: var(--bs-body-font-size); text-align: var(--bs-body-text-align);\">Да запрет есть</span><span style=\"font-size: var(--bs-body-font-size); text-align: var(--bs-body-text-align);\"> может ввести эти ограничения, но пока что официально он не давал никаких комментариев!</p><p>Очень много сейчас знакомых суетятся и думают куда вывести средства и как можно скорее в том числе с биржы </span><span style=\"font-size: var(--bs-body-font-size); text-align: var(--bs-body-text-align);\">Binance, мол сейчас закроют доступ.</span></p><p>\r</p><p><span style=\"font-size: var(--bs-body-font-size); text-align: var(--bs-body-text-align);\">Это не подтверждено вовсе, официальных заявлений ещё не было от Binance!</p><p></span>По достоверным источникам - как заявляет директор <span style=\"font-size: var(--bs-body-font-size); text-align: var(--bs-body-text-align);\">Binance в странах СНГ - никаких изменений не планируется!</span></p><p>Если такой вариант и возможен, то все спокойно выведут свои средства со своих счетов на другие ресурсы - на это площадка обязана будет выделить время.</p><p></p><p>Будем держать вас в курсе новостей. Проверяйте все источники по несколько раз.</p><p>\r</p><p>\r</p><p>\r</p><p>\r</p><p>\r</p>",
                        languages: {
                          code: "ru",
                          eng_name: "Russian",
                          orig_name: "Русский",
                          _id: "633ed4163ad616be4b41b70d"
                        },
                        subscribe: true
                      },
                      type: ""
                    },
                  }, true);

                }}
              >
                {Variable.lang.h.who_are_we}
              </h2>
              <div hidden={true}>{"<!--Логин в Метрике-->"}</div>
              <img
                class="c-whowe__img"
                src={svg["background/about_us_vector-1"]}
              />
              <p>{Variable.lang.p.aboutPreview}</p>
            </div>
            <div class="c-whowe__bg"></div>
          </div>
          <div class="c-aboutus__content c-container">
            <div class="c-aboutus__goals c-goals">
              <h2 class="c-goals__title">{Variable.lang.h.our_goals}</h2>
              <div class="c-goals__list">
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <i class="c-goals__icon c-goals__icon--cryptoliteracy"></i>
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalOne}</p>
                    <span class="c-goals__text">{Variable.lang.p.goalOneDesc}</span>
                  </div>
                </div>
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <i class="c-goals__icon c-goals__icon--community"></i>
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalTwo}</p>
                    <span class="c-goals__text">{Variable.lang.p.goalTwoDesc}</span>
                  </div>
                </div>
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <i class="c-goals__icon c-goals__icon--freeaccess"></i>
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalThree}</p>
                    <span class="c-goals__text">{Variable.lang.p.goalThreeDesc}</span>
                  </div>
                </div>
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <i class="c-goals__icon c-goals__icon--metauniverse"></i>
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalFour}</p>
                    <span class="c-goals__text">{Variable.lang.p.goalFourDesc}</span>
                  </div>
                </div>
              </div>
              <img
                class="c-whowe__img c-whowe__img--right"
                src={svg["background/about_us_vector-2"]}
              />
            </div>
            <div class="c-aboutus__roadmap">
              <h2>{Variable.lang.h.road_map}</h2>
              <div class="c-aboutus__wrapper">
                <div class="c-aboutus__toppart">
                  <div class="c-aboutus__dateitem c-aboutus__dateitem--1">
                    <p>{Variable.lang.p.mapDateOne}</p>
                    <span>{Variable.lang.span.mapDescOne}</span>
                  </div>
                  <div class="c-aboutus__dateitem c-aboutus__dateitem--2">
                    <p>{Variable.lang.p.mapDateTwo}</p>
                    <span>{Variable.lang.span.mapDescTwo}</span>
                  </div>
                  <div class="c-aboutus__dateitem c-aboutus__dateitem--3">
                    <p>{Variable.lang.p.mapDateThree}</p>
                    <span>{Variable.lang.span.mapDescFive}</span>
                  </div>
                </div>
                <img class="c-aboutus__axis" src={images["road_map"]} />
                <div class="c-aboutus__bottompart">
                  <div class="c-aboutus__dateitem c-aboutus__dateitem--4">
                    <p>{Variable.lang.p.mapDateFour}</p>
                    <span>{Variable.lang.span.mapDescThree}</span>
                  </div>
                  <div class="c-aboutus__dateitem c-aboutus__dateitem--5">
                    <p>{Variable.lang.p.October2022}</p>
                    <span>{Variable.lang.span.mapDescFour}</span>
                  </div>
                  <div class="c-aboutus__dateitem c-aboutus__dateitem--6">
                    <p>{Variable.lang.p.mapDateSix}</p>
                    <span>{Variable.lang.span.mapDescSix}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="c-aboutus__projects">
              <h2>{Variable.lang.h.our_projects}</h2>
              <div class="c-aboutus__list">
                <div class="c-aboutus__project">
                  <img class="c-aboutus__banner" src={images["about_us_banner5"]} />
                  <span class="c-aboutus__projectcompany">
                    {Variable.lang.span.aboutProjectNameOne}
                  </span>
                  <p class="c-aboutus__projecttitle">{Variable.lang.p.aboutProjectDateOne}</p>
                </div>
                <a class="c-aboutus__project"
                  target="_blank"
                  href="https://cemblockchain.com/"
                >
                  <img class="c-aboutus__banner" src={images["about_us_banner8"]} />
                  <span class="c-aboutus__projectcompany">
                    Cemblockchain
                  </span>
                  <p class="c-aboutus__projecttitle">{Variable.lang.p.aboutProjectDate19May2022}</p>
                </a>
                <a class="c-aboutus__project"
                  target="_blank"
                  href="https://cemwallet.com/"
                >
                  <img class="c-aboutus__banner" src={images["CemWallet"]} />
                  <span class="c-aboutus__projectcompany">
                    CEM Wallet
                  </span>
                  <p class="c-aboutus__projecttitle">{Variable.lang.p.aboutProjectDateAugust2022}</p>
                </a>
                <div class="c-aboutus__project">
                  <img class="c-aboutus__banner" src={images["about_us_banner6"]} />
                  <span class="c-aboutus__projectcompany">
                    {Variable.lang.span.aboutProjectNameTwo}
                  </span>
                  <p class="c-aboutus__projecttitle">{Variable.lang.p.aboutProjectDateTwo}</p>
                </div>
                <div class="c-aboutus__project">
                  <img class="c-aboutus__banner" src={images["about_us_banner7"]} />
                  <span class="c-aboutus__projectcompany">
                    crypto vpn
                  </span>
                  <p class="c-aboutus__projecttitle">{Variable.lang.p.aboutProjectDateTwo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }, ID)
};
//I check
export default start;