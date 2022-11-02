import { jsx, jsxFrag, init, initReload, Variable, stringToHtml, getVariable, getStorage } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { getQuestionItemInShow } from "@src/apiFunctions.js";
import { If } from '@component/helpers/All.js';
import { getDateFormat } from "@src/functions.js";
import { BlockUserComment } from "@src/component/blocks/user/BlockUserComment.js";
import { Avatar } from "@component/element/Avatar.js";
import moment from 'moment';

const start = function () {
    Variable.HeaderShow = true;
    Variable.FooterShow = true;

    let question;

    const getDateMoment = function (str) {
        const lang = Variable.lang.code;
        if (str) {
            var new_str = str.replace(' ', 'T')
        }
        var secondsBefor = Math.round((moment().format('x') - moment(new_str).format('x')) / 1000);
        if (secondsBefor < 86400) {
            return moment(new_str).lang(lang).fromNow()
        } else {
            return moment(new_str).lang(lang).format('DD MMMM YYYY')
        }
    };

    init(
        async () => {
            const tmp = await getQuestionItemInShow(Variable.dataUrl.params)
            question = tmp.list_records[0]
            // console.log('=c8d77c=', question)
        },
        () => {
            return (
                <div
                    class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
                        }`}
                >
                    <div class="answer_container">
                        <div class="answer_block">
                            <div class="answer_content">
                                <div class="question_author_block">
                                    <Avatar author={question.author} nickName={question.author.nickname} dateShow={question.showDate} />
                                    <a href={`/user/${question.author.nickname}`} data-action="link" data-needauth="true">
                                        <div class="question_author_name">
                                            {question.author.nickname}
                                        </div>
                                    </a>
                                    <If
                                        data={question.close}
                                        dataIf={
                                            <div>
                                                {question.author._id != myInfo._id ?
                                                    <div class="comment_icons">
                                                        <div class="comment_icon_type-1 answer_additionally_toggle {{#if myInfo._id}}{{else}}comment_inactive{{/if}}" data-action="answerAdditionallyToggle">
                                                            <img class="answer_additionally_toggle_img" src={svg.points} />
                                                            <div class="answer_additionally_container">
                                                                <div class="answer_additionally">
                                                                    <div class="answer_additionally_item complain" data-action="answerAdditionallyItem" data-answer-id={question._id} data-type="question">{Variable.lang.select.complain}</div>
                                                                    {/* {{ #if data.myInfo.status.role }} */}
                                                                    <div style="color: #32DE80" class="answer_additionally_item delete" data-action="doRoleModal" data-answer-id={question._id} data-type="question">{Variable.lang.select.delete}</div>
                                                                    {/* {{/if}} */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                            </div>
                                        }
                                    />
                                    {/* {{ #if question.close }} */}

                                    {/* {{ else}} */}
                                    <div class="comment_icons">
                                        <div class="comment_icon_type-1 answer_additionally_toggle {{#if myInfo._id}}{{else}}comment_inactive{{/if}}" data-action="answerAdditionallyToggle">
                                            <img class="answer_additionally_toggle_img" src="/assets/icon/points.svg" />
                                            <div class="answer_additionally_container">
                                                <div class="answer_additionally">
                                                    {/* {{ #is question.author._id myInfo._id }} */}
                                                    <div class="answer_additionally_item close" data-action="answerAdditionallyItem" data-answer-id={question._id} data-type="question">{Variable.lang.select.closeQuestion}</div>
                                                    {/* {{ #if question.statistic.answer }} */}
                                                    {/* {{ else}} */}
                                                    <div class="answer_additionally_item edit" data-action="answerAdditionallyItem" data-answer-id={question._id} data-type="question">{Variable.lang.button.edit}</div>
                                                    <div class="answer_additionally_item delete" data-action="answerAdditionallyItem" data-answer-id={question._id} data-type="question">{Variable.lang.select.delete}</div>
                                                    {/* {{/if}} */}
                                                    {/* {{ else}} */}
                                                    <div class="answer_additionally_item complain" data-action="answerAdditionallyItem" data-answer-id={question._id} data-type="question">{Variable.lang.select.complainQuestion}</div>
                                                    <div class="answer_additionally_item complain" data-action="answerAdditionallyItem" data-answer-id={question.author._id} data-type="user">{Variable.lang.select.complainUser}</div>
                                                    <div class="answer_additionally_item block" data-action="answerAdditionallyItem" data-answer-id={question.author._id} data-type="user">{Variable.lang.select.blackList}</div>
                                                    {/* {{/ is}} */}
                                                    {/* {{ #if data.myInfo.status.role }} */}
                                                    <div style="color: #32DE80" class="answer_additionally_item delete" data-action="doRoleModal" data-answer-id="{{question._id}}" data-type="question">{Variable.lang.select.delete}</div>
                                                    {/* {{/if}} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {{/if}} */}


                                    {/* {{ #is myInfo.role 1}} */}
                                    {/* {{ #is myInfo.role_settings.del_question 1}} */}
                                    <div class="acp_block">
                                        <img data-action="acpSiteShow" class="acp_image" src={svg.points_green} />
                                        <div style="display: none;" class="acp_inner">
                                            <div class="acp_inner_item" data-type="dlt_question" data-id="{{question._id}}" data-action="acpAction">
                                                Удалить вопрос
                                            </div>
                                        </div>
                                    </div>
                                    {/* {{/ is}} */}
                                    {/* {{/ is}} */}
                                </div>
                                <p class="question_title">{question.title}</p>
                                <div class="question_text">{question.text}</div>

                                {/* {{ #if question.media }} */}
                                {/* {{ #if(ArrayLengthOne question.media)}} */}
                                <div class="swiper-container">
                                    <div class="swiper swiper-post_media">
                                        <div class="swiper-wrapper">
                                            {/* {{ #arrayWhile question.media }} */}
                                            {/* {{ #is type "audio"}} */}
                                            {/* {{ else}} */}
                                            <a class="swiper-slide">
                                                {/* {{ #is type "image"}} */}
                                                <div class="swiper-post_media_image_container">
                                                    {/* {{!-- < img data-action="fullSize" src="/assets/upload/question/{{ name }}"> --}} */}
                                                    <img src={`svg["/upload/question/${name}"]`} />
                                                </div>
                                                {/* {{/ is}} */}
                                                {/* {{ #is type "video"}} */}
                                                {/* {{> videoPlayer src=name path="/assets/upload/question/"}} */}
                                                {/* {{/ is}} */}
                                            </a>
                                            {/* {{/ is}} */}
                                            {/* {{/ arrayWhile}} */}
                                        </div>
                                        <div class="swiper-pagination swiper-pagination-post_media"></div>
                                        <div class="swiper-scrollbar-post_media"></div>
                                    </div>
                                </div>
                                {/* {{ else}} */}
                                {/* {{ #arrayWhile question.media }} */}
                                {/* {{ #is type "audio"}} */}
                                {/* {{ else}} */}
                                {/* {{ #is type "image"}} */}
                                <div class="swiper-post_media_image_container">
                                    {/* {{!-- < img data-action="fullSize" src="/assets/upload/question/{{ name }}"> --}} */}
                                    <img src="/assets/upload/question/{{ name }}" />
                                </div>
                                {/* {{/ is}} */}
                                {/* {{ #is type "video"}} */}
                                {/* {{> videoPlayer src=name path="/assets/upload/question/"}} */}
                                {/* {{/ is}} */}
                                {/* {{/ is}} */}
                                {/* {{/ arrayWhile}} */}
                                {/* {{/if}} */}

                                <div class="post_audio_container">
                                    {/* {{ #arrayWhile question.media }} */}
                                    {/* {{ #is type "audio"}} */}
                                    {/* {{> audioPlayer src=name path="/assets/upload/question/"}} */}
                                    {/* {{/ is}} */}
                                    {/* {{/ arrayWhile}} */}
                                </div>
                                {/* {{/if}} */}


                                <div class="answers_block">
                                    <p> <img src="/assets/icon/question_answers.svg" /> <b>{question.statistic.answer}</b></p>
                                    <p> <img src="/assets/icon/question_views.svg" /> <b>{question.statistic.view}</b></p>
                                    <p> <img src="/assets/icon/question_time.svg" /> <b>{getDateMoment(question.showDate)}</b> </p>
                                    {/* {{ #if myInfo._id }} */}
                                    {/* {{ #is question.author._id myInfo._id }} */}

                                    {/* {{ else}} */}
                                    {/* {{ #notif question.close }} */}
                                    <div data-action="answerModal" class="btn-answer" data-needauth="true">
                                        <a class="btn-gr-answer"><span>{Variable.lang.button.giveAnswer}</span></a>
                                    </div>
                                    {/* {{/ notif}} */}
                                    {/* {{/ is}} */}
                                    {/* {{/if}} */}
                                </div>


                                <div class="user_news_block">
                                    {/* {{> answers}} */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
};

export default start;
