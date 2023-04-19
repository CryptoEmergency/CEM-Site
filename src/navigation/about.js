import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
  load,
  CEM
} from "@betarost/cemserver/cem.js";
// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

import { Particles } from "@src/elements/htmlElements/index.js";

// import { AboutAnimation } from "@src/elements/blocks/AboutAnimation";

const { images, svg } = CEM

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
  const arrSocials = [
    {
      link: "https://t.me/cryptoemergencychat",
      icon: "telegram",
      name: "Telegram",
      lang: "ru"
    },
    {
      link: "https://t.me/emergencycrypto",
      icon: "telegram",
      name: "Telegram",
      lang: "gb"
    },
    {
      link: "https://instagram.com/cryptoemergency",
      icon: "instagram",
      name: "Instagram",
      lang: "ru"

    },
    {
      link: "https://instagram.com/cryptoemergency",
      icon: "instagram",
      name: "Instagram",
      lang: "gb"
    },
    {
      link: "https://www.tiktok.com/@cryptoemergencyrussia",
      icon: "tiktok_icon",
      name: "Tiktok",
      lang: "ru"
    },
    {
      link: "https://vm.tiktok.com/ZSefExJrr",
      icon: "tiktok_icon",
      name: "Tiktok",
      lang: "gb"
    },
    {
      link: "https://youtube.com/channel/UCb9Fx-fN",
      icon: "youtube_icon",
      name: "Youtube",
      lang: "ru"
    },
    {
      link: "https://www.facebook.com/groups/crypt",
      icon: "facebook_icon",
      name: "Facebook",
      lang: "gb"
    },
    {
      link: "https://vk.com/club209389938",
      icon: "vk_icon",
      name: "Vk",
      lang: "ru"
    },
    {
      link: "https://twitter.com/cryptoemergency",
      icon: "twitter",
      name: "Twitter",
      lang: "gb"
    }
  ];
  const projectS = [{
    link: "https://duma.network/",
    icon: "logo-preload",
    name: "Duma",
    opis: "Инструмент для инвесторов. Исследования, аналитика, безопасный вклад любой суммы, разделение SAFT и продажа через платформу.",
    images: true
  },
  {
    link: "https://cemblockchain.com",
    icon: "cem_logo",
    name: "Blockchain",
    opis: "Crypto Emergency — общедоступная блокчейн-платформа с открытым исходным кодом, низкими комиссиями и отличной поддержкой продуктов."
  },
  {

    link: "https://cemscan.com",
    icon: "cem_logo",
    name: "Block Explorer",
    opis: "Визуализации блоков, истории транзакций и показателей блокчейна Crypto Emergency.",
  },
  {
    link: "https://cemwallet.com/",
    icon: "wallet_icon",
    name: "Cem Wallet",
    opis: "CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet"
  }
  ];
  const sait_small = [{

    link: "https://sberunity.ru/profile/879d88aa-4729-4788-a541-20cc8cc3cb14",
    icon: "sber",
    name: "Сбер Unity",
    opis: "Платформу для взаимодействия инвесторов и стартапов Инвесторы могут оставлять запросы, а стартапы напрямую откликаться на них.",
    //small: true
  },
  {
    link: "https://chainlist.org/chain/193",
    icon: "chainList",
    name: "ChainList",
    opis: "Chainlist — это список сетей EVM. Пользователи могут использовать эту информацию для подключения своих кошельков и поставщиков промежуточного программного обеспечения Web3 к соответствующему идентификатору цепочки и идентификатору сети для подключения к правильной цепочке."
  },

  {
    link: "https://github.com/CryptoEmergency",
    icon: "github_icon",
    name: "Github",
    opis: "крупнейший веб-сервис для хостинга IT-проектов и их совместной разработки.",
    //small: true

  }];

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
            //title={Variable.lang.h.our_projects}
            >

              <div class="block-section social">
                <h3 class="H3">Социальные сети</h3>
                <div class="btns-wrap-1">
                  {
                    arrSocials.map((item, index) => {
                      console.log('=c559f5=', item.images)
                      return (
                        <a href={item.link} class="btn-item" target="_blank">
                          <img class="btn-item_img" src={!item.images ? svg[`train/${item.icon}`] : images[item.icon]} alt={item.name} />
                          <span>{item.name}</span>
                          {/* <img class="btn-item_img-flag" src={svg['train/' + item.lang]} alt="Flag" /> */}
                          <img class="btn-item_img-flag" src={`/assets/icons/flagsnew/${item.lang}.svg`} alt="Flag" />
                        </a>



                      )
                    })
                  }
                </div>
              </div>
              <div class="block-section-2">

                <h4 class="H3">Наши проекты</h4>
                <div class="btns-wrap-2">
                  {
                    projectS.map((item) => {
                      console.log('=c559f5=', item.link)
                      return (
                        <a
                          href={item.link}
                          class="btn-item-2"
                          target="_blank"
                        >
                          {/* <img class="btn-item_img-2" src={!item.images ? svg[`train/${item.icon}`] : images[item.icon]} alt={item.name} /> */}
                          <span class="SP2">{item.name}

                            <p class="p1">
                              <img class="btn-item_img-2" src={!item.images ? svg[`train/${item.icon}`] : images[item.icon]} alt={item.name} />
                              {item.opis}
                            </p>
                          </span>

                        </a>
                      )
                    })
                  }

                </div>



              </div>
              <div class="block-section-2">
                <h4 class="H3">Ссылки</h4>
                <div class="btns-wrap-2 btns-wrap-small">
                  {sait_small.map((item) => {
                    console.log('=c559f5=', item.link)
                    return (
                      <a class="btn-small btn-item-2" href={item.link} target="_blank">
                        <img class="btn-item_img-2" src={!item.imeges ? svg[`train/${item.icon}`] : images[item.icon]}></img>
                        <div class="decs">
                          <h5 class="H5">{item.name}</h5>
                          <p class="p1">

                            {item.opis}</p>
                        </div>
                      </a>
                    )
                  })
                  }

                </div>
              </div>
              <div class="block-section-3">

                <h5 class="H3">Мобильные приложения</h5>
                <div class="btns-wrap-3">


                  <div class="btn-item-3">
                    <h5 class="H5">Crypto Emergency
                      <p class="P2">
                        <img class="btn-item_img-3" src={svg['cem_logo']} alt="Telegram" />
                        Crypto Emergency – крипто социальная сеть, основанная на собственном блокчейне, имеющая огромную экосистему из разнообразных продуктов.Здесь можно найти криптоэкспертов из любой страны, на любом языке и обучиться у них криптомастерству: что такое блокчейн, что такое криптовалюта, как это работает, как на этом зарабатывать, как создать свой криптостартап и получить другие советы.
                      </p>
                    </h5>
                    <div class="apps-wrap">
                      <a href="https://play.google.com/store/apps/details?id=com.cryptoemergency&hl=en&gl=US" class="go-apps" target="_blank">
                        <img src={svg['googleplay']}></img>
                      </a>
                      <a href="https://apps.apple.com/ru/app/crypto-emergency/id1635628021" class="go-apps" target="_blank">
                        <img src={svg['appstore']}></img>
                      </a>
                    </div>

                  </div>

                  <a href="https://play.google.com/store/apps/details?id=com.cemwallet&hl=en&gl=US" class="btn-item-3" target="_blank">
                    <h5 class="H5">CEM Wallet
                      <p class="P2">
                        <img class="btn-item_img-3" src={svg['cem_logo']} alt="Telegram" />
                        CEM Wallet - официальный криптовалютный кошелек Crypto Emergency. Отправляйте и получайте CEM и многие другие криптовалюты с помощью мобильного приложения CEM Wallet
                      </p>
                    </h5>
                    <div class="apps-wrap">
                      <a href="https://play.google.com/store/apps/details?id=com.cemwallet&hl=en&gl=US" class="go-apps" target="_blank">
                        <img src={svg['googleplay']}></img>
                      </a>
                      <a href="https://apps.apple.com/ru/app/cem-wallet/id1637300554" class="go-apps" target="_blank">
                        <img src={svg['appstore']}></img>
                      </a>
                    </div>
                  </a>


                </div>
              </div>
              {/* <Elements.projects.Project
                records={projects}
                title={projects.title}
                link={projects.link}
                scr={projects.src}
              /> */}

            </Elements.page.Container>
            <Elements.page.Container
              class={"c-aboutus__donats"}
              resetClass={true}
            >
              <a href="https://www.donationalerts.com/r/crypto_emergency" rel="nofollow nooopener" target="_blank" class="c-button c-button--icon">
                <img class="c-button__image" src={svg.donationalerts} width="37" height="43" />
                <span class="c-button__text">{Variable.lang.span.supportProject}</span>
              </a>
            </Elements.page.Container>
          </Elements.page.Container>
        </Elements.page.MainContainer>
      );
    },
  });
};

export default start;
