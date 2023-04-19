import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  initOne,
  sendApi,
  Data,
  load,
  CEM
} from "@betarost/cemserver/cem.js";

// import svg from "@assets/svg/index.js";
import { Input, InputDiv } from '@component/element/index.js';
// import { fn } from '@src/functions/export.js';

const { svg, fn } = CEM

const checForm = async function () {
  // console.log('=c35305= checForm', Data.MStatic)
  if (!Data.MStatic.forms.nickName.valid) {
    Data.MStatic.forms.isValid = false
    return
  }
  if (!Data.MStatic.forms.language.valid) {
    Data.MStatic.forms.isValid = false
    return
  }
  if (!Data.MStatic.forms.country.valid) {
    Data.MStatic.forms.isValid = false
    return
  }
  Data.MStatic.forms.isValid = true
  // initReload()
}

const ModalAfterRegisterForm = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "ModalAfterRegisterFormNew" })

  console.log('=99823e=', Static)
  load({
    ID,
    fn: () => {
      return (
        <div class="c-modal c-modal--open">
          <section class="c-modal__dialog">
            <header class="c-modal__header">
              <h2 class="c-modal__title"
                style="padding-right: 0;"
              >{Variable.lang.h.modal_afterReg}</h2>
            </header>
            <div class="c-modal__body">
              <div class="after_register_form">
                <InputDiv
                  class={["input-div",
                    Static.forms.nickName.error ? "input-div--error" : null,
                    Static.forms.nickName.valid ? "input-div--correctly" : null
                  ]}
                  error={Static.forms.nickName.error}
                  title="Nickname"
                  placeholder="Nickname"
                  oninput={async function () {
                    Static.forms.nickName.val = this.innerText.trim();
                    [Static.forms.nickName.error, Static.forms.nickName.valid] = await fn.ValidateForms.nickName(Static.forms.nickName.val)
                    checForm()
                    initReload("modals")
                  }}
                />

                <InputDiv
                  class={["input-div",
                    Static.forms.language.error ? "input-div--error" : null,
                    Static.forms.language.valid ? "input-div--correctly" : null
                  ]}
                  error={Static.forms.language.error}
                  title={Variable.lang.label.lang}
                  placeholder={Variable.lang.error_div.selectFromList}
                  contenteditable={false}
                  onclick={() => {
                    fn.modals.ModalChangeLanguage({
                      onclick: (code, name, orig) => {
                        Static.forms.language.name = name
                        Static.forms.language.code = code
                        Static.forms.language.orig = orig
                        Static.forms.language.valid = true
                        checForm()
                        initReload("modals")
                      }
                    }, true)
                  }}>
                  {Static.forms.language.name ? `${Static.forms.language.name} (${Static.forms.language.orig})` : null}
                </InputDiv>

                <InputDiv
                  class={["input-div",
                    Static.forms.country.error ? "input-div--error" : null,
                    Static.forms.country.valid ? "input-div--correctly" : null
                  ]}
                  error={Static.forms.country.error}
                  title={Variable.lang.label.country}
                  contenteditable={false}
                  onclick={() => {
                    fn.modals.ModalSelectCountry({
                      onclick: (code, name) => {
                        console.log('=cb3e6c=', code, name)
                        Static.forms.country.name = name
                        Static.forms.country.code = code
                        Static.forms.country.valid = true
                        console.log('=58b2ff=', Static.forms.country)
                        checForm()
                        initReload("modals")
                      }
                    }, true)
                  }}>
                  <div class="input-div__country">
                    <img src={!Static.forms.country.code ? svg["country_icon"] : `/assets/icons/flagsnew/${Static.forms.country.code}.svg`} />

                    {Static.forms.country.name ? 
                      <div>{Static.forms.country.name}</div> 
                      : 
                      <span style="color: rgba(255, 255, 255, 0.5);">{Variable.lang.error_div.selectFromList}</span>
                    }
                    {/* {() => {
                      if (Static.forms.country.name) {
                        return (
                          <div>{Static.forms.country.name}</div>
                        )
                      } else {
                        return (
                          <span style="color: rgba(255, 255, 255, 0.5);">{Variable.lang.error_div.selectFromList}</span>
                        )
                      }
                    }} */}
                  </div>

                </InputDiv>
                <button
                  class={[
                    "c-button c-button--gradient2",
                    !Static.forms.isValid ? "c-button--inactive" : "",
                  ]}
                  type="button"
                  onclick={(e) => {
                    sendRegistrationForm(e)
                  }}
                >
                  <span class="c-button__text">
                    {Variable.lang.button.send}
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      );
    }
  })

  const sendRegistrationForm = async function (e) {
    e.preventDefault();
    if (!Data.MStatic.forms.isValid) {
      return false
    }

    // let insert = {
    //   nickname: Static.forms.nickName.val,
    //   mainLanguage: {
    //     code: Static.forms.language.code,
    //     eng_name: Static.forms.language.name,
    //     orig_name: Static.forms.language.orig,
    //   },
    //   country: {
    //     code: Static.forms.country.code,
    //     eng_name: Static.forms.country.name,
    //     // orig_name: Static.forms.country.orig
    //   }
    // }

    let response = await fn.socket.set({
      method: "Users", action: "findOneAndUpdate", _id: Variable.myInfo._id, params: {
        update: {
          nickname: Static.forms.nickName.val,
          mainLanguage: {
            code: Static.forms.language.code,
            eng_name: Static.forms.language.name,
            orig_name: Static.forms.language.orig,
          },
          country: {
            code: Static.forms.country.code,
            eng_name: Static.forms.country.name,
          } } } })
    // let tmpRes = await sendApi.create("setUsers", data);
    console.log('=b0bcbb=', response)

    if (response.status === 'ok') {
      fn.modals.close(ID)
      // Variable.DelModals("ModalAfterRegisterForm")
      initReload()
    } else {
      Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true);

    }
    return

  }
};

export default ModalAfterRegisterForm;
