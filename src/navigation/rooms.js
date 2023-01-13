import {
    jsx,
    jsxFrag,
    init
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import { BlockUserRooms } from '@component/blocks/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })

    init(()=>{
        fn.initData.rooms(Static)
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