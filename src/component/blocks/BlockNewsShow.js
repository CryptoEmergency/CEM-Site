import { jsx, jsxFrag, Helpers, Variable, sendApi } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If, Map } from "@component/helpers/All.js";
import {
  CommentInput,
  QuestionAnswerItemComment,
} from "@component/element/index.js";
import { BlockComment } from "@component/blocks/index.js";

const BlockNewsShow = function ({ item, type }) {
  if (!type || (type != "blog" && type != "news" && type != "media")) {
    return <></>;
  }
  let mainId = item._id;
  return (
    <div>
      <div class="full_news_content">
        <h1 class="full_news_name">{item.title}</h1>
        <If
          data={item.image}
          dataIf={
            <img
              class="full_news_image"
              src={`/assets/upload/news/${item.image}`}
            />
          }
        />
        <p class="full_news_text mrb30">{item.preview}</p>
        <p class="full_news_text mr20">{Helpers.clearText(item.text)}</p>
        <If
          data={item.source}
          dataIf={
            <p class="full_news_disclaimer mr20">
              {Variable.lang.p.source}
              <a href={item.source} rel="nofollow" target="_blank">
                {item.source}
              </a>
            </p>
          }
        />
        <div style="display: flex" class="blog_post_stat">
          <p class="full_news_date">
            <img src={svg["question_views"]} /> {item.statistic.view}
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
        <CommentInput item={item} />
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
                {/* <Map
                  data={item.comments}
                  dataIf={(item, index) => {
                    return (
                      <BlockComment
                        item={item}
                        index={index}
                        mainId={mainId}
                      />
                    );
                  }}
                /> */}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};
//I check
export { BlockNewsShow };
