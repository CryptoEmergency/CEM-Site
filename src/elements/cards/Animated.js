import {
    jsx,
    jsxFrag
} from '@betarost/cemserver/cem.js';

const forExport = function ({ records }) {
    return (
        <div class="list-goals">
            {records.map((item) => {
                return (
                    <div
                        class={["list-goals_item", item.classItem]}
                        onclick={item.onclick}
                    >
                        <div class="goal-img">
                            <img alt={item.altImg} src={item.blockImg}></img>
                        </div>

                        <div class="goal-content">
                            <h4>{item.title}</h4>
                            <div class="goal-content_desc">{item.descriptions}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default forExport