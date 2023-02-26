import {
    jsx,
    jsxFrag,
    Helpers,
    initReload
} from '@betarost/cemserver/cem.js';
import Elements from '@src/elements/export.js';

const forExport = function ({ Static, children, records }) {
    return (
        <div class="calendar-notes"
            Element={($el) => {
                Static.elNotes = $el
            }}
        >
            {children}
            {records.map((item) => {
                if (Helpers.moment(item.showDate).format("D") == Helpers.moment(Static.active).format("D") && !Static.modal || Static.currentDay == Helpers.moment(item.showDate).format("YYYY-MM-D") && !Static.modal) {
                    return (
                        <Elements.CalendarNotes
                            Static={Static}
                            item={item}
                        />
                    )
                } else {
                    Static.elNotes = null
                }
            })}
        </div>
    )
}

export default forExport
