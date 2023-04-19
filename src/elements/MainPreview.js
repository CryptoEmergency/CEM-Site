import {
    jsx,
    jsxFrag,
    Variable,
    CEM
} from '@betarost/cemserver/cem.js';
const { images, svg, fn } = CEM

const forExport = function ({ children }) {
    console.log('=c42f17 children=', children)
    return (
        <div class="с-preview">
            <img class="с-preview__lines" src={images["background/lines-preview-min"]} />
            <div class="с-preview__title">
                <img class="с-preview__bg" src={images["background/cem"]} />
                <div class="с-preview__text с-preview__text--auth">
                    <span>{Variable.lang.homePreview.ask}</span>
                    <div class="с-preview__imgblock">
                        <img class="с-preview__img" src={svg.two} />
                        <img class="с-preview__img" src={svg.two5} />
                        {Variable.lang.homePreview.earn}
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default forExport