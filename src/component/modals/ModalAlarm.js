import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";

//"alarm_icon" : "confirm_icon"
const ModalAlarm = function ({ icon, text, reload }) {
    //const ModalAlarm = function () {

    setTimeout(() => {
        Variable.Modals = []
    }, 4000);

    return (
        <div id="alarm" class="error_alarm_container">
            <div class="error_alarm">
                <img src={svg[icon]} />
                <span class="error_text">{text}</span>
            </div>
        </div>
    )
    // return (
    //     <div id="alarm" class="error_alarm_container">
    //         <div class="error_alarm">
    //             <img src={svg[`${wayReg == "email" || wayReg == "phone" ? "alarm_icon" : "confirm_icon"}`]} />
    //             <span class="error_text">{`${errorText != "" ? errorText : wayReg == "email" ? Variable.lang.error_div.existing_email : wayReg == "phone" && Variable.lang.error_div.existing_phone}`}</span>
    //         </div>
    //     </div>
    // )
};

export default ModalAlarm;