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
import { getNewsItemInShow, sendNewCommentApi } from "@src/apiFunctions.js";
import { If } from "@component/helpers/All.js";
import { getDateFormat } from "@src/functions.js";
  


  const CommentInput = function (main = false,) {
    let count = 1;
    let scrollHeight = 0;
    console.log('=fb4c27=',main)

    let commentText = Variable.setRef();
    const changeTextarea = (e) => {
      console.log('=73109c=',e)
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
      let text = commentText().value.trim();
      let response;
      if (text.length > 0) {
        let responce = await sendNewCommentApi(news, commentText().value);
        commentText().value = "";
        initGo();
      }
    };


    return (
      <div data-type="news_comment" class="create_post_coments">
      <div data-type="news_comment" class="create_post_container1"
      //  style = {`${main ? " max-height:46px;" : " max-height:33px;"}`}
      >
        <textarea
          wrap="soft"
          rows="1"
          cols="30"
          class=" text1"
          ref={commentText}
          oninput={changeTextarea}
          style = {`${!main && "padding: 10px 40px 10px 25px;font-size: 10px;min-height: 46px;"}`}
        ></textarea>
      </div>

      <div
        onclick={sendNewComment}
        style=""
        data-quote=""
        data-type="news_comment"
        id="newsCommentSend"
        data-action="newsCommentSend"
        // data-post_id={news._id}
        class="button-container-preview comments_send"
      >
        <img src={svg["send_message"]} />
      </div>
    </div>
    )
  }
  
  export { CommentInput }