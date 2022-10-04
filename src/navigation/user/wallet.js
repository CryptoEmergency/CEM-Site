import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi
} from "@betarost/cemjs";
import { siteLink, checkAnswerApi, getDateFormat } from '@src/functions.js'
import { transactionType } from '@src/functionsL.js'
import { getUserTransactions } from '@src/apiFunctionsL.js'
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import { WalletCard } from '@component/element/user/WalletCard.js';
import { If } from '@component/helpers/All.js';


const start = function () {

    let course, transactions, count

    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true

    const showMoreTransactions = async function () {
        count++;
        let tmp = await getUserTransactions(count);
        transactions.list_records.push(...tmp.list_records);
        initReload();
    }

    const TransactionsList = function () {
        const listTransactions = Object.keys(transactions.list_records).map(function (key) {
            return (
                <div class="c-wallet__transaction">
                    <div class="c-wallet__wrap">
                        <If
                            data={transactions.list_records[key].comment == "Registration"}
                            dataIf={<img src={svg['badge/badge2']} width="32" height="36" class="transactions_small_badge" />}
                        />
                        <span class="transaction_type">{Variable.lang.p[transactionType(transactions.list_records[key].type)]}</span>
                    </div>
                    <div>
                        {getDateFormat(transactions.list_records[key].dateCreate)}
                    </div>
                    <div>
                        {transactions.list_records[key].kind}
                    </div>
                    <div>
                        {transactions.list_records[key].amount.cemd}
                    </div>
                    <div>
                        <If
                            data={transactions.list_records[key].status == 0}
                            dataIf={<img src={svg['transaction_canceled']} />}
                        />
                        <If
                            data={transactions.list_records[key].status == 1}
                            dataIf={<img src={svg['transaction_new']} />}
                        />
                        <If
                            data={transactions.list_records[key].status == 2}
                            dataIf={<img src={svg['transaction_in_time']} />}
                        />
                        <If
                            data={transactions.list_records[key].status == 3}
                            dataIf={<img src={svg['transaction_success']} />}
                        />
                    </div>
                </div>
            )
        })

        return (
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
                {listTransactions}
                <a class="btn-view-all-a" onclick={showMoreTransactions}>
                    <div
                        class="btn-view-all"
                        style={
                            transactions.list_records.length === transactions.totalFound
                                ? "display: none"
                                : "display: flex"
                        }
                    >
                        <div>{Variable.lang.button.showMore}</div>
                    </div>
                </a>
            </div>
        )

    }

    init(
        async () => {
            course = checkAnswerApi(await sendApi.getCourse()).list_records[0];
            transactions = await getUserTransactions()
            count = 0;
            console.log(transactions)
        },
        () => {
            console.log("myInfo", Variable.myInfo);
            return (
                <div class="page-content">
                    <div class="c-wallet">
                        <div class="c-wallet__container">
                            <div class="c-wallet__left">
                                <WalletCard
                                    logo={true}
                                    balance={Variable.myInfo.balance.cemd}
                                    course={1}
                                    coin={"CEMD"}
                                />
                                <WalletCard
                                    logo={true}
                                    balance={Variable.myInfo.balance.cem}
                                    course={course.cem.usdt}
                                    coin={"CEM"}
                                />
                            </div>
                        </div>
                        {TransactionsList()}
                    </div>
                </div>
            )
        })
};

export default start;