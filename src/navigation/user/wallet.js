import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi,
    Helpers
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import { If, Map } from '@component/helpers/All.js';
import { ButtonShowMore, NotFound } from '@component/element/index.js';

const UserWalletCard = function ({ balance, coin, course, logo }) {
    return (
        <div class="c-wallet__card">
            <div class="c-wallet__topline">
                <p>{Variable.lang.p.myBalance}</p>
                <p>{fn.numberFixWithSpaces(balance, 0)} {coin}</p>
            </div>

            <div class="c-wallet__bottomline">
                <div>
                    <p>{Variable.lang.p.inUSD}</p>
                    <p>{fn.numberFixWithSpaces(course * balance, 4)}</p>
                </div>
                <div>
                    <p>{Variable.lang.p.actualeCurs}</p>
                    <p>{fn.numberFixWithSpaces(course, 4)} </p>
                </div>
            </div>
            {
                logo
                    ?
                    <div class="c-wallet__cryptologo">
                        <img src={svg.logo} />
                    </div>
                    :
                    null
            }
        </div>
    )
}

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })

    init(
        async () => {
            Static.nameRecords = "PageUserWallet"
            Static.apiFilter = { 'amount.cemd': { $gt: 0 }, userTo: Variable.myInfo._id }
            await fn.restApi.getCourse({ cache: true, name: "Course", filter: {} })
            await fn.restApi.getTransactions({ cache: true, name: Static.nameRecords, filter: Static.apiFilter, limit: 10 })
        },
        () => {
            return (
                <div class="page-content">
                    <div class="c-wallet c-main__body">
                        <div class="c-wallet__container">
                            <div class="c-wallet__left">
                                <UserWalletCard logo={true} balance={Variable.myInfo.balance.cemd} course={1} coin={"CEMD"} />
                                <UserWalletCard logo={true} balance={Variable.myInfo.balance.cem} course={Variable.Course.list_records[0].cem.usdt} coin={"CEM"} />
                            </div>
                        </div>
                        <div class="c-wallet__operations">
                            <div class="c-wallet__transaction c-wallet__transaction--label">
                                <div> {Variable.lang.p.type} </div>
                                <div> {Variable.lang.p.date} </div>
                                <div> {Variable.lang.p.operation}  </div>
                                <div> {Variable.lang.p.amount} </div>
                                <div> {Variable.lang.p.status} </div>
                            </div>
                            {
                                !Variable[Static.nameRecords] || !Variable[Static.nameRecords].list_records.length
                                    ?
                                    <NotFound />
                                    :
                                    Variable[Static.nameRecords].list_records.map(function (item, i) {
                                        return (
                                            <div class="c-wallet__transaction">
                                                <div class="c-wallet__wrap">
                                                    {item.comment == "Registration" ? <img src={svg['badge/badge2']} width="32" height="36" class="transactions_small_badge" /> : null}
                                                    <span class="transaction_type">{fn.transactionTypeToLang(item.type)}</span>
                                                </div>
                                                <div> {fn.getDateFormat(item.showDate, "time")} </div>
                                                <div>
                                                    {item.kind}
                                                </div>
                                                <div>
                                                    {item.amount.cemd}
                                                </div>
                                                <div>
                                                    {item.status == 0 ? <img src={svg['transaction_canceled']} /> : null}
                                                    {item.status == 1 ? <img src={svg['transaction_new']} /> : null}
                                                    {item.status == 2 ? <img src={svg['transaction_in_time']} /> : null}
                                                    {item.status == 3 ? <img src={svg['transaction_success']} /> : null}
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                            <ButtonShowMore Static={Static} action="getTransactions" limit={10} />
                        </div>
                    </div>
                </div>
            )
        }, ID
    )
};
export default start;
// OK