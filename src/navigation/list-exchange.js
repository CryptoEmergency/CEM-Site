import {
  jsx,
  jsxFrag,
  init,
  sendApi,
  Variable,
  initReload,
} from "@betarost/cemjs";

import { BlockExchange } from '@component/blocks/BlockExchange.js';
import { If } from '@component/helpers/All.js';

const start = function () {
  Variable.HeaderShow = true;
  Variable.FooterShow = true;

  init(
    async () => {
      Variable.PageExchange = await sendApi.send({ action: "getExchange", short: true, cache: true, name: "PageExchange", limit: 10, });
    },
    () => {
      return (
        <div class={["crypto_exchanges_full_page", Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']} id="crypto_exchange">
          <BlockExchange
            items={Variable.PageExchange}
            button={
              <If
                data={Variable.PageExchange.list_records.length < Variable.PageExchange.totalFound}
                dataIf={
                  <div class="crypto_exchanges_footer">
                    <a class="btn-view-all-a"
                      onclick={async () => {
                        let tmp = await sendApi.send({ action: "getExchange", short: true, limit: 20, offset: Variable.PageExchange.list_records.length })
                        Variable.PageExchange.list_records.push(...tmp.list_records)
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