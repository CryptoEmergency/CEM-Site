import {
  jsx,
  jsxFrag,
  Variable,
  stringToHtml,
  Helpers,
  initOne,
  initReload,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { Avatar, LentaMedia, ItemsMenu, Evaluation, TextArea, ButtonSubmit, Comment } from "@component/element/index.js";
import { BlockLentaUsers } from '@component/blocks/index.js';
import { api } from '@src/apiFunctions.js'
import { getDateFormat } from "@src/functions.js";



let Static = {}

const BlockShowLenta = function ({ Static, item }) {
  // Variable.Static.FooterShow = false
  initOne(() => {
    Static.mainComment = {
      rows: 1,
      adaptive: 4
    }
  })
  return (
    <div class="user_post_container">
      <div class="userNewsBlock">
        <div class="bl_one bl_active">
          <div class="user_news_block">
            <BlockLentaUsers
              Static={Static}
              item={item}

            />

            <h2>{Variable.lang.h.modal_comment}</h2>
            <div class="c-comments__form">
              <div class="c-comments__field create_post_container1">
                <TextArea
                  Static={Static.mainComment}
                  className="text1 create_post_chapter"
                />
              </div>
              <ButtonSubmit
                text={<img class="c-comments__icon" src={svg["send_message"]} />}
                className="c-comments__send button-container-preview"
                onclick={async (tmp, el) => {
                  if (!Static.mainComment.el.value.trim().length) {
                    return
                  }
                  let text = Static.mainComment.el.value.trim()
                  let response = await api({ type: "set", action: "setPost", data: { _id: item._id, value: { comments: { text: text } } } })
                  if (response.status === "ok") {
                    Static.mainComment.el.value = ""
                    if (Static.adaptive) {
                      Static.mainComment.el.style.height = (Static.mainComment.el.dataset.maxHeight / Static.adaptive) + 'px';
                    }
                    if (response.result && response.result.list_records && response.result.list_records[0]) {
                      let newRes = response.result.list_records[0]
                      item.comments.unshift(newRes)
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
                const arrReturn = item.comments.map(function (itemComments, i) {
                  return (
                    <Comment
                      item={itemComments}
                      mainId={item._id}
                      action="setPost"
                    />
                  )
                })
                return (
                  <div class="post_comments">
                    <div class="user_news_item">
                      {arrReturn}
                    </div>
                  </div>
                )
              } else {
                // return (<NotFound
                // />
                // )
              }
            }}


          </div>
        </div>
      </div>
    </div>
  )
}
export { BlockShowLenta };