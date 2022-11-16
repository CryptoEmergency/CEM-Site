import {
    jsx,
    jsxFrag,
    init
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
//"alarm_icon" : "confirm_icon"
const ModalAlarm = function ({ icon, text }, ID) {
    setTimeout(() => {
        fn.modals.close(ID)
    }, 1500);
    init(
        null,
        () => {
            return (
                <div id="alarm" class="error_alarm_container">
                    <div class="error_alarm">
                        <img src={svg[icon]} />
                        <span class="error_text">{text}</span>
                    </div>
                </div>
            )
        }, ID
    )
};
export default ModalAlarm;
// OK