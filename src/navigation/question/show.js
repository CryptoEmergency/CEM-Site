import {
  jsx,
  jsxFrag,
  Variable,
  init,
  sendApi,
  getStorage,
} from "@betarost/cemjs";

import { getQuestionsItemInShow } from "@src/apiFunctionsE.js";


import { BlockQuestionsShow } from '@component/blocks/index.js';
import { QuestionAnswers } from '@component/element/index.js';


const start = function (data, ID = "mainBlock") {
  let items,
    itemsAnswers

  Variable.HeaderShow = true;
  Variable.FooterShow = true;
  let question, answers, myInfo, mediaWithOutAudio, mediaOnlyAudio;

  init(
    async () => {
      question = await getQuestionsItemInShow(
        Variable.dataUrl.params,
        "getQuestions"
      );
      question = question.list_records[0];
      mediaWithOutAudio = question.media.filter((i) => i.type !== "audio");
      mediaOnlyAudio = question.media.filter((i) => i.type === "audio");
      answers = await getQuestionsItemInShow(
        Variable.dataUrl.params,
        "getAnswers"
      );
      Variable.Static.mainIdforLikes = question._id;
      myInfo = getStorage("myInfo");
      items = await sendApi.send({ action: "getQuestions", short: true, filter: { _id: Variable.dataUrl.params } });
      // itemsAnswers = await sendApi.send({ action: "getAnswers", short: true, filter: { questionId: Variable.dataUrl.params } });
    },
    async () => {
      itemsAnswers = await sendApi.send({ action: "getAnswers", short: true, filter: { questionId: Variable.dataUrl.params } });

      return (
        <div class={["answer_container", Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          {/* <div class="full_news_container"> */}
          <div class="answer_block" style="flex-direction: column;">
            <BlockQuestionsShow
              itemsAnswers={itemsAnswers}
              item={items.list_records[0]}
              type={"question"}
            />
            <div class="user_news_block">
              <QuestionAnswers
                items={itemsAnswers.list_records}
              />
            </div>
          </div>
          {/* </div> */}
        </div>

      )



    }, ID
  );
};

export default start;
