import {
    jsx,
    jsxFrag,
    Variable,
    CEM
} from '@betarost/cemserver/cem.js';
const { images, svg, fn } = CEM

const forExport = function () {
    return (
        <div>
            <a target="_blank" rel="nofollow nooopener" href="https://blockchain-life.com/asia/en/#tickets-row" style="max-width: 1240px; margin: 10px auto;display: block">
                <img style="border-radius: 4px; width: 100%" src={images['banners/BlockchainLifeBig']} />
            </a>
        </div>
    )
}

export default forExport