import {
    jsx,
    jsxFrag,
    init
} from "@betarost/cemjs";


import { Jivo, Test } from '@component/element/index.js';

const start = function (data, ID = "mainBlock") {
    init(
        null,
        () => {
            return (
                <div class="c-main__body">
                    {/* <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}> */}
                    <Test
                        item={"tttt"}
                        tmp={"ppppp"}
                        callBack={(tt) => {

                            console.log('=35936b=', "test")
                            alert("test" + tt)
                        }}
                    />
                    test page
                    <Jivo />
                </div>
            )
        }, ID)
};

export default start;