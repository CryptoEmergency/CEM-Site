import {
    jsx,
    jsxFrag,
    load,
    init,
    Variable
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockExchange } from '@component/blocks/index.js';
import Elements from '@src/elements/export.js';
import svg from '@assets/svg/index.js';

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })

    Variable.HeaderShow = true;

    load({
        ID,
        fnLoad: () => {
            Static.nameRecords = "PageExchangeRates"
            Static.apiFilter = {}
            Static.filterCoins = []
        },
        fn: () => {
            return (
                <div
                    class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"
                        } c-exchangerates`}
                >
                    <div class="c-exchangerates__container c-container">
                        <table class="c-exchangerates__table" cellspacing="0" cellpadding="10" align="center">
                            <thead>
                                <tr style="border-radius: 4px;">
                                    <th>#</th>
                                    <th>{Variable.lang.tableTitle.appellation}</th>
                                    <th>{Variable.lang.tableTitle.price}</th>
                                    <th>{Variable.lang.tableTitle.percent}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <b>1</b>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <div class="c-exchangerates__currency">
                                                <img src={svg["icon/btc"]} />
                                                <span>Bitcoin</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__price">22.389,6</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__percent c-exchangerates__percent--rise">+0.09%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <b>2</b>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <div class="c-exchangerates__currency">
                                                <img src={svg["icon/eth1"]} />
                                                <span>Ethereum</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__price">1.561,11</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__percent c-exchangerates__percent--rise">-0.47%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <b>3</b>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <div class="c-exchangerates__currency">
                                                <img src={svg["icon/usdt"]} />
                                                <span>Tether</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__price">1,0001</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__percent c-exchangerates__percent--rise">0.00%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <b>4</b>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <div class="c-exchangerates__currency">
                                                <img src={svg["icon/bnb"]} />
                                                <span>Binance Coin</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__price">284,30</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__percent c-exchangerates__percent--recession">-2.10%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <b>5</b>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <div class="c-exchangerates__currency">
                                                <img src={svg["icon/btc"]} />
                                                <span>Bitcoin</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__price">22.389,6</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__percent c-exchangerates__percent--rise">+0.09%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <b>6</b>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <div class="c-exchangerates__currency">
                                                <img src={svg["icon/eth1"]} />
                                                <span>Ethereum</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__price">1.561,11</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__percent c-exchangerates__percent--rise">-0.47%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <b>7</b>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <div class="c-exchangerates__currency">
                                                <img src={svg["icon/usdt"]} />
                                                <span>Tether</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__price">1,0001</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__percent c-exchangerates__percent--rise">0.00%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <b>8</b>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <div class="c-exchangerates__currency">
                                                <img src={svg["icon/bnb"]} />
                                                <span>Binance Coin</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__price">284,30</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="c-exchangerates__cellwrap">
                                            <span class="c-exchangerates__percent c-exchangerates__percent--recession">-2.10%</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    })
    return
};

export default start;