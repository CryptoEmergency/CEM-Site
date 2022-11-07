import {
  jsx,
  jsxFrag,
  init,
  Variable,
  stringToHtml,
  initGo,
  initReload,
  Helpers
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { wrapTextWithATag, wrapTagToText } from "@src/functions.js";

let commentText = Variable.setRef();

const CommentInput = function ({ nickname, item, typeSet, mainId, commentId, edit, callBack }) {

  let count = 1;
  let scrollHeight = 0;


  //   if(Variable.Static.EditInput.length > 0){
  // let regexp = /<p>/g;
  // let matchAll =  item.text.matchAll(regexp);
  //     matchAll = Array.from(matchAll)
  //     let input = Variable.setRef()
  //     switch (matchAll.length){
  //       case 1:
  //         count = 1
  //         break;
  //       case 2:
  //         count = 2
  //         scrollHeight = 68
  //         commentText().style.cssText = "height:" + scrollHeight + "px";
  //         break;
  //       case 3:
  //         count = 3
  //         scrollHeight = 92
  //         commentText().style.cssText = "height:" + scrollHeight + "px";
  //         break;
  //       case 4:
  //         count = 4
  //         scrollHeight = 116
  //         commentText().style.cssText = "height:" + scrollHeight + "px";
  //         break;
  //       case 5:
  //       default: 
  //       count = 5
  //       scrollHeight = 116
  //       commentText().style.cssText = "height:" + scrollHeight + "px"; 
  //     }

  //   }


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
    if (!Variable.auth) {
      Variable.SetModals({ name: "ModalNeedAuth", data: {} });
      return
    } else {
      let text = wrapTextWithATag(commentText().value.trim());
      let response;
      if (text.length > 0) {
        // let responce = await sendNewCommentApi(
        //   item,
        //   text,
        //   typeSet,
        //   mainId,
        //   commentId,
        //   edit
        // );
        Variable.Static.activeInputId = "";
        Variable.Static.EditInput = "";
        commentText().value = "";
        if (typeof callBack == "function") {
          callBack();
        } else {
          initGo();
        }
      }
    }
  };

  return (
    <div class="c-comments__form create_post_coments">
      <div
        class="c-comments__field create_post_container1"
      //  style = {`${main ? " max-height:46px;" : " max-height:33px;"}`}
      >
        <textarea
          wrap="soft"
          rows="1"
          cols="30"
          class=" text1 create_post_chapter"
          ref={commentText}
          oninput={changeTextarea}
          style={`${nickname !== undefined &&
            "padding: 10px 40px 10px 25px;font-size: 10px;min-height: 46px;"
            }`}
        >
          {(nickname !== undefined && Variable.Static.EditInput.length === 0) && nickname + ","}
          {Variable.Static.EditInput.length > 0 && wrapTagToText(item.text)}

        </textarea>
      </div>

      <div
        onclick={sendNewComment}
        style=""
        class="c-comments__send button-container-preview comments_send"
      >
        <img class="c-comments__icon" src={svg["send_message"]} />
      </div>
    </div>
  );
};

export { CommentInput };
