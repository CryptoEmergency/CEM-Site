import { initReload, jsx, jsxFrag, load, CEM } from "@betarost/cemserver/cem.js";

// import { fn } from "@src/functions/index.js";
// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";

const { images, svg, fn } = CEM

const arrVoting = [
  {
    title: "Самый большой город",
    discription: "Выбери самый большой город",
    voting: ["Новороссийск", "Москва", "Краснодар"],
    active: false,
  },
  {
    title: "Твой город",
    discription: "Выбери свой любимый город ",
    voting: [
      "Новороссийск",
      "Москва",
      "Краснодар",
      "Саратов",
      "Красноярск",
      "Мяч",
    ],
    active: false,
  },
  {
    title: " Cложные предметы",
    discription: "Выбери свой любимый предмет",
    voting: [
      "История",
      "Математика",
      "Элементы высшей математики",
      "Русский язык",
      "Философия",
      "ИС",
      "БД",
      "Метрология",
      "ОС",
    ],
    active: false,
  },
  
  // {
  //   title: "Самые сложные предметы",
  //   discription: "Выбери свой любимый предмет",
  //   voting: [
  //     "История",
  //     "Математика",
  //     "Элементы высшей математики",
  //     "Русский язык",
  //     "Философия",
  //     "ИС",
  //     "БД",
  //     "Метрология",
  //     "ОС",
  //   ],
  //   active: null,
  // },
  // {
  //   title: "Самые сложные предметы",
  //   discription: "Выбери свой любимый предмет",
  //   voting: [
  //     "История",
  //     "Математика",
  //     "Элементы высшей математики",
  //     "Русский язык",
  //     "Философия",
  //     "ИС",
  //     "БД",
  //     "Метрология",
  //     "ОС",
  //   ],
  //   active: null,
  // },
  // {
  //   title: "Самые сложные предметы",
  //   discription: "Выбери свой любимый предмет",
  //   voting: [
  //     "История",
  //     "Математика",
  //     "Элементы высшей математики",
  //     "Русский язык",
  //     "Философия",
  //     "ИС",
  //     "БД",
  //     "Метрология",
  //     "ОС",
  //   ],
  //   active: null,
  // },
];

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="container-voice">
          <div>
            <h1 class="voice-title">Голосование</h1>
            <div class="btn-block">
              <button
                class={["btn", Static.checked ? "btn-checked" : null]}
                onclick={() => {
                  fn.modals.ModalAddVoting({});
                }}
              >
                Добавить опрос
              </button>
            </div>
          </div>

          <div class="wrap-voices">
            {arrVoting.map((item, index) => {
              {
                /* console.log(item, index); */
              }
              return (
                <div class="voice-inner">
                  <h3 class="name">{item.title}</h3>
                  <p class="description">{item.discription}</p>
                  <ol class="list-voice">
                    {item.voting.map((item2, index2) => {
                      {
                        /* console.log("====", item.active); */
                      }
                      return (
                        <li class="list-el">
                          <span>
                            {index2 + 1}. {item2}
                          </span>
                          <img
                            class={[
                              "img_done",
                              item.activeVoting == item2
                                ? "img_done-active"
                                : null,
                            ]}
                            src={svg.done}
                            onclick={() => {
                              // item.active = !item.active;
                              item.activeVoting = item2;
                              initReload();
                            }}
                          />
                          {/* <input type="checkbox" class="checkbox-train"></input> */}
                        </li>
                      );
                    })}
                  </ol>
                  <div class="wrap-btn">
                    <button
                      class={["btn", Static.checked ? "btn-checked" : null]}
                      onclick={() => {
                        fn.modals.ModalAddVoting({});
                      }}
                    >
                      {" "}
                      Проголосовать{" "}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    },
  });
};

export default start;
