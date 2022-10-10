import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi,
    Helpers
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If, Map } from '@component/helpers/All.js';
import {
    ButtonShowMore,
    UserWalletCard,
} from '@component/element/index.js';

const start = function () {
    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true

    init(
        async () => {
            Variable.Course = await sendApi.send({ action: "getCourse", short: true, cache: true, name: "Course" });
            Variable.PageUserWallet = await sendApi.send({
                action: "getTransactions", short: true, cache: true, name: "PageUserWallet", limit: 10, filter: {
                    'amount.cemd': { $gt: 0 },
                    userTo: Variable.myInfo._id
                }
            });
        },
        () => {
            return (
                <div class="page-content">
                    <div class="c-wallet">
                        <div class="c-wallet__container">
                            <div class="c-wallet__left">
                                <UserWalletCard
                                    logo={true}
                                    balance={Variable.myInfo.balance.cemd}
                                    course={1}
                                    coin={"CEMD"}
                                />
                                <UserWalletCard
                                    logo={true}
                                    balance={Variable.myInfo.balance.cem}
                                    course={Variable.Course.list_records[0].cem.usdt}
                                    coin={"CEM"}
                                />
                            </div>
                        </div>
                        <div class="c-wallet__operations">
                            <div class="c-wallet__transaction c-wallet__transaction--label">
                                <div>
                                    {Variable.lang.p.type}
                                </div>
                                <div>
                                    {Variable.lang.p.date}
                                </div>
                                <div>
                                    {Variable.lang.p.operation}
                                </div>
                                <div>
                                    {Variable.lang.p.amount}
                                </div>
                                <div>
                                    {Variable.lang.p.status}
                                </div>
                            </div>
                            <Map
                                data={Variable.PageUserWallet.list_records}
                                dataIf={(item, index) => {
                                    return (
                                        <div class="c-wallet__transaction">
                                            <div class="c-wallet__wrap">
                                                <If
                                                    data={item.comment == "Registration"}
                                                    dataIf={<img src={svg['badge/badge2']} width="32" height="36" class="transactions_small_badge" />}
                                                />
                                                <span class="transaction_type">{Helpers.transactionTypeToLang(item.type)}</span>
                                            </div>
                                            <div>
                                                {Helpers.getDateFormat(item.showDate, "time")}
                                            </div>
                                            <div>
                                                {item.kind}
                                            </div>
                                            <div>
                                                {item.amount.cemd}
                                            </div>
                                            <div>
                                                <If
                                                    data={item.status == 0}
                                                    dataIf={<img src={svg['transaction_canceled']} />}
                                                />
                                                <If
                                                    data={item.status == 1}
                                                    dataIf={<img src={svg['transaction_new']} />}
                                                />
                                                <If
                                                    data={item.status == 2}
                                                    dataIf={<img src={svg['transaction_in_time']} />}
                                                />
                                                <If
                                                    data={item.status == 3}
                                                    dataIf={<img src={svg['transaction_success']} />}
                                                />
                                            </div>
                                        </div>
                                    )
                                }

                                }
                            />
                            <If
                                data={Variable.PageUserWallet.list_records.length < Variable.PageUserWallet.totalFound}
                                dataIf={
                                    <ButtonShowMore
                                        onclick={async () => {
                                            let tmp = await sendApi.send({
                                                action: "getTransactions", short: true, offset: Variable.PageUserWallet.list_records.length, filter: {
                                                    'amount.cemd': { $gt: 0 },
                                                    userTo: Variable.myInfo._id
                                                }
                                            });
                                            Variable.PageUserWallet.list_records.push(...tmp.list_records)
                                            initReload()
                                        }}
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
            )
        })
};
//I check
export default start;