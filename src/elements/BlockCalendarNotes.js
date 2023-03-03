import {
    jsx,
    jsxFrag,
    Helpers,
    initReload
} from '@betarost/cemserver/cem.js';

const forExport = function ({ Static, children }) {
    return (
        <div class="calendar-notes"
            Element={($el) => {
                Static.elNotes = $el
            }}
        >
            <div class="calendar-notes_wrapper">
                {
                    () => {
                        if (Static.active) {
                            return (
                                <div class="calendar-notes-append"
                                    onClick={() => {
                                        Static.modal = true
                                        initReload()
                                    }}
                                >
                                    <p>
                                        New note
                                            <span>
                                                &nbsp;({Helpers.moment(Static.active).format("D MMMM")})
                                            </span>
                                    </p>
                                </div>
                            )
                        }
                    }
                }
            </div>
            {children}
        </div>
    )
}

export default forExport
