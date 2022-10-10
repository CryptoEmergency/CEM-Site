import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi
} from '@betarost/cemjs';

import svg from '@assets/svg/index.js';
import { If, Map } from '@component/helpers/All.js';

import { allValidation } from '@src/functions.js';



const dateDelete = function (str) {
    if (str == null) {
        return
    }
    var b = str.split(/\D+/);
    var date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    date.setDate(date.getDate() + 14)
    var curr_date = date.getDate();
    var curr_month = date.getMonth();
    curr_month++;
    if (curr_date <= 9) {
        curr_date = "0" + curr_date
    }
    if (curr_month <= 9) {
        curr_month = "0" + curr_month
    }
    var curr_year = date.getFullYear();
    let result = curr_year + "-" + curr_month + "-" + curr_date;
    return result;
}

const BlockUserSettingsPage = {}

let securityInputs
const changePasswordForm = async function (e) {
    e.preventDefault();
    if (!securityInputs.isValid) {
        return false
    }
    let data = {
        value: {
            oldPassword: securityInputs.oldPass.value,
            newPassword: securityInputs.newPass.value
        }
    }

    let tmpRes = await sendApi.create("changePassword", data);
    if (tmpRes.status === 'ok') {
        Variable.SetModals({ name: "ModalAlarm", data: { icon: "confirm_icon", text: Variable.lang.h.success } }, true)
    } else {
        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true)
    }
}

const securityChangeInput = function () {
    securityInputs[this.dataset.type].value = this.value.trim()
    securityInputs[this.dataset.type].valid = allValidation(this.value.trim(), "pass");

    if (!securityInputs[this.dataset.type].valid) {
        securityInputs[this.dataset.type].error = true;
        this.style = "border-color: rgb(200, 23, 38);";
        securityInputs.isValid = false
        initReload()
        return
    } else {
        securityInputs[this.dataset.type].error = false;
        this.style = "border-color: rgb(37, 249, 48);"
    }

    let isCheckAll = false


    if (securityInputs.oldPass.valid === true && securityInputs.newPass.valid === true) {
        isCheckAll = true
    }


    if (isCheckAll) {
        securityInputs.isValid = true
    } else {
        securityInputs.isValid = false
    }

    initReload()
    return;
}

BlockUserSettingsPage.security = function (data) {
    if (!data || data.settingsPage != "security") {
        return (<></>)
    }

    initOne(
        () => {
            securityInputs = {
                oldPass: {
                    value: "",
                    valid: false,
                    error: false,
                    errorText: Variable.lang.error_div.password5,
                    view: false
                },
                newPass: {
                    value: "",
                    valid: false,
                    error: false,
                    errorText: Variable.lang.error_div.password5,
                    view: false
                },
                isValid: false
            }
        }
    )

    return (
        <div class="settings_body_item">
            <div class="setting_body_item_chapter">
                <p>{Variable.lang.label.password}</p>
                <form class="settings_form" onsubmit={changePasswordForm}>
                    <input style="display: none;" type="submit" />
                    <div class="">
                        <h3>{Variable.lang.h.changePassword}</h3>
                        <div class="container-input">
                            <label>{Variable.lang.label.oldPassword}</label>
                            <If
                                data={securityInputs.oldPass.error}
                                dataIf={
                                    <div class="error-div">
                                        <div class="error-div-variant">{securityInputs.oldPass.errorText}</div>
                                    </div>
                                }
                            />
                            <div class="input-div">
                                <img src={svg["lock"]} class="icon-input" />
                                <input
                                    id="fast_pass"
                                    placeholder={Variable.lang.placeholder.password}
                                    type={securityInputs.oldPass.view ? 'text' : 'password'}
                                    value={securityInputs.oldPass.value}
                                    data-type="oldPass"
                                    oninput={securityChangeInput}
                                />
                                <img
                                    src={svg[`eye${securityInputs.oldPass.view ? '-slash' : ''}`]}
                                    class="password_eye"
                                    onClick={() => {
                                        securityInputs.oldPass.view = !securityInputs.oldPass.view
                                        initReload()
                                    }}
                                />
                            </div>
                        </div>

                        <div class="container-input">
                            <label>{Variable.lang.label.oldPassword}</label>
                            <If
                                data={securityInputs.newPass.error}
                                dataIf={
                                    <div class="error-div">
                                        <div class="error-div-variant">{securityInputs.newPass.errorText}</div>
                                    </div>
                                }
                            />
                            <div class="input-div">
                                <img src={svg["lock"]} class="icon-input" />
                                <input
                                    id="fast_pass2"
                                    placeholder={Variable.lang.placeholder.password}
                                    type={securityInputs.newPass.view ? 'text' : 'password'}
                                    value={securityInputs.newPass.value}
                                    data-type="newPass"
                                    oninput={securityChangeInput}
                                />
                                <img
                                    src={svg[`eye${securityInputs.newPass.view ? '-slash' : ''}`]}
                                    class="password_eye"
                                    onClick={() => {
                                        securityInputs.newPass.view = !securityInputs.newPass.view
                                        initReload()
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            class={`c-button c-button--gradient2 ${!securityInputs.isValid && "c-button--inactive"}`}
                            type="button"
                            onClick={changePasswordForm}>
                            <span class="c-button__text">
                                {Variable.lang.button.login}
                            </span>
                        </button>

                    </div>
                </form>

            </div>
            {/* <div class="setting_body_item_chapter">
                <p>{Variable.lang.text.youCanDeletePage}</p>

                <form class="settings_form" id="deleteUser">
                    <If
                        data={Variable.myInfo.status.delete == true}
                        dataIf={
                            <div>
                                <p>
                                    {Variable.lang.text.deletePageDate} {dateDelete(Variable.myInfo.startDelete)}
                                </p>
                                <div class="button-container-preview">
                                    <a data-deletedcan="true" class="btn-news-preview" onclick={restoreUser}>
                                        <span>
                                            {Variable.lang.text.restorePage}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        }
                        dataElse={
                            <div class="button-container-preview">
                                <a class="btn-news-preview" onclick={deleteUser}>
                                    <span>
                                        {Variable.lang.text.deletePage}
                                    </span>
                                </a>
                            </div>
                        }
                    />
                </form>

            </div> */}
        </div>
    )
};

export { BlockUserSettingsPage }

const style = {
    formButton: {
        padding: 0,
        background: 'inherit',
        border: 0,
        width: '100%'
    }
}