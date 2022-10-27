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

const start = function () {
  let activeCategory;

  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  init(
    async () => {
      activeCategory = Variable.lang.code;
      Variable.PageMedia = await sendApi.send({
        action: "getNews",
        short: true,
        cache: true,
        name: "PageMedia",
        filter: { type: "media", "languages.code": activeCategory },
      });
    },
    () => {
      return (
        <div class="blog_page">
          <div class="blog_filter">
            <h2>{Variable.lang.h.mediaUs}</h2>
          </div>
          <div class="tags">
            <div
              class={[
                "tag_button",
                activeCategory == "en" ? "tag_button_active" : "",
              ]}
              onclick={async (e) => {
                if (activeCategory === "en") {
                  return;
                }
                activeCategory = "en";
                let filter = {
                  type: "media",
                  "languages.code": activeCategory,
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
                    activeCategory !== "en" ? "tag_button_active" : "",
                  ]}
                  onclick={async (e) => {
                    if (activeCategory != "en") {
                      return;
                    }
                    activeCategory = Variable.lang.code;
                    let filter = {
                      type: "media",
                      "languages.code": activeCategory,
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
                <If
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
                />
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
                        "languages.code": activeCategory,
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
    }
  );
};

export default start;
