import {
    jsx,
    jsxFrag,
    timerStopStart,
    load
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/export.js';
import svg from "@assets/svg/index.js";

const ModalAlarm = function ({ icon = "alarm_icon", text }, ID) {
    timerStopStart({
        name: "Alarm-" + ID,
        fn: () => {
            fn.modals.close(ID)
        },
        msecond: 1500,
        type: "Timeout"
    })
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

// 13.04.2023