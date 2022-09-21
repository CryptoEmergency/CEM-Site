import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { QuestionItem } from '@component/element/QuestionItem.js';
import { Select } from '@component/element/Select.js';
import { mainQuestions } from "@src/apiFunctions.js";
import images from "@assets/images/index.js";
import { If } from '@component/helpers/All.js';

const BlockQuestions = function () {

    Variable.HeaderShow = true
    Variable.FooterShow = true

    let questions,
        totalRecords,
        nowShow,
        optionsSelect

    const selectCallBack = async function (value, nameOptions) {
        console.log("selectCallBack", value, nameOptions);
        if (nameOptions == "questions") {
            nowShow = 0
            const tmp = await mainQuestions(optionsSelect, 12, nowShow);
            nowShow += tmp.list_records.length
            totalRecords = tmp.totalFound
            questions = tmp.list_records
            initReload()
        } else if (nameOptions == "date") {
            nowShow = 0
            const tmp = await mainQuestions(optionsSelect, 12, nowShow);
            nowShow += tmp.list_records.length
            totalRecords = tmp.totalFound
            questions = tmp.list_records
            initReload()
        }
    }

    init(
        async () => {
            console.log("First Init")

            optionsSelect = {
                questions: {
                    nameOptions: "questions",
                    title: Variable.lang.span.sort,
                    items: [
                        { text: Variable.lang.select.showAllQuestions, value: "all", active: true },
                        { text: Variable.lang.select.openQuestions, value: "open" },
                        { text: Variable.lang.select.closeQuestions, value: "closed" },
                        { text: Variable.lang.select.bestQuestions, value: "best" }
                    ],
                    open: false,
                    active: "all"
                },
                date: {
                    nameOptions: "date",
                    title: Variable.lang.span.sort,
                    items: [
                        { text: Variable.lang.select.byDate, value: "date", active: true },
                        { text: Variable.lang.select.byViews, value: "views" },
                        { text: Variable.lang.select.byAnswers, value: "answers" },
                    ],
                    open: false,
                    active: "date"
                }

            }

            const tmp = await mainQuestions(optionsSelect, 12);
            nowShow = 12
            totalRecords = tmp.totalFound
            questions = tmp.list_records;
            //console.log("questions", questions);
        },
        () => {
            console.log("Second Init ", questions)

            return (

                <div class="c-questions">
                    <div class="c-questions__header">
                        <div class="c-questions__searchblock c-search">
                            <div class="c-search__container">
                                <div class="c-search__wrapper">
                                    <img class="c-search__icon" src={svg.search_icon} />
                                    <input class="c-search__input" type="text" placeholder={`${Variable.lang.placeholder.question}`} autocomplete="disabled" />
                                    <img class="c-search__icon c-search__icon--filter" src={svg.filter} />

                                </div>
                                <div style="display: none;" class="questions_search">
                                    <div class="question_search_half_empty">
                                        {Variable.lang.text.contInput}
                                    </div>
                                    <div style="display: none;" class="question_search_help">
                                    </div>
                                </div>
                            </div>
                            <div data-needauth="true" data-action="askQuestionModal" class="mobile_search_container">
                                <div class="search-button" style="width:238px;">
                                    {Variable.lang.button.giveQuestion}
                                </div>
                            </div>


                        </div>

                        <div class="c-questions__filter questions_filter">
                            <Select
                                options={optionsSelect.questions}
                                callback={selectCallBack}
                            />
                            <Select
                                options={optionsSelect.date}
                                callback={selectCallBack}
                                toggler={true}
                            />

                            <div class="c-questions__lang">
                                {Variable.lang.lang}
                            </div>
                        </div>

                        <h4>{Variable.lang.h.lastQuestions}</h4>


                    </div>

                    <div class="c-questions__list questions-blocks">
                        {
                            questions.map((item) => {
                                console.log("item=", item);
                                return (
                                    // <></>
                                    <QuestionItem question={item} />
                                )
                            })
                        }
                    </div>

                </div>
            )
        }
    )
}

export default BlockQuestions;