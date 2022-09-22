import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initGo,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";



import {
  getNewsItem,
  getNewsCategory,
  getDateFormat,
  changeLang
} from "@src/functions.js";



const start = function () {
  let activeCategory, newsCategory, newsItem, prevAdress
  Variable.HeaderShow = true
  Variable.FooterShow = true

  const changeNewsCategory = async function (e) {
    activeCategory = e.currentTarget.dataset.name;
    newsItem = await getNewsItem("news", activeCategory);
    initGo(null, true);
  }
  init(
    async () => {
      activeCategory = "All"
      newsCategory = await getNewsCategory("news")
      newsItem = await getNewsItem("news", activeCategory);
      prevAdress = Variable.dataUrl.adress;
    },
    () => {
      
      return (
        <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"} blog_page_container`}>
          <div class="blog_page">
            <div class="blog_filter">
              <h2>{Variable.lang.h.news}</h2>
            </div>

            <div class="tags">
              <div
                class={`tag_button ${activeCategory == "All" && "tag_button_active"}`}
                data-name="All"
                onclick={changeNewsCategory}
              >
                <span>{Variable.lang.categoryName.all}</span>
              </div>

              {newsCategory.list_records.map((item) => {
                return (
                  <div
                    class={`tag_button ${activeCategory == item.name && "tag_button_active"}`}
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
                  {newsItem.list_records.map((item) => {
                    return (
                      <a class="blog_news_item"
                      href={`/${prevAdress}/show/${item._id}`}
                        onclick ={changeLang}
                      >
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
              </div>

            </div>
          </div>
        </div>
      )
    }
  )


}

export default start;
