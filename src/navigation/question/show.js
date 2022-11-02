import {
  jsx,
  jsxFrag,
  Variable,
  init,
  sendApi,
  getStorage,
  initReload
} from "@betarost/cemjs";

import { api } from '@src/apiFunctions.js'

import { BlockQuestionsShow } from '@component/blocks/index.js';
import { QuestionAnswerItem } from '@component/element/index.js';


const start = function (data, ID = "mainBlock") {
  let item, itemAnswer, itemID;

  init(
    async () => {
      if (data && data.item) {
        item = data.item
        itemID = data.item._id

      } else {
        itemID = Variable.dataUrl.params
        let response = await api({ type: "get", action: "getQuestions", short: true, limit: 1, filter: { _id: itemID } })
        item = response.list_records[0]


      }
      let answer = await api({ type: "get", action: "getAnswers", short: true, filter: { questionId: itemID } })
      itemAnswer = answer.list_records
    },
    async () => {
      return (

        <div class="answer_container c-main__body">

          <div class="answer_block" style="flex-direction: column;">

            <BlockQuestionsShow
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
            />
            <div class="user_news_block">
              {
                () => {
                  return itemAnswer.map((item, index) => {
                    return (
                      <QuestionAnswerItem item={item} index={index} />
                    )
                  })
                }
              }
            </div>
          </div>
        </div>
      )
    }, ID
  );
};

export default start;
