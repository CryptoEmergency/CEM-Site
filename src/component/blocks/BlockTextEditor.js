import { jsx, jsxFrag, Variable, initOne, initReload } from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";
import { ButtonShowMore, NotFound } from "@component/element/index.js";

let editorField;

const textItalicHandler = function () {
    // console.log('=fcf2ba= editorField =', editorField, window.getSelection(), window.getSelection().focusNode.outerHTML/*, window.getSelection().toString()*/)
    if (window.getSelection() == '') {
        return false;
    }
    var range = window.getSelection().getRangeAt(0);
    var selectionContents = range.extractContents();
    console.log('=f2742b= selectionContents =', selectionContents?.children[0]?.nodeName == "I")
    if (selectionContents?.children[0]?.nodeName == "I") {
        range.insertNode(selectionContents);
    } else {
        var iElement = document.createElement("i");
        iElement.appendChild(selectionContents);
        // iElement.setAttribute("style", "font-style: italic");
        range.insertNode(iElement);
    }
    clearEmptyTag()
};

const textBoldHandler = function () {
    if (window.getSelection() == '') {
        return false;
    }
    var range = window.getSelection().getRangeAt(0);
    var selectionContents = range.extractContents();
    if (selectionContents?.children[0]?.nodeName == "B") {
        range.insertNode(selectionContents);
    } else {
        var boldElement = document.createElement("b");
        boldElement.appendChild(selectionContents);
        range.insertNode(boldElement);
    }
    clearEmptyTag()
};

const textUnderlineHandler = function () {
    if (window.getSelection() == '') {
        return false;
    }
    var range = window.getSelection().getRangeAt(0);
    var selectionContents = range.extractContents();
    if (selectionContents?.children[0]?.nodeName == "U") {
        range.insertNode(selectionContents);
    } else {
        var underlineElement = document.createElement("u");
        underlineElement.appendChild(selectionContents);
        range.insertNode(underlineElement);
    }
    clearEmptyTag()
};

const addLinkHandler = function () {
    if (window.getSelection() == '') {
        alert("Выберите текст ссылки");
        return false;
    }
    var range = window.getSelection().getRangeAt(0);
    var selectionContents = range.extractContents();
    var href = window.prompt('Введите адрес ссылки:');
    if (href) {
        var iElement = document.createElement("a");
        iElement.appendChild(selectionContents);
        iElement.setAttribute("href", href);
        iElement.setAttribute("target", "_blank");
        iElement.setAttribute("rel", "nofollow noopener");
        range.insertNode(iElement);
    }
    clearEmptyTag()
};

const textAlignLeftHandler = function () {
    if (window.getSelection() == '') {
        return false;
    }
    let range = window.getSelection().getRangeAt(0);
    let selectionContents = range.extractContents();
    let pElement = document.createElement("p");
    pElement.setAttribute("style", "text-align: left");
    if (selectionContents?.children[0]?.nodeName == "P") {
        Array.from(selectionContents.children).forEach((item) => {
            console.log('=44ccf6= nodeName =', item.nodeName)
            console.log('=44ccf6= item.innerHTML =', item.innerHTML)
            pElement.innerHTML = item.innerHTML
        })
    } else {
        pElement.appendChild(selectionContents);
    }
    range.insertNode(pElement);
    clearEmptyTag()
};

const textAlignCenterHandler = function () {
    if (window.getSelection() == '') {
        return false;
    }
    let range = window.getSelection().getRangeAt(0);
    let selectionContents = range.extractContents();
    let pElement = document.createElement("p");
    pElement.setAttribute("style", "text-align: center");
    if (selectionContents?.children[0]?.nodeName == "P") {
        Array.from(selectionContents.children).forEach((item) => {
            pElement.innerHTML = item.innerHTML
        })
    } else {
        pElement.appendChild(selectionContents);
    }
    range.insertNode(pElement);
    clearEmptyTag()
};

const textAlignRightHandler = function () {
    if (window.getSelection() == '') {
        return false;
    }
    let range = window.getSelection().getRangeAt(0);
    let selectionContents = range.extractContents();
    let pElement = document.createElement("p");
    pElement.setAttribute("style", "text-align: right");
    if (selectionContents?.children[0]?.nodeName == "P") {
        Array.from(selectionContents.children).forEach((item) => {
            pElement.innerHTML = item.innerHTML
        })
    } else {
        pElement.appendChild(selectionContents);
    }
    range.insertNode(pElement);
    clearEmptyTag()
};

const clearEmptyTag = function () {
    let inds = []
    let emptyEl = Array.from(editorField.children).filter((item, index) => {
        if (item.innerHTML == "") {
            inds.push(index)
            return item;
        }
    })
    if (emptyEl.length) {
        emptyEl.forEach((item, i) => {
            item.parentElement.removeChild(item.parentElement.children[inds[i]])
        })
    }
    // console.log('=1bfa1f= emptyElements =',emptyEl)
};

const BlockTextEditor = async function ({ Static }) {
    await initOne(async () => {

    });
    return (
        <div class="c-texteditor">
            <header class="c-texteditor__panel">
                <div class="c-texteditor__wrappanel">
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.textItalic} onClick={textItalicHandler}>
                        <img class="c-button__image" src={svg["icon/text_italic"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.textItalic}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.textBold} onclick={textBoldHandler}>
                        <img class="c-button__image" src={svg["icon/text_bold"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.textBold}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.textUnderline} onclick={textUnderlineHandler}>
                        <img class="c-button__image" src={svg["icon/text_underline"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.textUnderline}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.alignLeft} onclick={textAlignLeftHandler}>
                        <img class="c-button__image" src={svg["icon/left_align"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.alignLeft}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.alignCenter} onclick={textAlignCenterHandler}>
                        <img class="c-button__image" src={svg["icon/center_align"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.alignCenter}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.alignRight} onclick={textAlignRightHandler}>
                        <img class="c-button__image" src={svg["icon/right_align"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.alignRight}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.insertLink} onclick={addLinkHandler}>
                        <img class="c-button__image" src={svg["icon/link"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.insertLink}</span>
                    </button>
                </div>
            </header>
            <div
                id="editor"
                class="c-texteditor__field"
                Element={($el) => {
                    editorField = $el
                }}
                contenteditable="plaintext-only"
                onkeydown={function () {
                    localStorage.setItem('textEditor', document.getElementById('editor').innerHTML);
                    console.log('=86b13c= localStorage.getItem(\'textEditor\') =', localStorage.getItem('textEditor'))
                }}
            >
                {
                    localStorage.getItem('textEditor') !== null
                        ? localStorage.getItem('textEditor')
                        : null
                }
            </div>
            <footer class="c-texteditor__actions">
                <a
                    href=""
                    class="c-button c-button--gradient2"
                    onclick={function () {
                        clearEmptyTag()
                        console.log('=e17986= editorField.innerHTML =', editorField.innerHTML)
                    }}
                >
                    <span class="c-button__text">{Variable.lang.a.saveEditable}</span>
                </a>
                <a
                    href=""
                    class="c-button c-button--outline2"
                    onclick={function () {
                        localStorage.setItem('textEditor', '')
                        initReload();
                    }}
                >
                    <div class="c-button__wrapper">{Variable.lang.a.clearEditable}</div>
                </a>
            </footer>
        </div>
    )
};
export { BlockTextEditor };