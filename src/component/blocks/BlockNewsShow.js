import {
  jsx,
  jsxFrag,
  Helpers,
  Variable,
  sendApi,
  initReload
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'


import { If } from "@component/helpers/All.js";
import {
  CommentInput,
  InputAdaptive,
} from "@component/element/index.js";
import { BlockComment } from "@component/blocks/index.js";



const BlockNewsShow = function ({ item }) {


  const getItem = async function () {
    let tmp = await sendApi.send({ action: "getNews", short: true, filter: { _id: item._id }, limit: 1 });
    if (tmp.list_records.length) {
      Variable.Modals.map((item, index) => {
        if (item.name == "ModalFullSize") {
          item.data.item = tmp.list_records[0]
        }
      })
      initReload("modals")
    }
  }

  let mainId = item._id;


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

        <If
          data={item.comments.length > 0}
          dataIf={
            <div data-type="news_comment" class="post_comments">
              <div
                style={!item.comments && "display: none;"}
                class="user_news_item"
              >
                {/* <BlockComments
                                    comments={item.comments}
                                /> */}
                {/* <QuestionAnswerItemComment item = {item}  mainId={mainId} /> */}
                {
                  item.comments.map((item, index) => {
                    return (
                      <BlockComment
                        item={item}
                        index={index}
                        mainId={mainId}
                        callBack={getItem}
                      />
                    );
                  })
                }
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export { BlockNewsShow };
