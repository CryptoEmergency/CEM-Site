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
        <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"} c-aboutus about_us_container`}>
          <div class="c-aboutus__whowe c-whowe who_we_are">
            <div class="c-whowe__inner who_we_are_inner">
              <h2 class="c-whowe__title">{Variable.lang.h.who_are_we}</h2>
              <img
                class="c-whowe__img about_us_vector-1"
                src={svg["background/about_us_vector-1"]}
              />
              {/* <p>{Variable.lang.p.preview}</p> */}
            </div>
            <div class="c-whowe__bg about_us_background_fade"></div>
          </div>
          <div class="c-aboutus__content c-container about_us_content">
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
                class="about_us_vector-2"
                src={svg["background/about_us_vector-2"]}
              />
            </div>
            <div class="road_map">
              <h2>{Variable.lang.h.road_map}</h2>
              <div class="road_map_container">
                <div class="road_map_top_dates">
                  <div class="road_map_date-1">
                    <p>{Variable.lang.p.mapDateOne}</p>
                    <div></div>
                    <span>{Variable.lang.span.mapDescOne}</span>
                  </div>
                  <div class="road_map_date-2">
                    <p>{Variable.lang.p.mapDateTwo}</p>
                    <div></div>
                    <span>{Variable.lang.span.mapDescTwo}</span>
                  </div>
                  <div class="road_map_date-3">
                    <p>{Variable.lang.p.mapDateThree}</p>

                    <div></div>
                    <span>{Variable.lang.span.mapDescFour}</span>
                  </div>
                </div>
                <img src={images["road_map"]} />
                <div class="road_map_bottom_dates">
                  <div class="road_map_date-4">
                    <p>{Variable.lang.p.mapDateFour}</p>
                    <div></div>
                    <span>{Variable.lang.span.mapDescThree}</span>
                  </div>
                  <div class="road_map_date-5">
                    <p>{Variable.lang.p.mapDateFive}</p>
                    <div></div>
                    <span>{Variable.lang.span.mapDescFive}</span>
                  </div>
                  <div class="road_map_date-6">
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
                <a
                  target="_blank"
                  href="https://www.crypto-vpn.online"
                  class="projects_item"
                >
                  <img src={images["about_us_banner7"]} />
                  <span class="project_gradient">
                    {Variable.lang.span.aboutProjectNameThree}
                  </span>
                  <p>{Variable.lang.p.aboutProjectDateThree}</p>
                </a>
                <div class="projects_item">
                  <img src={images["about_us_banner6"]} />
                  <span class="project_gradient">
                    {Variable.lang.span.aboutProjectNameTwo}
                  </span>
                  <p>{Variable.lang.p.aboutProjectDateTwo}</p>
                </div>
                <div class="projects_item">
                  <img src={images["about_us_banner8"]} />
                  <span class="project_gradient">
                    {Variable.lang.span.aboutProjectNameThree}
                  </span>
                  <p>{Variable.lang.p.aboutProjectDateThree}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
};

export default start;