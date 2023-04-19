import {
    jsx,
    jsxFrag,
    Variable,
    init,
    load
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { Input, ButtonSubmit, TextArea } from '@elements/element/index.js';

const showModalUserAddWork = function (e) {
    e.stopPropagation()
    Variable.DelModals("ModalUserAddWork");
}



const ModalUserAddWork = function ({ userInfo, type }, ID) {
    // console.log('=756c32=', userInfo, type)
    let Static = fn.GetParams({ ID })

    // fn.initData.ModalUserAddWork(Static, userInfo, {})
    //    console.log('pdf', userInfo, Static)
    let close = true

    load({
        ID,
        fnLoad: async () => {
            Static = {
                isValid: false
            }

            Static.company = {
                value: userInfo.title,
                type: "text",
                valid: false,
                autocomplete: "off",
                // placeholder: Variable.lang.label.label,
            }

            Static.workTime = {
                value: userInfo.period,
                type: "text",
                valid: false,
                autocomplete: "off",
                // placeholder: Variable.lang.label.termTime,
            }

            Static.workDetails = {
                value: userInfo.description,
                type: "text",
                valid: false,
                autocomplete: "off",
                // placeholder: Variable.lang.p.aboutMe,
            }

            userInfo._id ? Static._id = userInfo._id : null
        },
        fn: () => {
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
                            <h2 class="c-modal__title">{Variable.lang.h.modal_work}</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={showModalUserAddWork}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <form id="addWorkForm" data-button_id="addWorkSend">
                                <div class="c-form__block">
                                    <label
                                        style="margin-bottom: 8px; display: block"
                                        class="c-form__label"
                                        for="WorkListTitle"
                                    >{Variable.lang.label.label}</label>
                                    <Input
                                        classDiv="c-form__wrapfield"
                                        className="c-form__field"
                                        Static={Static.company}
                                    />
                                </div>
                                <div class="c-form__block">
                                    <label
                                        style="margin-bottom: 8px; display: block"
                                        for="WorkTime"
                                        class="c-form__label"
                                    >{Variable.lang.label.termTime}</label>
                                    <Input
                                        classDiv="c-form__wrpfield"
                                        className="c-form__field"
                                        Static={Static.workTime}
                                    />
                                </div>
                                <div class="c-form__block">
                                    <label
                                        style="margin-bottom: 8px; display: block"
                                        class="c-form__label"
                                        for="WorkListTitle"
                                    >{Variable.lang.label.labelDetails}</label>
                                    <div class="c-form__wrapfield c-form__wrapfield--text">
                                        <TextArea
                                            Static={Static.workDetails}
                                            // className="text1 create_post_chapter"
                                            className="c-form__field"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <footer class="c-modal__footer">
                            <ButtonSubmit
                                text={type == 'add' ? Variable.lang.button.add : Variable.lang.button.edit}
                                onclick={async () => {
                                    if (!!Static.company.value && !!Static.workTime.value) {
                                        let response;
                                        let data = {
                                            value: {
                                                work: []
                                            }
                                        }
                                        if (type == 'edit') {
                                            data.value.work.push({
                                                title: Static.company.value,
                                                period: Static.workTime.value,
                                                description: Static.workDetails.value,
                                            })

                                            data._id = Static._id
                                            response = await fn.restApi.setUsers.update({ data })
                                        } else {
                                            data.value.work.push({
                                                title: Static.company.value,
                                                period: Static.workTime.value,
                                                description: Static.workDetails.value,
                                            })
                                            response = await fn.restApi.setUsers.any({ data })
                                        }
                                        // console.log('=2196b6=', data)
                                        Variable.DelModals("ModalUserAddWork");

                                    }
                                }}
                            />
                        </footer>
                    </section>
                </div>
            )
        }
    })



};

export default ModalUserAddWork