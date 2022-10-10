import {
  jsx,
  jsxFrag,
  Variable,
  init,
  initGo,
  initReload,
  getStorage,
  stringToHtml,
  Helpers
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { getQuestionsItemInShow } from "@src/apiFunctionsE.js";
import { Avatar } from "@component/element/Avatar.js";
import { AudioPlayer } from "@component/element/AudioPlayer.js";
import { ViewImagesOrVideos } from "@component/element/ViewImagesOrVideos.js";
import { ViewImageOrVideo } from "@component/element/ViewImageOrVideo.js";
import { If } from "@component/helpers/All.js";

import {
  getDateFormat,
} from "@src/functions.js";


const start = function () {
  Variable.HeaderShow = true;
  Variable.FooterShow = true;
  let question, answers, myInfo, mediaWithOutAudio, mediaOnlyAudio;
  init(
    async () => {
      question = await getQuestionsItemInShow(
        Variable.dataUrl.params,
        "getQuestions"
      );
      question = question.list_records[0];
      mediaWithOutAudio = question.media.filter((i) => i.type !== "audio");
      mediaOnlyAudio = question.media.filter((i) => i.type === "audio");
      answers = await getQuestionsItemInShow(
        Variable.dataUrl.params,
        "getAnswers"
      );
      console.log("=050206=", question);
      console.log("=endInit=", answers);
      myInfo = getStorage("myInfo");
      console.log("=myInfo=", myInfo);
    },
    () => {
      return (
        <div
          // class="answer_container"
          class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
            } answer_container`}
        >
          <div class="answer_block">
            <div class="answer_content">
              {/* <a class="mrb20" href="{{lang.url}}{{data.pageUrlBefor}}/" data-action="link"><img class="go_back_icon" src="/assets/icon/go_back_icon.svg"><span class="full_news_go_back">{{lang.span.back}}</span></a> */}
              <div class="question_author_block">
                <Avatar author={question.author} />
                <a
                  href={`/user/${question.author.nickname}`}
                  data-action="link"
                  data-needauth="true"
                >
                  <div class="question_author_name">
                    {question.author.nickname}
                  </div>
                </a>
                {/* {{#if question.close}}
                            {{#notis question.author._id myInfo._id}}                    
                                <div class="comment_icons">
                                    <div class="comment_icon_type-1 answer_additionally_toggle {{#if myInfo._id}}{{else}}comment_inactive{{/if}}" data-action="answerAdditionallyToggle">
                                        <img class="answer_additionally_toggle_img" src="/assets/icon/points.svg">
                                        <div class="answer_additionally_container">
                                            <div class="answer_additionally">
                                                <div class="answer_additionally_item complain" data-action="answerAdditionallyItem" data-answer-id="{{question._id}}" data-type="question">{{lang.select.complain}}</div>
                                                {{#if data.myInfo.status.role}}
                                                    <div style="color: #32DE80" class="answer_additionally_item delete" data-action="doRoleModal" data-answer-id="{{question._id}}" data-type="question">{{lang.select.delete}}</div>
                                                {{/if}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {{/notis}}   
                        {{else}}
                                <div class="comment_icons">
                                <div class="comment_icon_type-1 answer_additionally_toggle {{#if myInfo._id}}{{else}}comment_inactive{{/if}}" data-action="answerAdditionallyToggle">
                                    <img class="answer_additionally_toggle_img" src="/assets/icon/points.svg">
                                    <div class="answer_additionally_container">
                                        <div class="answer_additionally">
                                            {{#is question.author._id myInfo._id}}
                                                <div class="answer_additionally_item close" data-action="answerAdditionallyItem" data-answer-id="{{question._id}}" data-type="question">{{lang.select.closeQuestion}}</div>
                                                {{#if question.statistic.answer}}
                                                {{else}}
                                                    <div class="answer_additionally_item edit" data-action="answerAdditionallyItem" data-answer-id="{{question._id}}" data-type="question">{{lang.button.edit}}</div>
                                                    <div class="answer_additionally_item delete" data-action="answerAdditionallyItem" data-answer-id="{{question._id}}" data-type="question">{{lang.select.delete}}</div>
                                                {{/if}}
                                            {{else}}
                                                <div class="answer_additionally_item complain" data-action="answerAdditionallyItem" data-answer-id="{{question._id}}" data-type="question">{{lang.select.complainQuestion}}</div>
                                                <div class="answer_additionally_item complain" data-action="answerAdditionallyItem" data-answer-id="{{question.author._id}}" data-type="user">{{lang.select.complainUser}}</div>
                                                <div class="answer_additionally_item block" data-action="answerAdditionallyItem" data-answer-id="{{question.author._id}}" data-type="user">{{lang.select.blackList}}</div>
                                            {{/is}}
                                            {{#if data.myInfo.status.role}}
                                                <div style="color: #32DE80" class="answer_additionally_item delete" data-action="doRoleModal" data-answer-id="{{question._id}}" data-type="question">{{lang.select.delete}}</div>
                                            {{/if}}
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        {{/if}} */}

                {/* {{#is myInfo.role 1}}    
                            {{#is myInfo.role_settings.del_question 1}} 
                            <div class="acp_block">
                                <img data-action="acpSiteShow" class="acp_image" src="/assets/icon/points_green.svg">
                                <div style="display: none;" class="acp_inner">
                                    <div class="acp_inner_item" data-type="dlt_question" data-id="{{question._id}}" data-action="acpAction">
                                        Удалить вопрос
                                    </div>
                                </div>
                            </div>
                            {{/is}}
                        {{/is}} */}
              </div>
              <p class="question_title">{question.title}</p>
              <div class="question_text"> {stringToHtml(Helpers.sanitizeHtml(question.text))}</div>
              <If
                data={mediaWithOutAudio.length > 0}
                dataIf={
                  mediaWithOutAudio.length > 1 ? (
                    <ViewImagesOrVideos
                      item={mediaWithOutAudio}
                    />
                  ) : (
                    <ViewImageOrVideo item={mediaWithOutAudio} />
                  )
                }
              />

              {/* {
                            question.media.length > 0 
                            && 
                              {{#if question.media}}
                        {{#if (ArrayLengthOne question.media)}}
                            <div class="swiper-container">  
                                <div class="swiper swiper-post_media">
                                    <div class="swiper-wrapper">
                                        {{#arrayWhile question.media}}  
                                            {{#is type "audio"}}
                                            {{else}}
                                                <a class="swiper-slide">
                                                    {{#is type "image"}}
                                                        <div class="swiper-post_media_image_container">
                                                            {{!-- <img data-action="fullSize" src="/assets/upload/question/{{ name }}"> --}}
                                                            <img src="/assets/upload/question/{{ name }}">  
                                                        </div>
                                                    {{/is}} 
                                                    {{#is type "video"}}
                                                        {{>videoPlayer src=name path="/assets/upload/question/"}}
                                                    {{/is}}
                                                </a>
                                            {{/is}}
                                        {{/arrayWhile}}
                                    </div>
                                    <div class="swiper-pagination swiper-pagination-post_media"></div>
                                    <div class="swiper-scrollbar-post_media"></div>
                                </div> 
                            </div>
                        {{else}}
                            {{#arrayWhile question.media}}  
                                {{#is type "audio"}}
                                {{else}}
                                        {{#is type "image"}}
                                            <div class="swiper-post_media_image_container">
                                                {{!-- <img data-action="fullSize" src="/assets/upload/question/{{ name }}"> --}}
                                                <img src="/assets/upload/question/{{ name }}">  
                                            </div>
                                        {{/is}}
                                        {{#is type "video"}}
                                            {{>videoPlayer src=name path="/assets/upload/question/"}}
                                        {{/is}}
                                {{/is}}
                            {{/arrayWhile}} 
                        {{/if}}
                        } */}

              <div class="post_audio_container">

                <If
                  data={mediaOnlyAudio.length > 0}
                  dataIf={
                    <AudioPlayer item={mediaOnlyAudio} type={"question"} />
                  }
                />




                {/* {{#arrayWhile question.media}}  
                                {{#is type "audio"}}
                                     {{>audioPlayer src=name path="/assets/upload/question/"}}
                                {{/is}}
                            {{/arrayWhile}} */}
              </div>
              {/* {{/if}} */}

              <div class="answers_block">
                <p>
                  {" "}
                  <img src={svg["question_answers"]} />{" "}
                  <b>{question.statistic.answer}</b>
                </p>
                <p>
                  {" "}
                  <img src={svg["question_views"]} />{" "}
                  <b>{question.statistic.view}</b>
                </p>
                <p>
                  {" "}
                  <img src={svg["question_time"]} />{" "}
                  <b>{getDateFormat(question.showDate, "lenta")}</b>{" "}
                </p>
                {myInfo._id !== question.author._id && (
                  <div
                    data-action="answerModal"
                    class="btn-answer"
                    data-needauth="true"
                  >
                    <a class="btn-gr-answer">
                      <span>{Variable.lang.button.giveAnswer}</span>
                    </a>
                  </div>
                )}
                {/* {{#if myInfo._id}}
                            {{#is question.author._id myInfo._id}}
        
                            {{else}}
                                {{#notif question.close}}
                                    <div data-action="answerModal" class="btn-answer" data-needauth="true">
                                        <a class="btn-gr-answer"><span>{{lang.button.giveAnswer}}</span></a>
                                    </div>
                                {{/notif}}
                            {{/is}}
                        {{/if}} */}
              </div>

              <div class="user_news_block">{/* {{>answers}} */}</div>
            </div>
          </div>
        </div>
      );
    }
  );
};

export default start;
