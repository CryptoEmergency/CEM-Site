import {
  jsx,
  jsxFrag,
  Helpers,
  Variable,
  initReload
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'
import { InputAdaptive, Comment, NotFound } from "@component/element/index.js";

const BlockNewsShow = function ({ item }) {

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
        <InputAdaptive
          callBack={async (value) => {
            let response = await api({ type: "set", action: "setNews", data: { _id: item._id, value: { comments: { text: value } } } })
            if (response.status === "ok") {
              if (response.result && response.result.list_records && response.result.list_records[0]) {
                let newRes = response.result.list_records[0]
                item.comments.unshift(newRes)
                initReload();
              }
            } else {
              Variable.SetModals(
                {
                  name: "ModalAlarm",
                  data: {
                    icon: "alarm_icon",
                    text: Variable.lang.error_div[response.error],
                  },
                },
                true
              );
            }
          }}
        />
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
              <div data-type="news_comment" class="post_comments">
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
export { BlockNewsShow };
