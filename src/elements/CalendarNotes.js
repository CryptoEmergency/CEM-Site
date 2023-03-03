import {
    jsx,
    jsxFrag,
    Helpers,
} from '@betarost/cemserver/cem.js';

const forExport = function ({ item, src_delete, src_edit, onclick_delete, onclick_edit }) {
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
            <img class="calendar-notes_item-delete" src={src_delete}
                onclick={onclick_delete}
            />
            <img
                class="calendar-notes_item-edit"
                src={src_edit}
                onclick={onclick_edit}
            />
        </div>
    )
}

export default forExport
