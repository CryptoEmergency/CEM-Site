import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi,
    Helpers
} from '@betarost/cemjs';

import svg from '@assets/svg/index.js';
import { If, Map } from '@component/helpers/All.js';
import { Avatar } from '@component/element/index.js';

const BlockUserProfilePage = {}



BlockUserProfilePage.questions = function (data) {
    if (!data || data.profilePage != "questions") {
        return (<></>)
    }

    initOne(
        () => {

        }
    )

    return (
        <div class="bl_one" id="UserInfoQuestions">
            <h2>{Variable.lang.h.sendQuestions}</h2>
            <div class="your_answers_table_labels">
                <span>{Variable.lang.tableTitle.question}</span>
                <span>{Variable.lang.tableTitle.answers}</span>
                <span>{Variable.lang.tableTitle.views}</span>
                <span>{Variable.lang.tableTitle.bestanswer}</span>
            </div>
            <div class="your_answers_table">
                <Map
                    data={data.items.list_records}
                    dataIf={(item, index) => {
                        console.log('=ff32ae=', item)
                        return (
                            <div class={["your_answers_table_item", !item.close ? 'deleted_question' : null]}>
                                <div class="your_answers_main">
                                    <a href={'/question/show/' + item._id} onclick={Helpers.siteLink}>
                                        <div class="user_question_title">
                                            {item.title}
                                        </div>
                                    </a>
                                    <div>
                                        <div class="user_answer_created">
                                            <span>{Helpers.getDateFormat(item.showDate, "time")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="your_answers_counter">
                                    <span class="your_answers_counter_desc">{Variable.lang.tableTitle.answers}</span><span class="your_answers_counter_number">{item.statistic.answer}</span>
                                </div>
                                <div class="your_answers_counter">
                                    <span class="your_answers_counter_desc">{Variable.lang.tableTitle.views}</span><span class="your_answers_counter_number">{item.statistic.view}</span>
                                </div>
                                <If
                                    data={item.bestId}
                                    dataIf={
                                        <div class="your_answers_avatar">
                                            <Avatar
                                                author={item.author}
                                            />
                                            <div class="your_answers_name">
                                                <p>{item.author.nickname}</p>
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
                                            data={item.del}
                                            dataIf={
                                                <img src={svg['question_status_delete']} />
                                            }
                                            dataElse={
                                                <If
                                                    data={item.close}
                                                    dataIf={
                                                        <If
                                                            data={item.bestId}
                                                            dataIf={
                                                                <img src={svg['best_answer']} />
                                                            }
                                                            dataElse={
                                                                <img src={svg['closed_question']} />
                                                            }
                                                        />
                                                    }
                                                    dataElse={
                                                        <img src={svg['open_question']} />
                                                    }
                                                />
                                            }
                                        />
                                    </div>
                                </div>
                                <If
                                    data={item.del}
                                    dataIf={
                                        <div class="delete_question"></div>
                                    }
                                    dataElse={
                                        <div class="your_answers_optional">
                                            <img src={svg['points2']} />
                                            {/* <div class="your_answers_menu dn">
                                                <div class="your_answers_menu_inner">
                                                    <a data-action="link" href={'/question/show/' + item._id}><div class="answer_additionally_item">{Variable.lang.select.selectBest}</div></a>
                                                    <div data-action="answerAdditionallyItem" class="answer_additionally_item close" data-answer-id={item._id} data-type="question">{Variable.lang.select.closeQuestion}</div>
                                                    <div data-action="answerAdditionallyItem" class="answer_additionally_item delete" data-answer-id={questions.list_records[key]._id} data-type="question">{Variable.lang.select.delete}</div>
                                                </div>
                                            </div> */}
                                        </div>
                                    }
                                />
                            </div>
                        )
                    }}
                />
            </div>
            <If
                data={data.items.list_records.length <data.items.list_records.totalFound}
                dataIf={
                  <div class="crypto_exchanges_footer">
                    <a class="btn-view-all-a"
                      onclick={async () => {
                        let tmp = await sendApi.send({ action: "getQuestions", short: true, limit: 12, offset: data.items.list_records.length })
                        Variable.PageExchange.list_records.push(...tmp.list_records)
                        initReload()
                      }
                      }
                    >
                      <div class="btn-view-all" >
                        <div>{Variable.lang.button.showMore}</div>
                      </div>
                    </a>
                  </div>
                }
              />
        </div>
    )
};

export { BlockUserProfilePage }