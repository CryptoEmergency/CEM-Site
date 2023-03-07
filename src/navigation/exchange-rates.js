import {
    jsx,
    jsxFrag,
    load,
    init,
    Variable,
    initReload,
    Helpers,
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
        fnLoad: async () => {
            Static.nameRecords = "PageExchangeRates"
            Static.apiFilter = {}
            Static.filterCoins = []
            Static.list_coins = await fn.restApi.getCoins({
                filter: {},
                limit: 20,
                select: { name: 1, icon: 1 },
            });
            fn.socket.get(
                { method: "Course", params: { filter: {} } },
                function (res) {
                    console.log("=9c0591 callback=", res);
                    Static.mainCourse = res;
                    initReload("mainBlock");
                }
            );
            console.log('=0ca0d9= Static =', Static)
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
                                {() => {
                                    if (
                                        Static.mainCourse &&
                                        Object.keys(Static.mainCourse).length
                                    ) {
                                        const arrReturn = Object.keys(Static.mainCourse)
                                            .filter(
                                                (item) => typeof Static.mainCourse[item] == "object"

                                            )
                                            .map(function (key, i) {
                                                let course = Static.mainCourse[key];
                                                // console.log('=0aa611= course =', course)
                                                return (
                                                    <tr>
                                                        <td>
                                                            <div class="c-exchangerates__cellwrap">
                                                                <b>{i + 1}</b>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="c-exchangerates__cellwrap">
                                                                <div class="c-exchangerates__currency">
                                                                    <img src={`/assets/icons/coins/${key}.svg`} />
                                                                    <span>{key.toLocaleUpperCase()}</span>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="c-exchangerates__cellwrap">
                                                                <span class="c-exchangerates__price">
                                                                    {Helpers.numberFixWithSpaces(
                                                                        course.usdt,
                                                                        key === "cem" ? 4 : 2
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="c-exchangerates__cellwrap">
                                                                <span
                                                                    class={[
                                                                        "c-exchangerates__percent",
                                                                        course.change >= 0
                                                                            ? "c-exchangerates__percent--rise"
                                                                            : "c-exchangerates__percent--recession"
                                                                        
                                                                    ]}
                                                                >
                                                                    {course.change >= 0 ? '+' : null}
                                                                    {Helpers.numberFixWithSpaces(
                                                                        course.change,
                                                                        2
                                                                    )}%
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            });
                                        return arrReturn;
                                    }
                                }}
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