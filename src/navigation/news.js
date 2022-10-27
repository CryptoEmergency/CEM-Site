import {
  jsx,
  jsxFrag,
  Variable,
  init,
  sendApi,
  initReload,
} from "@betarost/cemjs";

import { If, Map } from "@component/helpers/All.js";
import {
  ButtonShowMore,
  NewsCategory,
  NewsItem,
} from "@component/element/index.js";

const start = function () {
  let activeCategory;
  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  init(
    async () => {
      activeCategory = "All";
      Variable.PageNewsCategory = await sendApi.send({
        action: "getCategories",
        short: true,
        cache: true,
        name: "PageNewsCategory",
        filter: { type: "news" },
      });
      Variable.PageNews = await sendApi.send({
        action: "getNews",
        short: true,
        cache: true,
        name: "PageNews",
        filter: { type: "news" },
      });
    },
    () => {
      return (
        <div
          class={[
            "blog_page_container",
            Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader",
          ]}
        >
          <div class="blog_page">
            <div class="blog_filter">
              <h2 class="h">{Variable.lang.h.news}</h2>
            </div>
            <NewsCategory
              activeCategory={activeCategory}
              items={Variable.PageNewsCategory}
              onclick={async function () {
                if (activeCategory == this.dataset.name) {
                  return;
                }
                activeCategory = this.dataset.name;
                let filter = { type: "news" };
                if (activeCategory != "All") {
                  filter["category.name"] = activeCategory;
                }
                Variable.PageNews = await sendApi.send({
                  action: "getNews",
                  short: true,
                  filter: filter,
                });
              }}
            />
            <div class="userNewsBlock">
              <div class="bl_one bl_active">
                <div class="blog_news">
                  {
                    Variable.PageNews.list_records.map((item, index) => {
                      return (
                        <NewsItem item={item} index={index} type={"news"} />
                      );
                    })
                  }
                </div>
                <If
                  data={
                    Variable.PageNews.list_records.length <
                    Variable.PageNews.totalFound
                  }
                  dataIf={
                    <ButtonShowMore
                      onclick={async () => {
                        let filter = { type: "news" };
                        if (activeCategory != "All") {
                          filter["category.name"] = activeCategory;
                        }
                        let tmp = await sendApi.send({
                          action: "getNews",
                          short: true,
                          filter: filter,
                          offset: Variable.PageNews.list_records.length,
                        });
                        Variable.PageNews.list_records.push(
                          ...tmp.list_records
                        );
                        initReload();
                      }}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};
//I check
export default start;
