import {
  jsx,
  jsxFrag,
  setAction,
  setValue,
  Variable,
  getValue,
  initReload,
  sendApi,
  initGo,
  initOne,
  stringToHtml,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { If } from "@component/helpers/All.js";
import { getDateFormat } from "@src/functions.js";
import { BlockUserComment } from "@src/component/blocks/user/BlockUserComment.js";
import { CommentInput } from "@src/component/element/CommentInput.js";
import { getNewsItemInShow } from "@src/apiFunctions.js";
let news;

const ModalFullNews = function ({ news }, reload) {
  console.log("=84781a=", news);

  initOne(async () => {
    Variable.Static.ShowVoterInteval = { timer: 0 };
    Variable.Static.resultShowVoter = undefined;
    Variable.Static.activeCommentsInput = "";
    Variable.Static.answerAdditionallyShow = "";
    Variable.Static.showMainInput = true;
    Variable.Static.activeEditInputs = [];
    Variable.Static.answerAdditionally = false;
    Variable.Static.showNewsId = news._id;
  });
  // news =  getNewsItemInShow(item._id);
  // console.log('=c0791d=',news)
  // news = news.list_records[0];
  //  news = item
  console.log("ReloadModal", news);
  return (
    <div class="c-modal c-modal--open c-modal--fullscreen" id="ModalFullNews">
      <section class="c-modal__dialog">
        <div class="c-modal__body">
          <div class="c-fullnews">{/*  full_news_container */}
            <div class="c-fullnews__block">{/*  full_news_block */}
              {/* {{#is myInfo.role 1}}     */}
              {/* {{#is myInfo.role_settings.add_news 1}}  */}
              {/* <div class="acp_block">
                <img
                  class="acp_image"
                  src={svg["points_green"]}
                />
                <div style="display: none;" class="acp_inner">
                  <div
                    class="acp_inner_item"
                  >
                    Удалить Новость
                  </div>
                  <div></div>
                </div>
                <div></div>
              </div> */}
              {/* {{/is}} */}
              {/* {{/is}} */}
              <div class="c-fullnews__content">{/*  full_news_content */}
                <div class="c-fullnews__header">{/*  user_post_header */}
                  <a
                    class="c-goback"
                    onclick={() => { Variable.Modals = [] }}
                  >
                    <img class="c-goback__arrow" src={svg["go_back_icon"]} />
                    <span class="c-goback__text">{Variable.lang.span.back}</span>
                  </a>
                </div>
                <h1 class="c-fullnews__name">{news.title}</h1>{/*  full_news_name */}
                <If
                  data={news.image}
                  dataIf={
                    <img
                      class="c-fullnews__image"
                      src={`/assets/upload/news/${news.image}`}
                    />
                  }
                />{/*  full_news_image */}

                <p class="c-fullnews__preview">{news.preview}</p>{/*  full_news_text mrb30 */}
                <p class="c-fullnews__text">{stringToHtml(news.text)}</p>{/*  full_news_text mr20 */}
                <If
                  data={news.source}
                  dataIf={
                    <p class="c-fullnews__disclaimer">{/*  full_news_disclaimer mr20 */}
                      {Variable.lang.p.source}
                      <a href={news.source} rel="nofollow" target="_blank">
                        {news.source}
                      </a>
                    </p>
                  }
                />
                {/* {{#if news.source}}<p class="full_news_disclaimer mr20">{{lang.p.source}} 
              <a href="{{news.source}}" rel="nofollow" target="_blank">{{news.source}}</a>
              </p>{{/if}} */}
                <div style="display: flex" class="c-fullnews__statistic">{/*  blog_post_stat */}
                  <p class="c-fullnews__statitem c-fullnews__views">{/*  full_news_date */}
                    <img class="c-fullnews__icon" src={svg["question_views"]} /> {news.statistic.view}
                  </p>
                  <p class="c-fullnews__statitem c-fullnews__answers">{/*  full_news_date */}
                    <img class="c-fullnews__icon" src={svg["question_answers"]} />{" "}
                    {news.statistic.comments}
                  </p>
                  <p class="c-fullnews__statitem c-fullnews__date">{getDateFormat(news.showDate)}</p>{/*  full_news_date */}
                </div>
              </div>
            </div>
            <div class="c-fullnews__comments c-comments">{/*  news_page_comments */}
              <h2 class="c-comments__title">{Variable.lang.h.modal_comment}</h2>
              {Variable.Static.showMainInput && <CommentInput item={news} />}
              <If
                data={news.comments.length > 0}
                dataIf={
                  <div data-type="news_comment" class="c-comments__posts">{/* post_comments */}
                    <div
                      style={!news.comments && "display: none;"}
                      class="c-comments__wrapper"
                    >{/* user_news_item */}
                      <BlockUserComment comments={news.comments} />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalFullNews;
