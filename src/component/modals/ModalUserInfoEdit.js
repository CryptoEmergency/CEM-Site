import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    initOne,
    Variable,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { Input } from '@component/element/index.js';

const showModalUserInfoEdit = function (e) {
    e.stopPropagation()
    setValue("modals", "userInfoEditModalShow", !getValue("modals", "userInfoEditModalShow"))
}

let Static = {}

const ModalUserInfoEdit = function ({ }, reload) {
    // console.log("ModalComingSoon");
    const userInfoEditModalShow = getValue("modals", "userInfoEditModalShow")
    initOne(() => {
        Static = {
          isValid: false
        }  

        Static.name = {
            value:"",
            type:"text",
            valid: false,
            code: "",
            name: "",
            autocomplete:"off",
            placeholder:Variable.lang.error_div.selectFromList,
            onclick: () => {
              Variable.SetModals({
                name: "ModalSelectCountry", data: {
                  onclick: (code, name) => {
                    Static.country.value = name
                    Static.country.code = code
                    Static.country.valid = true
                    checkValid(Static, ["nickName","language","country"])
                  }
                }
              }, true);
            }
          }

        Static.country = {
            value:"",
            type:"text",
            valid: false,
            code: "",
            name: "",
            autocomplete:"off",
            placeholder:Variable.lang.error_div.selectFromList,
            onclick: () => {
              Variable.SetModals({
                name: "ModalSelectCountry", data: {
                  onclick: (code, name) => {
                    Static.country.value = name
                    Static.country.code = code
                    Static.country.valid = true
                    checkValid(Static, ["nickName","language","country"])
                  }
                }
              }, true);
            }
          }
    })

    return (
        <div class="c-modal c-modal--open">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">Edit</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={showModalUserInfoEdit}
                    ></button>
                </header>
                <div class="c-modal__body">
                    <div class="after_register_form">
                        <form id="afterRegisterForm"> 
                            <div class="country_select_wrapper">
                                <Input classDiv="" Static={Static.country} />
                                <div
                                    id="country_search_help"
                                    class="country_help_block"
                                ></div>
                                <div class="country_search_help_error dn">
                                    <div class="country_help_error"></div>
                                </div>
                                <img src={svg["country_icon"]} />
                            </div>
                        </form>
                    </div>
                </div>
                <footer class="c-modal__footer">
                    <button class="c-button c-button--primary"
                        onclick={showModalUserInfoEdit}
                    >
                        <span>Закрыть</span>
                    </button>
                </footer>
            </section>
        </div>
    )
};

export default ModalUserInfoEdit