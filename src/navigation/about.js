import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
} from "@betarost/cemserver/cem.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Swiper from "swiper/bundle";

import "swiper/css/bundle";

import { Particles } from "@src/component/htmlElements/index.js";
import { AnimatedCard } from "@src/component/htmlElements/index.js";
import { Accordeon } from "@src/component/htmlElements/index.js";
// import { AboutAnimation } from "@src/component/blocks/AboutAnimation";

const team = [
  {
    name: "Ян Кривоносов",
    foto: "startaps-inner/team1",
    position: "CEO проекта Crypto Emergency",
  },
  {
    name: "Игорь Еньшин",
    foto: "startaps-inner/team4",
    position: "Руководитель IT направления",
  },
  {
    name: "Анна Рыжкова",
    foto: "startaps-inner/team2",
    position: "Руководитель отдела по работе с дизайнерами",
  },
  {
    name: "Дмитрий Белов",
    foto: "startaps-inner/team3",
    position: "Управляющий директор проекта",
  },
];

const arrAccordeon = [
  {
    title: "Цель Crypto Emergency?",
    description:
      "Объединить криптоэнтузиастов со всего мира на многофункциональной платформе, где собраны все необходимые инструменты для общения, обучения, заработка и создания собственного контента.",
    hidden: false,
  },
  {
    title: "Как заработать или купить токены CEM?",
    description:
      "Купить CEM можно официально на бирже Bitmart. Также можно вести активную деятельность на платформе и получать новый уровень за действия на платформе и с новым уровнем получать в награду CEM. Следите за новостями в телеграме, могут появляться разные конкурсы где в награду можно получить монету CEM.",
    hidden: true,
  },
  {
    title: "Как вывести заработанные CEM с платформы?",
    description:
      "Вывести заработанные CEM на нашей платформе за проявленную активность вы можете на свой счет в любое время. На данный момент вывод средств осуществляется путем подачи заявки через администратора.",
    hidden: true,
  },
  {
    title: "Проект доступен лишь в России?",
    description:  "У нас огромная экосистема которая на данный момент полностью переведена на 16 языков по всему миру, а основными разделами платформы уже сейчас можно пользоваться на 60 языках. Платформа доступна на всех рынках включая Китай.",
    hidden: true,
  },
  {
    title: "Можно ли скачать приложение на телефон?",
    description: "Да! Все проекты нашей экосистемы доступны как на Android так и на iPhone. Найти ссылочки для скачивания можно внизу страницы, либо просто через поиск в маркетах.",
    hidden: false,
  },
];

function showTeam(team) {
  return team.map((item) => {
    return (
      <div class="team-item swiper-slide">
        <div class="team-img">
          <img src={images[item.foto]}></img>
        </div>
        <h5>{item.name}</h5>
        <span>{item.position}</span>
      </div>
    );
  });
}

