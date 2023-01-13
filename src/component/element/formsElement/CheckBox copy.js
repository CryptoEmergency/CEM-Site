import { jsx, jsxFrag, Helpers, Variable, initReload } from "@betarost/cemserver/cem.js";
import svg from '@assets/svg/index.js';


const CheckBox = function ({ id, label, error, Static, afterValid, className }) {

    return (
        <div class="container-checkbox">
            <div class="checkbox">
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
                        class="checkbox__input"
                        type="checkbox"
                        id={id}
                        required="required"
                        checked={Static.value}
                        onchange={() => {
                            Static.value = !Static.value
                            Static.valid = Static.value
                            afterValid()
                        }}
                    />
                    {Static.label ? Static.label : null}
                </div>
            </div>
        </div>
    );
};

export { CheckBox };
