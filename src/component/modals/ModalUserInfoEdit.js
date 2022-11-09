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
import { Input, ButtonSubmit } from '@component/element/index.js';

const showModalUserInfoEdit = function (e) {
    e.stopPropagation()
    setValue("modals", "userInfoEditModalShow", !getValue("modals", "userInfoEditModalShow"))
}

let Static = {}

const ModalUserInfoEdit = function (userInfo, reload) {
    // console.log("ModalComingSoon");
    const userInfoEditModalShow = getValue("modals", "userInfoEditModalShow")
    console.log(userInfo)
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
            placeholder:Variable.lang.label.name,
        }
        Static.speciality = {
            value:"",
            type:"text",
            valid: false,
            code: "",
            name: "",
            autocomplete:"off",
            placeholder:Variable.lang.label.speciality,
        }
        Static.birthday = {
            value:"",
            type:"date",
            valid: false,
            code: "",
            name: "",
            autocomplete:"off",
            placeholder:Variable.lang.label.birthDate,
        }
        Static.city = {
            value:"",
            type:"text",
            valid: false,
            code: "",
            name: "",
            autocomplete:"off",
            placeholder:Variable.lang.label.city,
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
                    <h2 class="c-modal__title">{Variable.lang.button.edit}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={showModalUserInfoEdit}
                    ></button>
                </header>
                <div class="c-modal__body">
                    <div style="padding: 0" class="after_register_form">
                        <form> 
                            <div>
                                <Input classDiv="" Static={Static.name} />
                            </div>
                            <div>
                                <Input classDiv="" Static={Static.speciality} />
                            </div>
                            <div>
                                <Input classDiv="" Static={Static.birthday} />
                            </div>
                            <div>
                                <Input classDiv="" Static={Static.city} />
                            </div>
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
                    <ButtonSubmit
                        text={Variable.lang.button.edit}
                        onclick={()=>{
                            console.error('success')
                        }}
                    />
                </footer>
            </section>
        </div>
    )
};

export default ModalUserInfoEdit