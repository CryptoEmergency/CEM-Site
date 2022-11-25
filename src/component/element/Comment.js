import {
    jsx,
    jsxFrag,
    Variable,
    initReload
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import { Avatar, Evaluation, TextArea, ButtonSubmit, ItemsMenu } from "@component/element/index.js";

const Comment = function ({ Static, index, item, include, mainId, action, quoteId, mainItem }) {
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
                    {fn.editText(item.text, { clear: true, paragraph: true, html: true })}
                </span>
            </div>
            <div class="c-comments__icons c-actioncomment">
                <Evaluation Static={Static} item={item} index={index} action={action} comment={true} mainId={mainId} />
                {() => {
                    if (Variable.auth) {
                        return (
                            <span
                                class="c-actioncomment__answer"
                                onclick={() => {

                                    Object.keys(Static.secondComment.elShowInput).map((key) => {
                                        if (index != key && Static.secondComment.elShowInput[key].dataset.show) {
                                            Static.secondComment.elShowInput[key].removeAttribute("data-show")
                                            Static.secondComment.elShowInput[key].style = "display:none;"
                                        }
                                    });

                                    Static.secondComment.elShowInput[index].dataset.show = true
                                    Static.secondComment.elShowInput[index].style = "display:flex;"
                                    Static.secondComment.el[index].focus();

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
            <ItemsMenu author={item.author} items={fn.itemsMenu.comment(Static, item, action, index)} />
            </div>
            <div class="c-comments__form"
                style="display:none;"
                Element={($el) => { Static.secondComment.elShowInput[index] = $el; }}>
                <div class="c-comments__field create_post_container1">
                    <TextArea
                        Static={Static.secondComment}
                        index={index}
                        className="text1 create_post_chapter"
                    />
                </div>
                <ButtonSubmit
                    text={<img class="c-comments__icon" src={svg["send_message"]} />}
                    className="c-comments__send button-container-preview comments_send"
                    onclick={async () => {
                        if (!Static.secondComment.el[index].value.trim().length) {
                            return
                        }
                        let text = item.author.nickname + ", " + Static.secondComment.el[index].value.trim()
                        let response = await fn.restApi["set" + action].comment({ _id: item._id, text, mainId, quoteId })
                        if (response.status === "ok") {
                            Static.secondComment.el[index].value = ""
                            if (Static.secondComment.adaptive) {
                                Static.secondComment.el[index].style.height = (Static.secondComment.el[index].dataset.maxHeight / Static.secondComment.adaptive) + 'px';
                            }
                            if (response.list_records[0]) {
                                let newRes = response.list_records[0]
                                if (include) {
                                    mainItem.comments.unshift(newRes)
                                } else {
                                    item.comments.unshift(newRes)
                                }
                                if (Static.secondComment.elShowInput[index]) {
                                    Static.secondComment.elShowInput[index].style = "display:none;"
                                }
                                initReload();
                            }
                        }
                    }}
                />
            </div>
            {
                item.comments && item.comments.length
                    ?
                    item.comments.map(function (itemIn, indexIn) {
                        return (
                            <Comment
                                Static={Static}
                                item={itemIn}
                                mainItem={item}
                                mainId={mainId}
                                quoteId={item._id}
                                include={true}
                                action={action}
                                index={"in" + String(index) + String(indexIn)}
                            />
                        )
                    })
                    :
                    null
            }
        </div>
    );
};
export { Comment };
// OK
