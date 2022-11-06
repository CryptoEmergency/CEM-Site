import {
  jsx,
  jsxFrag,
  Variable,
  init,
  Helpers,
  sendApi,
  getStorage,
  initReload
} from "@betarost/cemjs";

import { api } from '@src/apiFunctions.js'
import svg from '@assets/svg/index.js';
import { BlockQuestionsShow } from '@component/blocks/index.js';
import { QuestionAnswerItem } from '@component/element/index.js';
import { Avatar, LentaMedia } from "@component/element/index.js";

const start = function (data, ID) {
  let item, itemAnswer, itemID;
  init(
    async () => {
      if (data && data.item) {
        item = data.item
        if (data.item._id) {
          itemID = data.item._id
        }
      } else {
        if (data && data.itemID) {
          itemID = data.itemID
        } else {
          itemID = Variable.dataUrl.params
        }
        let response = await api({ type: "get", action: "getQuestions", short: true, limit: 1, filter: { _id: itemID } })
        if (response && response.list_records && response.list_records[0]) {
          item = response.list_records[0]
        } else {
          item = []
        }
      }
    },
    async () => {
      return (
        <div class="answer_container c-main__body">
          <div class="answer_block" style="flex-direction: column;">
            <div class="answer_content">
              <div class="question_author_block">
                <Avatar author={item.author} nickName={item.author.nickname} />
              </div>
              <p class="question_title">{item.title}</p>
              <div class="question_text"> {Helpers.clearText(item.text)}</div>
              <LentaMedia
                items={item.media}
                numIndex={0}
                path={"/assets/upload/question/"}
              />
              <div class="post_audio_container"></div>
              <div class="answers_block">
                <p>
                  <img src={svg["question_answers"]} /> <b>{item.statistic.answer}</b>
                </p>
                <p>
                  <img src={svg["question_views"]} /> <b>{item.statistic.view}</b>
                </p>
                <p>
                  <img src={svg["question_time"]} />{" "}
                  <b>{Helpers.getDateFormat(item.showDate, "lenta")}</b>{" "}
                </p>
                {/* {buttonAnswer} */}
              </div>
            </div>
            {/* <BlockQuestionsShow
              itemsAnswers={itemAnswer}

              item={item}
              callBackAnswer={
                async () => {
                  let answer = await api({ type: "get", action: "getAnswers", short: true, filter: { questionId: itemID } })
                  itemAnswer = answer.list_records
                  initReload()
                }
              }
              type={"question"}
            /> */}


            {/* <div class="user_news_block">
              {
                () => {
                  if (!itemAnswer) {

                    setTimeout(async function () {
                      let answer = await api({ type: "get", action: "getAnswers", short: true, filter: { questionId: itemID } })
                      itemAnswer = answer.list_records
                      initReload()
                    }, 1000)
                    return (
                      <img src={svg['load']} />
                    )
                  } else {
                    return itemAnswer.map((item, index) => {
                      return (
                        <QuestionAnswerItem item={item} index={index} />
                      )
                    })
                  }

                }
              }
            </div> */}
          </div>
        </div>
      )
    }, ID
  );
};

export default start;
