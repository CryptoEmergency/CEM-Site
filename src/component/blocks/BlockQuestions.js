import {
  jsx,
  jsxFrag,
  Variable,
  getStorage,
  initReload,
  initOne,
  Helpers
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'
import { Select, ButtonShowMore, NotFound, Avatar } from '@component/element/index.js';


import { If } from '@component/helpers/All.js';
import { ifHaveMedia, sliceString } from '@src/functions.js';


let elShowFilter

const BlockQuestions = async function ({ Static, nameRecords, limit = 21 }) {



  await initOne(async () => {

    Static.optionsSelect = {
      questions: {
        nameOptions: "questions",
        title: Variable.lang.span.sort,
        items: [
          { text: Variable.lang.select.showAllQuestions, value: "all" },
          { text: Variable.lang.select.openQuestions, value: "open" },
          { text: Variable.lang.select.closeQuestions, value: "closed" },
          { text: Variable.lang.select.bestQuestions, value: "best" },
        ],
        open: false,
        active: Static.filtersQuestions.questions.value,
      },
      date: {
        nameOptions: "date",
        title: Variable.lang.span.sort,
        items: [
          { text: Variable.lang.select.byDate, value: "date" },
          { text: Variable.lang.select.byViews, value: "views" },
          { text: Variable.lang.select.byAnswers, value: "answers" },
        ],
        open: false,
        active: Static.filtersQuestions.date.value,
      },
    };
    await api({ type: "get", action: "getQuestions", short: true, cache: true, name: nameRecords, limit, filter: Helpers.getFilterQuestions(Static.filtersQuestions), sort: Helpers.getSortQuestions(Static.filtersQuestions) })
  });

  return (
    <div class="c-questions">
      <div class="c-questions__header">
        <div class="c-questions__searchblock c-search">
          <div class="c-search__container">
            <div class="c-search__wrapper">
              <img class="c-search__icon" src={svg.search_icon} />
              <input
                class="c-search__input"
                type="text"
                placeholder={Variable.lang.placeholder.question}
                autocomplete="disabled"
                readonly
              />
              <img
                class="c-search__icon c-search__icon--filter"
                src={svg.filter}
                onClick={() => {
                  console.log('=812bee=', elShowFilter.dataset.show)
                  if (elShowFilter.dataset.show) {
                    elShowFilter.removeAttribute("data-show")
                    elShowFilter.classList.remove("c-questions__filter--openmobile")
                  } else {
                    elShowFilter.dataset.show = true
                    elShowFilter.classList.add("c-questions__filter--openmobile")
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
                Variable.SetModals({ name: "ModalAskQuestion", data: {} });
              } else {
                Variable.SetModals({ name: "ModalNeedAuth", data: {} });
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
            elShowFilter = $el
          }}
        >
          <Select
            options={Static.optionsSelect.questions}
            callback={
              async (active, nameOptions) => {
                Static.filtersQuestions[nameOptions].value = active
                await api({ type: "get", action: "getQuestions", short: true, name: nameRecords, limit, filter: Helpers.getFilterQuestions(Static.filtersQuestions), sort: Helpers.getSortQuestions(Static.filtersQuestions) })
                // initReload();
              }
            }
          />
          <Select
            options={Static.optionsSelect.date}
            toggler={true}
            callback={
              async (active, nameOptions) => {
                Static.filtersQuestions[nameOptions].value = active
                await api({ type: "get", action: "getQuestions", short: true, name: nameRecords, limit, filter: Helpers.getFilterQuestions(Static.filtersQuestions), sort: Helpers.getSortQuestions(Static.filtersQuestions) })
                // initReload();
              }
            }
          />
          <div
            class="c-questions__lang"
            onclick={() => {
              Variable.SetModals({
                name: "ModalChangeLanguage",
                data: {
                  onclick: async (langCode, langName, langOrig) => {
                    Static.filtersQuestions.lang.name = `${langName} (${langOrig})`;
                    Static.filtersQuestions.lang.code = langCode;
                    await api({ type: "get", action: "getQuestions", short: true, name: nameRecords, limit, filter: Helpers.getFilterQuestions(Static.filtersQuestions), sort: Helpers.getSortQuestions(Static.filtersQuestions) })
                    // initReload()
                  },
                },
              });
            }}>
            {Static.filtersQuestions.lang.name == "all" ? Variable.lang.text.language : Static.filtersQuestions.lang.name}
          </div>
        </div>
      </div>
      <div class="c-questions__list questions-blocks">
        {() => {
          if (Variable[nameRecords] && Variable[nameRecords].list_records && Variable[nameRecords].list_records.length) {
            const arrReturn = Variable[nameRecords].list_records.map(function (question, i) {
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
                        onclick={(e) => {
                          if (Variable.myInfo && Variable.myInfo.nickname == question.author.nickname) {
                            Helpers.siteLink(e)
                          } else {
                            Helpers.siteLinkModal(e, { title: question.author.nickname, style: 'background: #1D2029;' })
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
                          <img class={`c-question__icon ${ifHaveMedia(question.media, "audio", "c-question__icon--active")}`} src={svg.question_audio} />
                          <img class={`c-question__icon ${ifHaveMedia(question.media, "video", "c-question__icon--active")}`} src={svg.question_video} />
                          <img class={`c-question__icon ${ifHaveMedia(question.media, "image", "c-question__icon--active")}`} src={svg.question_photo} />
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
                    onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.span.QA, item: question }) }}
                  // onClick={async () => {
                  //     Variable.SetModals({
                  //         name: "ModalFullSize",
                  //         data: { item: question, type: "questions" },
                  //     });
                  // }}
                  > {/* load */}
                    <div class="c-question__preview">
                      <span class="">
                        {sliceString(question.title)}
                      </span>
                    </div>
                  </a>
                  <div class="c-question__statistic">
                    <div class="c-question__stats "> {/* load */}
                      <img src={svg.question_answers} />
                      {question.statistic.answer}
                    </div>
                    <div class="c-question__stats "> {/* load */}
                      <img src={svg.question_views} />
                      {question.statistic.view}
                    </div>
                    <div class="c-question__stats "> {/* load */}
                      <img src={svg.question_time} />
                      {Helpers.getDateFormat(question.showDate, "now")}
                    </div>
                  </div>
                  <div class="c-question__footer">
                    <a class="c-button c-button--outline2 " href={`/question/show/${question._id}`} onclick={Helpers.siteLink}> {/* load */}
                      <div class="c-button__wrapper">
                        {Variable.lang.button.giveAnswer}
                      </div>
                    </a>
                  </div>
                </div>
              )
            })
            return arrReturn
          } else {
            return (
              <NotFound
              />
            )
          }
        }}



      </div>
      {() => {
        if (Variable[nameRecords] && Variable[nameRecords].list_records && Variable[nameRecords].totalFound) {
          if (Variable[nameRecords].list_records.length < Variable[nameRecords].totalFound) {
            return (
              <ButtonShowMore
                onclick={async () => {
                  let tmp = await api({ type: "get", action: "getQuestions", short: true, limit, filter: Helpers.getFilterQuestions(Static.filtersQuestions), sort: Helpers.getSortQuestions(Static.filtersQuestions), offset: Variable[nameRecords].list_records.length })
                  if (tmp && tmp.list_records) {
                    Variable[nameRecords].list_records.push(...tmp.list_records)
                  }
                  initReload()
                }}
              />
            )
          }
        }
      }}
    </div>
  );
};
export { BlockQuestions };
