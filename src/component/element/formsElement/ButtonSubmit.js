import {
    jsx,
    jsxFrag,
    Variable
} from "@betarost/cemjs";
// check
const ButtonSubmit = function ({ Static, className, text, onclick, onlyAuth }) {
    return (
        <button
            class={[className ? className : 'c-button c-button--primary', Static && !Static.isValid ? 'c-button--inactive' : null]}
            onclick={function (e) {
                e.preventDefault();
                if (onlyAuth && !Variable.auth) {
                    Variable.SetModals({ name: "ModalNeedAuth", data: {} });
                    return
                }
                if (Static) {
                    if (!Static.isValid || Static.submitClick) {
                        return false
                    }
                    Static.submitClick = true
                }
                // Эффект ожидания на кнопке
                if (onclick) {
                    onclick(Static, this)
                }
            }}>
            {text}
        </button>
    )
}
export { ButtonSubmit }