import {
    initReload,
    jsx,
    jsxFrag,
} from "@betarost/cemserver/cem.js";

const textConstuctor = function (Static, className, classDiv, index, noBacklight, sendByEnter) {
    if (Static && (typeof Static.label != "undefined" || typeof Static.error != "undefined")) {
        return (
            <div>
                {Static.label ? <label>{Static.label}</label> : null}
                {typeof Static.error != "undefined" ? <div class="error-div">{Static.error ? <div class="error-div-variant">{Static.errorText}</div> : null}</div> : null}
                {textElem(Static, className, noBacklight, sendByEnter)}
            </div>
        )
    } else {
        return (textElem(Static, className, index, noBacklight, sendByEnter))
    }
}
const textElem = function (Static, className, index, noBacklight, sendByEnter) {
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
                        if (!Static.el) {
                            Static.el = []
                        }
                        Static.el[index] = $el
                    } else {
                        Static.el = $el
                    }
                }
            }
            }
            oninput={function (e) {
                if (sendByEnter) {
                    return
                }
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
                if (typeof Static.value == 'undefined' || Static.value == '' || this.value.trim() == '') {
                    initReload()
                }
                Static.value = this.value.trim()
                if (!Static.condition) {
                    return
                }
                Static.valid = Static.condition(this.value.trim())
                Static.isValid = Static.condition(this.value.trim())
                Static.error = !Static.valid
                if (!noBacklight) {
                    if (Static.error) {
                        this.style = "border-color: rgb(200, 23, 38);";
                    } else {
                        this.style = "border-color: rgb(37, 249, 48);"
                    }

                }
                if (Static.afterValid) {
                    Static.afterValid();
                }
            }}
            onkeydown={function (e) {
                // console.log('=c4318c onkeydown=', e.keyCode, e.shiftKey)
                if (e.keyCode == 13 && e.ctrlKey) {
                    this.value += "\n"
                }
                if (sendByEnter && e.keyCode == 13 && !e.shiftKey && !e.ctrlKey) {
                    console.log('=9c31ae=', "sendByEnter 111")
                    e.stopPropagation();
                    e.preventDefault();
                    sendByEnter();
                    return false
                }
            }}
            onkeyup={function (e) {

                if (!sendByEnter) {
                    return
                }

                // if (sendByEnter && e.keyCode == 13 && !e.shiftKey && !e.ctrlKey) {
                //     console.log('=9c31ae=', "sendByEnter 111")
                //     e.stopPropagation();
                //     e.preventDefault();
                //     sendByEnter();
                //     return false
                // } else if (e.keyCode == 13 && e.ctrlKey) {
                //     this.value += "\n"
                // }

                // console.log('=1f92f3=', "===============", e.code)
                // if (sendByEnter && !linkSendByEnter && e.keyCode == 13) {
                //     e.stopPropagation();
                //     e.preventDefault();
                //     this.value = this.value.substr(0, this.value.length - 2)
                //     linkSendByEnter = setTimeout(() => {
                //         sendByEnter();
                //         linkSendByEnter = null
                //     }, 50);
                //     return
                // }
                // if (linkSendByEnter && e.keyCode == 17) {
                //     clearTimeout(linkSendByEnter)
                //     linkSendByEnter = null
                //     this.value += "\n"
                // }

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
                if (typeof Static.value == 'undefined' || Static.value == '' || this.value.trim() == '') {
                    initReload()
                }
                Static.value = this.value.trim()
                if (!Static.condition) {
                    return
                }
                Static.valid = Static.condition(this.value.trim())
                Static.isValid = Static.condition(this.value.trim())
                Static.error = !Static.valid
                if (!noBacklight) {
                    if (Static.error) {
                        this.style = "border-color: rgb(200, 23, 38);";
                    } else {
                        this.style = "border-color: rgb(37, 249, 48);"
                    }

                }
                if (Static.afterValid) {
                    Static.afterValid();
                }

            }}
        >
            {text}
        </textarea>
    )
}

// const timerSendByEnter
let linkSendByEnter

const TextArea = function ({ Static, className, classDiv, index, noBacklight = false, sendByEnter }) {
    return (textConstuctor(Static, className, classDiv, index, noBacklight, sendByEnter))
};
export { TextArea };
// OK