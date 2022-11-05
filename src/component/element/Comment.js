import {
    jsx,
    jsxFrag,
    Helpers,
    Variable,
    initReload
} from "@betarost/cemjs";

import {
    Avatar,
    Evaluation,
    Likes,
    CommentInput,
    AnswerAdditionallyToggleNew,
} from "@component/element/index.js";

import { api } from '@src/apiFunctions.js'

const Comment = function ({ item, include, mainId, action }) {
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
                <Evaluation
                    rating={item.statistic.rating}
                    callBackBefore={async (type) => {
                        let response = await api({ type: "set", action: action, data: { _id: mainId, value: { comments: { evaluation: type, _id: item._id } } } })
                        if (response.status === 'ok') {
                            if (type == "plus") {
                                item.statistic.rating++
                            } else {
                                item.statistic.rating--
                            }
                            initReload()
                        } else {
                            Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error] } }, true)
                        }
                    }}
                    callBackAfter={async (type) => {
                        let response = await api({ type: "get", action: "getComments", filter: { _id: item._id, }, select: { evaluation: 1, } })
                        let whoLike = []
                        if (response && response.result.list_records && response.result.list_records[0].evaluation && response.result.list_records[0].evaluation.length) {
                            whoLike = response.result.list_records[0].evaluation.filter(
                                (item) => item.type === type
                            );
                        }
                        Variable.SetModals({ name: "ModalWhoLike", data: { whoLike } }, true);
                    }}
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
                                mainId={mainId}
                                quoteId={item._id}
                                include={true}
                                action={action}
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
