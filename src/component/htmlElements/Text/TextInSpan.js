import {
    jsx,
    jsxFrag,
    Variable,
} from "@betarost/cemserver/cem.js";
import svg from "@assets/svg/index.js";

const TextInSpan = function ({ mainClass, elemClass, text = "Текст", onclick }) {
    // console.log('=0889a6=', data, data2)
    return (
        <div
            class={mainClass}
            onclick={onclick}>
            <span
                class={elemClass}>
                {text}
            </span>
        </div>
    )
}
export { TextInSpan }
// OK