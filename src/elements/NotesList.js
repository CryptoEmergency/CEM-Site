import {
    jsx,
    jsxFrag,
    Variable,
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/index.js';
import Elements from '@src/elements/export.js';

const forExport = function ({ item, onclick, className }) {
    return (
        <div class={["notes-item", className]} onclick={onclick}>
            <div class="notes-item-section">
                <h3>
                    {item.title != "" ? item.title : Variable.lang.h.noName}
                </h3>
                <div class="notes-item_block">
                    <span>{fn.getDateFormat(item.showDate)}</span>
                    <p>{item.text}</p>
                </div>
                {
                    (item.media || []).map(function (item, index) {
                        if (index == 0) {
                            return (
                                <Elements.image.imgSmall src={`/assets/upload/gallery/${item.name}`} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default forExport
