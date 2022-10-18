import {
  jsx,
  jsxFrag,
  Variable,
  stringToHtml,
  getStorage,
  initReload,
  Helpers,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import {
  Avatar,
  Likes,
  CommentInput,
  AnswerAdditionallyToggle,
} from "@component/element/index.js";
import { If } from "@component/helpers/All.js";
// import { BlockUserCommentComment } from "@src/component/blocks/user/BlockUserCommentComment.js";
import {
  changeActiveCommentsInput,
  showVotersAndchangeStatistic,
  isEmpty,
} from "@src/functions.js";

// const showAnswerAdditionallyContainer = (id) => {
//   Variable.Static.answerAdditionallyShow = id;
//   console.log('=Variable.Static.answerAdditionally2=', Variable.Static.answerAdditionally)
//   initReload()
// }

// const closeAnswerAdditionally = (e) => {
//   e.stopPropagation()
//   Variable.Static.answerAdditionally = true;
//   Variable.Static.answerAdditionallyShow = "";
// }

const BlockComment = function ({ item, index, mainId, commentId }) {
  let comId = item._id;

  return (
    <div class="c-comments__usercomment">
      <Avatar
        author={item.author}
        //  parent={"c-comments__avacomment"}
        nickName={item.author.nickname}
        dateShow={item.showDate}
      />

      {/* {Variable.Static.activeEditInputs.findIndex((it) => it === item._id) <
          0 ? (
          <div class="c-comments__bodycomment">
            <span class="c-comments__textcomment">{stringToHtml(item.text)} </span>
          </div>
        ) : (
          <CommentInput
            item={item}
            commentId={item._id}
            edit={{ mainCom: true }}
          />
        )} */}

      <div class="c-comments__icons c-actioncomment">
        <If
          data={commentId}
          dataIf={
            <Likes
              item={item}
              typeGet="getComments"
              typeSet="setAnswer"
              mainId={mainId}
              commentId={commentId}
            />
          }
          dataElse={
            <Likes
              item={item}
              typeGet="getComments"
              typeSet="setAnswer"
              mainId={mainId}
            />
          }
        />
        <If
          data={
            Variable.auth &&
            Variable.Static.activeInputId !== item._id &&
            Variable.Static.EditInput !== item._id
            // && Variable.Static.activeEditInputId !== item.id
          }
          dataIf={
            <span
              class="c-actioncomment__answer"
              onclick={() => {
                Variable.Static.activeInputId = item._id;
                Variable.Static.answerAdditionally = "";
                Variable.Static.EditInput = "";
                initReload();
              }}
            >
              {Variable.lang.button.giveAnswer}
            </span>
          }
        />
        <AnswerAdditionallyToggle
          item={item}
          typeApi={"setAnswer"}
          type={{
            delete: true,
            edit: true,
            complainAnswer: true,
            complainUser: true,
            blackList: true,
          }}
          commentId={commentId}
          mainId={mainId}
        />
      </div>
      <If
        data={
          Variable.Static.activeInputId === item._id ||
          Variable.Static.EditInput === item._id
        }
        dataIf={
          <CommentInput
            nickname={item.author.nickname}
            item={item}
            typeSet="setAnswer"
            mainId={mainId}
            commentId={commentId}
          />
        }
      />

      <If
        data={!commentId}
        dataIf={
          <div class="user_comment_comment">
            <Map
              data={item.comments}
              dataIf={(item, index) => {
                return (
                  <BlockComment
                    item={item}
                    index={index}
                    mainId={mainId}
                    commentId={comId}
                  />
                );
              }}
            />
          </div>
        }
      />
    </div>
  );
};

export { BlockComment };
