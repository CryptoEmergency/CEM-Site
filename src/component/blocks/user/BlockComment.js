import {
  jsx,
  jsxFrag,
  Variable,
  stringToHtml,
  getStorage,
  initReload,
  Helpers,
} from "@betarost/cemjs";
import {
  Avatar,
  Likes,
  CommentInput,
  AnswerAdditionallyToggle,
} from "@component/element/index.js";
import { If} from "@component/helpers/All.js";
// import { BlockUserCommentComment } from "@src/component/blocks/user/BlockUserCommentComment.js";
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

const BlockComment = function ({ item, index, mainId, commentId, callBack, typeSet="setNews" }) {
  let comId = item._id;
  // let typeSet = "setNews"
  return (
    <div class="c-comments__usercomment">
      <Avatar
        author={item.author}
        parent={"c-comments__avacomment"}
        nickName={item.author.nickname}
        dateShow={item.showDate}
      />
      <If
        data={Variable.Static.EditInput !== item._id}
        dataIf={
          <div class="c-comments__bodycomment">
            <span class="c-comments__textcomment">
              {stringToHtml(item.text)}
            </span>
          </div>

        }
      />
      <div class="c-comments__icons c-actioncomment">
        <If
          data={commentId}
          dataIf={
            <Likes
              item={item}
              typeGet="getComments"
              typeSet={typeSet}
              mainId={mainId}
              commentId={commentId}
              callBack={callBack}
            />
          }
          dataElse={
            <Likes
              item={item}
              typeGet="getComments"
              typeSet={typeSet}
              mainId={mainId}
              callBack={callBack}
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
          typeApi={typeSet}
          type={{
            delete: true,
            edit: true,
            complainComment: true,
            complainUser: true,
            blackList: true,
          }}
          commentId={commentId}
          mainId={mainId}
          callBack ={callBack}
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
            typeSet={typeSet}
            mainId={mainId}
            commentId={commentId}
            callBack ={callBack}
          />
        }
      />
      

      <If
        data={!commentId }
        dataIf={
          <div class="user_comment_comment">
            {
              (item.comments || []).map((item, index) => {
                return (
                  <BlockComment
                    item={item}
                    index={index}
                    mainId={mainId}
                    commentId={comId}
                    callBack={callBack}
                    typeSet = {typeSet}
                  />
                );
              })
            }
          </div>
        }
      />
    </div>
  );
};

export { BlockComment };
