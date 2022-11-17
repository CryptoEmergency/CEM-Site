import {
    jsx,
    jsxFrag,
    Variable,
    initOne
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { Avatar, ButtonShowMore, Input, NotFound } from '@component/element/index.js';

const BlockUserRooms = function ({ Static }) {

console.log(Static)
  initOne(async()=>{
//системные комнаты
})

return (
<div class="c-questions__list questions-blocks">
       <div class="c-questions__item c-question question-block questionLoad">
                  <div class="c-question__header">
                    <div class="c-question__avatar">
 
                    </div>
                    <div class="c-question__name">
                      <a
                        class="c-question__nickname"
                        style="display: block; left: 5px;bottom:5px"
                        //href={/*`/user/${question.author.nickname}`*/}
                        onclick={(e) => {}}>
                      {/*question.author.nickname*/}
                      </a>
                      <div class="c-question__info">
                        <div class="c-question__icons">
                          {/*question.close ?
                            <img
                              class="c-question__icon c-question__icon--status"
                              src={svg[`${(typeof question.bestId == "string") ? "best_answer" : "closed_question"}`]}
                            />
                            :
                            <img class="c-question__icon c-question__icon--status" src={svg.open_question} />
                        */}
                          <img class={"c-question__icon"/*["c-question__icon", fn.ifHaveMedia(question.media, "audio") ? "c-question__icon--active" : null]} src={svg.question_audio} */}/>
                          <img class={"c-question__icon"/*["c-question__icon", fn.ifHaveMedia(question.media, "video") ? "c-question__icon--active" : null]} src={svg.question_video}*/ }/>
                          <img class={"c-question__icon"/*["c-question__icon", fn.ifHaveMedia(question.media, "image") ? "c-question__icon--active" : null]} src={svg.question_photo}*/ }/>
                        </div>
                        <div class="c-question__langcontainer language_container ">
                          <div class="c-question__lang language-question">
                            {/*question.languages.orig_name*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    style=""
                    //href={/*`/question/show/${question._id}`*/}
                    class="c-question__body"
                    //ссылка твой вопрос
                    onclick={function (e) {
                      // fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question, author: question.author, items: hrefMenuitems, editVisible: false })
                      //fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question })
                    }}
                  >
                    <div class="c-question__preview">
                      <span class="">
                        {/*fn.sliceString(question.title, 66)*/}
                      </span>
                    </div>
                  </a>
                  <div class="c-question__statistic">
                    <div class="c-question__stats ">
                      <img  />
                      {/*question.statistic.answer*/}
                    </div>
                    <div class="c-question__stats ">
                      <img />
                      {/*question.statistic.view*/}
                    </div>
                    <div class="c-question__stats ">
                      <img  />
                      {/*fn.getDateFormat(question.showDate, "now")*/}
                    </div>
                  </div>
                  <div class="c-question__footer">
                    <a
                      class="c-button c-button--outline2 buttonunswer"
                     // href={/*`/question/show/${question._id}`*/}
                      onclick={(e) => {
                       /* fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question, })*/
                      }}
                    >
                      <div class="c-button__wrapper">
                        {/*Variable.lang.button.giveAnswer*/}
                      </div>
                    </a>
                  </div>
        </div>  
        <ButtonShowMore Static={Static} action="getQuestions" />
  </div>

  
 

)
}

export { BlockUserRooms }