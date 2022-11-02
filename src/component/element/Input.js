import { jsx, jsxFrag, Helpers, Variable } from "@betarost/cemjs";


const Input = function ({ label, error, placeholder, type, value, condition, Static, afterValid, className }) {

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
                <input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    oninput={function (e) {
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
                    }}
                />
            </div>
        </div>
    );
};

export { Input };
