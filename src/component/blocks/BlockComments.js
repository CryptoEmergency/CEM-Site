import {
  jsx,
  jsxFrag,
  Variable,
  stringToHtml,
  getStorage,
  initReload,
  initGo,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { Avatar } from "@component/element/Avatar.js";
import { If } from "@component/helpers/All.js";
import { CommentInput } from "@src/component/element/CommentInput.js";
import { BlockUserCommentComment } from "@src/component/blocks/user/BlockUserCommentComment.js";
import {
  changeActiveCommentsInput,
  showVotersAndchangeStatistic,
  isEmpty,
} from "@src/functions.js";


const showAnswerAdditionallyContainer = (id) => {
  Variable.Static.answerAdditionallyShow = id;
  console.log('=Variable.Static.answerAdditionally2=', Variable.Static.answerAdditionally)
  initReload()
}

const closeAnswerAdditionally = (e) => {
  e.stopPropagation()
  Variable.Static.answerAdditionally = true;
  Variable.Static.answerAdditionallyShow = "";
}

const BlockComments = function ({ comments }) {
  let myInfo = Variable.myInfo;
  let auth = Variable.auth;
  console.log('=bc42e2=', comments, Variable)
  // console.log('=d0Variable.Static.answerAdditionallyeece1=',Variable.Static.answerAdditionally)
  return comments.map((item, i) => {
    return (
      <div data-comment_comment={item._id} class="c-comments__usercomment">{/* main_comment userComment */}
        <Avatar author={item.author} parent={"c-comments__avacomment"} nickName={item.author.nickname} dateShow={item.showDate} />
        {Variable.Static.activeEditInputs.findIndex((it) => it === item._id) <
          0 ? (
          <div class="c-comments__bodycomment">{/* comment_body */}
            <span class="c-comments__textcomment">{stringToHtml(item.text)} </span>{/* comment_text */}
          </div>
        ) : (
          <CommentInput
            item={item}
            commentId={item._id}
            edit={{ mainCom: true }}
          />
        )}

        <div class="c-comments__icons c-actioncomment">
          <div class="c-actioncomment__btn c-actioncomment__btn--dislike">
            <img
              src={svg["dislike"]}
              data-name="minus"
              onTouchStart={(e) => showVotersAndchangeStatistic(e, item._id)}
              onTouchEnd={(e) => showVotersAndchangeStatistic(e, item._id)}
              onmousedown={(e) => showVotersAndchangeStatistic(e, item._id)}
              onmouseup={(e) => showVotersAndchangeStatistic(e, item._id)}
              class={[!auth ? "comment_inactive" : null]}
            />
          </div>
          <div class="c-actioncomment__counter">{item.statistic.rating}</div>
          <div class="c-actioncomment__btn c-actioncomment__btn--like">
            <img
              src={svg["like"]}
              data-name="plus"
              onTouchStart={(e) => showVotersAndchangeStatistic(e, item._id)}
              onTouchEnd={(e) => showVotersAndchangeStatistic(e, item._id)}
              onmousedown={(e) => showVotersAndchangeStatistic(e, item._id)}
              onmouseup={(e) => showVotersAndchangeStatistic(e, item._id)}
              class={[!auth ? "comment_inactive" : null]}
            />
          </div>
          <span
            class="c-actioncomment__answer"
            onclick={() => {
              Variable.Static.answerAdditionally = true;
              Variable.Static.answerAdditionallyShow = "";
              changeActiveCommentsInput(item._id);
            }}
          >
            {Variable.lang.button.giveAnswer}
          </span>
          <div
            class={["c-actioncomment__toggler", (!auth || Variable.Static.answerAdditionally) ? "comment_inactive" : null]}
            onclick={() => (auth && !Variable.Static.answerAdditionally) && showAnswerAdditionallyContainer(item._id)}
          >
            <img src={svg["points"]} />
            <div
              class="c-actioncomment__menu answer_additionally_container"
              style={
                (Variable.Static.answerAdditionallyShow === item._id && !Variable.Static.answerAdditionally)
                  ? "display : block"
                  : "display : none"
              }
            >
              <If
                data={item.author._id === myInfo._id}
                dataIf={
                  <ul class="c-actioncomment__list answer_additionally">
                    <li
                      class="c-actioncomment__item answer_additionally_item delete"
                      onclick={(e) => {
                        closeAnswerAdditionally(e);

                        e.target.parentElement.parentElement.parentElement.style = "display : none"
                        Variable.SetModals({
                          name: "ModalDelComment",
                          data: { id: item._id, mainCom: true },
                        }, true);

                      }}
                    >
                      {Variable.lang.select.delete}
                    </li>
                    <li
                      class="c-actioncomment__item answer_additionally_item edit"
                      onclick={(e) => {
                        closeAnswerAdditionally(e);
                        if (Variable.Static.activeEditInputs.findIndex(
                          (it) => it === item._id
                        ) < 0) {
                          Variable.Static.activeEditInputs.push(item._id);

                        } initReload();
                      }}
                    >
                      {Variable.lang.button.edit}
                    </li>
                  </ul>
                }
                dataElse={
                  <ul class="c-actioncomment__list answer_additionally">
                    <li
                      class="c-actioncomment__item answer_additionally_item complain c-text--error"
                      onclick={(e) => {
                        closeAnswerAdditionally(e);
                        e.target.parentElement.parentElement.parentElement.style = "display : none"
                        Variable.SetModals({
                          name: "ModalComplainComment",
                          data: { id: item._id, mainCom: true },
                        }, true);
                      }}
                    >
                      {Variable.lang.select.complainComment}
                    </li>
                    <li class="c-actioncomment__item answer_additionally_item complain c-text--error">
                      {Variable.lang.select.complainUser}
                    </li>
                    <li
                      class="c-actioncomment__item answer_additionally_item block c-text--error"
                      onclick={(e) => {

                        closeAnswerAdditionally(e);
                        e.target.parentElement.parentElement.parentElement.style = "display : none"


                        Variable.SetModals({
                          name: "ModalBlackList",
                          data: { id: item.author._id },
                        }, true);
                      }}
                    >
                      {Variable.lang.select.blackList}
                    </li>
                  </ul>
                }
              />
              {!isEmpty(myInfo) && (
                <If
                  data={myInfo.status.role}
                  dataIf={
                    <div
                      style="color: #32DE80"
                      class="c-actioncomment__item answer_additionally_item delete"
                    >
                      {Variable.lang.select.delete}
                    </div>
                  }
                />
              )}
            </div>
          </div>
          {/* {{#is myInfo.role 1}}    
                    {{#is myInfo.role_settings.del_answer 1}} 
                            <div class="acp_block">
                                <img data-action="acpSiteShow" class="acp_image" src="/assets/icon/points_green.svg">
                                <div style="display: none;" class="acp_inner">
                                    <div class="acp_inner_item" data-type="dlt_answer_comment" data-id="{{_id}}" data-action="acpAction">
                                        Удалить Комментарий
                                    </div>                                   
                                </div>
                            </div>
                    {{/is}}
                {{/is}} */}
        </div>
        <div class="user_comment_comment">
          <BlockUserCommentComment
            comments={item.comments}
            commentId={item._id}
          />
        </div>
        <If
          data={Variable.Static.activeCommentsInput === item._id}
          dataIf={
            <CommentInput
              nickname={item.author.nickname}
              item={item}
              commentId={item._id}
            />
          }
        />
      </div>
    );
  });
};

export { BlockComments };
