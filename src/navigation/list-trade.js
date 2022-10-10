import {
  jsx,
  jsxFrag,
  init,
  sendApi,
  Variable,
  initReload,
} from "@betarost/cemjs";

import { BlockTrade } from '@component/blocks/BlockTrade.js';
import { If } from '@component/helpers/All.js';

const start = function () {
  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  init(
    async () => {
      Variable.PageTrades = await sendApi.send({ action: "getTrade", short: true, cache: true, name: "PageTrades", limit: 50, });
    },
    () => {
      return (
        <div class={["crypto_exchanges_full_page", Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <BlockTrade
            items={Variable.PageTrades}
            button={
              <If
                data={Variable.PageTrades.list_records.length < Variable.PageTrades.totalFound}
                dataIf={
                  <div class="crypto_exchanges_footer">
                    <a class="btn-view-all-a"
                      onclick={async () => {
                        let tmp = await sendApi.send({ action: "getTrade", short: true, limit: 50, offset: Variable.PageTrades.list_records.length })
                        Variable.PageTrades.list_records.push(...tmp.list_records)
                        initReload()
                      }
                      }
                    >
                      <div class="btn-view-all" >
                        <div>{Variable.lang.button.showMore}</div>
                      </div>
                    </a>
                  </div>
                }
              />
            }
          />
        </div>
      );
    }
  );
};
//I check
export default start;