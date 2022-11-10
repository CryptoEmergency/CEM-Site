import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    initOne,
    initReload,
    Variable,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import { Input, ButtonSubmit, TextArea } from '@component/element/index.js';
import { api } from '@src/apiFunctions.js'

const showModalUserInfoEdit = function (e) {
    e.stopPropagation()
    Variable.DelModals("ModalUserInterests");
}

let Static = {}

const ModalUserInterests = function (userInfo, reload) {
    console.log('dwa', userInfo)
    initOne(() => {
        Static = {
          isValid: false
        }  

        Static.name = {
            value:  "",
            type:"text",
            valid: false,
            autocomplete:"off",
            placeholder:Variable.lang.label.label,
        }

        Static.description = {
            value:  "",
            type:"text",
            valid: false,
            autocomplete:"off",
            placeholder:Variable.lang.label.labelDetails,
        }
    })

    return (
        <div class="c-modal c-modal--open">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{Variable.lang.h.modal_interests}</h2>
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
                                <label style="margin-bottom: 8px; display: block" for="interestsListTitle">{Variable.lang.label.label}</label>
                                <Input classDiv="" Static={Static.name} />
                            </div>
                            <label style="margin-bottom: 8px; display: block" for="interestsList">{Variable.lang.label.labelDetails}</label>
                            <TextArea
                                Static={Static.description}
                                className="text1 create_post_chapter"
                            />
                            
                        </form>
                    </div>
                </div>
                <footer class="c-modal__footer">
                    <ButtonSubmit
                        text={Variable.lang.button.edit}
                        onclick={async()=>{
                            console.log(Static)
                            if(Static.name.value == "" || Static.description.value == ""){
                                return
                            }
                            let data = {
                                value: {
                                    interest: []
                                }
                            }
                            data.value.interest.push({
                                title: Static.name.value,
                                description: Static.description.value
                            })
                            let response = await api({ type: "set", action: "setUsers", data })
                            Variable.DelModals("ModalUserInterests");
                        }}
                    />
                </footer>
            </section>
        </div>
    )
};

export default ModalUserInterests