import {
    jsx,
    jsxFrag,
    Helpers,
    Variable,
    sendApi
} from '@betarost/cemjs';

import svg from '@assets/svg/index.js';
import {
    Avatar,
    LentaMedia
} from '@component/element/index.js';

let elem = []
const BlockQuestionsShow = function ({ item }) {
    console.log('=2d92a9=', item)
    elem = []
    elem[0] = []
    return (
        <div class="answer_content">
            <div class="question_author_block">
                <Avatar author={item.author} nickName={item.author.nickname} />
            </div>
            <p class="question_title">{item.title}</p>
            <div class="question_text"> {Helpers.clearText(item.text)}</div>
            <LentaMedia
                items={item.media}
                numIndex={0}
                elem={elem}
                path={"/assets/upload/question/"}
            />
        </div>
    )
}
//I check
export { BlockQuestionsShow }