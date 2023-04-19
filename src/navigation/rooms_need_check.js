import {
    jsx,
    jsxFrag,
    init,
    CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from '@src/functions/index.js';
import { BlockUserRooms } from '@elements/blocks/index.js';

const start = function (data, ID) {
    let [Static] = CEM.fn.GetParams({ data, ID })

    init(() => {
        CEM.fn.initData.rooms(Static)
    },
        () => {

            return (
                <div class='c-main__body'>
                    <BlockUserRooms Static={Static} />
                </div>
            )
        }, ID
    )
}
export default start;