import { jsx, jsxFrag, Variable, initOne, initReload, CEM } from "@betarost/cemserver/cem.js";

const { images, svg, fn } = CEM

let editorField, localeImg, listFontSize;

const textItalicHandler = function () {
    if (window.getSelection() == '') {
        return false;
    }
    var range = window.getSelection().getRangeAt(0);
    var selectionContents = range.extractContents();
    console.log('=f2742b= selectionContents =', selectionContents?.children[0]?.nodeName == "I")
    if (selectionContents?.children[0]?.nodeName == "I") {
        if (selectionContents.children[0].innerHTML == selectionContents.children[0].innerText) {
            const textEl = document.createTextNode(selectionContents.children[0].innerText);
            range.insertNode(textEl);
        }
    } else {
        var iElement = document.createElement("i");
        iElement.appendChild(selectionContents);
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

const textAlignHandler = function (alignValue) {
    if (window.getSelection() != '') {
        let range = window.getSelection().getRangeAt(0);
        let selectionContents = range.extractContents();
        let pElement = document.createElement("p");
        pElement.setAttribute("style", `text-align: ${alignValue}`);
        if (selectionContents?.children[0]?.nodeName == "P") {
            Array.from(selectionContents.children).forEach((item) => {
                pElement.innerHTML = item.innerHTML
            })
        } else {
            pElement.appendChild(selectionContents);
        }
        range.insertNode(pElement);
    } else {
        const editorElement = document.getElementById("editor");
        const content = editorElement.innerHTML;
        let pElement;
        if (editorElement.children[0]?.nodeName == "P") {
            pElement = editorElement.children[0];
            pElement.setAttribute("style", `text-align: ${alignValue}`);
        } else {
            pElement = document.createElement("p");
            pElement.setAttribute("style", `text-align: ${alignValue}`);
            pElement.innerHTML = content;
            editorElement.innerHTML = '';
            editorElement.append(pElement);
        }
    }

    clearEmptyTag()
};

const clearEmptyTag = function () {
    let inds = []
    let emptyEl = Array.from(editorField.children).filter((item, index) => {
        if (item.innerHTML == "" && item.tagName != "IMG") {
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

const insertImage = function (urlImg) {
    let image = document.createElement('img');
    image.src = urlImg;
    let selection = window.getSelection();
    if (selection.rangeCount === 0 || !editorField.contains(selection.getRangeAt(0).commonAncestorContainer)) {
        editorField.appendChild(image);
    } else {
        let range = selection.getRangeAt(0);
        range.collapse(false);
        range.insertNode(image);
        selection.removeAllRanges();
        range.setStartAfter(image);
        selection.addRange(range);
    }
}

const changeFontSize = function (fontSize) {
    listFontSize.classList.remove("c-texteditor__checklist--open")
    if (window.getSelection() == '') {
        return false;
    }
    var range = window.getSelection().getRangeAt(0);
    var selectionContents = range.extractContents();
    let spanElement;
    if (selectionContents.childNodes.length == 1 && selectionContents.childNodes[0].nodeName == "#text") {
        spanElement = document.createElement("span");
        spanElement.setAttribute("style", `font-size: ${fontSize}px`);
        spanElement.appendChild(selectionContents);
        range.insertNode(spanElement);
    } else {
        spanElement = selectionContents.firstElementChild.style.fontSize = `${fontSize}px`
        range.insertNode(selectionContents);
    }
    clearEmptyTag()
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
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.alignLeft} onclick={function () { textAlignHandler('left') }}>
                        <img class="c-button__image" src={svg["icon/left_align"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.alignLeft}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.alignCenter} onclick={function () { textAlignHandler('center') }}>
                        <img class="c-button__image" src={svg["icon/center_align"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.alignCenter}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.alignRight} onclick={function () { textAlignHandler('right') }}>
                        <img class="c-button__image" src={svg["icon/right_align"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.alignRight}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.insertLink} onclick={addLinkHandler}>
                        <img class="c-button__image" src={svg["icon/link"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.insertLink}</span>
                    </button>
                    <button
                        class="c-button c-button--primary c-button--icon c-button--onlyicon"
                        title={Variable.lang.button.insertImage}
                        onclick={function () {
                            if (confirm("Хотите загрузить с устройства?", "")) {
                                localeImg.click()
                            } else {
                                insertImage(prompt('Введите адрес изображения', ''));
                            }
                        }}
                    >
                        <img class="c-button__image" src={svg["icon/insert_image"]} width="25" height="25" />
                        <span class="c-button__wrapper">{Variable.lang.button.insertImage}</span>
                    </button>
                    <div class="c-texteditor__check">
                        <button
                            class="c-button c-button--primary c-button--icon c-button--onlyicon"
                            title={Variable.lang.button.fontSize}
                            onclick={function () {
                                listFontSize.classList.contains("c-texteditor__checklist--open")
                                    ? listFontSize.classList.remove("c-texteditor__checklist--open")
                                    : listFontSize.classList.add("c-texteditor__checklist--open")
                            }}
                        >
                            <img class="c-button__image" src={svg["icon/text_size"]} width="20" height="20" />
                            <span class="c-button__wrapper">{Variable.lang.button.fontSize}</span>
                        </button>
                        <ul
                            class="c-texteditor__checklist"
                            Element={($el) => { listFontSize = $el }}
                        >
                            <li
                                onclick={function () {
                                    changeFontSize(12)
                                }}
                            >
                                <span>{Variable.lang.span.smallFont}</span>
                            </li>
                            <li
                                onclick={function () {
                                    changeFontSize(14)
                                }}
                            >
                                <span>{Variable.lang.span.mediumFont}</span>
                            </li>
                            <li
                                onclick={function () {
                                    changeFontSize(18)
                                }}
                            >
                                <span>{Variable.lang.span.largeFont}</span>
                            </li>
                        </ul>
                    </div>
                    <input
                        type="file"
                        value=""
                        accept="image"
                        hidden
                        Element={($el) => { localeImg = $el }}
                        onchange={async function (e) {
                            e.stopPropagation();
                            Array.from(this.files).forEach((item) => {
                                fn.uploadMedia(
                                    item,
                                    "worldPress",
                                    async function () {
                                        if (!this.response) {
                                            alert("Произошла ошибка Попробуйте еще раз")
                                            return
                                        }
                                        let response = JSON.parse(this.response);
                                        console.log('= response =', response)
                                        if (!response.error) {
                                            let data = {
                                                type: response.mimetype,
                                                name: response.name
                                            }
                                            console.log('=data=', data)
                                            insertImage(`/assets/upload/worldPress/${data.name}`)
                                        }
                                    }
                                )
                            })
                        }}
                    />
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
                        editorField.contentEditable = false
                        initReload()
                        console.log('= Содержимое редактора =', editorField.innerHTML)
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