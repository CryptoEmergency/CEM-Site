import {
  jsx,
  jsxFrag,
  init,
  sendApi,
  Variable,
  initReload,
} from "@betarost/cemjs";

import {BlockTrade} from '@component/blocks/index.js';
import { If } from "@component/helpers/All.js";
import { ButtonShowMore } from "@component/element/index.js";

const start = function (data, ID = "mainBlock") {
  init(
    async () => {
      Variable.PageTrades = await sendApi.send({
        action: "getTrade",
        short: true,
        cache: true,
        name: "PageTrades",
        limit: 50,
      });
    },
    () => {
      return (
        <div class="crypto_exchanges_full_page c-main__body">
          <BlockTrade
            items={Variable.PageTrades}
            button={
              <If
                data={
                  Variable.PageTrades.list_records.length <
                  Variable.PageTrades.totalFound
                }
                dataIf={
                  <ButtonShowMore
                  onclick={async () => {
                    let tmp = await sendApi.send({
                      action: "getTrade",
                      short: true,
                      limit: 50,
                      offset: Variable.PageTrades.list_records.length,
                    });
                    Variable.PageTrades.list_records.push(
                      ...tmp.list_records
                    );
                    initReload();
                  }}
                  />
                }
              />
            }
          />
        </div>
      );
    }, ID
  );
};
export default start;
