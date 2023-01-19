import {
  jsx,
  jsxFrag,
  Variable,
  initOne,
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js'
import svg from "@assets/svg/index.js";
import { Select, ButtonShowMore, NotFound, Avatar, Input } from '@component/element/index.js';

const makeFilter = function (Static) {
  let objReturn = {}

  if (Static.quest.value.length != 0) {
    objReturn = {
      $text: { $search: Static.quest.value }
    }
  } else {
    objReturn = {
      "languages.code": Static.filters.language.code,
    }
  }

  if (!Static.filters) {
    return filter
  }

  if (Static.filters.questions.value == "open") {
    objReturn.close = false;
  } else if (Static.filters.questions.value == "closed") {
    objReturn.close = true;
    objReturn.bestId = { "$exists": false };
  } else if (Static.filters.questions.value == "best") {
    objReturn.close = true;
    objReturn.bestId = { "$exists": true };
  }

  return objReturn
}

const makeFilterSort = function (Static) {
  let objReturn = {}
  if (!Static.filters) {
    return sort
  }
  if (Static.filters.date.value == "views") {
    objReturn = {
      "statistic.view": Static.filters.desc,
    };
  } else if (Static.filters.date.value == "answers") {
    objReturn = {
      "statistic.answer": Static.filters.desc,
    };
  }
  return objReturn
}

const BlockQuestions = async function ({ Static, limit = 21 }) {

  await initOne(async () => {
    Static.quest = {
      value: "",
      label: "",
      condition: async (value) => {
        Static.apiFilter = makeFilter(Static)
        Static.apiFilterSort = makeFilterSort(Static)
        await fn.restApi.getQuestions({ name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
        return true
      }
    }
    Static.apiFilter = makeFilter(Static)
    Static.apiFilterSort = makeFilterSort(Static)
    await fn.restApi.getQuestions({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
  });
  //console.log(Variable[Static.nameRecords])
  return (
    <div class="c-questions">
      <div class="c-questions__header">
        {
          Variable.DataUrl.adress == "question"
            ?
            <div>
              <h4>{Variable.lang.h.lastQuestions}</h4>
              <p>{Variable.lang.p.addQuestionsSlog}</p>
            </div>
            :
            null
        }
        <div class="c-questions__searchblock c-search">
          <div class="c-search__container">
            <div class="c-search__wrapper">
              <img class="c-search__icon" src={svg.search_icon} />
              <Input className="c-search__input" Static={Static.quest} />
              <img
                class="c-search__icon c-search__icon--filter"
                src={svg.filter}
                onClick={() => {
                  if (Static.elShowFilter.dataset.show) {
                    Static.elShowFilter.removeAttribute("data-show")
                    Static.elShowFilter.classList.remove("c-questions__filter--openmobile")
                  } else {
                    Static.elShowFilter.dataset.show = true
                    Static.elShowFilter.classList.add("c-questions__filter--openmobile")
                  }
                }}
              />
            </div>
            <div style="display: none;" class="questions_search">
              <div class="question_search_half_empty">
                {Variable.lang.text.contInput}
              </div>
              <div style="display: none;" class="question_search_help"></div>
            </div>
          </div>
          <div
            class="mobile_search_container"
            onclick={() => {

              if (Variable.auth) {
                fn.modals.ModalAskQuestion()
              } else {
                fn.modals.ModalNeedAuth()
              }
            }}
          >
            <div class="search-button" style="width:238px;">
              {Variable.lang.button.giveQuestion}
            </div>
          </div>
        </div>
        <div
          data-show={false}
          class="c-questions__filter questions_filter"
          Element={($el) => {
            Static.elShowFilter = $el
          }}
        >
          <Select
            options={Static.optionsSelect.questions}
            callback={
              async (active, nameOptions) => {
                Static.filters[nameOptions].value = active
                Static.apiFilter = makeFilter(Static)
                Static.apiFilterSort = makeFilterSort(Static)
                await fn.restApi.getQuestions({ name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
              }
            }
          />
          <Select
            options={Static.optionsSelect.date}
            toggler={true}
            callback={
              async (active, nameOptions) => {
                Static.filters[nameOptions].value = active
                Static.apiFilter = makeFilter(Static)
                Static.apiFilterSort = makeFilterSort(Static)
                await fn.restApi.getQuestions({ name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
              }
            }
          />
          <div
            class="c-questions__lang"
            onclick={() => {
              fn.modals.ModalChangeLanguage({
                onclick: async (langCode, langName, langOrig) => {
                  Static.filters.language.name = `${langName} (${langOrig})`;
                  Static.filters.language.code = langCode;
                  Static.apiFilter = makeFilter(Static)
                  Static.apiFilterSort = makeFilterSort(Static)
                  await fn.restApi.getQuestions({ name: Static.nameRecords, filter: Static.apiFilter, sort: Static.apiFilterSort, limit })
                },
              })
            }}>
            {Static.filters.language.name == "all" ? Variable.lang.text.language : Static.filters.language.name}
          </div>
        </div>
      </div>
      <div class="c-questions__list questions-blocks">
        {
          !Variable[Static.nameRecords] || !Variable[Static.nameRecords].list_records.length
            ?
            <NotFound />
            :
            Variable[Static.nameRecords].list_records.map(function (question, i) {
              return (
                <div class="c-questions__item c-question question-block questionLoad">
                  <div class="c-question__header">
                    <div class="c-question__avatar">
                      <Avatar author={question.author} />
                    </div>
                    <div class="c-question__name">
                      <a
                        class="c-question__nickname"
                        style="display: block; left: 5px;bottom:5px"
                        href={`/user/${question.author.nickname}`}
                        onclick={function (e) {
                          // e.preventDefault();
                          if (Variable.myInfo && Variable.myInfo.nickname == question.author.nickname) {
                            fn.siteLink(e)
                          } else {
                            fn.siteLinkModal(this.e, { title: question.author.nickname, style: 'background: #1D2029;', items: fn.itemsMenu.userProfile(question.author) })
                          }
                        }}>
                        {question.author.nickname}
                      </a>
                      <div class="c-question__info">
                        <div class="c-question__icons">
                          {question.close ?
                            <img
                              class="c-question__icon c-question__icon--status"
                              src={svg[`${(typeof question.bestId == "string") ? "best_answer" : "closed_question"}`]}
                            />
                            :
                            <img class="c-question__icon c-question__icon--status" src={svg.open_question} />
                          }
                          <img class={["c-question__icon", fn.ifHaveMedia(question.media, "audio") ? "c-question__icon--active" : null]} src={svg.question_audio} />
                          <img class={["c-question__icon", fn.ifHaveMedia(question.media, "video") ? "c-question__icon--active" : null]} src={svg.question_video} />
                          <img class={["c-question__icon", fn.ifHaveMedia(question.media, "image") ? "c-question__icon--active" : null]} src={svg.question_photo} />
                        </div>
                        <div class="c-question__langcontainer language_container ">
                          <div class="c-question__lang language-question">
                            {question.languages.orig_name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    style=""
                    href={`/question/show/${question._id}`}
                    class="c-question__body"
                    //ссылка твой вопрос
                    onclick={function (e) {
                      // fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question, author: question.author, items: hrefMenuitems, editVisible: false })
                      fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question, items: fn.itemsMenu.question(Static, question) })
                    }}
                  >
                    <div class="c-question__preview">
                      <span class="">
                        {fn.sliceString(question.title, 66)}
                      </span>
                    </div>
                  </a>
                  <div class="c-question__statistic">
                    <div class="c-question__stats ">
                      <img src={svg.question_answers} />
                      {question.statistic.answer}
                    </div>
                    <div class="c-question__stats ">
                      <img src={svg.question_views} />
                      {question.statistic.view}
                    </div>
                    <div class="c-question__stats ">
                      <img src={svg.question_time} />
                      {fn.getDateFormat(question.showDate, "now")}
                    </div>
                  </div>
                  <div class="c-question__footer">
                    <a
                      class="c-button c-button--outline2 buttonunswer"
                      href={`/question/show/${question._id}`}
                      onclick={(e) => {
                        fn.siteLinkModal(e, { title: Variable.lang.span.QA, item: question, items: fn.itemsMenu.question(Static, question) })
                      }}
                    >
                      <div class="c-button__wrapper">
                        {Variable.lang.button.giveAnswer}
                      </div>
                    </a>
                  </div>
                </div>
              )
            })
        }
      </div>
      <ButtonShowMore Static={Static} action="getQuestions" />
    </div>
  );
};
export { BlockQuestions };
// OK