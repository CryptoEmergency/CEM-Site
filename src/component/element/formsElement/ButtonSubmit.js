import {
    jsx,
    jsxFrag,
} from "@betarost/cemjs";
// check
const ButtonSubmit = function ({ Static, text, onclick }) {
    return (
        <div
            class={['search-button', !Static.isValid ? 'c-button--inactive' : null]}
            onclick={function (e) {
                e.preventDefault();
                if (!Static.isValid || Static.submitClick) {
                    return false
                }
                Static.submitClick = true
                // Эффект ожидания на кнопке
                onclick(Static, this)
            }}>
            {text}
        </div>
    )
}
export { ButtonSubmit }