import {
  jsx,
  jsxFrag,
  setAction,
  setValue,
  Variable,
  getValue,
  initReload,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { PhoneCode } from "@component/element/PhoneCode.js";
import { allValidation } from "@src/functions.js";
import { sendResetMessage, giveNewCodeForReset } from "@src/apiFunctionsE.js";

let pass = new Array(6).fill("");
let time = 0;

const showModalReset = function (e) {
  e.stopPropagation();
  let show = getValue("modals", "resetModalShow");
  if (show) {
    setValue("modals", "toggleStepReset", "1");
  }
  setValue("modals", "resetModalShow", !getValue("modals", "resetModalShow"));
};

const handleKeyUp = (e, index) => {
  let arrElements = e.target.parentElement.children;
  if (e.key === "Backspace" && pass[index] !== "") {
    pass[index] = "";
    arrElements[index].focus();
  } else if (e.key === "Backspace" && pass[index] == "" && index !== 0) {
    pass[index - 1] = "";
    arrElements[index - 1].value = ""
    arrElements[index - 1].focus();
  }
  if (e.key === "ArrowLeft" && index > 0) {
    arrElements[index - 1].focus();
  }
  if (e.key === "ArrowRight" && index < arrElements.length - 1) {
    arrElements[index + 1].focus();
  }
};

const resetTimer = () => {
  time = 5
  let data = { email: "maior0077777@mail.ru" }
  giveNewCodeForReset(data)
  timerFunc();
}
const change = async (e, index) => {
  let tmp = false;
  console.log("=a2d228=", e);
  let arrEvent = e.target.parentElement.children;
  if (e.inputType === "insertFromPaste" &&
    allValidation(e.target.value, "inputNumberPaste")) {
    // let isNumber = allValidation(e.target.value, "inputNumberPaste");
    let strArr = e.target.value.split("");

    console.log("=strArr=", strArr);
    // pass = [...strArr]
    // console.log('=pass=',pass)
    if (pass[index] === "") {
      for (let i = index; i < index + strArr.length; i++) {
        if (pass[i] === "") {
          (arrEvent[i].value = strArr[i - index]),
            (pass[i] = strArr[i - index]);
        } else {
          break;
        }
      }
    } else {
      e.target.value = pass[index];
    }
    for (let i = 0; i < index; i++) {
      if (arrEvent[i].value === "") {
        tmp = false;
        arrEvent[i].focus();
        break;
      }
    }
    for (let i = index; i < arrEvent.length; i++) {
      if (arrEvent[i].value === "") {
        tmp = false;
        arrEvent[i].focus();
        break;
      }
    }

    // initReload()
    // let arr = e.target.parentElement.children;
    // arr = arr.splice

    console.log("= arrEvent=", arrEvent);
    console.log("=passPaste=", pass);
  } else if (e.inputType !== "deleteContentBackward") {
    e.target.value = e.target.value[0];
    let isNumber = allValidation(e.target.value, "inputNumber");
    console.log("=8722cf=", isNumber);
    if (!isNumber) {
      e.target.value = "";
      pass[index] = "";
      e.target.focus();
      console.log("=04cc13=", pass);
    } else {
      pass[index] = e.target.value;
      console.log("=04cc13=", pass);
      let arr = e.target.parentElement.children;


      for (let i = 0; i < index; i++) {
        if (arr[i].value === "") {
          tmp = false;
          arr[i].focus();
          break;
        }
      }
      for (let i = index; i < arr.length; i++) {
        if (arr[i].value === "") {
          tmp = false;
          arr[i].focus();
          break;
        }
      }

    }
  }
  let strPass = pass.join("").trim()
  if (strPass.length === 6) {
    let data = { email: "maior0077777@mail.ru", code: strPass }
    let response = await sendResetMessage(data);
    console.log('=8fa90a=', response)
    if (response === "no") {
      for (let i = 0; i < pass.length; i++) {
        arrEvent[i].value = "";
        pass[i] = "";
      }
      arrEvent[0].focus()
    } else {
      Variable.Modals = [];
    }
  }
};
const timerFunc = () => {
  const timer = setInterval(async () => {
    time = time - 1
    initReload()
    console.log('=3ca4b3=', time)
    if (time === 0) {
      clearInterval(timer);
      time = 5;
    }
  }, 1000);
}



const ModalReset = function ({
  changeCode,
  ID,
  abbr,
  codeTitle,
  wayReset,
  changeWayReset,
  changeStepReset,
  reload
}) {
  // console.log("ModalReset", { lang, changeCode, ID, abbr, codeTitle, wayReset, changeWayReset });
  const showStepReset = getValue(ID, "toggleStepReset");
  return (
    <div class="c-modal c-modal--open" id="ModalReset">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <h2 class="c-modal__title">{`${showStepReset == "1"
              ? Variable.lang.h.modal_reset
              : Variable.lang.h.modal_resetСonfirm
            }`}</h2>
          <button
            type="button"
            class="c-modal__close"
            onclick={showModalReset}
          ></button>
        </header>
        <div class="c-modal__body">
          <div class="reset_password">
            <div class={`reset_password_step2 ${showStepReset == "1" && "dn"}`}>
              {/* <h4>{lang.h.modal_resetConfirm}</h4> */}
              <p>{Variable.lang.p.resetConfirm}</p>
              {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
              <div class="reset_password_input_block">
                <form id="resetPassword2" data-button_id="reset_next_step-2">
                  {pass.map((item, i) => {
                    return (
                      <input
                        class="test12345"
                        type="text"
                        onKeyUp={(e) => handleKeyUp(e, i)}
                        oninput={(e) => change(e, i)}
                      ></input>
                    );
                  })}
                </form>
              </div>
              {
                time > 0
                  ? <div class="reset_timer_block">
                    {Variable.lang.text.timeCode}
                    <div class="reset_timer">{time < 10 ? `00.0${time}` : `00.${time}`}</div>
                  </div>
                  :
                  <a class="reset_timer_success"
                    onclick={resetTimer}
                  >
                    {Variable.lang.a.newCodeConfirm}
                  </a>

              }


              <div type="button" class="reset-btn" id="reset_next_step-2">
                <a class="btn-reset">
                  <span>{Variable.lang.button.next}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer class="c-modal__footer">
          {/* <button class="c-button c-button--gradient2 c-button--inactive" type="button">
                        <span class="c-button__text">
                            {lang.button.login}
                        </span>
                    </button>
                    <a class="c-button c-button--registration" href="">
                        <div class="c-button__wrapper">
                            {lang.button.registration}
                        </div>
                    </a> */}
        </footer>
      </section>
    </div>
  );
};

export default ModalReset;
