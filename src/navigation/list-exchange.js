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
import { ButtonShowMore } from "@component/element/index.js";

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
                  <ButtonShowMore
                  onclick = {async () => {
                          let tmp = await sendApi.send({ action: "getExchange", short: true, limit: 20, offset: Variable.PageExchange.list_records.length })
                          Variable.PageExchange.list_records.push(...tmp.list_records)
                          initReload()
                        }
                        }
                  />
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