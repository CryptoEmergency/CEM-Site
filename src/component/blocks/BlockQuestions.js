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
import { Select } from "../element/Select.js";
import { api } from '@src/apiFunctions.js'

import { Avatar } from '@component/element/Avatar.js';
import { If } from '@component/helpers/All.js';
import { ifHaveMedia, sliceString } from '@src/functions.js';
let optionsSelect, showFilter;

const BlockQuestions = async function ({
  version,
  callBack,
  button,
  filters,
  items,
  name
}) {
  await initOne(async () => {
    showFilter = false;
    optionsSelect = {
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
        active: filters.questions.value,
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
        active: filters.date.value,
      },
    };
    await api({ type: "get", action: "getQuestions", short: true, cache: true, name: name, limit: 6, filter: Helpers.getFilterQuestions(filters), sort: Helpers.getSortQuestions(filters) })
  });

  return (
    <div class="c-questions">
      <div class="c-questions__header">
        {() => {
          if (version != undefined && version.adress == "question") {
            return (
              <div>
                <h4>{Variable.lang.h.lastQuestions}</h4>
                <p class="info-text-questions">
                  {Variable.lang.p.addQuestionsSlog}
                </p>
              </div>
            )
          }
        }}
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
                  showFilter = !showFilter;
                  initReload();
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
          class={[
            "c-questions__filter",
            "questions_filter",
            showFilter ? "c-questions__filter--openmobile" : null,
          ]}
        >
          <Select options={optionsSelect.questions} callback={callBack} />
          <Select
            options={optionsSelect.date}
            callback={callBack}
            toggler={true}
          />
          {/* <div class="c-questions__lang">
                        {Variable.languages[filters.MainQuestions.lang].lang_orig}
                    </div> */}
          <div
            class="c-questions__lang"
            onclick={() => {
              Variable.SetModals({
                name: "ModalChangeLanguage",
                data: {
                  onclick: async (langCode, langName, langOrig) => {
                    filters.lang.name = `${langName} (${langOrig})`;
                    filters.lang.code = langCode;
                    await api({ type: "get", action: "getQuestions", short: true, name: name, limit: 6, filter: Helpers.getFilterQuestions(filters), sort: Helpers.getSortQuestions(filters) })

                    // initReload()
                  },
                },
              });
            }}
          >
            {() => {
              if (filters.lang.name == "all") {
                return (
                  Variable.lang.text.language
                )
              } else {
                return (
                  filters.lang.name
                )
              }
            }}
          </div>
        </div>
        {() => {
          if (version == undefined || version.adress == "") {
            return (
              <h4>{Variable.lang.h.lastQuestions}</h4>
            )
          }
        }}
      </div>
      <div class="c-questions__list questions-blocks">
        {Variable[name].list_records.map((question) => {
          return (
            <div class="c-questions__item c-question question-block questionLoad">
              <div class="c-question__header">
                <div class="c-question__avatar">
                  <Avatar author={question.author} />
                </div>
                <div class="c-question__name">
                  <a
                    style="display: block; left: 5px;bottom:5px"
                    href={`/user/${question.author.nickname}`}
                    onclick={Helpers.siteLink}
                    class="c-question__nickname"
                  > {/* load */}
                    {question.author.nickname}
                  </a>
                  <div class="c-question__info">
                    <div class="c-question__icons">
                      <If
                        data={question.close}
                        dataIf={<img
                          class="c-question__icon c-question__icon--status"
                          src={svg[`${(typeof question.bestId == "string") ? "best_answer" : "closed_question"}`]}
                        />}
                        dataElse={<img class="c-question__icon c-question__icon--status" src={svg.open_question} />}
                      />
                      <img class={`c-question__icon ${ifHaveMedia(question.media, "audio", "c-question__icon--active")}`} src={svg.question_audio} /> {/* c-question__icon--active */}
                      <img class={`c-question__icon ${ifHaveMedia(question.media, "video", "c-question__icon--active")}`} src={svg.question_video} />
                      <img class={`c-question__icon ${ifHaveMedia(question.media, "image", "c-question__icon--active")}`} src={svg.question_photo} />
                    </div>
                    <div class="c-question__langcontainer language_container "> {/* load */}
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
          );
        })}
      </div>
      {() => {
        if (button) {
          return (
            button
          )
        }
      }}
    </div>
  );
};
// I check
export { BlockQuestions };
