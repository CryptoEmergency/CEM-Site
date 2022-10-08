import {
  jsx,
  jsxFrag,
  Variable,
  init,
  sendApi,
  initReload
} from "@betarost/cemjs";

import { If } from '@component/helpers/All.js';
import { NewsCategory } from '@component/element/NewsCategory.js';
import { NewsItem } from '@component/element/NewsItem.js';

const start = function () {
  let activeCategory
  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  init(
    async () => {
      activeCategory = "All";
      Variable.PageNewsCategory = await sendApi.send({ action: "getCategories", short: true, cache: true, name: "PageNewsCategory", filter: { type: "news" } });
      Variable.PageNews = await sendApi.send({ action: "getNews", short: true, cache: true, name: "PageNews", filter: { type: "news" } });
    },
    () => {

      return (
        <div class={['blog_page_container', Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <div class="blog_page">
            <div class="blog_filter">
              <h2 class="h">{Variable.lang.h.news}</h2>
            </div>
            <NewsCategory
              activeCategory={activeCategory}
              items={Variable.PageNewsCategory}
              callBack={async function () {
                if (activeCategory == this.dataset.name) {
                  return
                }
                activeCategory = this.dataset.name
                let filter = { type: "news" }
                if (activeCategory != "All") {
                  filter["category.name"] = activeCategory
                }
                Variable.PageNews = await sendApi.send({ action: "getNews", short: true, filter: filter })
              }}
            />
            <div class="userNewsBlock">
              <div class="bl_one bl_active">
                <div class="blog_news">
                  {Variable.PageNews.list_records.map((item, index) => {
                    return (
                      <NewsItem
                        item={item}
                        index={index}
                      />
                    );
                  })}
                </div>
                <If
                  data={Variable.PageNews.list_records.length < Variable.PageNews.totalFound}
                  dataIf={
                    <a class="btn-view-all-a"
                      onclick={async () => {
                        let filter = { type: "news" }
                        if (activeCategory != "All") {
                          filter["category.name"] = activeCategory
                        }
                        let tmp = await sendApi.send({ action: "getNews", short: true, filter: filter, offset: Variable.PageNews.list_records.length })
                        Variable.PageNews.list_records.push(...tmp.list_records)
                        initReload()
                      }
                      }
                    >
                      <div class="btn-view-all" >
                        <div>{Variable.lang.button.showMore}</div>
                      </div>
                    </a>
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
