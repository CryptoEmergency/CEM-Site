import {
    jsx,
    jsxFrag,
    Variable,
    stringToHtml
} from '@betarost/cemjs';
import { ProfileAboutMe } from '@component/element/user/ProfileAboutMe.js';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { numberFixWithSpaces } from '@src/functions.js';
import { getDateFormat } from '@src/functions.js'
import { Avatar } from '@component/element/Avatar.js';
import { If } from '@component/helpers/All.js'

const BlockUserProfileAnswers = function ({ lang, myInfo, userInfo, data, answers }) {
    const ListAnswers = Object.keys(answers.list_records).map(function (key) {
        return (
            <div class={answers.list_records[key].active ? 'your_answers_table_item' : 'your_answers_table_item deleted_question'}>
                    <div class="your_answers_main">
                        <div class="my_answers_title_block">
                            <Avatar author={answers.list_records[key].questionId.author} />
                            <div>
                                <a href={'/question/show/' + answers.list_records[key].questionId._id} data-action="link">
                                    <div class="user_question_title">
                                        {answers.list_records[key].questionId.title}
                                    </div>
                                </a>
                                <div>
                                    <div class="user_answer_created">
                                        <span>{getDateFormat(answers.list_records[key].questionId.showDate)}</span>
                                    </div>
                                </div>
                                <div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="your_answers_counter">
                        <span class="your_answers_counter_desc">{lang.tableTitle.comments}</span><span class="your_answers_counter_number">{answers.list_records[key].statistic.comments}</span>
                    </div>
                    <div class="your_answers_counter">
                        <span class="your_answers_counter_desc">{lang.tableTitle.rank}</span><span class="your_answers_counter_number">{answers.list_records[key].statistic.rating}</span>
                    </div>
                    <div class={answers.list_records[key].best ? 'your_answers_avatar your_answer_text_best' : 'your_answers_avatar'}>
                        <div class="your_answer_text">
                            {answers.list_records[key].text}
                        </div>
                    </div>
                    <If
                        data={answers.list_records[key].active}
                        dataIf={
                            <div data-action="yourAnswersOptional" class="your_answers_optional">
                                <img src={svg['points2']}/>
                                <div class="your_answers_menu dn">
                                    <div class="your_answers_menu_inner">
                                    <div data-action="answerAdditionallyItem" class="answer_additionally_item delete" data-answer-id="{{_id}}" data-type="answer">{lang.select.delete}</div>
                                    </div>
                                </div>
                            </div>
                        }
                        dataElse={
                            <div class="delete_question"></div>
                        }
                    />
                </div>
        )
    })

    return (
        <div data-touchmove="userProfileSlide" data-touchstart="userProfileSlideStart" data-touchend="userProfileSlideEnd" class="bl_one" id="UserInfoAnswers">
            <h2>{lang.h.sendAnswers}</h2>
            <div class="your_answers_table_labels">
                <span>{lang.tableTitle.question}</span>
                <span>{lang.tableTitle.comments}</span>
                <span>{lang.tableTitle.rank}</span>
                <span>{lang.tableTitle.answer}</span>
            </div>
            {ListAnswers}
        </div>
    )
}

export { BlockUserProfileAnswers };