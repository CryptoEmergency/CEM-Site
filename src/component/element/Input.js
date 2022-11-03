import {
    jsx,
    jsxFrag,
    initReload
} from "@betarost/cemjs";
// poydet
import svg from '@assets/svg/index.js';

const checkInput = function (Static, target) {
    if (Static.timer) {
        clearTimeout(Static.timer);
    }
    Static.timer = setTimeout(() => {
        Static.timer = null
        Static.value = target.value.trim()
        if (!Static.condition) {
            return
        }
        Static.valid = Static.condition(target.value.trim())
        Static.error = !Static.valid
        if (Static.error) {
            target.style = "border-color: rgb(200, 23, 38);";
        } else {
            target.style = "border-color: rgb(37, 249, 48);"
        }
        if (Static.afterValid) {
            Static.afterValid();
        }
    }, 500);
    return
}

const Input = function ({ Static, classDiv, classInput, befor, after }) {
    return (
        <div>
            <label>{Static.label}</label>
            <div class="error-div">
                {Static.error ? <div class="error-div-variant">{Static.errorText}</div> : null}
            </div>
            <div class={classDiv}>
                {befor}
                {Static.type == "password" ? <img src={svg.lock} class="icon-input" /> : null}
                <input
                    placeholder={Static.placeholder}
                    type={Static.viewPassword ? "text" : Static.type}
                    value={Static.value}
                    class={classInput}
                    oninput={function () { checkInput(Static, this) }}
                />
                {Static.type == "password" ? <img
                    src={svg[`eye${Static.viewPassword ? '-slash' : ''}`]}
                    class="password_eye"
                    onClick={() => {
                        Static.viewPassword = !Static.viewPassword
                        initReload()
                    }}
                /> : null}
                {after}
            </div>
        </div>
    );
};
export { Input };
