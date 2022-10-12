import {
    jsx,
    jsxFrag,
    Variable,
    getStorage,
    initReload,
    initOne,
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import { QuestionItem } from '@component/element/QuestionItem.js';
import { Select } from '../element/Select.js';
import { If } from '@component/helpers/All.js';

let optionsSelect, showFilter

const BlockQuestions = function (data) {

    initOne(
        async () => {
            let filters = getStorage("filters")
            showFilter = false;
            optionsSelect = {
                questions: {
                    nameOptions: "questions",
                    title: Variable.lang.span.sort,
                    items: [
                        { text: Variable.lang.select.showAllQuestions, value: "all" },
                        { text: Variable.lang.select.openQuestions, value: "open" },
                        { text: Variable.lang.select.closeQuestions, value: "closed" },
                        { text: Variable.lang.select.bestQuestions, value: "best" }
                    ],
                    open: false,
                    active: filters.MainQuestions.questions
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
                    active: filters.MainQuestions.date
                }
            }
        }
    )

    return (
        <div class="c-questions">
            <div class="c-questions__header">
                <div class="c-questions__searchblock c-search">
                    <div class="c-search__container">
                        <div class="c-search__wrapper">
                            <img class="c-search__icon" src={svg.search_icon} />
                            <input class="c-search__input" type="text" placeholder={Variable.lang.placeholder.question} autocomplete="disabled" readonly />
                            <img class="c-search__icon c-search__icon--filter" src={svg.filter} onClick={() => { showFilter = !showFilter; initReload() }} />
                        </div>
                        <div style="display: none;" class="questions_search">
                            <div class="question_search_half_empty">
                                {Variable.lang.text.contInput}
                            </div>
                            <div style="display: none;" class="question_search_help">
                            </div>
                        </div>
                    </div>
                    <div
                        class="mobile_search_container"
                        onclick={() => {
                            Variable.SetModals({ name: "ModalAskQuestion", data: {} })
                        }}
                    >
                        <div class="search-button" style="width:238px;">
                            {Variable.lang.button.giveQuestion}
                        </div>
                    </div>
                </div>
                <div class={['c-questions__filter', 'questions_filter', showFilter ? 'c-questions__filter--openmobile' : null]} >
                    <Select
                        options={optionsSelect.questions}
                        callback={data.callBack}
                    />
                    <Select
                        options={optionsSelect.date}
                        callback={data.callBack}
                        toggler={true}
                    />
                    {/* <div class="c-questions__lang">
                        {Variable.languages[filters.MainQuestions.lang].lang_orig}
                    </div> */}
                </div>
                <h4>{Variable.lang.h.lastQuestions}</h4>
            </div>
            <div class="c-questions__list questions-blocks">
                {
                    data.items.list_records.map((item) => {
                        return (
                            <QuestionItem question={item} />
                        )
                    })
                }
            </div>
            <If
                data={data.button}
                dataIf={data.button}
            />
        </div>
    )
}
// I check
export { BlockQuestions }