import {
    jsx,
    jsxFrag,
    Variable,
} from "@betarost/cemjs";
// check
import images from "@assets/images/index.js";

const LazyImage = function ({ path, ratio, className }) {
    return (
        <div class={className}>
            <img hidden={true} src={path}
                onload={function () {
                    //console.log('onload', this)
                    this.hidden = false
                    this.nextSibling.hidden = true
                }}
                onerror={() => {
                    //console.log('onerror')
                }}
            />
            <div class="lazy_load_container">
                <img src={images["lazy_load_background"]} />
                <div class="lds-dual-ring lazy_load_element"></div>
            </div>
        </div>
    );
};
export { LazyImage };