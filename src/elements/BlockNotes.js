import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';
import svg from '@assets/svg/index.js';
import Elements from '@src/elements/export.js';

const forExport = function ({ item, onClick_add, children, className, Static }) {
    if (!item) {
        return (
            <div class={["notes-content-wrapper"]}>
                <div class="empty_message_dialog_block">
                    Выберите или создайте новую заметку
                </div>
            </div>
        )
    }

    return (
        <div class={["notes-content-wrapper", className]}>
            <Elements.image.imgAdd
                // Static={Static}
                onclick={onClick_add}
                src={svg["clip_notes"]} />
            {children}
        </div>
    )
}

export default forExport
