import { jsx, jsxFrag, Variable, initReload, initGo, init, load } from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';

const changeComplaint = function (Static, checkdata) {
  Static.modal[checkdata.name].check = checkdata.check
  if (checkdata.name == "other") {
    Static.modal.activeData = []
    if (checkdata.value) {
      Static.modal[checkdata.name].value = checkdata.value
    }
    for (let k in Static.modal) {

      if (k !== "other" && k !== "activeData") {
        Static.modal[k].check = false
        Static.modal[k].el.checked = false
      }

    }
  }
  else {
    Static.modal["other"].check = false
    Static.modal["other"].el.checked = false
    Static.modal.activeData = []
    for (let k in Static.modal) {

      if (k !== "other" && k !== "activeData" && Static.modal[k].check === true) {
        Static.modal.activeData.push(k)
      }
    }

  }
  initReload()
  return;
};

const ModalComplainComment = function (data, ID) {

  let [Static] = fn.GetParams({ data, ID })
  let close = true
  load({
    ID,
    fnLoad: async () => {
      Static.modal = {
        abusive: { check: false, complain: Variable.lang.select.complainOne },
        poison: { check: false, complain: Variable.lang.select.complainTwo },
        obscene: { check: false, complain: Variable.lang.select.complainThree },
        malicious: { check: false, complain: Variable.lang.select.complainFour },
        other: { check: false, complain: Variable.lang.select.other, value: true },
        activeData: []
      }
    },
    fn: () => {
      let active
      let text
      if ((Static.modal.other.value.length > 2 && Static.modal.activeData.length == 0) || Static.modal.activeData.length > 0) {
        active = null
      }
      else {
        active = "inactive_form_button"
      }
      return (
        <div class="c-modal c-modal--open" id="ModalComplainComment" onclick={function (e) {
          if (close) {

            fn.modals.close(ID)
          }
        }}>
          <section class="c-modal__dialog" onmouseover={function () {

            close = false

          }}
            onmouseleave={function () {

              close = true

            }}>
            <header class="c-modal__header">
              <div class="complain_modal">
                <h4>{Variable.lang.h.modal_complain}</h4>
                <button
                  class="c-modal__close"
                  onclick={() => {
                    fn.modals.close(ID)
                  }}
                ></button>
                <div class="complain_error">{Variable.lang.error_div.complain}</div>
                <div class="container-checkbox">
                  <div class="checkbox">
                    <input

                      class="checkbox__input complain_checkbox"

                      onChange={function (e) {
                        changeComplaint(Static, { "name": "abusive", "check": this.checked })
                      }}
                      type="checkbox"
                      checked={Static.modal.obscene.check ? true : false}
                      Element={($el) => { Static.modal.abusive.el = $el }}
                    />
                    <label class="checkbox__label">
                      {Variable.lang.select.complainOne}
                      <span class="cont_a-link"></span>
                    </label>
                  </div>
                </div>
                <div class="container-checkbox">
                  <div class="checkbox">
                    <input

                      class="checkbox__input complain_checkbox"
                      onChange={function () {
                        changeComplaint(Static, { "name": "poison", "check": this.checked })
                      }}
                      type="checkbox"

                      checked={Static.modal.obscene.check ? true : false}
                      Element={($el) => { Static.modal.poison.el = $el }}
                    />
                    <label class="checkbox__label">
                      {Variable.lang.select.complainTwo}
                      <span class="cont_a-link"></span>
                    </label>
                  </div>
                </div>
                <div class="container-checkbox">
                  <div class="checkbox">
                    <input

                      class="checkbox__input complain_checkbox"
                      onChange={function () {
                        changeComplaint(Static, { "name": "obscene", "check": this.checked })
                      }}
                      type="checkbox"
                      checked={Static.modal.obscene.check ? true : false}
                      Element={($el) => { Static.modal.obscene.el = $el }}
                    />
                    <label class="checkbox__label">
                      {Variable.lang.select.complainThree}
                      <span class="cont_a-link"></span>
                    </label>
                  </div>
                </div>
                <div class="container-checkbox">
                  <div class="checkbox">
                    <input

                      class="checkbox__input complain_checkbox"
                      onChange={function () { changeComplaint(Static, { "name": "malicious", "check": this.checked }) }
                      }
                      type="checkbox"
                      checked={Static.modal.malicious.check ? true : false}
                      Element={($el) => { Static.modal.malicious.el = $el }}
                    />
                    <label class="checkbox__label">
                      {Variable.lang.select.complainFour}
                      <span class="cont_a-link"></span>
                    </label>
                  </div>
                </div>
                <div class="container-checkbox">
                  <div class="checkbox">
                    <input

                      class="checkbox__input complain_checkbox"
                      onChange={function (e) {
                        changeComplaint(Static, { "name": "other", "check": this.checked, "value": Static.modal.other.value })
                      }}
                      type="checkbox"
                      checked={Static.modal.other.check ? true : false}
                      Element={($el) => { Static.modal.other.el = $el }}
                    />
                    <label data-complain_id="5" class="checkbox__label">
                      {Variable.lang.select.other}
                      <span class="cont_a-link"></span>
                    </label>
                  </div>
                </div>
                <div
                  style={

                    Static.modal.other.check ?
                      "display: block"
                      : "display: none"
                  }
                  contenteditable="true"
                  class="complain_other"
                  oninput={function (e) {
                    if (e.inputType == "deleteContentBackward" && this.textContent.trim() == "") {
                      text = true
                    }
                    else {
                      text = this.textContent
                    }
                    changeComplaint(Static, { "name": "other", "check": Static.modal.other.check, "value": text })
                  }}>
                </div>
                <div class={["registration-btn", active]}>
                  <a class="btn-gr-reg" onclick={async () => {
                    let response
                    if (Static.modal.other.value.length > 0) {
                      response = await fn.restApi[Static.action].complain({ _id: Static.id, complain: [Static.modal.other.value] })
                    } else {
                      response = await fn.restApi[Static.action].complain({ _id: Static.id, complain: Static.modal.activeData })
                    }
                    if (response.status == "ok") {
                      fn.modals.close(ID)
                    }
                  }
                  }>
                    <span>{Variable.lang.button.send}</span>
                  </a>
                </div>
              </div>
            </header>
          </section>
        </div>

      );
    }
  })
};

export default ModalComplainComment;
