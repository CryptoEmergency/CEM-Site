import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";


import { If, Map } from '@component/helpers/All.js';
import { ifHaveMedia } from '@src/functions.js';
import { Avatar } from '@component/element/index.js';

const QuestionAnswers = function ({ items }) {


    return (
        <Map
            data={items}
            dataIf={(item, index) => {
                return (
                    <div style={[item.best ? "order: -1; border-color: #00E741" : null]} class="user_news_item">
                        <div class="main_comment">
                            <Avatar
                                author={item.author}
                                nickName={item.author.nickname}
                            />
                            <div class="comment_body">
                                <span class="comment_text">{Helpers.clearText(item.text)}</span>
                                {/* Media element */}
                                <If
                                    data={Variable.auth}
                                    dataIf={
                                        <span class="answer_comment_button" >{Variable.lang.button.giveAnswer}</span>
                                    }
                                />

                                <div class="comment_icons">
                                    <div class="comment_icon_type-2">
                                        <img src={svg["dislike"]} class="comment_icon_type-2-1 minus" />
                                    </div>
                                    <div class="comment_likes">
                                        {item.statistic.rating}
                                    </div>
                                    <div class="comment_icon_type-2">
                                        <img src={svg["like"]} class="comment_icon_type-2-1 plus " />
                                    </div>
                                    <div class="comment_icon_type-1 answer_additionally_toggle {{#if data.userInfo.auth}}{{else}}comment_inactive{{/if}}" data-action="answerAdditionallyToggle">
                                        <img class="answer_additionally_toggle_img" src={svg["points"]} />

                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                )
            }}
        />
    )
}

export { QuestionAnswers }