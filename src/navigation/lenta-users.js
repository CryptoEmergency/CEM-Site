import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initReload,
  Helpers,
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import { restApi } from '@src/apiFunctions.js'
import { Select, NotFound } from "@component/element/index.js";
import { BlockLentaUsers, BlockShowLenta } from "@component/blocks/index.js";

const ToogleItem = function ({ Static, name }) {
  let addClass = "news_" + name
  if (name == "all") { addClass = "all" }
  return (
    <div
      class="users_news_category"
      onClick={async function () {
        if (Static.lentaPage == name) { return }
        Static.lentaPage = name
        Static.nameRecords = "PageLenta" + name;
        Static.changeToogle = true
        Static.elMedia = {}
        Static.elShowTextFull = {}
        Static.elShowTextShort = {}

        Static.secondComment = {
          rows: 1,
          adaptive: 4,
        }
        Static.apiFilter = makeFilter(Static)
        await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
        initReload()
      }}>
      <i class={["users_news_category_icon", Static.lentaPage == name ? "users_news_category_icon--" + addClass : "users_news_category_icon--" + addClass + "_inactive"]}
        Element={($el) => {
          Static.elToogle[name] = $el
        }}></i>
    </div>
  )
}

const makeFilter = function (Static) {
  let objReturn = {}

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
    objReturn["languages.code"] = Static.lentaFilters.lang
  }

  if (Static.lentaFilters && Static.lentaFilters.author) {
    objReturn.author = Static.lentaFilters.author
  }

  return objReturn
}
const start = function (data, ID) {
  Variable.Static.FooterShow = false
  let [Static] = fn.GetParams({ data, ID })

  // let Static = {}

  init(
    async () => {
      fn.initData.lenta_users(Static)
      Static.apiFilter = makeFilter(Static)
      await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
    },
    () => {
      return (
        <div class="c-main__body">
          <div class="page-content page-content--full">
            <div class="users_news">
              <div class="users_news_left">
                <div class="user_news_top">
                  <div class="c-questions__filter c-questions__filter--openmobile questions_filter">
                    <Select
                      options={Static.optionsSelect.posts}
                      callback={async function (active, nameOptions) {
                        Static.optionsSelect[nameOptions].active = active;
                        if (active == "friends") {
                          Static.lentaFilters.author = { $in: Variable.myInfo.subscribed }
                        } else {
                          Static.lentaFilters.author = null
                        }
                        Static.changeToogle = true
                        Static.apiFilter = makeFilter(Static)
                        await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                      }}
                    />
                  </div>
                  <div style="display: flex; grid-gap: 20px">
                    <div
                      class="alt_language_change"
                      onclick={() => {
                        Variable.SetModals({
                          name: "ModalChangeLanguage", data: {
                            onclick: async (langCode, langName, langOrig) => {
                              Static.lentaFilters.langName = langOrig;
                              Static.lentaFilters.lang = langCode;
                              Static.changeToogle = true
                              Static.apiFilter = makeFilter(Static)
                              await fn.restApi.getPost({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 15 })
                            },
                          },
                        });
                      }}>
                      {Static.lentaFilters.langName}
                    </div>
                  </div>
                </div>
                <div class="users_news_categories">
                  <ToogleItem Static={Static} name="all" />
                  <ToogleItem Static={Static} name="photo" />
                  <ToogleItem Static={Static} name="video" />
                  <ToogleItem Static={Static} name="audio" />
                  <ToogleItem Static={Static} name="text" />
                </div>
                <div class="userNewsBlock">
                  <div class="bl_one bl_active">
                    <div class="user_news_block">
                      {
                        !Variable[Static.nameRecords] || !Variable[Static.nameRecords].list_records.length
                          ?
                          <NotFound />
                          :

                          () => {
                            let changeToogle = Static.changeToogle
                            Static.changeToogle = false
                            return Variable[Static.nameRecords].list_records.map((item, index) => {
                              return (
                                <BlockLentaUsers
                                  Static={Static}
                                  index={index}
                                  item={item}
                                  showItemsMenu={true}
                                  changeToogle={changeToogle}
                                  ElemVisible={Variable[Static.nameRecords].list_records.length < Variable[Static.nameRecords].totalFound && index == (Variable[Static.nameRecords].list_records.length - 5) ?
                                    async () => {
                                      console.log('=0c6881=', "Load more")
                                      fn.recordsView(item._id, "setPost")
                                      Static.apiFilter = makeFilter(Static)
                                      let response = await await fn.restApi.getPost({ filter: Static.apiFilter, limit: 15, offset: Variable[Static.nameRecords].list_records.length })
                                      Variable[Static.nameRecords].list_records.push(...response.list_records)
                                      initReload()
                                    }
                                    :
                                    () => {
                                      fn.recordsView(item._id, "setPost")
                                    }
                                  }
                                />
                              );
                            })
                          }

                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }, ID
  );
};
export default start;
// OK