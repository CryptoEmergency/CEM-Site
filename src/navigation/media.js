import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initReload,
} from "@betarost/cemjs";
// poydet
import { ButtonShowMore, NewsItem } from "@component/element/index.js";
import { api } from '@src/apiFunctions.js'

const start = function (data, ID = "mainBlock") {
  let Static = {}

  init(
    async () => {
      Static.activeCategory = Variable.lang.code
      await api({ type: "get", action: "getNews", short: true, cache: true, name: "PageMedia", filter: { type: "media", "languages.code": Static.activeCategory } })
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
                if (Static.activeCategory == "en") {
                  return;
                }
                Static.activeCategory = "en";
                await api({ type: "get", action: "getNews", short: true, name: "PageMedia", filter: { type: "media", "languages.code": Static.activeCategory } })
              }}
            >
              <span>{Variable.languages.en.lang_orig}</span>
            </div>
            {
              () => {
                if (Variable.lang.code !== "en") {
                  return (
                    <div
                      class={[
                        "tag_button",
                        Static.activeCategory != "en" ? "tag_button_active" : "",
                      ]}
                      onclick={async (e) => {
                        if (Static.activeCategory != "en") {
                          return;
                        }
                        Static.activeCategory = Variable.lang.code;
                        await api({ type: "get", action: "getNews", short: true, name: "PageMedia", filter: { type: "media", "languages.code": Static.activeCategory } })
                      }}
                    >
                      <span>{Variable.lang.lang_orig}</span>
                    </div>
                  )
                }
              }
            }
          </div>
          <div class="userNewsBlock">
            <div class="bl_one bl_active">
              <div class="blog_news">
                {
                  () => {
                    return Variable.PageMedia.list_records.map(
                      (item, index) => {
                        return (
                          <NewsItem
                            item={item}
                            index={index}
                            type={"media"}
                          />
                        );
                      }
                    )
                  }
                }
              </div>
              {
                () => {
                  if (Variable.PageMedia.list_records.length < Variable.PageMedia.totalFound) {
                    return (
                      <ButtonShowMore
                        onclick={async () => {
                          let response = await api({ type: "get", action: "getNews", short: true, filter: { type: "media", "languages.code": Static.activeCategory }, offset: Variable.PageMedia.list_records.length })
                          if (response.list_records.length) {
                            Variable.PageMedia.list_records.push(...response.list_records)
                            initReload()
                          }
                        }}
                      />
                    )
                  }
                }
              }
            </div>
          </div>
        </div>
      );
    }, ID
  );
};

export default start;
