import {
  jsx,
  jsxFrag,
  Variable,
  init,
  sendApi,
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


import { BlockQuestionsShow } from '@component/blocks/index.js';
import { QuestionAnswers } from '@component/element/index.js';
import {
  getDateFormat,
} from "@src/functions.js";


const start = function () {
  let items,
    itemsAnswers

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
      Variable.Static.mainIdforLikes =question._id;
      myInfo = getStorage("myInfo");
      items = await sendApi.send({ action: "getQuestions", short: true, filter: { _id: Variable.dataUrl.params } });
      // itemsAnswers = await sendApi.send({ action: "getAnswers", short: true, filter: { questionId: Variable.dataUrl.params } });
    },
    async () => {
      itemsAnswers = await sendApi.send({ action: "getAnswers", short: true, filter: { questionId: Variable.dataUrl.params } });

      return (
        <div class={["answer_container", Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          {/* <div class="full_news_container"> */}
          <div class="answer_block" style="flex-direction: column;">
            <BlockQuestionsShow
              itemsAnswers={itemsAnswers}
              item={items.list_records[0]}
              type = {"question"}
            />
            <div class="user_news_block">
              <QuestionAnswers
                items={itemsAnswers.list_records}
              />
            </div>
          </div>
          {/* </div> */}
        </div>

      )


      return (
        <div class={["answer_container", Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <div class="answer_block">
            <div class="answer_content">
              {/* <a class="mrb20" href="{{lang.url}}{{data.pageUrlBefor}}/" data-action="link"><img class="go_back_icon" src="/assets/icon/go_back_icon.svg"><span class="full_news_go_back">{{lang.span.back}}</span></a> */}

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
