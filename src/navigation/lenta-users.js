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
import { If, Map } from "@component/helpers/All.js";
import { SwitchLenta, Select } from "@component/element/index.js";
import { BlockLentaUsers } from "@component/blocks/index.js";

let optionsSelect, filters, showFilter;

const start = function () {
  Variable.Static.lentaFilters = {
    lang: Variable.lang.code,
    langName: Variable.lang.lang_orig,
    author: null,
  };

  let elem = [];
  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  init(
    async () => {
      elem = [];
      Variable.Static.lentaPage = "all";
      Variable.PageLentaall = await sendApi.send({
        action: "getPost",
        short: true,
        cache: true,
        name: "PageLentaall",
        limit: 15,
        filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "all"),
      });

      Variable.PageLentaphoto = await sendApi.send({
        action: "getPost",
        short: true,
        cache: true,
        name: "PageLentaphoto",
        limit: 15,
        filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "photo"),
      });

      Variable.PageLentavideo = await sendApi.send({
        action: "getPost",
        short: true,
        cache: true,
        name: "PageLentavideo",
        limit: 15,
        filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "video"),
      });

      Variable.PageLentaaudio = await sendApi.send({
        action: "getPost",
        short: true,
        cache: true,
        name: "PageLentaaudio",
        limit: 15,
        filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "audio"),
      });

      Variable.PageLentatext = await sendApi.send({
        action: "getPost",
        short: true,
        cache: true,
        name: "PageLentatext",
        limit: 15,
        filter: Helpers.getFilterLenta(Variable.Static.lentaFilters, "text"),
      });

      filters = {
        posts: {
          value: "all",
        },
      };
      showFilter = false;
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
        <div
          class={[
            Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader",
          ]}
        >
          <div class="page-content page-content--full">
            <div class="users_news">
              <div class="users_news_left">
                <div class="user_news_top">
                  <div
                    class={[
                      "c-questions__filter",
                      "c-questions__filter--openmobile",
                      "questions_filter",
                      // showFilter ? "c-questions__filter--openmobile" : null,
                    ]}
                  >
                    <Select
                      options={optionsSelect.posts}
                      callback={async function (active, nameOptions) {
                        filters[nameOptions].value = active;
                        Variable.Static.lentaFilters.author =
                          filters[nameOptions].value === "friends"
                            ? {
                              $in: Variable.myInfo.subscribed,
                            }
                            : null;

                        Variable[`PageLenta${Variable.Static.lentaPage}`] =
                          await sendApi.send({
                            action: "getPost",
                            short: true,
                            limit: 15,
                            filter: Helpers.getFilterLenta(
                              Variable.Static.lentaFilters,
                              Variable.Static.lentaPage
                            ),
                          });
                      }}
                    />
                  </div>
                  <div style="display: flex; grid-gap: 20px">
                    {/* <div class="news_category_filter">
                      <img src={svg["filter"]}
                        onClick={() => {
                          showFilter = !showFilter;
                          initReload();
                        }} />
                    </div> */}
                    <div
                      class="alt_language_change"
                      onclick={() => {
                        Variable.SetModals({
                          name: "ModalChangeLanguage",
                          data: {
                            onclick: async (langCode, langName, langOrig) => {
                              Variable.Static.lentaFilters.langName = langOrig;
                              Variable.Static.lentaFilters.lang = langCode;

                              Variable[
                                `PageLenta${Variable.Static.lentaPage}`
                              ] = await sendApi.send({
                                action: "getPost",
                                short: true,
                                limit: 15,
                                filter: Helpers.getFilterLenta(
                                  Variable.Static.lentaFilters,
                                  Variable.Static.lentaPage
                                ),
                              });
                            },
                          },
                        });
                      }}
                    >
                      {Variable.Static.lentaFilters.langName}
                    </div>
                  </div>
                </div>

                <SwitchLenta switchPage={Variable.Static.lentaPage} />

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
                         Variable[`PageLenta${Variable.Static.lentaPage}`]
                         .list_records.map((item, index) => {
                          elem[index] = [];
                          return (
                            <BlockLentaUsers
                              totalFound={
                                Variable[
                                  `PageLenta${Variable.Static.lentaPage}`
                                ].totalFound
                              }
                              item={item}
                              numIndex={index}
                              elem={elem}
                              total={
                                Variable[
                                  `PageLenta${Variable.Static.lentaPage}`
                                ].list_records.length
                              }
                            />
                          );
                        })
                      }
                    </div>
                  </div>
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one overflowNo"
                  ></div>
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one overflowNo"
                  ></div>
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one overflowNo"
                  ></div>
                  <div
                    data-touchmove="userNewsSlide"
                    data-touchstart="userNewsSlideStart"
                    data-touchend="userNewsSlideEnd"
                    class="bl_one overflowNo"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};

export default start;
