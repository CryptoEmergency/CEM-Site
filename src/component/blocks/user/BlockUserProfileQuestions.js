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

const BlockUserProfileQuestions = function ({ lang, myInfo, userInfo, data, questions }) {
    const ListQuestions = Object.keys(questions.list_records).map(function (key) {
        return (
            <div data-id={questions.list_records[key]._id} class={questions.list_records[key].active ? 'your_answers_table_item' : 'your_answers_table_item deleted_question'}>
                <div class="your_answers_main">
                    <a href={'/question/show/' + questions.list_records[key]._id } data-action="link">
                        <div class="user_question_title">
                            {questions.list_records[key].title}
                        </div>
                    </a>
                    <div>
                        <div class="user_answer_created">
                            <span>{getDateFormat(questions.list_records[key].showDate)}</span>
                        </div>
                    </div>
                </div>
                <div class="your_answers_counter">
                    <span class="your_answers_counter_desc">{lang.tableTitle.answers}</span><span class="your_answers_counter_number">{questions.list_records[key].statistic.answer}</span>
                </div>
                <div class="your_answers_counter">
                    <span class="your_answers_counter_desc">{lang.tableTitle.views}</span><span class="your_answers_counter_number">{questions.list_records[key].statistic.view}</span>
                </div>
                <If
                    data={questions.list_records[key].bestId}
                    dataIf={
                        <div class="your_answers_avatar">
                            <Avatar author={questions.list_records[key].author} />
                            <div class="your_answers_name">
                                <p>{questions.list_records[key].author.nickname}</p>
                                <p> </p>
                            </div> 
                        </div>
                    }
                    dataElse={
                        <div class="your_answers_avatar">
                            ---
                        </div>
                    }
                />
                <div class="your_answers_status">
                    <div class="your_answers_status_inner">
                        <If
                            data={questions.list_records[key].del}
                            dataIf={
                                <img src={svg['question_status_delete']}/>
                            }
                            dataElse={
                                <If
                                    data={questions.list_records[key].close}
                                    dataIf={
                                        <If
                                            data={questions.list_records[key].bestId}
                                            dataIf={
                                                <img src={svg['best_answer']}/>
                                            }
                                            dataElse={
                                                <img src={svg['closed_question']}/>
                                            }
                                        />
                                    }
                                    dataElse={
                                        <img src={svg['open_question']}/>
                                    }
                                />
                            }
                        />
                    </div>
                </div>
                <If
                    data={questions.list_records[key].del}
                    dataIf={
                        <div class="delete_question"></div>
                    }
                    dataElse={
                        <div data-action="yourAnswersOptional" class="your_answers_optional">
                            <img src={svg['points2']}/>
                            <div class="your_answers_menu dn">
                                <div class="your_answers_menu_inner">
                                    <a data-action="link" href={'/question/show/' + questions.list_records[key]._id }><div class="answer_additionally_item">{lang.select.selectBest}</div></a>
                                    <div data-action="answerAdditionallyItem" class="answer_additionally_item close" data-answer-id={questions.list_records[key]._id} data-type="question">{lang.select.closeQuestion}</div>
                                    <div data-action="answerAdditionallyItem" class="answer_additionally_item delete" data-answer-id={questions.list_records[key]._id} data-type="question">{lang.select.delete}</div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
        )
    })

    return (
        <div data-touchmove="userProfileSlide" data-touchstart="userProfileSlideStart" data-touchend="userProfileSlideEnd" class="bl_one" id="UserInfoQuestions">
            <h2>{lang.h.sendQuestions}</h2>
                <div class="your_answers_table_labels">
                    <span>{lang.tableTitle.question}</span>
                    <span>{lang.tableTitle.answers}</span>
                    <span>{lang.tableTitle.views}</span>
                    <span>{lang.tableTitle.bestanswer}</span>
                </div>
                <div class="your_answers_table">
                    {ListQuestions}
                </div>
        </div>
    )
}

export { BlockUserProfileQuestions };