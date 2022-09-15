import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";

const ModalAlarm = function ({ lang, wayReg, errorText = "" }) {
    console.log("ModalAlarm", errorText);

    return (
        <div id="alarm" class="error_alarm_container">
            <div class="error_alarm">
                <img src={svg[`${wayReg == "email" || wayReg == "phone" ? "alarm_icon" : "confirm_icon"}`]} />
                <span class="error_text">{`${errorText != "" ? errorText : wayReg == "email" ? lang.error_div.existing_email : wayReg == "phone" && lang.error_div.existing_phone}`}</span>
            </div>
        </div>
    )
};

export { ModalAlarm };