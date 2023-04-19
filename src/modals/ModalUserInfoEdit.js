import {
    jsx,
    jsxFrag,
    Variable,
    init,
    load,
    CEM
} from '@betarost/cemserver/cem.js';
// import { fn } from '@src/functions/index.js';
// import svg from "@assets/svg/index.js";
import { Input, ButtonSubmit, TextArea } from '@component/element/index.js';

const { images, svg, fn } = CEM

const showModalUserInfoEdit = function (e) {
    e.stopPropagation()
    Variable.DelModals("ModalUserInfoEdit");
}

const ModalUserInfoEdit = function (userInfo, ID) {
    let Static = fn.GetParams({ ID })

    fn.initData.ModalUserInfoEdit(Static, userInfo, {})
    console.log('pdf', userInfo, Static)
    //fn.initData.generate(["lang", "country", "group", "online"])
    let close = true
    load({
        ID,
        fnLoad: async () => {
            Static = {
                isValid: false
            }

            Static.about = {
                value: userInfo.information.about,
                type: "text",
                valid: false,
                autocomplete: "off",
                placeholder: Variable.lang.p.aboutMe,
            }

            Static.name = {
                value: userInfo.fullname,
                type: "text",
                valid: false,
                autocomplete: "off",
                placeholder: Variable.lang.label.name,
            }
            Static.speciality = {
                value: userInfo.information.speciality,
                type: "text",
                valid: false,
                autocomplete: "off",
                placeholder: Variable.lang.label.speciality,
            }
            Static.birthday = {
                value: userInfo.information.birthday,
                type: "date",
                valid: false,
                autocomplete: "off",
                placeholder: Variable.lang.label.birthDate,
            }
            Static.city = {
                value: userInfo.information.city,
                type: "text",
                valid: false,
                autocomplete: "off",
                placeholder: Variable.lang.label.city,
            }

            Static.country = {
                value: userInfo.country.eng_name,
                type: "text",
                valid: false,
                code: "",
                name: "",
                autocomplete: "off",
                placeholder: Variable.lang.error_div.selectFromList,
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
                                    <TextArea
                                        Static={Static.about}
                                        className="text1 create_post_chapter"
                                    />
                                    <div style="margin-top: 20px">
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
                                onclick={async () => {
                                    //  console.log(Static)
                                    let value = {
                                        information: {}
                                    }
                                    if (Static.name.value != userInfo.fullname) {
                                        value.fullname = Static.name.value
                                        userInfo.fullname = Static.name.value
                                    }
                                    if (Static.about.value != userInfo.information.about) {
                                        value.information.about = Static.about.value
                                        userInfo.information.about = Static.about.value
                                    }
                                    if (Static.city.value != userInfo.information.city) {
                                        value.information.city = Static.city.value
                                        userInfo.information.city = Static.city.value
                                    }
                                    if (Static.birthday.value != userInfo.information.birthday) {
                                        value.information.birthday = Static.birthday.value
                                        userInfo.information.birthday = Static.birthday.value
                                    }
                                    if (Static.speciality.value != userInfo.information.speciality) {
                                        value.information.speciality = Static.speciality.value
                                        userInfo.information.speciality = Static.speciality.value
                                    }
                                    if (Static.country.code != userInfo.country.code && Static.country.code.length != 0) {
                                        value.country = Static.country.code
                                        userInfo.country.eng_name = Static.country.value
                                    }
                                    let data = {
                                        value: value
                                    }
                                    let response = await fn.restApi.setUsers.any({ data })
                                    // api({ type: "set", action: "setUsers", data })
                                    Variable.DelModals("ModalUserInfoEdit");
                                    //    console.log('data', data)
                                    //    console.log(response)
                                }}
                            />
                        </footer>
                    </section>
                </div>
            )
        }
    })
};

export default ModalUserInfoEdit