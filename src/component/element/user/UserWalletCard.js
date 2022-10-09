import {
    jsx,
    jsxFrag,
    Variable,
    Helpers
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js'

const UserWalletCard = function (data) {
    return (
        <div class="c-wallet__card" style={data.style}>
            <div class="c-wallet__topline">
                <p>{Variable.lang.p.myBalance}</p>
                <p>{Helpers.numberFixWithSpaces(data.balance, 0)} {data.coin}</p>
            </div>

            <div class="c-wallet__bottomline">
                <div>
                    <p>{Variable.lang.p.inUSD}</p>
                    <p>{Helpers.numberFixWithSpaces(data.course * data.balance, 4)}</p>
                </div>
                <div>
                    <p>{Variable.lang.p.actualeCurs}</p>
                    <p>{Helpers.numberFixWithSpaces(data.course, 4)} </p>
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
//I check
export { UserWalletCard }