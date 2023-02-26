import {
    jsx,
    jsxFrag,
    Helpers
} from '@betarost/cemserver/cem.js';

const forExport = function ({ onClick, children }) {
    return (
        <div class="calendar-title">
            <h2
                onClick={onClick}
                style="cursor: default"
            >
                {Helpers.moment().format("D MMMM")}

                
            </h2>
            {children}
        </div>
    )
}

export default forExport
