import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initOne,
  Helpers
} from "@betarost/cemjs";
// check
import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'
import { Select, ButtonShowMore, NotFound, Avatar } from '@component/element/index.js';
import { Input } from '@component/element/index.js';



const BlockQuestions = async function ({ Static, nameRecords, limit = 21}) {

  const change = async function (arg) {
    let filters = {}
    let value = arg
    filters.$text = { $search: value }
    let response = await api({ type: "get", action: "getQuestions", short: true, filter: filters })
    Variable[nameRecords] = response
    if (Static.quest.value.length == 0) {
   

      await api({ type: "get", action: "getQuestions", short: true, cache: true, name: nameRecords, limit, filter: Helpers.getFilterQuestions(Static.filtersQuestions), sort: Helpers.getSortQuestions(Static.filtersQuestions) })

    }
    if (Static.quest.value.length > 0) {
      Static.newFilter = {}            
      Static.newFilter.$text = { $search: Static.quest.value }

    }   
  }


  await initOne(async () => {
  Static.newFilter = Helpers.getFilterQuestions(Static.filtersQuestions);
  Static.newQustion = Helpers.getSortQuestions(Static.filtersQuestions);
  Static.newQustion.sort = ""

  
  



    Static.quest = {
      value: "",
      label: "",
      condition: async (value) => {
        change(value)
        return true
      }
    }

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
        asort: -1,
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
        {
          () => {
            if(Variable.dataUrl.adress == 'question') {
              return (
                <div>
                  <h4>{Variable.lang.h.lastQuestions}</h4>
                  <p>{Variable.lang.p.addQuestionsSlog}</p>
                </div>
              )
            }
          }
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
            Static.elShowFilter = $el
          }}
        >
          <Select
            options={Static.optionsSelect.questions}
            callback={
              async (active, nameOptions) => {
          
                Static.filtersQuestions[nameOptions].value = active 
                if(active == 'all')
                {
               
           
                 delete Static.newFilter.close
                }  
                   
                    if(active == 'open')
                    {
                   
               
                      Static.newFilter.close = false
                    }
                    if(active == 'close')
                    {
              
                    }
                    if(active == 'best')
                    {
              
                    }
                    

                await api({ type: "get", action: "getQuestions", short: true, name: nameRecords, limit, filter: Static.newFilter, sort: Static.newQustion.sort })
                // initReload();
              }
            }
          />
          <Select
            options={Static.optionsSelect.date}
            toggler={true}
            callback={
              
              async (active, nameOptions) => {
          
         if(active){
          Static.filtersQuestions[nameOptions].value = active
         }

         if(Static.filtersQuestions.date.value == 'date')
        {
          Static.newQustion.sort = ""
          Static.newQustion.sort = {showDate: Static.optionsSelect.date.asort}
        }
        if(Static.filtersQuestions.date.value == 'views')
        {
          Static.newQustion.sort = ""
          Static.newQustion.sort = {"statistic.view":Static.optionsSelect.date.asort}
        }
        if(Static.filtersQuestions.date.value == 'answers')
        {
          Static.newQustion.sort = ""
          Static.newQustion.sort = {"statistic.answer":Static.optionsSelect.date.asort}
        }
        console.log(Static.filtersQuestions)
           
                await api({ type: "get", action: "getQuestions", short: true, name: nameRecords, limit, filter: Static.newFilter, sort: Static.newQustion.sort })
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
                    await api({ type: "get", action: "getQuestions", short: true, name: nameRecords, limit, filter: Static.newFilter, sort: Static.newQustion.sort })
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
                          <img class={["c-question__icon", Helpers.ifHaveMedia(question.media, "audio") ? "c-question__icon--active" : null]} src={svg.question_audio} />
                          <img class={["c-question__icon", Helpers.ifHaveMedia(question.media, "video") ? "c-question__icon--active" : null]} src={svg.question_video} />
                          <img class={["c-question__icon", Helpers.ifHaveMedia(question.media, "image") ? "c-question__icon--active" : null]} src={svg.question_photo} />
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
                  >
                    <div class="c-question__preview">
                      <span class="">
                        {Helpers.sliceString(question.title, 66)}
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
                      {Helpers.getDateFormat(question.showDate, "now")}
                    </div>
                  </div>
                  <div class="c-question__footer">
                    <a
                      class="c-button c-button--outline2 "
                      href={`/question/show/${question._id}`}
                      onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.span.QA, item: question }) }}
                    >
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
                 
                 
                  let tmp = await api({ type: "get", action: "getQuestions", short: true, limit, filter: Static.newFilter, sort: Static.newQustion.sort, offset: Variable[nameRecords].list_records.length })
              
                  if (tmp && tmp.list_records) {
                    Variable[nameRecords].list_records.push(...tmp.list_records)
                    Variable[nameRecords].totalFound = tmp.totalFound
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
