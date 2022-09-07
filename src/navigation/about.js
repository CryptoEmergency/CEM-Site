import {
  jsx,
  jsxFrag,
  getValue,
  getVariable,
  makeDOM,
  getStorage,
  setValue
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const aboutUsView = function () {
  const lang = getVariable("languages")[getStorage("lang")];
  const show = getValue("mainHeader", "show");

  return (
    <div class={`${show ? "c-main__body" : "c-main__body--noheader"} c-aboutus about_us_container`}>
      <div class="c-aboutus__whowe c-whowe who_we_are">
        <div class="c-whowe__inner who_we_are_inner">
          <h2 class="c-whowe__title">{lang.h.who_are_we}</h2>
          <img
            class="c-whowe__img about_us_vector-1"
            src={svg["background/about_us_vector-1"]}
          />
          {/* <p>{lang.p.preview}</p> */}
        </div>
        <div class="c-whowe__bg about_us_background_fade"></div>
      </div>
      <div class="c-aboutus__content c-container about_us_content">
        <div class="c-aboutus__goals c-goals">
          <h2 class="c-goals__title">{lang.h.our_goals}</h2>
          <div class="c-goals__list">
            <div class="c-goals__item">
              <div class="c-goals__wrap">
                <img class="c-goals__icon" src={svg["icon/about_us_portfolio"]} />
              </div>
              <div>
                <p class="c-goals__subtitle">{lang.p.goalOne}</p>
                <span class="c-goals__text">{lang.p.goalOneDesc}</span>
              </div>
            </div>
            <div class="c-goals__item">
              <div class="c-goals__wrap">
                <img class="c-goals__icon" src={svg["icon/about_us_protection"]} />
              </div>
              <div>
                <p class="c-goals__subtitle">{lang.p.goalTwo}</p>
                <span class="c-goals__text">{lang.p.goalTwoDesc}</span>
              </div>
            </div>
            <div class="c-goals__item">
              <div class="c-goals__wrap">
                <img class="c-goals__icon" src={svg["icon/about_us_cryptocurrencies"]} />
              </div>
              <div>
                <p class="c-goals__subtitle">{lang.p.goalThree}</p>
                <span class="c-goals__text">{lang.p.goalThreeDesc}</span>
              </div>
            </div>
            <div class="c-goals__item">
              <div class="c-goals__wrap">
                <img class="c-goals__icon" src={svg["icon/about_us_quality"]} />
              </div>
              <div>
                <p class="c-goals__subtitle">{lang.p.goalFour}</p>
                <span class="c-goals__text">{lang.p.goalFourDesc}</span>
              </div>
            </div>
          </div>
          <img
            class="about_us_vector-2"
            src={svg["background/about_us_vector-2"]}
          />
        </div>
        <div class="road_map">
          <h2>{lang.h.road_map}</h2>
          <div class="road_map_container">
            <div class="road_map_top_dates">
              <div class="road_map_date-1">
                <p>{lang.p.mapDateOne}</p>
                <div></div>
                <span>{lang.span.mapDescOne}</span>
              </div>
              <div class="road_map_date-2">
                <p>{lang.p.mapDateTwo}</p>
                <div></div>
                <span>{lang.span.mapDescTwo}</span>
              </div>
              <div class="road_map_date-3">
                <p>{lang.p.mapDateThree}</p>

                <div></div>
                <span>{lang.span.mapDescFour}</span>
              </div>
            </div>
            <img src={images["road_map"]} />
            <div class="road_map_bottom_dates">
              <div class="road_map_date-4">
                <p>{lang.p.mapDateFour}</p>
                <div></div>
                <span>{lang.span.mapDescThree}</span>
              </div>
              <div class="road_map_date-5">
                <p>{lang.p.mapDateFive}</p>
                <div></div>
                <span>{lang.span.mapDescFive}</span>
              </div>
              <div class="road_map_date-6">
                <p>{lang.p.mapDateSix}</p>
                <div></div>
                <span>{lang.span.mapDescSix}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="projects">
          <h2>{lang.h.our_projects}</h2>
          <div class="projects_block">
            <div class="projects_item">
              <img src={images["about_us_banner5"]} />
              <span class="project_gradient">
                {lang.span.aboutProjectNameOne}
              </span>
              <p>{lang.p.aboutProjectDateOne}</p>
            </div>
            <a
              target="_blank"
              href="https://www.crypto-vpn.online"
              class="projects_item"
            >
              <img src={images["about_us_banner7"]} />
              <span class="project_gradient">
                {lang.span.aboutProjectNameThree}
              </span>
              <p>{lang.p.aboutProjectDateThree}</p>
            </a>
            <div class="projects_item">
              <img src={images["about_us_banner6"]} />
              <span class="project_gradient">
                {lang.span.aboutProjectNameTwo}
              </span>
              <p>{lang.p.aboutProjectDateTwo}</p>
            </div>
            <div class="projects_item">
              <img src={images["about_us_banner8"]} />
              <span class="project_gradient">
                {lang.span.aboutProjectNameThree}
              </span>
              <p>{lang.p.aboutProjectDateThree}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ID = "mainBlock";

const init = function (reload) {
  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  makeDOM(aboutUsView(), ID);
};

export default init;
