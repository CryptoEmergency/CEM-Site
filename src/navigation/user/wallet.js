import { jsx, jsxFrag, load, Variable, CEM, initReload, Data } from "@betarost/cemserver/cem.js";
// import { fn } from "@src/functions/index.js";
// import svg from "@assets/svg/index.js";
import { ButtonShowMore, NotFound } from "@elements/element/index.js";

const { svg, fn } = CEM

const UserWalletCard = function ({ Static, balance, coin, course, logo }) {
  return (
    <div class="c-wallet__card">
      <div>
        {
          balance >= 9
            ?
            <div class="c-wallet__exchange"
              onclick={async () => {
                // console.log('=749e41=', Static)

                fn.modals.ModalExchange({
                  balance,
                  callback: async (trade, countCoin, getNameCoin) => {
                    // console.log('=3ad621=========', Static)

                    Static.trade = await trade
                    let responce = await fn.socket.send({ method: "Transactions", _id: Variable.myInfo._id, params: { balance, coin, countCoin, getNameCoin } })
                    // console.log('=ec8fe4=', responce)
                    if (responce?.cem) {
                      Static.myBalance = responce
                    }
                    initReload()
                  }
                })
                initReload()
              }}
            >
              <span>{Variable.lang.button.exchange}</span>
            </div>
            :
            null
        }
      </div>
      <div>
        {
          balance >= 0.1 && coin == "cem"
            ?
            <div class="c-wallet__exchange"
              onclick={async () => {
                // console.log('=749e41=', Static)

                fn.modals.ModalOutputOfCoin({
                  balance, coin,
                  callback: async (countCoin, address, nameCoin) => {
                    // console.log('=3ad621=', Static)
                    const output = await fn.socket.send({ method: "Output", _id: Variable.myInfo._id, params: { countCoin, address, nameCoin } })
                    // console.log('=ec8fe4=', output)
                    if (output?.cem) {
                      Static.myBalance = output
                    }
                    initReload()
                  }
                })
                initReload()
              }}
            >
              <span>вывести</span>
            </div>
            :
            null
        }
      </div>
      <div class="c-wallet__topline">
        <p>{Variable.lang.p.myBalance}</p>
        <p class="c-wallet__coin_name">
          {fn.numberFixWithSpaces(balance, 2)} {coin}
        </p>
      </div>

      <div class="c-wallet__bottomline">
        <div>
          <p>{Variable.lang.p.inUSD}</p>
          <p>{fn.numberFixWithSpaces(course * balance, 2)}</p>
        </div>
        <div>
          <p>{Variable.lang.p.actualeCurs}</p>
          <p>{fn.numberFixWithSpaces(course, 2)} </p>
        </div>
      </div>
      {logo ? (
        <div class="c-wallet__cryptologo">
          <img src={svg.logoStandart} />
        </div>
      ) : null}
    </div>
  );
};

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.trade = null

  load({
    ID,
    fnLoad: async () => {
      Static.nameRecords = "PageUserWallet";
      Static.apiFilter = {
        "amount.cemd": { $gt: 0 },
        userTo: Variable.myInfo._id,
      };
      Static.course = await fn.socket.get({ method: "Course", filter: {} });
      Static.transactionsUsers = await fn.socket.get({
        method: "TransactionsUsers", params: {
          filter: {
            userTo: Variable.myInfo._id,
          },
          limit: 10,
          sort: { showDate: -1 },
        }
      });
      const resBalance = await fn.socket.get({
        method: "Users",
        _id: Variable.myInfo._id,
        params: {
          filter: {},
          select: { balance: 1 }
        }
      });

      Static.myBalance = resBalance?.balance
      await fn.restApi.getTransactions({
        cache: true,
        name: Static.nameRecords,
        filter: Static.apiFilter,
        limit: 10,
      });
    },
    fn: () => {
      // console.log('=b650c3=', Static.transactionsUsers)
      return (
        <div class="page-content">
          <div class="c-wallet c-main__body">
            <div class="c-wallet__container">
              <div class="c-wallet__left">
                <UserWalletCard
                  Static={Static}
                  logo={true}
                  balance={Static.myBalance.cemd}
                  course={1}
                  coin={"cemd"}
                />
                {
                  Static.myBalance.cem > 0
                    ?
                    <UserWalletCard
                      Static={Static}
                      logo={true}
                      balance={Static.myBalance.cem}
                      course={Static.course.cem.usdt}
                      coin={"cem"}
                    />
                    :
                    null
                }
                {/* <UserWalletCard logo={true} balance={Static.myBalance.cem} course={Variable.Course.list_records[0].cem.usdt} coin={"CEM"} /> */}
              </div>
            </div>
            {/* {
              Static.transactionsUsers?.length > 0
                ?
                <div class="c-wallet__operations">
                  <h3>Транзакции</h3>
                  <div class="c-wallet__transaction c-wallet__transaction--label">
                    <div class="c-wallet__transaction--left"> {Variable.lang.p.type} </div>
                    <div> {Variable.lang.p.date} </div>
                    <div> {Variable.lang.p.operation} </div>
                    <div>Конвертация</div>
                    <div> {Variable.lang.p.status} </div>
                  </div>
                  {
                    Static.transactionsUsers.map((item) => {
                      return (
                        <div class="c-wallet__transaction">
                          <div class="c-wallet__wrap c-wallet__transaction--left">
                            {item.comment == "Registration" ? (
                              <img
                                src={svg["badge/badge2"]}
                                width="32"
                                height="36"
                                class="transactions_small_badge"
                              />
                            ) : null}
                            <span class="transaction_type">
                              TOKEN SWAP
                            </span>
                          </div>
                          <div> {fn.getDateFormat(item.showDate, "time")} </div>
                          <div>
                            СONVERSION
                          </div>
                          <div>
                            <div>+{fn.numberFixWithSpaces(item.getAmountCoin, 2)} {item.getNameCoin}</div>
                            <div class="c-wallet__transaction--minus">-{item.AmountCoinExchange} {item.nameCoinExchange}</div>
                            </div>
                          <div>
                            {item.status == 0 ? (
                              <img src={svg["transaction_canceled"]} />
                            ) : null}
                            {item.status == 1 ? (
                              <img src={svg["transaction_new"]} />
                            ) : null}
                            {item.status == "pending" ? (
                              <img src={svg["transaction_in_time"]} />
                            ) : null}
                            {item.status == "success" ? (
                              <img src={svg["transaction_success"]} />
                            ) : null}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                :
                null
            } */}

            <div>
              <h4>Быстрый обмен Crypto</h4>
              <iframe title="Exolix widget" src="https://exolix.com/widget/BTC:BTC-USDT:TRX?a=1&locale=ru&t=mTGWI0GpMY3c0d22UWmk75zqM7n4ogIr8atoV7bpVAYkayVrDBK10T24g3Y75uX5&template=wobrand" width="315px" height="268px" frameBorder="0" style="overflow:hidden" scrolling="no"></iframe>
            </div>

            <div class="c-wallet__operations">
              <h3 style="margin-top: 20px">Бонусы</h3>
              <div class="c-wallet__transaction c-wallet__transaction--label">
                <div class="c-wallet__transaction--left"> {Variable.lang.p.type} </div>
                <div> {Variable.lang.p.date} </div>
                <div> {Variable.lang.p.operation} </div>
                <div> {Variable.lang.p.amount} </div>
                <div> {Variable.lang.p.status} </div>
              </div>
              {!Variable[Static.nameRecords] ||
                !Variable[Static.nameRecords].list_records.length ? (
                <NotFound />
              ) : (
                Variable[Static.nameRecords].list_records.map(function (
                  item,
                  i
                ) {
                  return (
                    <div class="c-wallet__transaction">
                      <div class="c-wallet__wrap c-wallet__transaction--left">
                        {item.comment == "Registration" ? (
                          <img
                            src={svg["badge/badge2"]}
                            width="32"
                            height="36"
                            class="transactions_small_badge"
                          />
                        ) : null}
                        <span class="transaction_type">
                          {fn.transactionTypeToLang(item.type)}
                        </span>
                      </div>
                      <div> {fn.getDateFormat(item.showDate, "time")} </div>
                      <div>{item.kind}</div>
                      <div>{item.amount.cemd}</div>
                      <div>
                        {item.status == 0 ? (
                          <img src={svg["transaction_canceled"]} />
                        ) : null}
                        {item.status == 1 ? (
                          <img src={svg["transaction_new"]} />
                        ) : null}
                        {item.status == 2 ? (
                          <img src={svg["transaction_in_time"]} />
                        ) : null}
                        {item.status == 3 ? (
                          <img src={svg["transaction_success"]} />
                        ) : null}
                      </div>
                    </div>
                  );
                })
              )}
              <ButtonShowMore
                Static={Static}
                action="getTransactions"
                limit={10}
              />
            </div>
          </div>
        </div>
      );
    },
  })
};
export default start;
// OK
