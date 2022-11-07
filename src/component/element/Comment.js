import {
    jsx,
    jsxFrag,
    Helpers,
    Variable,
    initReload,
    initOne
} from "@betarost/cemjs";

import svg from '@assets/svg/index.js';
import {
    Avatar,
    Evaluation,
    TextArea,
    AnswerAdditionallyToggleNew,
    ButtonSubmit
} from "@component/element/index.js";

import { api } from '@src/apiFunctions.js'



const Comment = function ({ item, include, mainId, action, quoteId, mainItem }) {

    let Static = Variable.State(item._id)

    if (!Static.secondComment) {
        Static.secondComment = {
            rows: 1,
            adaptive: 4,
        }
    }
    // initOne(() => {
    //     Static.secondComment = {
    //         rows: 1,
    //         adaptive: 4,
    //     }
    // })
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
                        let response = await api({ type: "get", action: "getComments", filter: { _id: item._id }, select: { evaluation: 1, } })
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
                                onclick={() => {
                                    if (Static.secondComment.elShowInput) {
                                        Static.secondComment.elShowInput.style = "display:flex;"
                                    }
                                    return
                                }}
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
            <div class="c-comments__form create_post_coments"
                style="display:none;"
                Element={($el) => { Static.secondComment.elShowInput = $el; }}
            >
                <div class="c-comments__field create_post_container1">
                    <TextArea
                        Static={Static.secondComment}
                        className="text1 create_post_chapter"
                    />
                </div>
                <ButtonSubmit
                    text={<img class="c-comments__icon" src={svg["send_message"]} />}
                    className="c-comments__send button-container-preview comments_send"
                    onclick={async (tmp, el) => {
                        if (!Static.secondComment.el.value.trim().length) {
                            return
                        }
                        let text = Static.secondComment.el.value.trim()
                        let data = { _id: mainId, value: { comments: {} } }
                        if (!quoteId) {
                            data.value.comments._id = item._id
                            data.value.comments.comments = { text: text, quote: item._id }
                        } else {
                            data.value.comments._id = quoteId
                            data.value.comments.comments = { text: text, quote: quoteId }
                        }

                        let response = await api({ type: "set", action: action, data: data })
                        if (response.status === "ok") {
                            Static.secondComment.el.value = ""
                            if (Static.adaptive) {
                                Static.secondComment.el.style.height = (Static.secondComment.el.dataset.maxHeight / Static.adaptive) + 'px';
                            }
                            if (response.result && response.result.list_records && response.result.list_records[0]) {
                                let newRes = response.result.list_records[0]
                                if (include) {
                                    mainItem.comments.unshift(newRes)
                                } else {
                                    item.comments.unshift(newRes)
                                }

                                initReload();
                            }
                        } else {
                            Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                        }
                    }}
                />
            </div>
            {() => {
                if (item.comments && item.comments.length) {
                    const arrReturn = item.comments.map(function (itemIn, i) {
                        return (
                            <Comment
                                item={itemIn}
                                mainItem={item}
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
