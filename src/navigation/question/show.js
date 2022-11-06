import {
  jsx,
  jsxFrag,
  Variable,
  init,
  Helpers,
  initReload
} from "@betarost/cemjs";
// check
import svg from '@assets/svg/index.js';
import { api } from '@src/apiFunctions.js'
import { Avatar, LentaMedia, QuestionAnswerItem } from "@component/element/index.js";

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
                {() => {
                  if (Variable.auth && Variable.myInfo && Variable.myInfo._id && !item.close && item.author._id !== Variable.myInfo._id) {
                    return (<div
                      class="btn-answer"
                      onclick={() => {
                        Variable.SetModals({
                          name: "ModalAnswer", data: {
                            item,
                            onClose: async () => {
                              // let answer = await api({ type: "get", action: "getAnswers", short: true, filter: { questionId: itemID } })
                              // itemAnswer = answer.list_records
                              // initReload()
                            }
                          }
                        })
                      }}>
                      <a class="btn-gr-answer">
                        <span>{Variable.lang.button.giveAnswer}</span>
                      </a>
                    </div>
                    )
                  }
                }}
              </div>
            </div>
            <div class="user_news_block">
              {
                () => {
                  if (!itemAnswer) {
                    setTimeout(async function () {
                      itemAnswer = await api({ type: "get", action: "getAnswers", short: true, filter: { questionId: itemID } })
                      initReload()
                    }, 1000)
                    return (
                      <img src={svg['load']} />
                    )
                  } else {
                    {
                      () => {
                        if (itemAnswer && itemAnswer.list_records && itemAnswer.list_records.length) {
                          const arrReturn = itemAnswer.list_records.map(function (item, i) {
                            return (
                              <QuestionAnswerItem item={item} index={index} />
                            )
                          })
                          return arrReturn
                        } else {
                          return (
                            <NotFound
                            />
                          )
                        }
                      }
                    }
                  }
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
