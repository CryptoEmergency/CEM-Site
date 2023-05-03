import {
  jsx,
  jsxFrag,
  timersStart,
  sendApi,
  init,
  initReload,
  Variable,
  Helpers,
  load,
  CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from "@src/functions/index.js";
// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";
import { Select, NotFound } from "@elements/element/index.js";
import Elements from "@src/elements/export.js";

import {
  BlockUsers,
  BlockProjects,
  BlockTrade,
  BlockQuestions,
  BlockLentaUsers,
} from "@elements/blocks/index.js";
import { ButtonShowMore } from "@elements/element/index.js";

const { images, svg, fn, elements } = CEM

const makeFilter = function (Static) {
  let objReturn = {};
  switch (Static.lentaPage) {
    case "text":
      objReturn["media.type"] = { $nin: ["video", "audio", "image"] };
      break;

    case "audio":
      objReturn.$and = [
        { "media.type": "audio" },
        { "media.type": { $nin: ["video", "image"] } },
      ];
      break;

    case "video":
      objReturn.$and = [
        { "media.type": "video" },
        { "media.type": { $nin: ["audio", "image"] } },
      ];
      break;

    case "photo":
      objReturn.$and = [
        { "media.type": "image" },
        { "media.type": { $nin: ["audio", "video"] } },
      ];
      break;
  }
  if (Static.lentaFilters && Static.lentaFilters.lang) {
    objReturn["languages.code"] = Static.lentaFilters.lang;
  }
  if (Static.lentaFilters && Static.lentaFilters.author) {
    objReturn.author = Static.lentaFilters.author;
  }
  return objReturn;
};

const start = function (data, ID) {
  Variable.Static.HeaderShow = true;
  Variable.Static.FooterShow = false
  let [Static] = fn.GetParams({ data, ID, initData: "main" });

  // Variable.Static.FooterMenuShow = true;
  // test()
  // console.log("Static", Static)
  // load({
  //     ID,
  //     fnLoad: async () => {
  //         Static.mainCourse = await fn.socket.get({ cache: "mainCourse", method: "Course", params: { filter: {} } })
  //         let tmp = await fn.idb.get("CachePage", "dfhdhf")
  //         console.log('=289bbe= tmp', tmp)
  //     },
  //     fn: () => {
  //         return (
  //             <div class="c-main__body">
  //                 <Elements.MainPreview>
  //                     <Elements.MainCourse records={Static.mainCourse} />
  //                 </Elements.MainPreview>
  //                 <BlockProjects />
  //                 <div class="c-main__wrapperbg">
  //                    <div>
  //         <a target="_blank" rel="nofollow nooopener" href="https://blockchain-life.com/asia/en/#tickets-row" style="max-width: 1240px; margin: 10px auto;display: block">
  //         <img style="border-radius: 4px; width: 100%" src={images['banners/BlockchainLifeBig']} />
  //     </a>
  // </div>
  //                 </div>
  //             </div>
  //         )
  //     }
  // })

  // return
  init(
    async () => {
      let tmp = {};
      // const callback = function (res) {
      //     console.log('=9c0594 callback=', res)
      // }
      // let tmp2 = await fn.socket.get({ method: "Course", params: { filter: {} } }, tmp, callback)
      // tmp.test = await fn.socket.get({ method: "Course", params: { filter: {} } }, callback)
      // tmp.test = await fn.socket.get({ method: "Course", params: { filter: {} } }, callback)
      // tmp.test = await fn.socket.get({ method: "Course", params: { filter: {} } })
      fn.socket.get(
        { method: "Course", params: { filter: {} } },
        function (res) {
          // console.log("=9c0594 callback=", res);
          Static.mainCourse = res;
          initReload("mainBlock");
        }
      );
      // setTimeout(() => {
      //     fn.socket.get({ method: "Course", params: { filter: {} } })
      // }, 10);
      // console.log("=7f467d tmp=", Static.mainCourse);

      Static.dataUsers = {};
      Static.dataQuestions = {};
      fn.initData.users(Static.dataUsers);
      fn.initData.question(Static.dataQuestions);
      Static.dataUsers.nameRecords = "MainUsers";
      Static.dataQuestions.nameRecords = "MainQuestions";
      Static.dataExchange = { nameRecords: "MainExchanges" };
      Static.dataTrade = { nameRecords: "MainTrades" };
      Static.filters = {
        lang: {
          code: "",
          name: "all",
        },
        country: {
          code: "",
          name: "all",
        },
        group: {
          common: true,
          content: true,
          expert: true,
        },
        online: false,
      };

      Static.filtersQuestions = {
        lang: {
          code: Variable.lang.code,
          name: `${Variable.lang.lang} (${Variable.lang.lang_orig})`,
        },
        questions: {
          value: "all",
        },
        date: {
          value: "date",
        },
        desc: -1,
      };

      // Static.Rooms = fn.initData.rooms(Static)
      // await fn.restApi.getCourse({ cache: true, name: "Course", filter: {} })
      // await api({ type: "get", action: "getCourse", short: true, cache: true, name: "Course" })
      // await fn.restApi.getNews({ cache: true, name: "MainNews", filter: {} });
      // await api({ type: "get", action: "getNews", short: true, cache: true, name: "MainNews", })
      // timersStart("Course", async () => { fn.restApi.getCourse({ name: "Course", filter: {} }) }, 10000)
      fn.initData.lenta_users(Static);
      Static.apiFilter = makeFilter(Static);
      await fn.restApi.getPost({
        cache: true,
        name: Static.nameRecords,
        filter: Static.apiFilter,
        limit: 15,
      });

      timersStart({
        name: "Course",
        fn: async () => {
          fn.restApi.getCourse({ name: "Course", filter: {} });
        },
        msecond: 10000,
      });
    },
    () => {
      // if (Variable.dataUrl.adress != "summer-forum") {
      //   let firstEl = document.getElementById("jivo-iframe-container");
      //   let secondEl = document.querySelector("jdiv");
      //   if (firstEl) {
      //     firstEl.parentNode.removeChild(firstEl)
      //   }
      //   if (secondEl) {
      //     secondEl.parentNode.removeChild(secondEl)
      //   }
      // }

      return (
        <div class="c-main__body">
          <BlockProjects />
          <div class="с-preview" style="position: relative">
            {/* <img class="с-preview__lines" src={images["background/lines-preview-min"]} />
            <div class="с-preview__title">
              <img class="с-preview__bg" src={images["background/cem"]} />
              <div class="с-preview__text с-preview__text--auth"> */}
            {/* <span>{Variable.lang.homePreview.ask}</span>
            <div class="с-preview__imgblock">
                <img class="с-preview__img" src={svg.two} />
                <img class="с-preview__img" src={svg.two5} />
                {Variable.lang.homePreview.earn}
            </div> */}
            {/* </div>
            </div> */}
            {() => {
              if (Static.mainCourse && Object.keys(Static.mainCourse).length) {
                const arrReturn = Object.keys(Static.mainCourse)
                  .filter(
                    (item) =>
                      typeof Static.mainCourse[item] == "object" &&
                      item == "cem"
                  )
                  .map(function (key) {
                    let course = Static.mainCourse[key];
                    return (
                      <div class="c-currency">
                        <div class="c-currency__icon">
                          <div class={`icon-color-${key}`}>
                            <img src={`/assets/icons/coins/${key}2.svg`} />
                          </div>
                        </div>
                        <div class="c-currency__info">
                          <div class="c-currency__left">
                            <div class="c-currency__name">
                              {key.toLocaleUpperCase() + "/USDT"}
                            </div>
                            <div class="c-currency__price">
                              <span class="btcusdt_price">
                                {Helpers.numberFixWithSpaces(
                                  course.usdt,
                                  key === "cem" ? 4 : 2
                                )}
                              </span>
                            </div>
                          </div>
                          <div class="c-currency__right">
                            <div
                              class={`c-currency__percent ${course.change >= 0
                                ? " c-currency__percent--up"
                                : " c-currency__percent--down"
                                }`}
                            >
                              <img
                                src={
                                  course.change >= 0
                                    ? svg.up_arrow
                                    : svg.down_arrow
                                }
                              />
                              <span class="btcusdt_change">
                                {Helpers.numberFixWithSpaces(course.change, 2)}
                              </span>
                            </div>
                            {/* <div class="c-currency__update">24h.</div> */}
                          </div>
                        </div>
                      </div>
                    );
                  });
                return arrReturn;
              }
            }}
            <a
              href=""
              class="c-currency__all"
              onclick={() => {
                fn.modals.ModalMainPageIconsMenu()
              }}
            >
              {Variable.lang.button.show_all}
            </a>
          </div>
          <elements.sliderBanners />
          <div class="c-lenta">
            {!Variable[Static.nameRecords] ||
              !Variable[Static.nameRecords].list_records.length ? (
              <NotFound />
            ) : (
              () => {
                let changeToogle = Static.changeToogle;
                Static.changeToogle = false;
                return Variable[Static.nameRecords].list_records.map(
                  (item, index) => {
                    return (
                      <BlockLentaUsers
                        Static={Static}
                        index={index}
                        item={item}
                        showItemsMenu={true}
                        changeToogle={changeToogle}
                        ElemVisible={
                          Variable[Static.nameRecords].list_records.length <
                            Variable[Static.nameRecords].totalFound &&
                            index ==
                            Variable[Static.nameRecords].list_records.length - 5
                            ? async () => {
                              //      console.log('=0c6881=', "Load more")
                              fn.recordsView(item._id, "setPost");
                              Static.apiFilter = makeFilter(Static);
                              let response = await await fn.restApi.getPost({
                                filter: Static.apiFilter,
                                limit: 15,
                                offset:
                                  Variable[Static.nameRecords].list_records
                                    .length,
                              });
                              Variable[Static.nameRecords].list_records.push(
                                ...response.list_records
                              );
                              initReload();
                            }
                            : () => {
                              fn.recordsView(item._id, "setPost");
                            }
                        }
                      />
                    );
                  }
                );
              }
            )}
          </div>
        </div>
      );
    }
  );
};

export default start;
