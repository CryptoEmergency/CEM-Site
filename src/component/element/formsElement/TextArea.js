import {
    jsx,
    jsxFrag,
} from "@betarost/cemjs";

const textConstuctor = function (Static, className, classDiv, index) {
    if (Static && (typeof Static.label != "undefined" || typeof Static.error != "undefined")) {
        return (
            <div>
                {Static.label ? <label>{Static.label}</label> : null}
                {typeof Static.error != "undefined" ? <div class="error-div">{Static.error ? <div class="error-div-variant">{Static.errorText}</div> : null}</div> : null}
                {textElem(Static, className)}
            </div>
        )
    } else {
        return (textElem(Static, className, index))
    }
}
const textElem = function (Static, className, index) {
    let rows = null
    let adaptive = null
    let placeholder = null
    let text = null
    if (Static) {
        if (Static.rows) {
            rows = Static.rows
        }
        if (Static.adaptive) {
            adaptive = Static.adaptive
        }
        if (Static.placeholder) {
            placeholder = Static.placeholder
        }
        if (Static.value && Static.value.trim().length > 0) {
            text = Static.value
        }
    }
    return (
        <textarea
            class={className}
            placeholder={placeholder}
            // wrap="soft"
            value={Static.value}
            rows={rows}
            Element={($el) => {
                if (Static) {
                    if (typeof index != "undefined") {
                        Static.el[index] = $el
                    } else {
                        Static.el = $el
                    }
                }
            }
            }
            oninput={function () {
                if (adaptive) {
                    if (!this.dataset.maxHeight) {
                        this.dataset.maxHeight = this.offsetHeight * adaptive
                    }
                    if (this.scrollHeight > this.offsetHeight && this.offsetHeight < this.dataset.maxHeight) {
                        if (this.scrollHeight <= this.dataset.maxHeight) {
                            this.style.height = 'auto';
                            this.style.height = this.scrollHeight + 'px';
                        } else {
                            this.style.height = 'auto';
                            this.style.height = this.dataset.maxHeight + 'px';
                        }
                    } else if (this.dataset.scrollLast && this.scrollHeight < this.dataset.scrollLast) {
                        if (this.scrollHeight <= this.dataset.maxHeight) {
                            this.style.height = 'auto';
                            this.style.height = this.scrollHeight + 'px';
                        } else {
                            this.style.height = 'auto';
                            this.style.height = this.dataset.maxHeight + 'px';
                        }
                    }
                    this.dataset.scrollLast = this.scrollHeight
                }
                Static.value = this.value.trim()
                if (!Static.condition) {
                    return
                }
                Static.valid = Static.condition(this.value.trim())
                Static.error = !Static.valid
                if (Static.error) {
                    this.style = "border-color: rgb(200, 23, 38);";
                } else {
                    this.style = "border-color: rgb(37, 249, 48);"
                }
                if (Static.afterValid) {
                    Static.afterValid();
                }
            }}>
            { text }
        </textarea>
    )
}

const TextArea = function ({ Static, className, classDiv, index }) {
    return (textConstuctor(Static, className, classDiv, index))
};
export { TextArea };
// OK