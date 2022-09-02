import {
  jsx,
  jsxFrag,
  getVariable,
  makeDOM,
  getStorage,
  setValue,
  sendApi,
  getValue,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

import {
  getNewsItem,
  checkAnswerApi,
  getNewsCategory,
  getDateFormat,
} from "@src/functions.js";

const changeCategory = async (e) => {
    let typeCategory = e.currentTarget.dataset.name;
    if (typeCategory === "All") {
      setValue(ID, "blogItem", await getNewsItem("news"));
    } else {
      let getLang = "en";
      if (getStorage("lang") == "ru") {
        getLang = "ru";
      }
      let data = {
        filter: {
          type: "blog",
          "languages.code": getLang,
          "category.name": typeCategory,
        },
        select: {
          title: 1,
          preview: 1,
          image: 1,
          showDate: 1,
          "statistic.view": 1,
          "statistic.comments": 1,
        },
        sort: {
          showDate: -1,
        },
        limit: 6,
      };
      var response = checkAnswerApi(await sendApi.create("getNews", data));
      console.log(response)
      setValue(ID, "blogItem", response);
    }
    init(true);
  };

  



const blogView = function () {
  const lang = getVariable("languages")[getStorage("lang")];
  const blogCategory = getValue(ID, "blogCategory");
  const blogItem = getValue(ID, "blogItem");

  return (
    <div class="blog_page_container">
      <div class="blog_page">
        <div class="blog_filter">
          <h2>{lang.h.blog}</h2>

          {/* <div class="profit_calculator_inputs_container">
                <input type="text" id="datepicker"></p>
            </div>
             */}
          <input
            data-keyup="newsSearchEnter"
            data-type="blog"
            class="news_search_input"
            type="text"
          />
          <div data-action="searchNewsInputSummon" class="news_search_button">
            <img src={svg["search_button"]} />
          </div>
        </div>
        <div class="tags">
          <div
            class="tag_button tag_button_active"
            data-action="changeTagButton"
            data-type="blog"
            data-name="All"
            data-total="{{totalFound}}"
            onclick={changeCategory}
          >
            <span>{lang.categoryName.all}</span>
          </div>

          {blogCategory.list_records.map((item) => {
            return (
              <div
                class="tag_button tag_button_active"
                data-action="changeTagButton"
                data-type="blog"
                data-name={item.name}
                data-total=""
                onclick={changeCategory}
              >
                <span>{lang.categoryName[item.name]}</span>
              </div>
            );
          })}

          {/* {{#arrayWhile list_category}}
                <div class="tag_button" data-action="changeTagButton" data-type="blog" data-name="{{name}}">
                    <span>{getLangName "categoryName" name}</span>
                </div>
            {{/arrayWhile}} */}
        </div>
        <div class="userNewsBlock">
          <div
            data-touchmove="userBlogSlide"
            data-touchstart="userBlogSlideStart"
            data-touchend="userBlogSlideEnd"
            class="bl_one bl_active"
          >
            <div class="blog_news">
            {blogItem.list_records.map((item) => {
                return (
                  <a class="blog_news_item">
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
                        {lang.p.source}{" "}
                        <a href="{{source}}" rel="nofollow" target="_blank">
                          {item.source}
                        </a>
                      </p>
                    )}
                    {/* {{#if source}}{{#if suoureShow}}<p class="full_news_disclaimer mr20">{{lang.p.source}} <a href="{{source}}" rel="nofollow" target="_blank">{{source}}</a></p>{{/if}}{{/if}} */}
                  </a>
                );
              })}
            </div>
          </div>
          {/* {{#arrayWhile list_category}}
                <div data-touchmove="userBlogSlide" data-touchstart="userBlogSlideStart" data-touchend="userBlogSlideEnd" class="bl_one"></div>
            {{/arrayWhile}} */}
        </div>
      </div>
    </div>
  );
};

const ID = "mainBlock";

const init = async function (reload) {
  if (!reload) {
    if (!getValue(ID, "blogCategory")) {
      setValue(ID, "blogCategory", await getNewsCategory("blog"));
    }
    if (!getValue(ID, "blogItem")) {
      setValue(ID, "blogItem", await getNewsItem("blog"));
    } else {
      setTimeout(async () => {
        setValue(ID, "blogItem", await getNewsItem("blog"));
      }, 500);
    }
  }

  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  makeDOM(blogView(), ID);
};

export default init;
