import {
  jsx,
  jsxFrag,
  initGo,
  getStorage,
  setStorage,
  init,
  Variable,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function () {
  let filterArrLogo, type, arrLogo;

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
          stock:[
           {
            text:"At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
            promo:"Promo1"
           }, 
           {
            text:"At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
            promo:"Promo2"
           }, 
           {
            text:"At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
            promo:"Promo3"
           }, 
          ]
        },
        {
          title: "Crypto Summit",
          description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
          type: "language",
          img: images["banners/crypto_summit"],
          stock:[
            {
             text:"At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
             promo:"Promo1"
            }, 
            {
             text:"At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
             promo:"Promo2"
            }, 
            {
             text:"At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
             promo:"Promo3"
            }, 
           ]
        },
        {
          title: "Blockchain24.pro",
          description:
            "Ведущий информационный портал о криптовалютах и технологиях blockchain",
          type: "education",
          img: images["banners/blockchain24"],
          stock:[
            {
             text:"At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
             promo:"Promo1"
            }, 
            {
             text:"At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
             promo:"Promo2"
            }, 
            {
             text:"At vero eos et accusamus et iusto odio dignissimos ducimus, blanditiis praesentium voluptatum deleniti atque corrupti, quos doloreset quas molestias excepturi sint, obcaecati cupiditate non provident,",
             promo:"Promo3"
            }, 
           ]
        },
      ];

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
          class={`${
            Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
          } c-aboutus about_us_container`}
        >
          <div class="c-university__container c-container">
            <h1 class="c-university__title" style={"padding-top: 10vw"}
            onclick ={(e) => {
              console.log('=b7c203=')
              e.stopPropagation();
              e.preventDefault();
              Variable.SetModals({
                name: "ModalContextMenu",
                data: {},
              });
            }}
            >
              Крипто университет
            </h1>
            <h3 class="c-university__promo">
              At vero eos et accusamus et iusto odio dignissimos ducimus, qui
              blanditiis praesentium voluptatum deleniti atque corrupti, quos
              dolores et quas molestias excepturi sint, obcaecati cupiditate non
              provident, similique sunt in culpa, qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio!
            </h3>
            <div class="c-university__toggles customscroll--gorizontal">
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
              </div>

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
            </div>
            <ul class="c-university__list">
              {filterArrLogo.map((item, i) => {
                return (
                  <li
                    class="c-goals__item c-universitycard"
                    style={"margin-bottom:40px"}
                    key={i}
                  >
                    <div class="c-universitycard__wrapper" style={"border-radius:18px;overflow:hidden "}>
                      <img class="c-universitycard__img" src={item.img}></img>
                    </div>
                    <div class="c-universitycard__info">
                      <h5 class="c-universitycard__title">{item.title}</h5>
                      <p class="c-universitycard__text">{item.description}</p>
                      {/* <button class="c-universitycard__btn">Подробнее</button>
                       */}
                      <div class="c-question__footer"   style={"width:25vw"} >
                        <a
                          class="c-button c-button--outline2 "
                          onclick={() => {
                            Variable.SetModals({
                              name: "ModalFullSize",
                              data: {
                                item, type: "university"
                              },
                            });
                          }}
                        >
                          <div class="c-button__wrapper">
                            Подробнее
                          </div>
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  );
};

export default start;
