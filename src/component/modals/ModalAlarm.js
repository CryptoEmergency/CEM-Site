import {
    jsx,
    jsxFrag,
    init,
    load
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
//"alarm_icon" : "confirm_icon"
const ModalAlarm = function ({ icon, text }, ID) {
    setTimeout(() => {
        fn.modals.close(ID)
    }, 1500);
    load({
        ID,
        fnLoad: async () => {
        },
        fn: () => {
            return (
                <div id="alarm" class="error_alarm_container">
                    <div class="error_alarm">
                        <img src={svg[icon]} />
                        <span class="error_text">{text}</span>
                    </div>
                </div>
            )
        }
    })
};
export default ModalAlarm;
// OK