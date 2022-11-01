import { jsx, jsxFrag, Helpers, Variable } from "@betarost/cemjs";


const Input = function ({ label, error, placeholder, type, value, Сondition, Static }) {

    return (
        <div class='reset_by_email_block'>
            <label for="resetByEmailInput">{label}</label>
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
            <div class="reset_by_email_block_container">
                <input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    oninput={function (e) {

                    }}
                />
            </div>

        </div>
    );
};

export { Input };
