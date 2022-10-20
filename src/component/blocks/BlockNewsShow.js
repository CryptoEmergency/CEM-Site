import { jsx, jsxFrag, Helpers, Variable, sendApi, initReload } from "@betarost/cemjs";

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

        <If
        data={
          Variable.Static.activeInputId.length === 0 &&
          Variable.Static.EditInput.length === 0 
        }
        dataIf ={
           <CommentInput item={item} typeSet="setNews" callBack={getItem} />
        }
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
                <Map
                  data={item.comments}
                  dataIf={(item, index) => {
                    return (
                      <BlockComment
                        item={item}
                        index={index}
                        mainId={mainId}
                        callBack={getItem}
                      />
                    );
                  }}
                />
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
