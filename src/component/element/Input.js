import { jsx, jsxFrag, Helpers, Variable, initReload } from "@betarost/cemjs";
import svg from '@assets/svg/index.js';

let viewPassword = false

let timer

const Input = function ({ label, error, placeholder, type, value, condition, Static, afterValid, className, dopBefor }) {

    return (
        <div>
            <label>{label}</label>
            <div class="error-div">
                {
                    () => {
                        if (Static.error) {
                            return (
                                <div class="error-div-variant">{error}</div>
                            )
                        }
                    }
                }
            </div>
            <div class={className}>
                {() => {
                    if (type == "password") {
                        return (
                            <img src={svg.lock} class="icon-input" />
                        )
                    }
                }}
                {dopBefor}
                <input
                    placeholder={placeholder}
                    type={viewPassword ? "text" : type}
                    value={value}
                    oninput={function (e) {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        timer = setTimeout(() => {
                            timer = null
                            Static.value = this.value.trim()
                            if (!condition) {
                                return
                            }
                            Static.valid = condition(this.value.trim())
                            Static.error = !Static.valid
                            if (Static.error) {
                                this.style = "border-color: rgb(200, 23, 38);";
                            } else {
                                this.style = "border-color: rgb(37, 249, 48);"
                            }
                            if (afterValid) {
                                afterValid();
                            }
                        }, 500);
                    }}
                />
                {() => {
                    if (type == "password") {
                        return (
                            <img
                                src={svg[`eye${viewPassword ? '-slash' : ''}`]}
                                class="password_eye"
                                onClick={() => {
                                    viewPassword = !viewPassword
                                    initReload()
                                }}
                            />
                        )
                    }
                }}
            </div>
        </div>
    );
};

export { Input };
