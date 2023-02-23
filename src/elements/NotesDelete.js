import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/index.js';

const forExport = function ({ src }) {
    return (
        <img class="notes-content-delete" src={src}
            onclick={() => {
                fn.modals.ModalConfirmAction({
                    action: async () => {
                        Static.activeNotes.active = false
                        deleteNote(Static, { _id: Static.activeNotes._id, active: false })
                        fn.modals.close("ModalConfirmAction")
                    },
                    text: Variable.lang.p.deleteNotesConfirm,
                    button: Variable.lang.button.yes
                })
            }}
        />
    )
}

export default forExport