const start = function (data, ID) {
  // setTimeout(() => {
  //   arrAccordeon[0].element.hidden = true;
  //   // console.log("=7c6bf4=", arrAccordeon[0]);
  // }, 5000);

  const arrBlockCard = [
    {
      blockImg: svg["icon/about_us_portfolio"],
      altImg: Variable.lang.p.goalOne,
      title: Variable.lang.p.goalOne,
      descriptions: Variable.lang.p.goalOneDesc,
      classItem: "crypto",
    },
    {
      blockImg: svg["icon/about_us_protection"],
      altImg: Variable.lang.p.goalTwo,
      title: Variable.lang.p.goalTwo,
      descriptions: Variable.lang.p.goalTwoDesc,
      classItem: "unite",
    },
    {
      blockImg: svg["icon/about_us_cryptocurrencies"],
      altImg: Variable.lang.p.goalThree,
      title: Variable.lang.p.goalThree,
      descriptions: Variable.lang.p.goalThreeDesc,
      classItem: "access",
    },
    {
      blockImg: svg["icon/about_us_quality"],
      altImg: Variable.lang.p.goalFour,
      title: Variable.lang.p.goalFour,
      descriptions: Variable.lang.p.goalFourDesc,
      classItem: "meta",
    },
  ];

  const swiperGo = function (index) {
    let swiperItem = new Swiper(".mySwiper", {
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      breakpoints: {
        100: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        620: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        910: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1240: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
      spaceBetween: 20,
    });
  };
  init(
    null,
    () => {
      return (
        <div class="c-aboutus about_us_container c-main__body" id="test2">
          <div class="c-aboutus__whowe c-whowe">
            <div class="c-whowe__inner">
              <img
                class="c-whowe__img"
                src={svg["background/about_us_vector-1"]}
              />
              <h2 class="title-animation">Crypto Emergency</h2>
              {/* <p style="font-size: 22px; font-weight: 600">
                {Variable.lang.p.aboutObjectiveTitle}
              </p> */}
              <p>{Variable.lang.p.aboutObjective}</p>
            </div>
            <div class="c-whowe__bg"></div>
          </div>
          <Particles></Particles>
          <div class="c-aboutus__content c-container">
            <div class="c-aboutus__goals c-goals">
              <h2 class="c-goals__title">{Variable.lang.h.our_goals}</h2>

              <div class="list-goals">
                {arrBlockCard.map((item) => {
                  return (
                    <AnimatedCard
                      blockImg={item.blockImg}
                      altImg={item.altImg}
                      className={item.classItem}
                      title={item.title}
                      descriptions={item.descriptions}
                    />
                  );
                })}
              </div>

              <div class="accordeon">
                {arrAccordeon.map((item, index) => {
                  return (
                    <Accordeon
                      title={item.title}
                      description={item.description}
                      hidden={item.hidden}
                      onclick={() => {
                        arrAccordeon.forEach((u) => {
                          u.hidden = true;
                        });
                        item.hidden = false;
                        // if(!item.hidden){
                        //   item.hidden = !item.hidden
                        // }
                        initReload();
                      }}
                    />
                  );
                })}
              </div>

              <div class="team">
                <h2 class="startap-title">{Variable.lang.h.our_team}</h2>
                <div class="swiper mySwiper" After={() => swiperGo()}>
                  <div class="swiper-wrapper">{showTeam(team)}</div>
                  <div class="swiper-pagination"></div>
                </div>
              </div>

              {/* <div class="c-goals__list">
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <i class="c-goals__icon c-goals__icon--cryptoliteracy"></i>
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalOne}</p>
                    <span class="c-goals__text">
                      {Variable.lang.p.goalOneDesc}
                    </span>
                  </div>
                </div>
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <i class="c-goals__icon c-goals__icon--community"></i>
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalTwo}</p>
                    <span class="c-goals__text">
                      {Variable.lang.p.goalTwoDesc}
                    </span>
                  </div>
                </div>
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <i class="c-goals__icon c-goals__icon--freeaccess"></i>
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalThree}</p>
                    <span class="c-goals__text">
                      {Variable.lang.p.goalThreeDesc}
                    </span>
                  </div>
                </div>
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <i class="c-goals__icon c-goals__icon--metauniverse"></i>
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalFour}</p>
                    <span class="c-goals__text">
                      {Variable.lang.p.goalFourDesc}
                    </span>
                  </div>
                </div>
              </div> */}

              <img
                class="c-whowe__img c-whowe__img--right"
                src={svg["background/about_us_vector-2"]}
              />
            </div>

            <div class="c-aboutus__roadmap">
              <h2>{Variable.lang.h.road_map}</h2>
              <div class="roadmap-wrap">
                <div class="roadmap_item roadmap_item--0">
                  <span class="year year--0">
                    {Variable.lang.span.mapDescOne}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateOne}</p>
                </div>

                <div class="turn turn-0">
                  <img alt={Variable.lang.span.mapDescOne} src={svg['roadmap/turn-left1']}></img>
                </div>

                <div class="roadmap_item roadmap_item--1">
                  <span class="year year--1">
                    {Variable.lang.span.mapDescTwo}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateTwo}</p>
                </div>

                <div class="turn turn-1">
                  <img alt={Variable.lang.span.mapDescTwo} src={svg['roadmap/turn-right2']}></img>
                </div>

                <div class="roadmap_item roadmap_item--2">
                  <span class="year year--2">
                    {Variable.lang.span.mapDescThree}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateThree}</p>
                </div>

                <div class="turn turn-2">
                  <img alt={Variable.lang.span.mapDescThree} src={svg['roadmap/turn-left3']}></img>
                </div>

                <div class="roadmap_item roadmap_item--3">
                  <span class="year year--3">
                    {Variable.lang.span.mapDescFour}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateFour}</p>
                </div>

                <div class="turn turn-3">
                  <img alt={Variable.lang.span.mapDescFour} src={svg['roadmap/turn-right4']}></img>
                </div>

                <div class="roadmap_item roadmap_item--4">
                  <span class="year year--4">
                    {Variable.lang.span.mapDescFive}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateFive}</p>
                </div>

                <div class="turn turn-4">
                  <img alt={Variable.lang.span.mapDescFive} src={svg['roadmap/turn-left5']}></img>
                </div>

                <div class="roadmap_item roadmap_item--5">
                  <span class="year year--5">
                    {Variable.lang.span.mapDescSix}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateSix}</p>
                </div>

                <div class="turn turn-5">
                  <img alt={Variable.lang.span.mapDescSix} src={svg['roadmap/turn-right6']}></img>
                </div>

                <div class="roadmap_item roadmap_item--6">
                  <span class="year year--6">
                    {Variable.lang.span.mapDescSeven}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateSeven}</p>
                </div>

                <div class="turn turn-6">
                  <img alt={Variable.lang.span.mapDescSeven} src={svg['roadmap/turn-left7']}></img>
                </div>
              </div>
              {/* <div class="c-aboutus__wrapper">
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
              </div> */}
            </div>

            <div class="c-aboutus__projects">
              <h2>{Variable.lang.h.our_projects}</h2>
              <div class="c-aboutus__list">
                <div class="c-aboutus__project">
                  <img
                    class="c-aboutus__banner"
                    src={images["about_us_banner5"]}
                  />
                  <span class="c-aboutus__projectcompany">
                    {Variable.lang.span.aboutProjectNameOne}
                  </span>
                  {/* <p class="c-aboutus__projecttitle">
                    {Variable.lang.p.aboutProjectDateOne}
                  </p> */}
                </div>
                <a
                  class="c-aboutus__project"
                  target="_blank"
                  href="https://cemblockchain.com/"
                >
                  <img
                    class="c-aboutus__banner"
                    src={images["about_us_banner8"]}
                  />
                  <span class="c-aboutus__projectcompany">Cemblockchain</span>
                  {/* <p class="c-aboutus__projecttitle">
                    {Variable.lang.p.aboutProjectDate19May2022}
                  </p> */}
                </a>
                <a
                  class="c-aboutus__project"
                  target="_blank"
                  href="https://cemwallet.com/"
                >
                  <img class="c-aboutus__banner" src={images["CemWallet"]} />
                  <span class="c-aboutus__projectcompany">CEM Wallet</span>
                  {/* <p class="c-aboutus__projecttitle">
                    {Variable.lang.p.aboutProjectDateAugust2022}
                  </p> */}
                </a>
                {/*<div class="c-aboutus__project">
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
      </div>*/}
              </div>
            </div>
          </div>
        </div>
      );
    },
    ID
  );
};
export default start;
// OK
