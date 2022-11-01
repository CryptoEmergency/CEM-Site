import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initReload
} from "@betarost/cemjs";
// poydet
import {
  ButtonShowMore,
  NewsCategory,
  NewsItem
} from '@component/element/index.js';

import { api } from '@src/apiFunctions.js'

const start = function (data, ID = "mainBlock") {
  let Static = {}
  init(
    async () => {
      Static.activeCategory = "All"
      await api({ type: "get", action: "getNews", short: true, cache: true, name: "PageBlog", filter: { type: "blog" } })
    },
    () => {
      return (
        <div class="blog_page_container c-main__body">
          <div class="blog_page">
            <NewsCategory
              type="blog"
              nameCategory="PageBlogCategory"
              nameRecords="PageBlog"
              Static={Static}
            />
            <div class="userNewsBlock">
              <div class="bl_one bl_active">
                <div class="blog_news">
                  {
                    () => {
                      return Variable.PageBlog.list_records.map(
                        (item, index) => {
                          return (
                            <NewsItem
                              item={item}
                              index={index}
                              type={"blog"}
                            />
                          );
                        }
                      )
                    }
                  }
                </div>
                {
                  () => {
                    if (Variable.PageBlog.list_records.length < Variable.PageBlog.totalFound) {
                      return (
                        <ButtonShowMore
                          onclick={async () => {
                            let filter = { type: "blog" }
                            if (Static.activeCategory != "All") {
                              filter["category.name"] = Static.activeCategory
                            }
                            let response = await api({ type: "get", action: "getNews", short: true, filter: filter, offset: Variable.PageBlog.list_records.length })
                            if (response.list_records.length) {
                              Variable.PageBlog.list_records.push(...response.list_records)
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
