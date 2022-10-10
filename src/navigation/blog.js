import {
  jsx,
  jsxFrag,
  Variable,
  init,
  sendApi,
  initReload
} from "@betarost/cemjs";

import { If, Map } from '@component/helpers/All.js';
import {
  ButtonShowMore,
  NewsCategory,
  NewsItem
} from '@component/element/index.js';

const start = function () {
  let activeCategory
  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  init(
    async () => {
      activeCategory = "All";
      Variable.PageBlogCategory = await sendApi.send({ action: "getCategories", short: true, cache: true, name: "PageBlogCategory", filter: { type: "blog" } });
      Variable.PageBlog = await sendApi.send({ action: "getNews", short: true, cache: true, name: "PageBlog", filter: { type: "blog" } });
    },
    () => {
      return (
        <div class={['blog_page_container', Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <div class="blog_page">
            <div class="blog_filter">
              <h2 class="h">{Variable.lang.h.blog}</h2>
            </div>
            <NewsCategory
              activeCategory={activeCategory}
              items={Variable.PageBlogCategory}
              onclick={async function () {
                if (activeCategory == this.dataset.name) {
                  return
                }
                activeCategory = this.dataset.name
                let filter = { type: "blog" }
                if (activeCategory != "All") {
                  filter["category.name"] = activeCategory
                }
                Variable.PageBlog = await sendApi.send({ action: "getNews", short: true, filter: filter })
              }}
            />
            <div class="userNewsBlock">
              <div class="bl_one bl_active">
                <div class="blog_news">
                  <Map
                    data={Variable.PageBlog.list_records}
                    dataIf={(item, index) => {
                      return (
                        <NewsItem
                          item={item}
                          index={index}
                          type={"blog"}
                        />
                      );
                    }}
                  />
                </div>
                <If
                  data={Variable.PageBlog.list_records.length < Variable.PageBlog.totalFound}
                  dataIf={
                    <ButtonShowMore
                      onclick={async () => {
                        let filter = { type: "blog" }
                        if (activeCategory != "All") {
                          filter["category.name"] = activeCategory
                        }
                        let tmp = await sendApi.send({ action: "getNews", short: true, filter: filter, offset: Variable.PageBlog.list_records.length })
                        Variable.PageBlog.list_records.push(...tmp.list_records)
                        initReload()
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
