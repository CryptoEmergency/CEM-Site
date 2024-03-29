import {
    jsx,
    jsxFrag,
    initReload,
    CEM
} from '@betarost/cemserver/cem.js';
const { images, svg, fn } = CEM

const forExport = function ({ records }) {
    return (
        <div class="accordeon">
            {records.map((item, index) => {
                return (
                    <div class="accordeon-item">
                        <div class="accordeon-header" onclick={() => {
                            records.map((el, i) => {
                                if (index === i) {
                                    el.hidden = !el.hidden;
                                } else {
                                    el.hidden = true;
                                }
                            });
                            initReload();
                        }}>
                            <h5 class="accordeon-header_title">{item.title}</h5>
                            <img
                                src={svg["arrow-select"]}
                                class={["arrow", item.hidden ? null : "arrow-toggle"]}
                            ></img>
                        </div>
                        <div
                            class={["accordeon-content", item.hidden ? null : "content-show"]}
                        >
                            {item.description}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default forExport