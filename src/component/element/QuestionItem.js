import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
// import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";
import moment from 'moment';

import { Avatar } from '@component/element/Avatar.js';

const getDateMoment = function(str, options) {	
	if(str){
		var new_str = str.replace(' ', 'T')
	}
	var secondsBefor = Math.round((moment().format('x') - moment(new_str).format('x'))/1000);  
	if (secondsBefor < 86400){
		return moment(new_str).lang(getStorage("lang")).fromNow()
	}else{
		return moment(new_str).lang(getStorage("lang")).format('DD MMMM YYYY')
	}
};

const QuestionItem = function ({ lang, question }) {
    // console.log("QuestionItem", lang, question);

    return (
        <div data-id="{{_id}}" class="question-block questionLoad">
            <div class="question_header">
                <div class="question_card_avatar">
                    <Avatar lang={lang} author={question.author} />
                </div>
                <div class="question_card_name">
                    <a
                        style="display: block; left: 5px;bottom:5px"
                        href={`/user/${question.author.nickname}`}
                        class="comment_avatar "
                    > {/* load */}
                        {question.author.nickname}
                    </a>
                    <div class="question_icons">
                        <div>
                            <img class="unstable_question_icons" src={svg.question_audio} />
                            <img class="unstable_question_icons" src={svg.question_video} />
                            <img class="unstable_question_icons" src={svg.question_photo} />
                        </div>
                        <div class="language_container "> {/* load */}
                            <div class="language-question">{lang.lang_orig}</div>
                        </div>
                    </div>
                </div>
            </div>
            <a
                style="display: block; margin-top: 10px;margin-bottom: 0;"
                href={`/question/show/${question.author_id}}`}
                class=""
            > {/* load */}
                <div class="preview-question">
                    <div>
                        <span class="cut_question_text">
                            {question.title}
                        </span>
                    </div>
                </div>
            </a>
            <div class="answers-questions">
                <div class="question_card_stats "> {/* load */}
                    <img src={svg.question_answers} />
                    {question.author.statistic.answer}
                </div>
                <div class="question_card_stats "> {/* load */}
                    <img src={svg.question_views} />
                    {question.author.statistic.view}
                </div>
                <div class="question_card_stats "> {/* load */}
                    <img src={svg.question_time} />
                    { getDateMoment(question.showDate) }
                </div>
            </div>
            <a href={`/question/show/${question.author_id}}`}>
                <div class="answer_button_container "> {/* load */}
                    <div class="answer_button">
                        {lang.button.giveAnswer}
                    </div>
                </div>
            </a>
        </div>
    )
}

export { QuestionItem }