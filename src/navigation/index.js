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
      
      Static.course = await fn.socket.get({
        method: "Course",
        // params: {
        //   filter: filterStartups.filter,
        //   sort: filterStartups.sort
        // }
      });

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
          <Elements.Line Static={Static} records={Static.course}></Elements.Line>
          {/* <BlockProjects /> */}
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
