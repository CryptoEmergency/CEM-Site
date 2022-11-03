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
import { QuestionItem } from "@component/element/QuestionItem.js";
import { Select } from "../element/Select.js";
import { api } from '@src/apiFunctions.js'
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
    await api({ type: "get", action: "getQuestions", short: true, cache: true, name: name, limit: 6, filter: Helpers.getFilterQuestions(filters), sort: Helpers.getSortQuestions(filters)})
  });

  return (
    <div class="c-questions">
      <div class="c-questions__header">
        {()=>{
          if(version != undefined && version.adress == "question"){
            return(
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
                    filters.lang.name = `${ langName} (${langOrig})`;
                    filters.lang.code = langCode;
                    await api({ type: "get", action: "getQuestions", short: true, name: name, limit: 6, filter: Helpers.getFilterQuestions(filters), sort: Helpers.getSortQuestions(filters)})

                    // initReload()
                  },
                },
              });
            }}
          >
            {()=>{
              if(filters.lang.name == "all"){
                return(
                  Variable.lang.text.language
                )
              } else {
                return(
                  filters.lang.name
                )
              }
            }}
          </div>
        </div>
        {()=>{
          if(version == undefined || version.adress == ""){
            return(
              <h4>{Variable.lang.h.lastQuestions}</h4>
            )
          }
        }}
      </div>
      <div class="c-questions__list questions-blocks">
        {Variable[name].list_records.map((item) => {
          return <QuestionItem question={item} />;
        })}
      </div>
      {()=>{
        if(button){
          return(
            button
          )
        }
      }}
    </div>
  );
};
// I check
export { BlockQuestions };
