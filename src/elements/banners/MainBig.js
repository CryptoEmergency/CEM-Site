import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemserver/cem.js';
import svg from '@assets/svg/index.js';
import images from "@assets/images/index.js";

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