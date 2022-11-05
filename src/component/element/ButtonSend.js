import {
    jsx,
    jsxFrag,
    Variable
} from "@betarost/cemjs";

const ButtonSend = function ({ onclick }) {
    return (
        <div class="c-questions__footer" >
            <a class="c-button c-button--gray" onclick={onclick}>
                <span class="c-button__wrapper">{Variable.lang.button.showMore}</span>
            </a>
        </div>
    )
}

export { ButtonSend }