import {
  jsx,
  jsxFrag,
  Variable,
  initReload
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { Comment, TextArea, ButtonSubmit, NotFound } from "@component/element/index.js";


const BlockShowNews = function ({ Static }) {

  return (
    <div>
      <div class="full_news_content"
        ElemVisible={() => {
          fn.recordsView(Static.item._id, "setNews")
        }}>
      
        <h1 class="full_news_name">{Static.item.title}</h1>
        {Static.item.image ? <img class="full_news_image" src={`/assets/upload/news/${Static.item.image}`} /> : null}
        {Static.item.preview ? <p class="full_news_text mrb30">{Static.item.preview}</p> : null}
        <p class="full_news_text mr20">{fn.editText(Static.item.text, { clear: true, paragraph: true, html: true })}</p>
        {Static.item.source ? <p class="full_news_disclaimer mr20">{Variable.lang.p.source}<a href={Static.item.source} rel="nofollow" target="_blank">{Static.item.source}</a></p> : null}
        <div style="display: flex" class="blog_post_stat">
          <p class="full_news_date">
            <img src={svg["question_views"]} /> {Static.item.statistic.view}
          </p>
          <p class="full_news_date">
            <img src={svg["question_answers"]} />
            {Static.item.statistic.comments}
          </p>
          <p class="full_news_date">{fn.getDateFormat(Static.item.showDate)}</p>
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
              let response = await fn.restApi.setNews.comment({ _id: Static.item._id, text })
              // let response = await api({ type: "set", action: "setNews", data: { _id: item._id, value: { comments: { text: text } } } })
              if (response.status === "ok") {
                Static.mainComment.el.value = ""
                if (Static.mainComment.adaptive) {
                  Static.mainComment.el.style.height = (Static.mainComment.el.dataset.maxHeight / Static.mainComment.adaptive) + 'px';
                }
                if (response.list_records[0]) {
                  let newRes = response.list_records[0]
                  Static.item.comments.unshift(newRes)
                  initReload();
                }
              }
            }}
          />
        </div>
        {
          !Static.item.comments || !Static.item.comments.length
            ?
            null
            // <NotFound />
            :
            <div class="post_comments">
              <div class="user_news_item">
                {Static.item.comments.map(function (itemComments, index) {
                  return (
                    <Comment
                      Static={Static}
                      item={itemComments}
                      index={index}
                      mainId={Static.item._id}
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