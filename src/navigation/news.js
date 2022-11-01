import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initReload,
} from "@betarost/cemjs";

import {
  ButtonShowMore,
  NewsCategory,
  NewsItem,
} from "@component/element/index.js";

import { api } from '@src/apiFunctions.js'

const start = function (data, ID = "mainBlock") {
  let Static = {}

  init(
    async () => {
      Static.activeCategory = "All"
      await api({ type: "get", action: "getNews", short: true, cache: true, name: "PageNews", filter: { type: "news" } })
    },
    () => {
      return (
        <div class="blog_page_container c-main__body">
          <div class="blog_page">
            <div class="blog_filter">
              <h2 class="h">{Variable.lang.h.news}</h2>
            </div>
            <NewsCategory
              type="news"
              nameCategory="PageNewsCategory"
              nameRecords="PageNews"
              Static={Static}
            />
            <div class="userNewsBlock">
              <div class="bl_one bl_active">
                <div class="blog_news">
                  {
                    () => {
                      return Variable.PageNews.list_records.map(
                        (item, index) => {
                          return (
                            <NewsItem
                              item={item}
                              index={index}
                              type={"news"}
                            />
                          );
                        }
                      )
                    }
                  }
                </div>
                {
                  () => {
                    if (Variable.PageNews.list_records.length < Variable.PageNews.totalFound) {
                      return (
                        <ButtonShowMore
                          onclick={async () => {
                            let filter = { type: "news" }
                            if (Static.activeCategory != "All") {
                              filter["category.name"] = Static.activeCategory
                            }
                            let response = await api({ type: "get", action: "getNews", short: true, filter: filter, offset: Variable.PageNews.list_records.length })
                            if (response.list_records.length) {
                              Variable.PageNews.list_records.push(...response.list_records)
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
        </div>
      );
    }, ID
  );
};

export default start;
