import {
    jsx,
    jsxFrag,
    Variable,
    CEM
} from "@betarost/cemserver/cem.js";
// check
const { images, svg, fn } = CEM

const calcWidthHeight = function (e) {
    let ratio = e.path[0].naturalWidth / e.path[0].naturalHeight;
    e.target.style = ratio < 1 ? "width: 100%" : "height: 100%";
}

const LazyImage = function ({ path, ratio, className, classImg = '', counter = null, onClick = null }) {
    if (className && className.includes('c-groupimage__item--more')) {

        return (
            <div class={className} onClick={onClick}>
                <img
                    src={path}
                    class={classImg}
                    onload={(e) => {
                        e.path ? className && className.includes('c-groupimage__item') ? calcWidthHeight(e) : null : null
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
                        e.path ? className && className.includes('c-groupimage__item') ? calcWidthHeight(e) : null : null
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