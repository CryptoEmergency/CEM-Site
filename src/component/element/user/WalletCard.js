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
        <div class="c-wallet__card" style={data.style}>
            <div class="c-wallet__topline">
                <p>{Variable.lang.p.myBalance}</p>
                <p>{numberFixWithSpaces(data.balance, 0)} {data.coin}</p>
            </div>

            <div class="c-wallet__bottomline">
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
                    <div class="c-wallet__cryptologo">
                        <img src={svg.logo} />
                    </div>
                }

            />

        </div>
    )
}

export { WalletCard }