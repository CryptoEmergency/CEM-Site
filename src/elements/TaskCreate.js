import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';

const forExport = function ({onclick }) {
    return (
        <div class="tasking-create">
            <div class="tasking-create_container">
                <span
                    onclick={onclick}
                >
                    Создать задачу
                </span>
            </div>
        </div>
    )
}

export default forExport
