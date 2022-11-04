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
    return (
        <div class="c-comments__usercomment">
            <Avatar
                author={item.author}
                parent={"c-comments__avacomment"}
                nickName={item.author.nickname}
                dateShow={item.showDate}
            />
            <div class="c-comments__bodycomment">
                <span class="c-comments__textcomment">
                    {Helpers.editText(item.text, { clear: true, paragraph: true, html: true })}
                </span>
            </div>
            <div class="c-comments__icons c-actioncomment">
                <Likes
                    rating={item.statistic.rating}
                />
                {() => {
                    if (Variable.auth) {
                        return (
                            <span
                                class="c-actioncomment__answer"
                            // onclick={() => {                               
                            //     initReload();
                            // }}
                            >
                                {Variable.lang.button.giveAnswer}
                            </span>
                        )

                    }
                }}
                {/* <AnswerAdditionallyToggleNew
          item={item}
          typeApi={typeSet}
          type={{
            delete: true,
            edit: true,
            complainComment: true,
            complainUser: true,
            blackList: true,
          }}
          commentId={commentId}
          mainId={mainId}
          callBack={callBack}
        /> */}
            </div>
            {() => {
                if (item.comments && item.comments.length) {
                    const arrReturn = item.comments.map(function (itemIn, i) {
                        return (
                            <Comment
                                item={itemIn}
                            />
                        )
                    })
                    return arrReturn
                }
            }}
        </div>
    );
};
export { Comment };
