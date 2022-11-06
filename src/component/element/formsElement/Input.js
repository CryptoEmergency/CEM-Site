import {
    jsx,
    jsxFrag,
    initReload
} from "@betarost/cemjs";
// check
import svg from '@assets/svg/index.js';

const textConstuctor = function (Static, classDiv, className, before, after) {
    if (typeof Static.label != "undefined" || typeof Static.error != "undefined" || typeof classDiv != "undefined" || typeof before != "undefined" || typeof after != "undefined") {
        return (
            <div>
                {Static.label ? <label>{Static.label}</label> : null}
                {typeof Static.error != "undefined" ? <div class="error-div">{Static.error ? <div class="error-div-variant">{Static.errorText}</div> : null}</div> : null}
                <div class={classDiv}>
                    {before ? before : null}
                    {Static.type == "password" ? <img src={svg.lock} class="icon-input" /> : null}
                    {textElem(Static, className)}
                    {Static.type == "password" ? <img src={svg["eye"]} class="password_eye"
                        onClick={function () {
                            console.log('=b52a91=', Static.elInput.type)
                            if (Static.elInput.type == "text") {
                                Static.elInput.type = "password"
                                this.src = svg["eye"]
                            } else {
                                Static.elInput.type = "text"
                                this.src = svg["eye-slash"]
                            }
                        }}
                    /> : null}
                    {after}
                </div>
            </div>
        )
    } else {
        return (textElem(Static, className))
    }
}
const textElem = function (Static, className) {
    let rows = null
    let adaptive = null
    let placeholder = null
    let value = null
    let type = "text"
    let readonly = false
    if (Static) {
        if (Static.rows) {
            rows = Static.rows
        }
        if (Static.adaptive) {
            adaptive = Static.adaptive
        }
        if (Static.placeholder) {
            placeholder = Static.placeholder
        }
        if (Static.value) {
            value = Static.value
        }
        if (Static.readonly) {
            readonly = Static.readonly
        }
        if (Static.type) {
            type = Static.type
        }
    }
    return (
        <input
            placeholder={placeholder}
            readonly={readonly}
            Element={($el) => {
                Static.elInput = $el
            }}
            type={type}
            value={value}
            class={className}
            oninput={function () { checkInput(Static, this) }}
            onclick={() => {
                if (typeof Static.onclick == "function") {
                    Static.onclick()
                }
            }}
        />
    )
}

const checkInput = function (Static, target) {
    if (Static.timer) {
        clearTimeout(Static.timer);
    }
    Static.timer = setTimeout(async () => {
        Static.timer = null
        Static.value = target.value.trim()
        if (!Static.condition) {
            return
        }
        Static.valid = await Static.condition(target.value.trim())
        Static.error = !Static.valid
        if (Static.error) {
            target.style = "border-color: rgb(200, 23, 38);";
        } else {
            target.style = "border-color: rgb(37, 249, 48);"
        }
        if (Static.afterValid) {
            Static.afterValid();
        }
    },
        500);
    return
}

const Input = function ({ Static, classDiv, className, before, after }) {
    return (textConstuctor(Static, classDiv, className, before, after))
};
export { Input };