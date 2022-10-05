import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initGo,
  initReload,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

import { getNewsItem, getNewsCategory, getDateFormat } from "@src/functions.js";

const start = function () {
  // let activeCategory, blogCategory, blogItem
  let activeCategory, blogCategory, blogItem,count;
  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  const changeNewsCategory = async function (e) {
    count = 0;
    activeCategory = e.currentTarget.dataset.name;
    blogItem = await getNewsItem("blog",count, activeCategory);
    initReload();
  };

  // const loadMore = async function (e) {
  //   console.log("loadMore", e.target, e.target.dataset(index))

  // }
  const showMore = async () => {
    count++;
    let tmp = await getNewsItem("blog", count, activeCategory);
    blogItem.list_records.push(...tmp.list_records);
    initReload();
  };

  init(
    async () => {
      activeCategory = "All";
      blogCategory = await getNewsCategory("blog");
      blogItem = await getNewsItem("blog",count, activeCategory);
      count = 0;
    },
    () => {
      return (
        <div
          class={`${
            Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
          } blog_page_container`}
        >
          <div class="blog_page">
            <div class="blog_filter">
              <h2 class="h">{Variable.lang.h.blog}</h2>
            </div>

            <div class="tags">
              <div
                class={`tag_button ${
                  activeCategory == "All" && "tag_button_active"
                }`}
                data-name="All"
                onclick={changeNewsCategory}
              >
                <span>{Variable.lang.categoryName.all}</span>
              </div>

              {blogCategory.list_records.filter((item2) => item2.name !== null).map((item) => {
                return (
                  <div
                    class={`tag_button ${
                      activeCategory == item.name && "tag_button_active"
                    }`}
                    data-name={item.name}
                    onclick={changeNewsCategory}
                  >
                    <span>{Variable.lang.categoryName[item.name]}</span>
                  </div>
                );
              })}
            </div>

            <div class="userNewsBlock">
              <div
                data-touchmove="userBlogSlide"
                data-touchstart="userBlogSlideStart"
                data-touchend="userBlogSlideEnd"
                class="bl_one bl_active"
              >
                <div class="blog_news">
                  {blogItem.list_records.map((item, index) => {
                    return (
                      <a class="blog_news_item" data-index={index}>
                        <img src={"/assets/upload/news/" + item.image} />
                        <p class="blog_new_title">{item.title}</p>
                        <span class="blog_new_text">{item.preview}</span>
                        <div
                          style="display: flex!important;"
                          class="blog_post_stat"
                        >
                          <span>
                            <img src={svg["question_views"]} />{" "}
                            {item.statistic.view}
                          </span>
                          <span>
                            <img src={svg["question_answers"]} />{" "}
                            {item.statistic.comments}
                          </span>
                          <span>{getDateFormat(item.showDate)}</span>
                        </div>

                        {item.source !== undefined && (
                          <p class="full_news_disclaimer mr20">
                            {Variable.lang.p.source}{" "}
                            <a href="{{source}}" rel="nofollow" target="_blank">
                              {item.source}
                            </a>
                          </p>
                        )}
                      </a>
                    );
                  })}
                </div>

                <a class="btn-view-all-a" onclick={showMore}>
                  <div
                    class="btn-view-all"
                    data-action="viewAllButton"
                    style={
                      blogItem.list_records.length === blogItem.totalFound
                        ? "display: none"
                        : "display: flex"
                    }
                  >
                    <div>{Variable.lang.button.showMore}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};

export default start;
