import {
    jsx,
    jsxFrag,
    initReload,
    load,
    setStorage,
    getStorage,
    CEM
} from "@betarost/cemserver/cem.js";    
import Elements from "@src/elements/export.js";

const { images, svg, fn } = CEM 


const start = function (data, ID) {

    load({
        ID,
        fn: () => {
            return (
                <div class="c-main_body">
                    <div class="pt--70">
                        <Elements.SliderMenu></Elements.SliderMenu>
                    </div>
                </div>
            );
        },
    });
};

export default start;