import {
  jsx,
  jsxFrag,
  init,
  initReload,
  Variable,
  stringToHtml,
  initGo,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { sendNewCommentApi } from "@src/apiFunctions.js";

const CommentInput = function ({ nickname, item,commentId, edit }) {
  let count = 1;
  let scrollHeight = 0;
  let commentText = Variable.setRef();
  console.log('=commentText=',commentText())
  const changeTextarea = (e) => {
    let element = e.target;
    if (element.textLength === 1 && count == 1) {
      scrollHeight = element.scrollHeight;
    } else if (count !== 5 && scrollHeight < element.scrollHeight) {
      element.style.cssText = "height:auto;";
      element.style.cssText = "height:" + element.scrollHeight + "px";
      scrollHeight = element.scrollHeight;
      count++;
    } else if (scrollHeight > element.scrollHeight) {
      element.style.cssText = "height:auto;";
      element.style.cssText = "height:" + element.scrollHeight + "px";
      scrollHeight = element.scrollHeight;
      count--;
    }
  };

  const sendNewComment = async () => {
    console.log('=text=',commentText())
    let text = commentText().value.trim();
    
    let response;
    if (text.length > 0) {
      let responce = await sendNewCommentApi(
        item,
        text,
        commentId,
        edit
      );
      commentText().value = "";
      initGo();
    }
  };
  return (
    <div class="create_post_coments">
      <div
        class="create_post_container1"
        //  style = {`${main ? " max-height:46px;" : " max-height:33px;"}`}
      >
        <textarea
          wrap="soft"
          rows="1"
          cols="30"
          class=" text1"
          ref={commentText}
          oninput={changeTextarea}
          style={`${
            nickname !== undefined &&
            "padding: 10px 40px 10px 25px;font-size: 10px;min-height: 46px;"
          }`}
        >
          {nickname !== undefined && nickname + ","}
          {edit !== undefined && item.text}

        </textarea>
      </div>

      <div
        onclick={sendNewComment}
        style=""
        class="button-container-preview comments_send"
      >
        <img src={svg["send_message"]} />
      </div>
    </div>
  );
};

export { CommentInput };
