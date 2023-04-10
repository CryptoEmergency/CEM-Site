import { jsx, jsxFrag, Variable, initOne, initReload } from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";
import { ButtonShowMore, NotFound } from "@component/element/index.js";

let editorField;

const textItalicHandler = function() {
    console.log('=fcf2ba= editorField =',editorField, window.getSelection(), window.getSelection().toString())
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
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.textBold}>
                        <img class="c-button__image" src={svg["icon/text_bold"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.textBold}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.textUnderline}>
                        <img class="c-button__image" src={svg["icon/text_underline"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.textUnderline}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.alignLeft}>
                        <img class="c-button__image" src={svg["icon/left_align"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.alignLeft}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.alignCenter}>
                        <img class="c-button__image" src={svg["icon/center_align"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.alignCenter}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.alignRight}>
                        <img class="c-button__image" src={svg["icon/right_align"]} width="20" height="20" />
                        <span class="c-button__wrapper">{Variable.lang.button.alignRight}</span>
                    </button>
                    <button class="c-button c-button--primary c-button--icon c-button--onlyicon" title={Variable.lang.button.insertLink}>
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
                contenteditable="true"
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
                <a href="" class="c-button c-button--gradient2">
                    <span class="c-button__text">{Variable.lang.a.saveEditable}</span>
                </a>
                <a
                    href=""
                    class="c-button c-button--outline2"
                    onclick={function() {
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