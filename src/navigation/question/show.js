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
                    if (itemAnswer && itemAnswer.list_records && itemAnswer.list_records.length) {
                      const arrReturn = itemAnswer.list_records.map(function (item, index) {
                        return (

                          <div
                            style={[item.best ? "order: -1; border-color: #00E741" : null]}
                            class="user_news_item"
                          >
                            <div class="main_comment">
                              <Avatar
                                author={item.author}
                                nickName={item.author.nickname}
                                dateShow={item.showDate}
                              />
                              <div class="comment_body">
                                <span class="comment_text">{Helpers.clearText(item.text)}</span>
                                {/* Media element */}
                                {/* <LentaMedia
                                  items={item.media}
                                  numIndex={0}
                                  elem={elem}
                                  path={"/assets/upload/answers/"}
                                /> */}
                                {/* <If
                                  data={Variable.auth && Variable.Static.activeInputId !== item._id}
                                  dataIf={
                                    <span
                                      class="answer_comment_button"
                                      style={item.media.length > 0 && "margin: 40px 0 0 0;"}
                                      onclick={() => {
                                        Variable.Static.activeInputId = item._id;
                                        Variable.Static.answerAdditionally = "";
                                        initReload();
                                      }}
                                    >
                                      {Variable.lang.button.giveAnswer}
                                    </span>
                                  }
                                /> */}

                                <div class="comment_icons">
                                  {/* <Likes item={item} typeGet="getAnswers" typeSet="setAnswer" /> */}
                                  {/* <div
              class="comment_icon_type-1 answer_additionally_toggle {{#if data.userInfo.auth}}{{else}}comment_inactive{{/if}}"
              data-action="answerAdditionallyToggle"
            >
              <img class="answer_additionally_toggle_img" src={svg["points"]} />
            </div> */}
                                  {/* <AnswerAdditionallyToggleNew item={item} typeApi={"setAnswer"} type={
              {
                delete: true,
                complainAnswer: true,
                complainUser: true,
                blackList: true,
              }} mainId={mainId} /> */}

                                </div>

                                {/* <If
            data={item.comments.length > 0}
            dataIf={
              <div class="user_news_top">
                <div
                  class="button-container-comm"
                  data-action="showAnswerComments"
                >
                  <a
                    class="btn-comm "
                    onclick={() => {
                      if (Variable.Static.openComent[index]) {
                        Variable.Static.openComent[index] =
                          !Variable.Static.openComent[index];
                      } else {
                        Variable.Static.openComent[index] = true;
                      }
                      initReload();
                    }}
                  >
                    <If
                      data={
                        Variable.Static.openComent[index] !== undefined &&
                        Variable.Static.openComent[index]
                      }
                      dataIf={
                        <span>
                          {Variable.lang.span.hideComments} (
                          <span class="comment_count">
                            {item.statistic.comments}
                          </span>
                          )
                        </span>
                      }
                      dataElse={
                        <span>
                          {Variable.lang.span.showComments} (
                          <span class="comment_count">
                            {item.statistic.comments}
                          </span>
                          )
                        </span>
                      }
                    />
                  </a>
                </div>
              </div>
            }
          /> */}
                                {/* <If
            data={Variable.Static.activeInputId === item._id}
            dataIf={
              <CommentInput
                nickname={item.author.nickname}
                item={item}
                typeSet="setAnswer"
                mainId={mainId}
              // commentId={item._id}
              />
            }
          /> */}
                                {/* <If
            data={
              Variable.Static.openComent[index] !== undefined &&
              Variable.Static.openComent[index]
            }
            dataIf={
              <div class="comment_answer">
                {
                  item.comments.map((item, index) => {
                    return (
                      <QuestionAnswerItemComment
                        item={item}
                        index={index}
                        mainId={mainId}
                      />
                    );
                  })
                }
              </div>
            }
          /> */}
                              </div>
                            </div>
                          </div>

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
            </div>
          </div>
        </div>
      )
    }, ID
  );
};
export default start;
