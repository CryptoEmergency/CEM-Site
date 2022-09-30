import {
  jsx,
  jsxFrag,
  setAction,
  setValue,
  Variable,
  getValue,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { PhoneCode } from "@component/element/PhoneCode.js";

const showModalReset = function (e) {
  e.stopPropagation();
  let show = getValue("modals", "resetModalShow");
  if (show) {
    setValue("modals", "toggleStepReset", "1");
  }
  setValue("modals", "resetModalShow", !getValue("modals", "resetModalShow"));
};

const change = (e) => {
  console.log("=be051b=", e.target.parentElement.children);
  let arr = e.target.parentElement.children;
  console.log("=2bdc86=", arr);
  for (let i = 0; i < arr.length; i++) {
    console.log("=&&&&=", +arr[i].value);
    // if (arr[i].value !== "" && typeof (+arr[i].value === "number")) {
    //   console.log("=number=");
    // } else {
    //   console.log("=notNum=");
    // }
    if(arr[i].value ===""){
        arr[i].focus()
        break;
    }
  }
};

const ModalReset = function ({
  changeCode,
  ID,
  abbr,
  codeTitle,
  wayReset,
  changeWayReset,
  changeStepReset,
}) {
  // console.log("ModalReset", { lang, changeCode, ID, abbr, codeTitle, wayReset, changeWayReset });
  const showStepReset = getValue(ID, "toggleStepReset");

  return (
    <div class="c-modal c-modal--open" id="ModalReset">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <h2 class="c-modal__title">{`${
            showStepReset == "1"
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
                  {/* <input style="display: none;" type="submit" /> */}
                  {/* <div class="reset_by_email_block">
                                        <label for="resetByEmailInputCode">{Variable.lang.label.codeConfirm}</label>
                                        <div class="error-div"></div>
                                        <div class="reset_by_email_block_container">
                                            <input id="resetByEmailInputCode" type="number" />
                                        </div>
                                    </div>
                                    <div class="reset_by_mobile_block dn">
                                        <label for="resetByMobileInputCode">{Variable.lang.label.codeConfirm}</label>
                                        <div class="error-div"></div>
                                        <div class="reset_by_mobile_block_container">
                                            <input id="resetByMobileInputCode" type="number" />
                                        </div>
                                    </div> */}
                  <input
                    class="test12345"
                    type="number"
                    maxlength="1"
                    oninput={change}
                  ></input>
                  -<input maxlength="1" class="test12345"></input>-
                  <input maxlength="1" class="test12345"></input>-
                  <input maxlength="1" class="test12345"></input>-
                  <input maxlength="1" class="test12345"></input>-
                  <input type="number" maxlength="1" class="test12345"></input>
                </form>
              </div>
              <div class="reset_timer_block">
                {Variable.lang.text.timeCode}
                <div class="reset_timer">1:00</div>
              </div>
              <a style="display: none;" class="reset_timer_success">
                {Variable.lang.a.newCodeConfirm}
              </a>
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
