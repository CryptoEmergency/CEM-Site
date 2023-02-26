import {
    jsx,
    jsxFrag,
    Helpers,
    initReload
} from '@betarost/cemserver/cem.js';

const forExport = function ({ Static, calendar, children }) {
    return (
        <div class="calendar-wrapper">
            <div class="calendar-day-name">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun', 'Sat'].map(function (name) {
                    return (
                        <span>{name}</span>
                    )
                })}
            </div>
            {children}
            {/* <div class="calendar-container">
            {calendar.map((item) => {
                if (Helpers.moment().isSame(item, "day") && Static.active == null && Static.renderMonth == false && Static.renderYear == false) {
                    Static.currentDay = Helpers.moment(item).format("YYYY-MM-D")
                }
                return (
                    <div
                        class="calendar-cell"
                        onclick={() => {
                            Static.active = item
                            Static.currentDay = null
                            // notesScroll(Static)
                            initReload()
                        }}
                        style={[Static.active == item ? "opacity: 1;" : null]}
                    >
                        <div class={[Static.active == item ? "calendar-cell--active" : null,
                                Helpers.moment().isSame(item, "day") ? "calendar-cell--current" : null]}
                        >
                        </div>
                        <span
                            class="calendar-day"
                            onDblClick={() => {
                                Static.modal = true
                                initReload()
                            }}
                            style={[Helpers.moment().isSame(item, "month") ? "color: #8995B8; opacity: 1;" : null,
                            Helpers.moment().isSame(item, "day") ? "color: red; opacity: 1" : null,
                            Static.active == item ? "color: #ffffff; opacity: 1;" : null
                            ]}
                        >
                            {item.format('D')}
                        </span>
                        <div>
                            {children}
                        </div>
                    </div>
                )
            })}
            </div> */}
        </div>
    )
}

export default forExport
