import {
  jsx,
  jsxFrag,
  initGo,
  getStorage,
  setStorage,
  init,
  Variable
} from "@betarost/cemjs";


import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";














const start = function () {
  let filterArrLogo, type, arrLogo

  Variable.HeaderShow = true
  Variable.FooterShow = true


  const clickButton = (filter) => {
    setStorage('FILTER_UNIVERSITY', filter);
    type = filter
    initGo(null, true);
  }

  init(
    () => {

      arrLogo = [
        {
          title: "Crypto Emergency",
          description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expeditan distinctio!",
          type: "profession",
          img: svg["logo"],
        },
        {
          title: "Crypto Summit",
          description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
          type: "language",
          img: images["banners/crypto_summit"],
        },
        {
          title: "Blockchain24.pro",
          description:
            "Ведущий информационный портал о ккриптовалютах и технологиях blockchain",
          type: "profession",
          img: images["banners/blockchain24"],
        },
      ];

      if (!getStorage('FILTER_UNIVERSITY')) {
        setStorage('FILTER_UNIVERSITY', 'all');
        type = "all"
      } else {
        type = getStorage('FILTER_UNIVERSITY');
      }



    },
    () => {


      {
        type === "all" ? filterArrLogo = arrLogo :
          filterArrLogo = arrLogo.filter((item) =>
            item.type === type
          )
      }

      return (
        <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"} c-aboutus about_us_container`}>
          <div class="c-university__container c-container">
            <h1 class="c-university__title">Крипто университет</h1>
            <h3 class="c-university__promo">
              At vero eos et accusamus et iusto odio dignissimos ducimus, qui
              blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores
              et quas molestias excepturi sint, obcaecati cupiditate non provident,
              similique sunt in culpa, qui officia deserunt mollitia animi, id est
              laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
              distinctio!
            </h3>
            <div class="c-university__toggles customscroll--gorizontal">
              <button
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
              </button>
            </div>
            <ul class="c-university__list">
              {filterArrLogo.map((item, i) => {
                return (
                  <li class="c-university__item c-universitycard" key={i}>
                    <div class="c-universitycard__wrapper">
                      <img class="c-universitycard__img" src={item.img}></img>
                    </div>
                    <div class="c-universitycard__info">
                      <h5 class="c-universitycard__title">{item.title}</h5>
                      <p class="c-universitycard__text">
                        {item.description}
                      </p>
                      <button class="c-universitycard__btn">Подробнее</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )
    })
};

export default start;