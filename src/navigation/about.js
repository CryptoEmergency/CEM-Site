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
      title: "Cem Wallet",
      link: "https://cemwallet.com/",
      // src: images["CemWallet"],
      src: images["w1"],
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
          // class="c-aboutus"
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
              title={Variable.lang.h.our_goals}
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
                title={Variable.lang.h.our_team}
              >
                <Elements.Team records={team} />
              </Elements.page.Container>
            </Elements.page.Container>

            <Elements.page.Container
              resetClass={true}
              title={<h2 class="mb--50">{Variable.lang.h.road_map}</h2>}
            >
              <Elements.Roadmap records={roadmap} />
            </Elements.page.Container>

            <Elements.page.Container
              class={"indexZ--2"}
              resetClass={true}
              title={Variable.lang.h.our_projects}
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
