import {
  jsx,
  jsxFrag,
  init,
  Variable
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function () {
  Variable.HeaderShow = true
  Variable.FooterShow = true

  init(
    null,
    () => {
      return (
        <div class={['c-aboutus about_us_container', Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <div class="c-aboutus__whowe c-whowe">
            <div class="c-whowe__inner">
              <h2 class="c-whowe__title"
                onclick={() => {
                  Variable.SetModals({ name: "ModalAfterRegisterForm", data: { way: "email" } })
                }}
              >
                {Variable.lang.h.who_are_we}
              </h2>
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
                    <img class="c-goals__icon" src={svg["icon/about_us_portfolio"]} />
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalOne}</p>
                    <span class="c-goals__text">{Variable.lang.p.goalOneDesc}</span>
                  </div>
                </div>
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <img class="c-goals__icon" src={svg["icon/about_us_protection"]} />
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalTwo}</p>
                    <span class="c-goals__text">{Variable.lang.p.goalTwoDesc}</span>
                  </div>
                </div>
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <img class="c-goals__icon" src={svg["icon/about_us_cryptocurrencies"]} />
                  </div>
                  <div>
                    <p class="c-goals__subtitle">{Variable.lang.p.goalThree}</p>
                    <span class="c-goals__text">{Variable.lang.p.goalThreeDesc}</span>
                  </div>
                </div>
                <div class="c-goals__item">
                  <div class="c-goals__wrap">
                    <img class="c-goals__icon" src={svg["icon/about_us_quality"]} />
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
            <div class="c-aboutus__roadmap road_map">
              <h2>{Variable.lang.h.road_map}</h2>
              <div class="c-aboutus__wrapper road_map_container">
                <div class="c-aboutus__toppart road_map_top_dates">
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
                <div class="c-aboutus__bottompart road_map_bottom_dates">
                  <div class="c-aboutus__dateitem c-aboutus__dateitem--4">
                    <p>{Variable.lang.p.mapDateFour}</p>
                    <div></div>
                    <span>{Variable.lang.span.mapDescThree}</span>
                  </div>
                  <div class="c-aboutus__dateitem c-aboutus__dateitem--5">
                    <p>{Variable.lang.p.October2022}</p>
                    <div></div>
                    <span>{Variable.lang.span.mapDescFour}</span>
                  </div>
                  <div class="c-aboutus__dateitem c-aboutus__dateitem--6">
                    <p>{Variable.lang.p.mapDateSix}</p>
                    <div></div>
                    <span>{Variable.lang.span.mapDescSix}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="projects">
              <h2>{Variable.lang.h.our_projects}</h2>
              <div class="projects_block">
                <div class="projects_item">
                  <img src={images["about_us_banner5"]} />
                  <span class="project_gradient">
                    {Variable.lang.span.aboutProjectNameOne}
                  </span>
                  <p>{Variable.lang.p.aboutProjectDateOne}</p>
                </div>
                <a class="projects_item"
                  target="_blank"
                  href="https://cemblockchain.com/"
                >
                  <img src={images["about_us_banner8"]} />
                  <span class="project_gradient">
                    Cemblockchain
                  </span>
                  <p>{Variable.lang.p.aboutProjectDate19May2022}</p>
                </a>
                <a class="projects_item"
                  target="_blank"
                  href="https://cemwallet.com/"
                >
                  <img src={images["CemWallet"]} />
                  <span class="project_gradient">
                    CEM Wallet
                  </span>
                  <p>{Variable.lang.p.aboutProjectDateAugust2022}</p>
                </a>
                <div class="projects_item">
                  <img src={images["about_us_banner6"]} />
                  <span class="project_gradient">
                    {Variable.lang.span.aboutProjectNameTwo}
                  </span>
                  <p>{Variable.lang.p.aboutProjectDateTwo}</p>
                </div>
                <div
                  class="projects_item"
                >
                  <img src={images["about_us_banner7"]} />
                  <span class="project_gradient">
                    crypto vpn
                  </span>
                  <p>{Variable.lang.p.aboutProjectDateTwo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
};
//I check
export default start;