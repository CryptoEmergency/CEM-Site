import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initGo,
  sendApi,
  initReload,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If, Map } from "@component/helpers/All.js";
import { ButtonShowMore, NewsItem } from "@component/element/index.js";

import { api } from '@src/apiFunctions.js'

const start = function (data, ID = "mainBlock") {

  let Static = {}

  let activeCategory;

  init(
    async () => {
      Static.activeCategory = Variable.lang.code
      await api({ type: "get", action: "getNews", short: true, cache: true, name: "PageMedia", filter: { type: "media", "languages.code": activeCategory } })
    },
    () => {
      return (
        <div class="blog_page">

          <div class="tags">
            <div
              class={[
                "tag_button",
                Static.activeCategory == "en" ? "tag_button_active" : "",
              ]}
              onclick={async (e) => {
                if (Static.activeCategory === "en") {
                  return;
                }
                Static.activeCategory = "en";
                let filter = {
                  type: "media",
                  "languages.code": Static.activeCategory,
                };
                Variable.PageMedia = await sendApi.send({
                  action: "getNews",
                  short: true,
                  filter: filter,
                });
              }}
            >
              <span>{Variable.languages.en.lang_orig}</span>
            </div>
            <If
              data={Variable.lang.code !== "en"}
              dataIf={
                <div
                  class={[
                    "tag_button",
                    Static.activeCategory !== "en" ? "tag_button_active" : "",
                  ]}
                  onclick={async (e) => {
                    if (Static.activeCategory != "en") {
                      return;
                    }
                    Static.activeCategory = Variable.lang.code;
                    let filter = {
                      type: "media",
                      "languages.code": Static.activeCategory,
                    };
                    Variable.PageMedia = await sendApi.send({
                      action: "getNews",
                      short: true,
                      filter: filter,
                    });
                  }}
                >
                  <span>{Variable.lang.lang_orig}</span>
                </div>
              }
            />
          </div>
          <div class="userNewsBlock">
            <div class="bl_one bl_active">
              <div class="blog_news">

                {() => {
                  if (Variable.PageMedia.totalFound === 0) {
                    return (
                      <div class="nothing_found">
                        <img src={svg["partner-list_icon"]} />
                        <p>{Variable.lang.p.notFound} </p>
                      </div>
                    )
                  }

                  return Variable.PageMedia.list_records.map((item, index) => {
                    return (
                      <NewsItem item={item} index={index} type={"media"} />
                    );
                  })
                }}
                {/* <If
                  data={Variable.PageMedia.totalFound === 0}
                  dataIf={
                    <div class="nothing_found">
                      <img src={svg["partner-list_icon"]} />
                      <p>{Variable.lang.p.notFound} </p>
                    </div>
                  }
                  dataElse={
                      Variable.PageMedia.list_records.map((item, index) => {
                            return (
                              <NewsItem item={item} index={index} type={"media"} />
                            );
                          })
                    
                  }
                /> */}
              </div>
              <If
                data={
                  Variable.PageMedia.list_records.length <
                  Variable.PageMedia.totalFound
                }
                dataIf={
                  <ButtonShowMore
                    onclick={async () => {
                      let filter = {
                        type: "media",
                        "languages.code": Static.activeCategory,
                      };
                      let tmp = await sendApi.send({
                        action: "getNews",
                        short: true,
                        filter: filter,
                        offset: Variable.PageMedia.list_records.length,
                      });
                      Variable.PageMedia.list_records.push(...tmp.list_records);
                      initReload();
                    }}
                  />
                }
              />
            </div>
          </div>
        </div>
      );
    }, ID
  );
};

export default start;
