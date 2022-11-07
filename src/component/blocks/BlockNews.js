import {
  jsx,
  jsxFrag,
  Helpers,
  Variable,
  initReload,
  initOne
} from "@betarost/cemjs";
// check
import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'
import { NotFound, ButtonShowMore } from "@component/element/index.js";

const BlockNews = async function ({ nameRecords, type, Static }) {
  await initOne(
    async () => {
      let filter = { type }
      if (type == "media") {
        filter["languages.code"] = Static.lang
      } else {
        await api({ type: "get", action: "getCategories", short: true, cache: true, name: nameRecords + "Category", filter })
      }
      await api({ type: "get", action: "getNews", short: true, cache: true, name: nameRecords, filter })
    }
  )
  return (
    <div class="blog_page">
      {
        () => {
          if (type == "media") {
            return (
              <div class="tags">
                <div
                  class={[
                    "tag_button",
                    Static.lang == "en" ? "tag_button_active" : "",
                  ]}
                  onclick={async (e) => {
                    if (Static.lang == "en") {
                      return;
                    }
                    Static.lang = "en";
                    await api({ type: "get", action: "getNews", short: true, name: nameRecords, filter: { type, "languages.code": Static.lang } })
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
                            Static.lang != "en" ? "tag_button_active" : "",
                          ]}
                          onclick={async (e) => {
                            if (Static.lang != "en") {
                              return;
                            }
                            Static.lang = Variable.lang.code;
                            await api({ type: "get", action: "getNews", short: true, name: nameRecords, filter: { type, "languages.code": Static.lang } })
                          }}
                        >
                          <span>{Variable.lang.lang_orig}</span>
                        </div>
                      )
                    }
                  }
                }
              </div>
            )
          } else {
            return (
              <div class="tags">
                <div
                  class={['tag_button', Static.activeCategory == "All" ? 'tag_button_active' : null]}
                  onclick={async () => {
                    if (Static.activeCategory == "All") {
                      return
                    }
                    Static.activeCategory = "All"
                    await api({ type: "get", action: "getNews", short: true, name: nameRecords, filter: { type } })
                  }}
                >
                  <span>{Variable.lang.categoryName.all}</span>
                </div>
                {() => {
                  return Variable[nameRecords + "Category"].list_records.filter((item) => item.name !== null).map((item) => {
                    return (
                      <div
                        class={['tag_button', Static.activeCategory == item.name ? 'tag_button_active' : null]}
                        onclick={async () => {
                          if (Static.activeCategory == item.name) {
                            return
                          }
                          Static.activeCategory = item.name
                          await api({ type: "get", action: "getNews", short: true, name: nameRecords, filter: { type, "category.name": Static.activeCategory } })
                        }}
                      >
                        <span>{Variable.lang.categoryName[item.name]}</span>
                      </div>
                    )
                  })
                }}
              </div>
            )
          }
        }
      }
      <div class="userNewsBlock">
        <div class="bl_one bl_active">
          <div class="blog_news">
            {
              () => {
                if (Variable[nameRecords] && Variable[nameRecords].list_records && Variable[nameRecords].list_records.length) {
                  const arrReturn = Variable[nameRecords].list_records.map(
                    (item, index) => {
                      return (
                        <a
                          class="blog_news_item"
                          href={`/${type}/show/${item._id}`}
                          onclick={(e) => { Helpers.siteLinkModal(e, { title: Helpers.sliceString(item.title, 85), item }) }} >
                          <img src={"/assets/upload/news/" + item.image} />
                          <p class="blog_new_title">{Helpers.sliceString(item.title, 85)}</p>
                          <span class="blog_new_text">{Helpers.sliceString(item.preview, 170)}</span>
                          <div
                            style="display: flex!important;"
                            class="blog_post_stat"
                          >
                            <span>
                              <img src={svg["question_views"]} />
                              {item.statistic.view}
                            </span>
                            <span>
                              <img src={svg["question_answers"]} />
                              {item.statistic.comments}
                            </span>
                            <span>{Helpers.getDateFormat(item.showDate)}</span>
                          </div>
                        </a>
                      );
                    }
                  )
                  return arrReturn
                } else {
                  return (
                    <NotFound />
                  )
                }
              }
            }
          </div>
          {
            () => {
              if (Variable[nameRecords] && Variable[nameRecords].list_records && Variable[nameRecords].totalFound) {
                if (Variable[nameRecords].list_records.length < Variable[nameRecords].totalFound) {
                  return (
                    <ButtonShowMore
                      onclick={async () => {
                        let filter = { type: type }
                        if (type == "media") {
                          filter["languages.code"] = Static.lang
                        } else {
                          if (Static.activeCategory != "All") {
                            filter["category.name"] = Static.activeCategory
                          }
                        }
                        let tmp = await api({ type: "get", action: "getNews", short: true, filter: filter, offset: Variable[nameRecords].list_records.length })
                        if (tmp && tmp.list_records) {
                          Variable[nameRecords].list_records.push(...tmp.list_records)
                        }
                        initReload()
                      }}
                    />
                  )
                }
              }
            }
          }
        </div>
      </div>
    </div>
  );
};
export { BlockNews };