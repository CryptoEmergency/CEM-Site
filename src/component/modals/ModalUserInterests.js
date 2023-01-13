import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    initOne,
    initReload,
    Variable,
    getValue,
    init
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { Input, ButtonSubmit, TextArea } from '@component/element/index.js';

const showModalUserInterests = function (e) {
    e.stopPropagation()
    Variable.DelModals("ModalUserInterests");
}


const ModalUserInterests = function ({ userInfo, type }, ID) {
    // console.log('dwa', userInfo)
    let Static = fn.GetParams({ ID })

    fn.initData.ModalUserInterests(Static, userInfo, type, {})

    let close = true
    init(
        () => {
            Static = {
                isValid: false
            }

            Static.name = {
                value: userInfo.title,
                type: "text",
                valid: false,
                autocomplete: "off",
                placeholder: Variable.lang.label.label,
            }

            Static.description = {
                value: userInfo.description,
                type: "text",
                valid: false,
                autocomplete: "off",
                placeholder: Variable.lang.label.labelDetails,
            }

            userInfo._id ? Static._id = userInfo._id : null
        },
        () => {
            return (
                <div class="c-modal c-modal--open" onclick={function (e) {
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
                            <h2 class="c-modal__title">{Variable.lang.h.modal_interests}</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={showModalUserInterests}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div style="padding: 0" class="after_register_form">
                                <form>
                                    <div>
                                        <div>
                                            <label style="margin-bottom: 8px; display: block" for="interestsListTitle">{Variable.lang.label.label}</label>
                                            <Input classDiv="" Static={Static.name} />
                                        </div>
                                        <label style="margin-bottom: 8px; display: block" for="interestsList">{Variable.lang.label.labelDetails}</label>
                                        <TextArea
                                            Static={Static.description}
                                            className="text1 create_post_chapter"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <footer class="c-modal__footer">
                            <ButtonSubmit
                                text={type == 'add' ? Variable.lang.button.add : Variable.lang.button.edit}
                                onclick={async () => {
                                    if(!!Static.name.value && !!Static.description.value) {
                                        let response;

                                        let data = {
                                            value: {
                                                interest: []
                                            }
                                        }
                                        if (type == 'edit') {
                                            data.value.interest.push({
                                                title: Static.name.value,
                                                description: Static.description.value,
                                            })

                                            data._id = Static._id
                                            // console.log('=9615aa=', data)
                                            response = await fn.restApi.setUsers.update({ data })
                                        } else {
                                            data.value.interest.push({
                                                title: Static.name.value,
                                                description: Static.description.value,
                                            })
                                            // console.log('=2c7e95=', data)
                                            response = await fn.restApi.setUsers.any({ data })
                                        }
                                        Variable.DelModals("ModalUserInterests");
                                    }
                                }}
                            />
                        </footer>
                    </section>
                </div>
            )
        }, ID
    )


};

export default ModalUserInterests