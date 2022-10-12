import { jsx, jsxFrag, Variable, initReload, sendApi } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { wrapTextWithATag } from "@src/functions.js";

let formInputs;

const changeTextAnswer = (e) => {
  // let text = wrapTextWithATag(e.target.innerText.trim());
  let text = e.target.innerText.trim();
  formInputs.textAnswer.error = "";
 

  if (text.length === 0) {
    formInputs.textAnswer.error = Variable.lang.error_div.not_empty_input;
  } else if (text.length < 5) {
    formInputs.textAnswer.error = Variable.lang.error_div.minSymbol;
  } else if (text.length > 200) {
    formInputs.textAnswer.error = Variable.lang.error_div.maxSymbol;
  }
   formInputs.textAnswer.value = wrapTextWithATag(text) ;
  if (formInputs.textAnswer.error === "") {
    formInputs.isValid = true;
  } else {
    formInputs.isValid = false;
  }
  initReload("modals");
};

const sendAnswer =async  function (e,item) {
    e.preventDefault();
    if (!formInputs.isValid) {
        return false;
      }

    let mediaArr = [];
    let data = {
        value: {
            media: mediaArr,
            questionId: item.item._id,
      text: formInputs.textAnswer.value,
        }
    }
    let tmpRes = await sendApi.create("setAnswer", data);
    if (tmpRes.status === "ok") {
        Variable.DelModals("ModalAnswer");
        initReload();
      } else {
        Variable.SetModals(
          {
            name: "ModalAlarm",
            data: {
              icon: "alarm_icon",
              text: Variable.lang.error_div[tmpRes.error],
            },
          },
          true
        );
      }
      return;
};

const ModalAnswer = function (data, reload) {
    console.log('=data=',data)
  if (!reload) {
    formInputs = {
      textAnswer: {
        value: "",
        error: "",
      },
      isValid: false,
    };
  }
  return (
    <div class="c-modal c-modal--open" id="ModalAnswer">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <h2 class="c-modal__title">{Variable.lang.h.modal_answer}</h2>
          <button
            type="button"
            class="c-modal__close"
            onclick={() => {
              Variable.DelModals("ModalAnswer");
              initReload("modals");
            }}
          ></button>
        </header>
        <div class="c-modal__body">
          <form id="createPostForm" onsubmit={(e) =>sendAnswer(e,data)} >
            <input style="display: none;" type="submit" />
            <div class="error-div">
              <div class="error-div-variant">{formInputs.textAnswer.error}</div>
            </div>
            <div data-type="answers" class="create_post_container">
              <div
                class="create_post_chapter create_post_main_text"
                contenteditable="true"
                oninput={changeTextAnswer}
              ></div>
            </div>
            <button
              class={[
                "c-button c-button--gradient2",
                !formInputs.isValid ? "c-button--inactive" : "",
              ]}
              type="button"
              // ref={elemButton}
              onClick={(e) =>sendAnswer(e,data)}
            >
              <span class="c-button__text">{Variable.lang.button.send}</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ModalAnswer;
