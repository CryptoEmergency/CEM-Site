import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";

import { Avatar } from '@component/element/Avatar.js';
import { If } from '@component/helpers/All.js';
import { ifHaveMedia } from '@src/functions.js';


const sliceString = function (str) {
    let sliceStr = '';
    if (str.length >= 66) {
        sliceStr = `${str.slice(0, 66)} ...`;
    } else {
        sliceStr = str;
    }
    return sliceStr;
};

const QuestionItem = function ({ question }) {

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
                            <div class="c-question__lang language-question">{Variable.lang.lang_orig}</div>
                        </div>
                    </div>
                </div>
            </div>
            <a
                style=""
                href={`/question/show/${question._id}`}
                class="c-question__body"
                onclick={Helpers.siteLink}
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
}

export { QuestionItem }