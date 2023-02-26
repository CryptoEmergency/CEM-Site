import {
    jsx,
    jsxFrag,
    Helpers,
    initReload
} from '@betarost/cemserver/cem.js';

const forExport = function ({ onClick_monthBack, onClick_monthForward, src, Static, children }) {
    return (
        <div class="calendar-subtitle">
            <button
                onClick={onClick_monthBack}
            >
                <img src={src} />
            </button>
            <h3
                onClick={() => {
                    if (Static.renderMonth) {
                        Static.renderYear = true
                        Static.renderMonth = false
                    } else if (Static.renderYear) {
                        null
                    } else {
                        Static.renderMonth = true
                    }
                    Static.activeMonthClone = Static.activeMonth;
                    Static.active = null
                    Static.currentDay = null
                    initReload()
                }}
                style={[Static.renderYear ? "cursor: default; opacity: 1;" : null]}
            >
                {children}
            </h3>
            <button
                onClick={onClick_monthForward}
                style={[Static.renderMonth || Static.renderYear ? "cursor: default; opacity: 1;" : null]}
            >
                <img class="calendar-subtitle-arrow" src={src} />
            </button>
        </div>
    )
}

export default forExport
