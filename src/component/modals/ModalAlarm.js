import {
    jsx,
    jsxFrag,
    Variable,
    initReload
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";

//"alarm_icon" : "confirm_icon"
const ModalAlarm = function ({ icon, text }) {

    setTimeout(() => {
        Variable.DelModals("ModalAlarm")
    }, 3000);

    return (
        <div id="alarm" class="error_alarm_container">
            <div class="error_alarm">
                <img src={svg[icon]} />
                <span class="error_text">{text}</span>
            </div>
        </div>
    )
};

export default ModalAlarm;