import {
    jsx,
    jsxFrag,
    Variable
} from "@betarost/cemjs";

import svg from '@assets/svg/index.js';
const ButtonSend = function ({ className, onclick, text, onlyAuth }) {
    return (
        <div
            class={className}
            onclick={function () {
                if (onlyAuth && !Variable.auth) {
                    Variable.SetModals({ name: "ModalNeedAuth", data: {} });
                    return
                }
                // if (!elTextArea.value.trim().length) {
                //     return
                // }
                onclick(this)
                // callBack(elTextArea.value.trim())
                // elTextArea.value = ""
                // elTextArea.style.height = (elTextArea.dataset.maxHeight / 4) + 'px';
            }}
        >
            {text}
            {/* <img class="c-comments__icon" src={svg["send_message"]} /> */}
        </div>
    )
}

export { ButtonSend }