import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
  load,
} from "@betarost/cemserver/cem.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

import { Particles } from "@src/component/htmlElements/index.js";

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

const start = function (data, ID) {
  // setTimeout(() => {
  //   arrAccordeon[0].element.hidden = true;
  //   // console.log("=7c6bf4=", arrAccordeon[0]);
  // }, 5000);

  const arrAccordeon = [
    {
      title: Variable.lang.p.aboutQuestionOne,
      description: Variable.lang.p.aboutAnswerOne,
      hidden: false,
    },
    {
      title: Variable.lang.p.aboutQuestionTwo,
      description: Variable.lang.p.aboutAnswerTwo,
      hidden: true,
    },
    {
      title: Variable.lang.p.aboutQuestionThree,
      description: Variable.lang.p.aboutAnswerThree,
      hidden: true,
    },
    {
      title: Variable.lang.p.aboutQuestionFour,
      description: Variable.lang.p.aboutAnswerFour,
      hidden: true,
    },
    {
      title: Variable.lang.p.aboutQuestionFive,
      description: Variable.lang.p.aboutAnswerFive,
      hidden: true,
    },
  ];

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

  const projects = [
    {
      title: Variable.lang.span.aboutProjectNameOne,
      link: "",
      src: images["about_us_banner5"],
    },
    {
      title: "Cemblockchain",
      link: "https://cemblockchain.com/",
      src: images["about_us_banner8"],
    },
    {
      title: Variable.lang.span.aboutProjectNameOne,
      link: "https://cemwallet.com/",
      src: images["CemWallet"],
    },
  ];

  const roadmap = [
    {
      date: Variable.lang.p.mapDateOne,
      description: Variable.lang.span.mapDescOne,
      src: svg["roadmap/turn-left1"],
    },
    {
      date: Variable.lang.p.mapDateTwo,
      description: Variable.lang.span.mapDescTwo,
      src: svg["roadmap/turn-right2"],
    },
    {
      date: Variable.lang.p.mapDateThree,
      description: Variable.lang.span.mapDescThree,
      src: svg["roadmap/turn-left3"],
    },
    {
      date: Variable.lang.p.mapDateFour,
      description: Variable.lang.span.mapDescFour,
      src: svg["roadmap/turn-right4"],
    },
    {
      date: Variable.lang.p.mapDateFive,
      description: Variable.lang.span.mapDescFive,
      src: svg["roadmap/turn-left5"],
    },
    {
      date: Variable.lang.p.mapDateSix,
      description: Variable.lang.span.mapDescSix,
      src: svg["roadmap/turn-right6"],
    },
    {
      date: Variable.lang.p.mapDateSeven,
      description: Variable.lang.span.mapDescSeven,
      src: svg["roadmap/turn-left7"],
    },
  ];

  load({
    ID,
    fn: () => {
      return (
        <Elements.page.MainContainer
          class="c-aboutus"
          header={
            <Elements.page.Header
              imgBack={svg["background/about_us_vector-1"]}
              title="Crypto Emergency"
              descriptions={Variable.lang.p.aboutObjective}
              classBack="c-whowe__bg"
            />
          }
        >
          {/* <div class="c-aboutus about_us_container c-main__body"> */}

          {/* <Particles></Particles> */}

          <Elements.page.Container
            class={["c-aboutus__content", "c-container"]}
            resetClass={true}
          >
            <Elements.page.Container
              class={["c-aboutus__goals", "c-goals"]}
              resetClass={true}
              title={
                <h2 class="c-goals__title">{Variable.lang.h.our_goals}</h2>
              }
              backSeat={{
                src: svg["background/about_us_vector-2"],
                class: "c-whowe__img c-whowe__img--right",
              }}
            >
              <Elements.cards.Animated records={arrBlockCard} />

              <Elements.Accordeon records={arrAccordeon} />

              <Elements.page.Container
                class={["team"]}
                resetClass={true}
                title={
                  <h2 class="startap-title">{Variable.lang.h.our_team}</h2>
                }
              >
                <Elements.Team records={team} />
              </Elements.page.Container>
            </Elements.page.Container>

            <Elements.page.Container
              class={"c-aboutus__roadmap"}
              resetClass={true}
              title={<h2>{Variable.lang.h.road_map}</h2>}
            >
              {/* <Elements.Roadmap records={roadmap} /> */}
            </Elements.page.Container>

            <div class="roadmap-wrap">
              <div class="roadmap_item roadmap_item--0">
                <div class="item-card item-card--0">
                  <span class="year year--0">
                    {Variable.lang.span.mapDescOne}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateOne}</p>
                </div>

                <div class="turn turn-0">
                  <img
                    alt={Variable.lang.span.mapDescOne}
                    src={svg["roadmap/turn-left1"]}
                  ></img>
                </div>
              </div>

              <div class="roadmap_item roadmap_item--1">
                <div class="item-card item-card--0">
                  <span class="year year--1">
                    {Variable.lang.span.mapDescTwo}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateTwo}</p>
                </div>

                <div class="turn turn-1">
                  <img
                    alt={Variable.lang.span.mapDescTwo}
                    src={svg["roadmap/turn-right2"]}
                  ></img>
                </div>
              </div>

              <div class="roadmap_item roadmap_item--1">
                <div class="item-card item-card--0">
                  <span class="year year--2">
                    {Variable.lang.span.mapDescThree}
                  </span>
                  <p class="desc">{Variable.lang.p.mapDateThree}</p>
                </div>

                <div class="turn turn-2">
                  <img
                    alt={Variable.lang.span.mapDescThree}
                    src={svg["roadmap/turn-left3"]}
                  ></img>
                </div>
              </div>

              {/* 

              

              <div class="roadmap_item roadmap_item--3">
                <span class="year year--3">
                  {Variable.lang.span.mapDescFour}
                </span>
                <p class="desc">{Variable.lang.p.mapDateFour}</p>
              </div>

              <div class="turn turn-3">
                <img
                  alt={Variable.lang.span.mapDescFour}
                  src={svg["roadmap/turn-right4"]}
                ></img>
              </div>

              <div class="roadmap_item roadmap_item--4">
                <span class="year year--4">
                  {Variable.lang.span.mapDescFive}
                </span>
                <p class="desc">{Variable.lang.p.mapDateFive}</p>
              </div>

              <div class="turn turn-4">
                <img
                  alt={Variable.lang.span.mapDescFive}
                  src={svg["roadmap/turn-left5"]}
                ></img>
              </div>

              <div class="roadmap_item roadmap_item--5">
                <span class="year year--5">
                  {Variable.lang.span.mapDescSix}
                </span>
                <p class="desc">{Variable.lang.p.mapDateSix}</p>
              </div>

              <div class="turn turn-5">
                <img
                  alt={Variable.lang.span.mapDescSix}
                  src={svg["roadmap/turn-right6"]}
                ></img>
              </div>

              <div class="roadmap_item roadmap_item--6">
                <span class="year year--6">
                  {Variable.lang.span.mapDescSeven}
                </span>
                <p class="desc">{Variable.lang.p.mapDateSeven}</p>
              </div>

              <div class="turn turn-6">
                <img
                  alt={Variable.lang.span.mapDescSeven}
                  src={svg["roadmap/turn-left7"]}
                ></img>
              </div> */}
            </div>

            <Elements.page.Container
              class={"c-aboutus__projects"}
              resetClass={true}
              title={<h2>{Variable.lang.h.our_projects}</h2>}
            >
              <Elements.projects.Project
                records={projects}
                title={projects.title}
                link={projects.link}
                scr={projects.src}
              />
            </Elements.page.Container>
          </Elements.page.Container>
        </Elements.page.MainContainer>
      );
    },
  });
};

export default start;
