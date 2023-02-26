import {
    jsx,
    jsxFrag,
    Helpers,
    initReload
} from '@betarost/cemserver/cem.js';

const forExport = function ({ Static, item }) {
    return (
        <div
            class={["calendar-notes_item",
                    item.color ? `calendar-color-type${item.color}` : null,
            ]}
        >
            <div class="calendar-notes_item-date">
                {Helpers.moment(item.showDate).format("D")}
            </div>
            <div class="calendar-notes_item-description">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
            </div>
            <img class="calendar-notes_item-delete" src={svg["delete_notes"]}
                onclick={() => {
                    fn.modals.ModalConfirmAction({
                        action: async () => {
                            deleteNote(Static, { _id: item._id, index, active: false })
                            fn.modals.close("ModalConfirmAction")
                        },
                        text: Variable.lang.p.deleteNotesConfirm,
                        button: Variable.lang.button.yes
                    })
                }}
            />
            <img
                class="calendar-notes_item-edit"
                src={svg["edit_calendar-notes"]}
                onClick={() => {
                    Static.activeNotes = item
                    Static.modal = true
                    item.title.length > 0 ? Static.isValid = true : Static.isValid = false
                    initReload()
                }}
            />
        </div>
    )
}

export default forExport
