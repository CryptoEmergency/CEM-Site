import {
    jsx,
    jsxFrag,
    Variable
} from "@betarost/cemjs";

import svg from '@assets/svg/index.js';

let elTextArea
const InputAdaptive = function ({ callBack }) {

    return (
        <div class="c-comments__form create_post_coments">
            <div class="c-comments__field create_post_container1">
                <textarea
                    class=" text1 create_post_chapter"
                    wrap="soft"
                    rows="1"
                    Element={($el) => {
                        elTextArea = $el
                    }}
                    oninput={function () {
                        if (!this.dataset.maxHeight) {
                            this.dataset.maxHeight = this.offsetHeight * 4
                        }
                        if (this.scrollHeight > this.offsetHeight && this.offsetHeight < this.dataset.maxHeight) {
                            if (this.scrollHeight <= this.dataset.maxHeight) {
                                this.style.height = this.scrollHeight + 'px';
                            } else {
                                this.style.height = this.dataset.maxHeight + 'px';
                            }
                        }
                    }}
                // style={`${nickname !== undefined &&
                //     "padding: 10px 40px 10px 25px;font-size: 10px;min-height: 46px;"
                //     }`}
                >
                    {/* {(nickname !== undefined && Variable.Static.EditInput.length === 0) && nickname + ","}
                    {Variable.Static.EditInput.length > 0 && wrapTagToText(item.text)} */}

                </textarea>
            </div>
            {/* Поставить проверку на пустоту */}
            <div
                class="c-comments__send button-container-preview comments_send"
                onclick={() => {
                    if (!Variable.auth) {
                        Variable.SetModals({ name: "ModalNeedAuth", data: {} });
                        return
                    }
                    if (!elTextArea.value.trim().length) {
                        return
                    }
                    callBack(elTextArea.value.trim())
                    elTextArea.value = ""
                    elTextArea.style.height = (elTextArea.dataset.maxHeight / 4) + 'px';
                }}
            >
                <img class="c-comments__icon" src={svg["send_message"]} />
            </div>
        </div>
    );
};
export { InputAdaptive };
