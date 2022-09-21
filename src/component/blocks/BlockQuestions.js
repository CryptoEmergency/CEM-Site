import {
    jsx,
    jsxFrag,
    Variable,
    initReload
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { QuestionItem } from '@component/element/QuestionItem.js';
import { Select } from '../element/Select.js';

const BlockQuestions = function ({ questions }) {
    console.log("BlockQuestions", questions);

    // let options = {
    //     questions: [
    //         { value: Variable.lang.select.showAllQuestions },
    //         { value: Variable.lang.select.openQuestions },
    //         { value: Variable.lang.select.closeQuestions },
    //         { value: Variable.lang.select.bestQuestions }
    //     ],
    //     date: [
    //         { value: Variable.lang.select.byDate },
    //         { value: Variable.lang.select.byViews },
    //         { value: Variable.lang.select.byAnswers },
    //     ]
    // }
    // let sortSelects = {
    //     selectBlockQuestions1: options.questions[0].value,
    //     selectBlockQuestions2: options.date[0].value,
    // }


    // const changeSelect = (e, type, value,) => {
    //     e.stopPropagation()
    //     let show = getValue(ID, "showObject")[type]
    //     if (e.target.localName === "li") {
    //         let tmp = { ...sortSelects, [type]: value };
    //         sortSelects = { ...tmp };
    //     }
    //     setValue(ID, "showObject", { [type]: !show });
    // }



    return (

        <div class="c-questions">
            <div class="c-questions__header">
                <p class="c-questions__title info-text-questions"></p>
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

                    {/* <Select
                        options={options.questions}
                        changeSelect={changeSelect}
                        type="selectBlockQuestions1"
                        selectObject={sortSelects}
                        ID={ID}
                        selectTitle="Сортировать"
                    /> */}
                    {/* <Select
                        options={options.date}
                        changeSelect={changeSelect}
                        type="selectBlockQuestions2"
                        selectObject={sortSelects}
                        ID={ID}
                        selectTitle="Сортировать"
                    /> */}
                    {/* <div class="profit_calculator_inputs_container">
                        <span>{Variable.lang.span.sort}</span>
                        <select class="justselect" id="statusQuestions">
                            <option selected="selected" value="all">{Variable.lang.select.showAllQuestions}</option>
                            <option value="open">{Variable.lang.select.openQuestions}</option>
                            <option value="closed">{Variable.lang.select.closeQuestions}</option>
                            <option value="best">{Variable.lang.select.bestQuestions}</option>
                        </select>
                    </div>
                    <div class="profit_calculator_inputs_container">
                        <span>{Variable.lang.span.sort}</span>
                        <select class="justselect" id="sortQuestions">
                            <option selected="selected" value="date">{Variable.lang.select.byDate}</option>
                            <option value="views">{Variable.lang.select.byViews}</option>
                            <option value="answers">{Variable.lang.select.byAnswers}</option>
                        </select>
                        <img data-sort="DESC" class="filter_sort_toggler" data-action="toggleFilterSort" src={svg.filter_arrow_bottom}/>
                    </div> */}
                    <div class="questions_filter_language">
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
                            <></>
                            // <QuestionItem question={item} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export { BlockQuestions }