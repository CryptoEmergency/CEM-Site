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
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';
import { getDateFormat } from "@src/functions.js";
import { BlockUserComment } from "@src/component/blocks/user/BlockUserComment.js";
import { CommentInput } from "@src/component/element/CommentInput.js";
import { getNewsItemInShow } from "@src/apiFunctions.js";
let news;

const ModalFullNews =  function ({item}, reload) {
    console.log('=84781a=',item)

    initOne(
       async () =>  {
            Variable.Static.ShowVoterInteval ={ timer:0};
            Variable.Static.resultShowVoter = undefined;
            Variable.Static.activeCommentsInput = "";
            Variable.Static.answerAdditionallyShow = "";
            Variable.Static.showMainInput = true;
            Variable.Static.activeEditInputs = [];
            Variable.Static.answerAdditionally = false  ; 
            news = item
            Variable.Static.showNewsId = news._id;
            console.log('news.text',news.text);
        }
    )
    // news =  getNewsItemInShow(item._id);
    // console.log('=c0791d=',news)
    // news = news.list_records[0]; 
//  news = item
 console.log('ReloadModal',news)
    return (
        <div class="c-modal c-modal--open c-modal--fullscreen" id="ModalFullNews">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={() => { Variable.Modals = [] }}
                    ></button>
                </header>
                <div class="c-modal__body">
                <div
          class={`${
            Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
          }`}
        >
          <div class="full_news_container">
            <div class="full_news_block">
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
              <div class="full_news_content">
                <h1 class="full_news_name">{news.title}</h1>
                <If
                  data={news.image}
                  dataIf={
                    <img
                      class="full_news_image"
                      src={`/assets/upload/news/${news.image}`}
                    />
                  }
                />

                <p class="full_news_text mrb30">{news.preview}</p>
                <p class="full_news_text mr20">{stringToHtml(news.text)}</p>
                <If
                  data={news.source}
                  dataIf={
                    <p class="full_news_disclaimer mr20">
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
                <div style="display: flex" class="blog_post_stat">
                  <p class="full_news_date">
                    <img src={svg["question_views"]} /> {news.statistic.view}
                  </p>
                  <p class="full_news_date">
                    <img src={svg["question_answers"]} />{" "}
                    {news.statistic.comments}
                  </p>
                  <p class="full_news_date">{getDateFormat(news.showDate)}</p>
                </div>
              </div>
            </div>
            <div class="news_page_comments">
              <h2>{Variable.lang.h.modal_comment}</h2>
              {Variable.Static.showMainInput && <CommentInput item={news}/>}
              <If
                data={news.comments.length > 0}
                dataIf={
                  <div data-type="news_comment" class="post_comments">
                    <div
                      style={!news.comments && "display: none;"}
                      class="user_news_item"
                    >
                      <BlockUserComment
                        comments={news.comments}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
                </div>
            </section>
        </div>
    )
};


export default ModalFullNews;