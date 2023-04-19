import {
    jsx,
    jsxFrag,
    Helpers
} from '@betarost/cemserver/cem.js';

const forExport = function ({onclick, onDblClick, Static, children, item, className }) {
    return (
        <div
            class="calendar-cell"
            onclick={onclick}
        >
            <div class={[className,
                    Helpers.moment().isSame(item, "day") ? "calendar-cell--current" : null]}
            >
            </div>
            <span
                class="calendar-day"
                onDblClick={onDblClick}
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
}

export default forExport
