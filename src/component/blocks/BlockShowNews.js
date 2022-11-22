import {
  jsx,
  jsxFrag,
  Variable,
  initReload
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { Comment, TextArea, ButtonSubmit, NotFound } from "@component/element/index.js";


const BlockShowNews = function ({ Static, item }) {
  return (
    <div>
      <div class="full_news_content"
        ElemVisible={() => {
          fn.recordsView(item._id, "setNews")
        }}>
        <h1 class="full_news_name">{item.title}</h1>
        {item.image ? <img class="full_news_image" src={`/assets/upload/news/${item.image}`} /> : null}
        {item.preview ? <p class="full_news_text mrb30">{item.preview}</p> : null }
        <p class="full_news_text mr20">{fn.editText(item.text, { clear: true, paragraph: true, html: true })}</p>
        {item.source ? <p class="full_news_disclaimer mr20">{Variable.lang.p.source}<a href={item.source} rel="nofollow" target="_blank">{item.source}</a></p> : null}
        <div style="display: flex" class="blog_post_stat">
          <p class="full_news_date">
            <img src={svg["question_views"]} /> {item.statistic.view}
          </p>
          <p class="full_news_date">
            <img src={svg["question_answers"]} />
            {item.statistic.comments}
          </p>
          <p class="full_news_date">{fn.getDateFormat(item.showDate)}</p>
        </div>
      </div>
      <div class="news_page_comments">
        <h2>{Variable.lang.h.modal_comment}</h2>
        <div class="c-comments__form">
          <div class="c-comments__field">
            <TextArea
              Static={Static.mainComment}
              className="text1 create_post_chapter"
            />
          </div>
          <ButtonSubmit
            text={<img class="c-comments__icon" src={svg["send_message"]} />}
            className="c-comments__send"
            onclick={async (tmp, el) => {
              if (!Variable.auth) {
                fn.modals.ModalNeedAuth()
                return
              }
              if (!Static.mainComment.el.value.trim().length) { return }
              let text = Static.mainComment.el.value.trim()
              let response = await fn.restApi.setNews.comment({ _id: item._id, text })
              // let response = await api({ type: "set", action: "setNews", data: { _id: item._id, value: { comments: { text: text } } } })
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
                      action="News"
                    />
                  )
                })}
              </div>
            </div>
        }
      </div>
    </div>
  );
};
export { BlockShowNews };
// OK