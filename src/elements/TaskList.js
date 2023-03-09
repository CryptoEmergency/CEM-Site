import {
    jsx,
    jsxFrag,
    Variable,
    initReload
} from '@betarost/cemserver/cem.js';

const forExport = function ({Static, records, item }) {
    return (
        <div class="tasking-list">
            <div class="tasking-list_tabs">
                {[{
                        name: Variable.lang.select.active,
                    },
                    {
                        name: Variable.lang.select.upcoming,
                    },
                    {
                        name: Variable.lang.select.ended,
                    }].map((item) => {
                    return (
                        <div class={["tasking-tab",
                                Static.categoryActive == item.name ? "tasking-tab_active" : null
                        ]}
                            onclick={() => {
                                Static.categoryActive = item.name
                                initReload()
                            }}
                        >
                            <span>
                                {item.name}
                            </span>
                        </div>
                    )
                })}
            </div>
            {
                () => {
                    if (Array.isArray(records) && records.length) {
                        return (
                            <div class="tasking-list_container">
                                {records.map((item) => {
                                    if (Static.categoryActive == item.category) {
                                        return (
                                            <a class="tasking-list_item">
                                                <h4 class="tasking-list_item-title">
                                                    {item.title}
                                                </h4>
                                                <div class="tasking-list_item-text">
                                                    {item.text}
                                                </div>
                                                <div class="tasking-list_item-users">
                                                    Количество участников: {item.users.length}
                                                </div>
                                            </a>
                                        )
                                    }
                                })}
                            </div>
                        )
                    }
                }
            }
        </div>
    )
}

export default forExport
