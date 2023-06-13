import {
    jsx,
    jsxFrag,
    initReload,
    load,
    setStorage,
    getStorage,
    Static,
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
                        <div class="page-container">
                            <Elements.SliderCEM
                                Static={Static}
                                speed = "2500"
                            >
                            </Elements.SliderCEM>
                        </div>
                    </div>
                </div>
            );
        },
    });
};

export default start;