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
        // this.classList.add("users_news_category_icon--" + addClass)
        await restApi.getPost({ name: Static.nameRecords, cache: true, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
        initReload()
      }}>
      <i class={["users_news_category_icon", Static.lentaPage == name ? "users_news_category_icon--" + addClass : "users_news_category_icon--" + addClass + "_inactive"]}
        Element={($el) => {
          Static.elToogle[name] = $el
        }}></i>
    </div>
  )
}

const start = function (data, ID) {
  Variable.Static.FooterShow = false
  let Static = {}
  Static.elMedia = {}
  Static.elToogle = {}
  Static.elShowTextFull = {}
  Static.elShowTextShort = {}
  init(
    async () => {
      Static.nameRecords = "PageLentaall";
      Static.lentaPage = "all";
      Static.lentaFilters = {
        lang: Variable.lang.code,
        langName: Variable.lang.lang_orig,
        author: null,
      };

      Static.optionsSelect = {
        posts: {
          nameOptions: "posts",
          items: [
            { text: Variable.lang.span.userNews, value: "all" },
            { text: Variable.lang.h.posts_friends, value: "friends" },
          ],
          open: false,
          active: "all",
        },
      };

      await restApi.getPost({ name: Static.nameRecords, cache: true, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
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
                        await restApi.getPost({ name: Static.nameRecords, cache: true, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
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
                              await restApi.getPost({ name: Static.nameRecords, cache: true, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
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
                      {() => {
                        if (Variable[Static.nameRecords] && Variable[Static.nameRecords].list_records.length) {
                          let changeToogle = Static.changeToogle
                          Static.changeToogle = false
                          const arrReturn = Variable[Static.nameRecords].list_records.map((item, index) => {
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
                                    let tmp = await restApi.getPost({ limit: 15, offset: Variable[Static.nameRecords].list_records.length, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
                                    Variable[Static.nameRecords].list_records.push(...tmp.list_records)
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
                          return (arrReturn)
                        } else {
                          return (
                            <NotFound />
                          )
                        }
                      }}
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
