import {
    jsx,
    jsxFrag,
    Variable,
    CEM
} from '@betarost/cemserver/cem.js';
const { images, svg, fn } = CEM

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
