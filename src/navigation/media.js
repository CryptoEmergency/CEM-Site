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

import {
  getNewsItem,
  checkAnswerApi,
  getDateFormat,
} from "@src/functions.js";

import { siteLink } from "@src/functions.js";
import svg from "@assets/svg/index.js";

const changeCategory = async (e) => {
  let typeCategory = e.currentTarget.dataset.name;
  if (typeCategory !== "en") {
    setValue(ID, "mediaItem", await getNewsItem("media"));
  } else {
    let data = {
      filter: {
        type: "news",
        "languages.code": "en",
        "type": "media",
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
    setValue(ID, "mediaItem", response);
  }
  init(true);
};

const mediaView = function () {
  const lang = getVariable("languages")[getStorage("lang")];
  const en = getVariable("languages")["en"];
  const mediaItem = getValue(ID, "mediaItem");
  return (
    <div class="blog_page_container">
      <div class="blog_page">
        <div class="blog_filter">
          <h2>{lang.h.mediaUs}</h2>

          {/* <div class="profit_calculator_inputs_container">
                <input type="text" id="datepicker"></p>
            </div> */}

          <input
            data-keyup="newsSearchEnter"
            data-type="media_about_us"
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
            data-type="media"
            data-name={en.code}
            data-total=""
            onclick={changeCategory}
          >
            <span>{en.lang_orig}</span>
          </div>

          {lang.lang_orig !== "English" && (
            <div
              class="tag_button tag_button_active"
              data-action="changeTagButton"
              data-type="media"
              data-name={lang.code}
              data-total=""
              onclick={changeCategory}
            >
              <span>{lang.lang_orig}</span>
            </div>
          )}

          {/* {{#arrayWhile list_category}}
                <div class="tag_button{{#if isLast}} tag_button_active" data-total="{{data.totalFound}}{{/if}}" data-action="changeTagButton" data-type="media" data-name="{{code}}">
                    <span>{{orig_name}}</span>
                </div>
            {{/arrayWhile}} */}
        </div>
        {/* <div class="userNewsBlock">
            {{#arrayWhile list_category}}
                {{#if isLast}}
                    <div data-touchmove="userBlogSlide" data-touchstart="userBlogSlideStart" data-touchend="userBlogSlideEnd" class="bl_one bl_active">
                        <div class="blog_news">
                            {{>newsBlock list_records=data.list_records}}
                        </div>
                    </div>
                {{else}}
                <div data-touchmove="userBlogSlide" data-touchstart="userBlogSlideStart" data-touchend="userBlogSlideEnd" class="bl_one"></div>
                {{/if}}
            {{/arrayWhile}}
        </div> */}
        <div class="userNewsBlock">
          <div
            data-touchmove="userBlogSlide"
            data-touchstart="userBlogSlideStart"
            data-touchend="userBlogSlideEnd"
            class="bl_one bl_active"
          >
            <div class="blog_news">
            {mediaItem.totalFound === 0 ?
            <div class = "nothing_found">
              <img  src = {svg["partner-list_icon"]} />
              <p>{lang.p.notFound} </p>
            </div> 
            :
             mediaItem.list_records.map((item) => {
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
        </div>
      </div>
    </div>
  );
};

const ID = "mainBlock";

const init = async function (reload) {
  if (!reload) {
    if (!getValue(ID, "mediaItem")) {
      setValue(ID, "mediaItem", await getNewsItem("media"));
    } else {
      setTimeout(async () => {
        setValue(ID, "mediaItem", await getNewsItem("media"));
      }, 500);
    }
  }

  setValue("mainHeader", "show", true);
  setValue("mainFooter", "show", true);
  makeDOM(mediaView(), ID);
};

export default init;
