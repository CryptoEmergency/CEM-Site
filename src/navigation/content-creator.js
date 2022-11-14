import {
    jsx,
    jsxFrag,
    init,
    Variable,
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import { BlockUsers } from '@component/blocks/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    init(
        async () => {
            fn.initData.content_creator(Static)
        },
        () => {
            return (
                <div class='c-main__body'>
                    <BlockUsers
                        Static={Static}
                        title={Variable.lang.a.contentCreater}
                        filters={Static.filters}
                        nameRecords="PageCreators"
                        type="creator"
                    />
                </div>
            )
        }, ID
    )
}
export default start;