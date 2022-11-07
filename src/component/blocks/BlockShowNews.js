import {
  jsx,
  jsxFrag,
  Helpers,
  Variable,
  initReload,
  initOne
} from "@betarost/cemjs";
//check
import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'
import { Comment, TextArea, ButtonSubmit } from "@component/element/index.js";

let Static = {}

const BlockShowNews = function ({ item }) {


  initOne(() => {
    Static.mainComment = {
      rows: 1,
      adaptive: 4
    }
  })
  return (
    <div>
      <div class="full_news_content">
        <h1 class="full_news_name">{item.title}</h1>
        {item.image ? <img class="full_news_image" src={`/assets/upload/news/${item.image}`} /> : null}
        <p class="full_news_text mrb30">{item.preview}</p>
        <p class="full_news_text mr20">{Helpers.editText(item.text, { clear: true, paragraph: true, html: true })}</p>
        {item.source ? <p class="full_news_disclaimer mr20">{Variable.lang.p.source}<a href={item.source} rel="nofollow" target="_blank">{item.source}</a></p> : null}
        <div style="display: flex" class="blog_post_stat">
          <p class="full_news_date">
            <img src={svg["question_views"]} /> {item.statistic.view + 1}
          </p>
          <p class="full_news_date">
            <img src={svg["question_answers"]} />
            {item.statistic.comments}
          </p>
          <p class="full_news_date">{Helpers.getDateFormat(item.showDate)}</p>
        </div>
      </div>
      <div class="news_page_comments">
        <h2>{Variable.lang.h.modal_comment}</h2>
        <div class="c-comments__form create_post_coments">
          <div class="c-comments__field create_post_container1">
            <TextArea
              Static={Static.mainComment}
              className="text1 create_post_chapter"
            />
          </div>
          <ButtonSubmit
            text={<img class="c-comments__icon" src={svg["send_message"]} />}
            className="c-comments__send button-container-preview comments_send"
            onclick={async (tmp, el) => {
              if (!Static.mainComment.el.value.trim().length) {
                return
              }
              let text = Static.mainComment.el.value.trim()
              let response = await api({ type: "set", action: "setNews", data: { _id: item._id, value: { comments: { text: text } } } })
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
                  action="setNews"
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
  );
};
export { BlockShowNews };
