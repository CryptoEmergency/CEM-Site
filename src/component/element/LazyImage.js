import {
    jsx,
    jsxFrag,
    Variable,
} from "@betarost/cemjs";
// check
import images from "@assets/images/index.js";

const calcWidthHeight = function (e) {
    let ratio = e.path[0].naturalWidth / e.path[0].naturalHeight;
    e.target.style = ratio < 1 ? "width: 100%" : "height: 100%";
}

const LazyImage = function ({ path, ratio, className, classImg = '', counter = null, onClick = null }) {

    if (className.includes('c-groupimage__item--more')) {
        return (
            <div class={className} onClick={onClick}>
                <img
                    src={path}
                    class={classImg}
                    onload={(e) => {
                        className.includes('c-groupimage__item') ? calcWidthHeight(e) : null
                    }}
                />
                <span class="c-groupimage__counter">+ {counter}</span>
            </div>
        );
    } else {
        return (
            <div class={className} onClick={onClick}>
                <img
                    src={path}
                    class={classImg}
                    onload={(e) => {
                        className.includes('c-groupimage__item') ? calcWidthHeight(e) : null
                    }}
                />
            </div>
        );
    }

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