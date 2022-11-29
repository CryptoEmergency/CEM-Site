import {
  jsx,
  jsxFrag,
  initReload,
  Variable,
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { TextArea, ButtonSubmit, Comment, NotFound } from "@component/element/index.js";
import { BlockLentaUsers } from '@component/blocks/index.js';

const BlockShowLenta = function ({ Static, item }) {
  return (
    <div class="user_post_container">
      <div class="userNewsBlock">
        <div class="bl_one bl_active">
          <div class="user_news_block">
            <BlockLentaUsers
              Static={Static}
              item={item}
              ElemVisible={() => {
                fn.recordsView(item._id, "setPost")
              }} />
            <div class="c-comments__form">
              <div class="c-comments__field create_post_container1">
                <TextArea
                  Static={Static.mainComment}
                  className="text1 create_post_chapter"
                />
              </div>
              <ButtonSubmit
                Static={Static}
                text={<img class="c-comments__icon" src={svg["send_message"]} />}
                className="c-comments__send button-container-preview"
                onclick={async () => {
                  if (!Variable.auth) {
                    fn.modals.ModalNeedAuth()
                    return
                  }
                  if (!Static.mainComment.el.value.trim().length) { return }
                  let text = Static.mainComment.el.value.trim()
                  let response = await fn.restApi.setPost.comment({ _id: item._id, text })
                  if (response.status === "ok") {
                    Static.mainComment.el.value = ""
                    if (Static.mainComment.adaptive) {
                      Static.mainComment.el.style.height = (Static.mainComment.el.dataset.maxHeight / Static.mainComment.adaptive) + 'px';
                    }
                    if (response.list_records[0]) {
                      let newRes = response.list_records[0]
                      item.comments.unshift(newRes)
                      initReload();
                    }
                  }
                }}
              />
            </div>
            {
              !item.comments || !item.comments.length
                ?
                null
                // <NotFound />
                :
                <div class="post_comments">
                  <div class="user_news_item">
                    {item.comments.map(function (itemComments, index) {
                      return (
                        <Comment
                          Static={Static}
                          item={itemComments}
                          index={index}
                          mainId={item._id}
                          mainItem={item}
                          action="Post"
                        />
                      )
                    })}
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export { BlockShowLenta };
// OK