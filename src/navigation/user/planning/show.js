import {
    jsx,
    jsxFrag,
    init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockShowNews, BlockError404 } from '@component/blocks/index.js';

const start = function (data, ID) {
    let [Static, item] = fn.GetParams({ data, ID })
    init(
        async () => {
            console.log(Static)
        },
        () => {
            // console.log('=2def43=', Static)
            if (!item._id) { return (<div><BlockError404 /></div>) }
            return (
                <div class="c-main__body">
                    <div class="full_news_container">
                        <div class="full_news_block">
                            <div class="full_news_content">

                            </div>
                        </div>
                    </div>
                </div>
            );
        }, ID
    );
};
export default start;
  // OK