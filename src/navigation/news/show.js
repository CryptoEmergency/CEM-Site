import { jsx, jsxFrag, init, initReload, Variable, stringToHtml } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { getNewsItemInShow } from "@src/apiFunctions.js";
import { If } from '@component/helpers/All.js';
import {getDateFormat} from "@src/functions.js";
import { BlockUserComment } from "@src/component/blocks/user/BlockUserComment.js";

const start = function () {
  Variable.HeaderShow = true;
  Variable.FooterShow = true;
  let news;
  init(
    async () => {
    news =await getNewsItemInShow(Variable.dataUrl.params)
    news = news.list_records[0]
    console.log('=23c8eb=',news)
  }, 
  () => {
    return (
      <div
        class={`${
          Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
        }`}
      >
        <div class="full_news_container">
          <div class="full_news_block">
            {/* {{#is myInfo.role 1}}     */}
            {/* {{#is myInfo.role_settings.add_news 1}}  */}
            <div class="acp_block">
              <img
                data-action="acpSiteShow"
                class="acp_image"
                src={svg["points_green"]}
              />
              <div style="display: none;" class="acp_inner">
                <div
                  class="acp_inner_item"
                  data-type="dlt_news"
                  data-id={news._id}
                  data-action="acpAction"
                >
                  Удалить Новость
                </div>
                <div></div>
              </div>
              <div></div>
            </div>
            {/* {{/is}} */}
            {/* {{/is}} */}
            <div class="full_news_content">
              <h1 class="full_news_name">{news.title}</h1>
              {/* {{#if news.image}}<img class="full_news_image"
               src="/assets/upload/news/{{news.image}}"/>{{/if}} */}
                 <If
               data = {news.image}
               dataIf = {<img class="full_news_image"
               src={`/assets/upload/news/${news.image}`}/>} />

              <p class="full_news_text mrb30">{news.preview}</p>
              <p class="full_news_text mr20">{stringToHtml(news.text)}</p>
              <If
               data = {news.source}
               dataIf = {<p class="full_news_disclaimer mr20">{Variable.lang.p.source} 
               <a href={news.source} rel="nofollow" target="_blank">{news.source}</a>
               </p>} />
              {/* {{#if news.source}}<p class="full_news_disclaimer mr20">{{lang.p.source}} 
              <a href="{{news.source}}" rel="nofollow" target="_blank">{{news.source}}</a>
              </p>{{/if}} */}
              <div style="display: flex" class="blog_post_stat">
                <p class="full_news_date">
                  <img src={svg["question_views"]} />{" "}
                  {news.statistic.view}
                </p>
                <p class="full_news_date">
                  <img src={svg["question_answers"]} />{" "}
                  {news.statistic.comments}
                </p>
                <p class="full_news_date">
                {getDateFormat(news.showDate)}</p>
              </div>
            </div>
          </div>
          {/* {{#if noComment}}
    {{else}} */}




<div class="news_page_comments">
                        <h2>{ Variable.lang.h.modal_comment}</h2>
                        <div data-type="news_comment" class="create_post_coments">
                            <div data-type="news_comment" class="create_post_container"> 
                                <div data-onpaste="editorPaste" data-keyup="blogPostKeyUp" data-type="news_comment" contenteditable="true" class="create_post_chapter create_post_main_text"></div>
                            </div>
                            <div style="" data-quote="" data-type="news_comment" id="newsCommentSend" data-action="newsCommentSend" data-post_id="{{news._id}}" class="button-container-preview comments_send">
                            <img  src={svg["send_message"]}/>
                            </div> 
                        </div>
                        <div data-type="news_comment" class="post_comments">
                            <div  style={!news.comments && "display: none;"} class="user_news_item">
                                {/* {{>userComment list_records=news.comments}}  */}
                                <BlockUserComment comments = {news.comments} />
                            </div>
                            
                        </div>
                    </div>




          {/* <div class="news_page_comments">
            <h2>{Variable.lang.h.modal_comment}</h2>
            <div data-type="news_show_comment" class="create_post_coments">
              <div data-type="news_show_comment" class="create_post_container">
                <div
                  data-onpaste="editorPaste"
                  data-keyup="blogPostKeyUp"
                  data-type="news_show_comment"
                  contenteditable="true"
                  class="create_post_chapter create_post_main_text"
                ></div>
              </div>
              <div
                style="display: none;"
                data-quote=""
                data-type="news_show_comment"
                id="newsCommentSend"
                data-action="newsCommentSend"
                data-post_id="{{news._id}}"
                class="button-container-preview comments_send"
              >
                <img  src={svg["send_message"]}/>
              </div>
            </div>
            <div data-type="news_show_comment" class="post_comments"> */}
              {/* <div {{#if news.comments}}{{else}}style="display: none;"{{/if}}  class="user_news_item">
                    {{>userComment list_records=news.comments}} 
                </div> */}
            {/* </div> */}
          {/* </div> */}
          {/* {{/if}} */}
        </div>
      </div>
    );
  });
};

export default start;
