import {
    jsx,
    jsxFrag,
    Helpers,
    Variable
} from "@betarost/cemjs";

import {
    Avatar,
    Likes,
    CommentInput,
    AnswerAdditionallyToggleNew,
} from "@component/element/index.js";

const Comment = function ({ item }) {
    console.log('=4b99e7=', item)
    return (
        <div class="c-comments__usercomment">
            <Avatar
                author={item.author}
                parent={"c-comments__avacomment"}
                nickName={item.author.nickname}
                dateShow={item.showDate}
            />
            <div class="c-comments__icons c-actioncomment">
                <Likes
                    rating={item.statistic.rating}
                />
            </div>
        </div>
    );
};

export { Comment };
