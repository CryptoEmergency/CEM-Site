import {
  jsx,
  jsxFrag,
  sendApi,
  Variable,
  init,
  initReload,
  Helpers,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'
import { Select } from "@component/element/index.js";
import { BlockLentaUsers } from "@component/blocks/index.js";

let optionsSelect, filters;
const start = function (data, ID) {
  let Static = {}



  let elem = [];


  init(
    async () => {

      Static.lentaPage = "all";
      Static.showFilter = false;
      Static.nameRecords = "PageLentaall";

      Static.lentaFilters = {
        lang: Variable.lang.code,
        langName: Variable.lang.lang_orig,
        author: null,
      };


      Static.filters = {
        posts: {
          value: "all",
        },
      };

      Static.optionsSelect = {
        posts: {
          nameOptions: "posts",
          items: [
            { text: Variable.lang.span.userNews, value: "all" },
            { text: Variable.lang.h.posts_friends, value: "friends" },
          ],
          open: false,
          active: Static.filters.posts.value,
        },
      };



      await api({ type: "get", action: "getPost", short: true, cache: true, name: Static.nameRecords, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })

      // Variable.PageLentaall = await sendApi.send({
      //   action: "getPost",
      //   short: true,
      //   cache: true,
      //   name: "PageLentaall",
      //   limit: 15,
      //   filter: Helpers.getFilterLenta(Static.lentaFilters, "all"),
      // });


      filters = {
        posts: {
          value: "all",
        },
      };
      optionsSelect = {
        posts: {
          nameOptions: "posts",

          items: [
            { text: Variable.lang.span.userNews, value: "all" },
            { text: Variable.lang.h.posts_friends, value: "friends" },
          ],
          open: false,
          active: filters.posts.value,
        },
      };

    },

    () => {
      return (
        <div class="c-main__body">
          <div class="page-content page-content--full">
            <div class="users_news">
              <div class="users_news_left">
                <div class="user_news_top">
                  <div
                    class={[
                      "c-questions__filter",
                      "c-questions__filter--openmobile",
                      "questions_filter",
                      // Static.showFilter ? "c-questions__filter--openmobile" : null,
                    ]}
                  >
                    <Select
                      options={Static.optionsSelect.posts}
                      callback={async function (active, nameOptions) {
                        Static.filters[nameOptions].value = active;
                        Static.lentaFilters.author =
                          Static.filters[nameOptions].value === "friends"
                            ? {
                              $in: Variable.myInfo.subscribed,
                            }
                            : null;

                        Variable[`PageLenta${Static.lentaPage}`] =
                          await sendApi.send({
                            action: "getPost",
                            short: true,
                            limit: 15,
                            filter: Helpers.getFilterLenta(
                              Static.lentaFilters,
                              Static.lentaPage
                            ),
                          });
                      }}
                    />
                  </div>
                  <div style="display: flex; grid-gap: 20px">
                    <div
                      class="alt_language_change"
                      onclick={() => {
                        Variable.SetModals({
                          name: "ModalChangeLanguage",
                          data: {
                            onclick: async (langCode, langName, langOrig) => {
                              Static.lentaFilters.langName = langOrig;
                              Static.lentaFilters.lang = langCode;

                              Variable[
                                `PageLenta${Static.lentaPage}`
                              ] = await sendApi.send({
                                action: "getPost",
                                short: true,
                                limit: 15,
                                filter: Helpers.getFilterLenta(
                                  Static.lentaFilters,
                                  Static.lentaPage
                                ),
                              });
                            },
                          },
                        });
                      }}
                    >
                      {Static.lentaFilters.langName}
                    </div>
                  </div>
                </div>

                {/* <SwitchLenta switchPage={Static.lentaPage} /> */}

                <div class="users_news_categories">
                  <div
                    class={['users_news_category']}
                    onClick={async () => {
                      if (Static.lentaPage == "all") {
                        return
                      }
                      Static.lentaPage = "all"
                      Static.nameRecords = "PageLentaall";
                      await api({ type: "get", action: "getPost", short: true, cache: true, name: Static.nameRecords, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
                      initReload()
                    }}>
                    <i class={["users_news_category_icon", Static.lentaPage == "all" ? "users_news_category_icon--all" : "users_news_category_icon--all_inactive"]}></i>
                  </div>

                  <div
                    class={['users_news_category']}
                    onClick={async () => {
                      if (Static.lentaPage == "photo") {
                        return
                      }
                      Static.lentaPage = "photo"
                      Static.nameRecords = "PageLentaphoto";
                      await api({ type: "get", action: "getPost", short: true, cache: true, name: Static.nameRecords, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
                      initReload()
                    }}>
                    <i class={["users_news_category_icon", Static.lentaPage == "photo" ? "users_news_category_icon--news_photo" : "users_news_category_icon--news_photo_inactive"]}></i>
                  </div>

                  <div
                    data-type="video"
                    class={['users_news_category']}
                    onClick={async () => {
                      if (Static.lentaPage == "video") {
                        return
                      }
                      Static.lentaPage = "video"
                      Static.nameRecords = "PageLentavideo";
                      await api({ type: "get", action: "getPost", short: true, cache: true, name: Static.nameRecords, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
                      initReload()
                    }}>
                    <i class={["users_news_category_icon", Static.lentaPage == "video" ? "users_news_category_icon--news_video" : "users_news_category_icon--news_video_inactive"]}></i>
                  </div>

                  <div
                    data-type="audio"
                    class={['users_news_category']}
                    onClick={async () => {
                      if (Static.lentaPage == "audio") {
                        return
                      }
                      Static.lentaPage = "audio"
                      Static.nameRecords = "PageLentaaudio";
                      await api({ type: "get", action: "getPost", short: true, cache: true, name: Static.nameRecords, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
                      initReload()
                    }}>
                    <i class={["users_news_category_icon", Static.lentaPage == "audio" ? "users_news_category_icon--news_audio" : "users_news_category_icon--news_audio_inactive"]}></i>
                  </div>

                  <div
                    data-type="text"
                    class={['users_news_category']}
                    onClick={async () => {
                      if (Static.lentaPage == "text") {
                        return
                      }
                      Static.lentaPage = "text"
                      Static.nameRecords = "PageLentatext";
                      await api({ type: "get", action: "getPost", short: true, cache: true, name: Static.nameRecords, limit: 15, filter: Helpers.getFilterLenta(Static.lentaFilters, Static.lentaPage) })
                      initReload()
                    }}>
                    <i class={["users_news_category_icon", Static.lentaPage == "text" ? "users_news_category_icon--news_text" : "users_news_category_icon--news_text_inactive"]}></i>
                  </div>
                </div>



                <div class="userNewsBlock">
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one bl_active"
                  >
                    <div
                      class="user_news_block"
                    // After={() => {
                    //   swiperGo()
                    // }}
                    >
                      {
                        Variable[`PageLenta${Static.lentaPage}`]
                          .list_records.map((item, index) => {
                            elem[index] = [];

                            return (
                              <BlockLentaUsers
                                totalFound={
                                  Variable[
                                    `PageLenta${Static.lentaPage}`
                                  ].totalFound
                                }
                                item={item}
                                numIndex={index}
                                elem={elem}
                                total={
                                  Variable[
                                    `PageLenta${Static.lentaPage}`
                                  ].list_records.length
                                }
                              />
                            );
                          })
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
