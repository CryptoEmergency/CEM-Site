import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemserver/cem.js';

const forExport = function ({onclick, className }) {
    return (
        <div class="tasking-list">
            <div class="tasking-list_tabs">
                {/* {showListTabs(Static)} */}
                {["Активные", "Предстоящие", "Завершённые"].map((item) => {
                    return (
                        <div class={["tasking-tab", className]}
                            onclick={onclick}
                        >
                            <span>
                                {item}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default forExport
