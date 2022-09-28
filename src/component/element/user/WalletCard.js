import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    Variable
} from '@betarost/cemjs';
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";
import { numberFixWithSpaces } from '@src/functions.js';
import { If } from '@component/helpers/All.js'

const WalletCard = function (data) {

    return (
        <div class="wallet_block" style={data.style}>
            <div class="wallet_block_top_line">
                <p>{Variable.lang.p.myBalance}</p>
                <p>{numberFixWithSpaces(data.balance, 8)} {data.coin}</p>
            </div>

            <div class="wallet_block_bottom_line">
                <div>
                    <p>{Variable.lang.p.inUSD}</p>
                    <p>{numberFixWithSpaces(data.course * data.balance, 4)}</p>
                </div>
                <div>
                    <p>{Variable.lang.p.actualeCurs}</p>
                    <p>{numberFixWithSpaces(data.course, 4)} </p>
                </div>
            </div>

            <If
                data={data.logo}
                dataIf={
                    <div class="wallet_crypto_logo">
                        <img src={svg.logo} />
                    </div>
                }

            />

        </div>
    )
}

export { WalletCard }