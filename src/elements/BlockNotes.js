import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemserver/cem.js';
import svg from '@assets/svg/index.js';
import Elements from '@src/elements/export.js';

const forExport = function ({ item, onClick_add, onClick_delete, children, className, Static, onchange, oninput_addTitle, oninput_addText }) {
    if (!item) {
        return (
            <div class={["notes-content-wrapper"]}>
                <div class="empty_message_dialog_block">
                    {Variable.lang.text.selectOrCreateNew}
                </div>
            </div>
        )
    }

    return (
        <div class={["notes-content-wrapper", className]}>
            <Elements.image.imgAdd
                Static={Static}
                onclick={onClick_add}
                onchange={onchange}
                src={svg["clip_notes"]} />
            {children}
            <Elements.NotesDelete
                src={svg["delete_notes"]}
            />
            <Elements.NotesText
                class="notes-input-title"
                dataText="Название"
                Element={($el) => {
                    Static.elTitle = $el
                }}
                Static={Static}
                innerText={Static.activeNotes && Static.activeNotes.title != "" ? Static.activeNotes.title : ""}
                oninput={oninput_addTitle}
            />
            <Elements.NotesText
                class="notes-description"
                dataText="Текст"
                Element={($el) => {
                    Static.elText = $el
                }}
                Static={Static}
                // textContent={Static.activeNotes && Static.activeNotes.text}
                innerText={Static.activeNotes && Static.activeNotes.text}
                oninput={oninput_addText}
            />
        </div>
    )
}

export default forExport
