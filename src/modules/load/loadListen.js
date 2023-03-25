import { parsingUrl, Variable } from '@betarost/cemserver/cem.js'
import { fn } from '@src/functions/index.js';

const loadListen = async function () {
    try {
        window.onerror = function (message, url, lineNumber) {
            // console.error("Global Error:", message + "\n(" + url + ":" + lineNumber + ")");
        };

        window.addEventListener("unhandledrejection", function (promiseRejectionEvent) {
            // console.error("Global Error (unhandledrejection):", promiseRejectionEvent.reason);
        });

        window.onpopstate = function (e) {
            e.preventDefault()
            parsingUrl()
        }

        document.addEventListener('click', async function (e) {
            fn.clickHide(e)
        })

        window.addEventListener("scroll", function () {
            // console.log('=6f1984=', window.pageYOffset, window.pageXOffset)
            if ((Variable.dataUrl.adress == "lenta-users" || Variable.dataUrl.adress == "index") && (!Variable.dataUrl.category || !Variable.dataUrl.category.length)) {
                if (window.pageYOffset > 500 && !Variable.Static.elArrowTopLink && Variable.Static.lastScrollPosition > window.pageYOffset) {
                    Variable.Static.elArrowTop.style.display = "block"
                    Variable.Static.elArrowTopLink = setTimeout(() => {
                        Variable.Static.elArrowTop.style.display = "none"
                        Variable.Static.elArrowTopLink = null
                    }, 3000);
                } else if (window.pageYOffset > 500 && Variable.Static.lastScrollPosition > window.pageYOffset) {
                    clearTimeout(Variable.Static.elArrowTopLink);
                    Variable.Static.elArrowTopLink = setTimeout(() => {
                        Variable.Static.elArrowTop.style.display = "none"
                        Variable.Static.elArrowTopLink = null
                    }, 3000);
                } else {
                    Variable.Static.elArrowTop.style.display = "none"
                    clearTimeout(Variable.Static.elArrowTopLink);
                    Variable.Static.elArrowTopLink = null
                }
            }

            Variable.Static.lastScrollPosition = window.pageYOffset
            let windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };

            Variable.ElemVisible.map((item, index) => {
                let targetPosition = {
                    top: window.pageYOffset + item.elem.getBoundingClientRect().top,
                    left: window.pageXOffset + item.elem.getBoundingClientRect().left,
                    right: window.pageXOffset + item.elem.getBoundingClientRect().right,
                    bottom: window.pageYOffset + item.elem.getBoundingClientRect().bottom
                }
                if (targetPosition.bottom > windowPosition.top &&
                    targetPosition.top < windowPosition.bottom &&
                    targetPosition.right > windowPosition.left &&
                    targetPosition.left < windowPosition.right) {
                    item.fn()
                    Variable.ElemVisible.splice(index, 1);
                }
            })
        });

        await parsingUrl();
        return

    } catch (error) {
        console.error(error, "loadListen")
    }
}

export { loadListen };