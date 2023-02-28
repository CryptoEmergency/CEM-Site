import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';

const forExport = function ({ children }) {
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
        </div>
    )
}

export default forExport
